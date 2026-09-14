/**
 * Medusa Store API client (headless).
 *
 * The storefront runs in two modes:
 *  - LIVE: VITE_MEDUSA_BACKEND_URL + VITE_MEDUSA_PUBLISHABLE_KEY are set and
 *    reachable → real carts, real Stripe PaymentIntents, real orders that
 *    auto-fulfill to AliExpress.
 *  - DEMO: backend not reachable → full browsing + local cart, checkout
 *    completes as a simulation. Wire the .env to flip to live.
 */
import { CATALOG, type StoreProduct } from "./catalog"

export const BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL as
  | string
  | undefined
export const PUBLISHABLE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY as
  | string
  | undefined
export const STRIPE_PUBLISHABLE_KEY = import.meta.env
  .VITE_STRIPE_PUBLISHABLE_KEY as string | undefined

export type LiveState = {
  live: boolean
  products: StoreProduct[]
  regionId?: string
  error?: string
}

const headers = (): HeadersInit => ({
  "content-type": "application/json",
  ...(PUBLISHABLE_KEY ? { "x-publishable-api-key": PUBLISHABLE_KEY } : {}),
})

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: { ...headers(), ...(init?.headers || {}) },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Medusa ${res.status} on ${path}: ${text.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

/** Probe the backend and merge live products (variant ids, prices) into the catalog. */
export async function probeBackend(): Promise<LiveState> {
  if (!BACKEND_URL || !PUBLISHABLE_KEY) {
    return { live: false, products: CATALOG }
  }
  try {
    const [regionsRes, productsRes] = await Promise.all([
      api<{ regions: Array<{ id: string; currency_code: string }> }>(
        "/store/regions"
      ),
      api<{
        products: Array<{
          handle: string
          variants?: Array<{ id: string }>
        }>
      }>("/store/products?limit=50&fields=handle,variants.id"),
    ])

    const region =
      regionsRes.regions.find((r) => r.currency_code === "usd") ||
      regionsRes.regions[0]

    const products = CATALOG.map((p) => {
      const live = productsRes.products.find((lp) => lp.handle === p.handle)
      const variantId = live?.variants?.[0]?.id
      return { ...p, variantId, live: Boolean(variantId) }
    })

    return { live: true, products, regionId: region?.id }
  } catch (err) {
    return {
      live: false,
      products: CATALOG,
      error: (err as Error).message,
    }
  }
}

export type CheckoutItem = {
  product: StoreProduct
  quantity: number
}

export type AddressInput = {
  email: string
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  phone?: string
}

/** Build a Medusa cart from local checkout items. */
export async function createCart(
  items: CheckoutItem[],
  regionId: string
): Promise<{ id: string }> {
  const { cart } = await api<{ cart: { id: string } }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({ region_id: regionId }),
  })

  for (const item of items) {
    if (!item.product.variantId) {
      throw new Error(`Product ${item.product.handle} is not available live.`)
    }
    await api(`/store/carts/${cart.id}/line-items`, {
      method: "POST",
      body: JSON.stringify({
        variant_id: item.product.variantId,
        quantity: item.quantity,
        metadata: {
          aliexpress_product_id: item.product.aliexpressProductId,
        },
      }),
    })
  }
  return cart
}

/** Attach customer + addresses, pick the AliExpress shipping option. */
export async function prepareCart(
  cartId: string,
  address: AddressInput
): Promise<void> {
  await api(`/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      email: address.email,
      shipping_address: {
        first_name: address.firstName,
        last_name: address.lastName,
        address_1: address.address1,
        address_2: address.address2 || "",
        city: address.city,
        province: address.state,
        postal_code: address.zip,
        country_code: "us",
        phone: address.phone || "",
      },
      billing_address: {
        first_name: address.firstName,
        last_name: address.lastName,
        address_1: address.address1,
        address_2: address.address2 || "",
        city: address.city,
        province: address.state,
        postal_code: address.zip,
        country_code: "us",
        phone: address.phone || "",
      },
    }),
  })

  const { shipping_options } = await api<{
    shipping_options: Array<{ id: string; name: string }>
  }>(`/store/shipping-options?cart_id=${cartId}`)

  const option =
    shipping_options.find((o) => /dropship|standard/i.test(o.name)) ||
    shipping_options[0]
  if (!option) throw new Error("No shipping options available for this cart.")

  await api(`/store/carts/${cartId}/shipping-methods`, {
    method: "POST",
    body: JSON.stringify({ option_id: option.id }),
  })
}

/** Create the Stripe payment session; returns the PaymentIntent client_secret. */
export async function initiateStripePayment(cartId: string): Promise<string> {
  const { payment_collection } = await api<{
    payment_collection: { id: string }
  }>("/store/payment-collections", {
    method: "POST",
    body: JSON.stringify({ cart_id: cartId }),
  })

  const { payment_collection: pc } = await api<{
    payment_collection: {
      payment_sessions?: Array<{ data?: Record<string, unknown> }>
    }
  }>(`/store/payment-collections/${payment_collection.id}/payment-sessions`, {
    method: "POST",
    body: JSON.stringify({ provider_id: "pp_stripe_stripe" }),
  })

  const clientSecret = pc.payment_sessions?.[0]?.data?.client_secret as
    | string
    | undefined
  if (!clientSecret) {
    throw new Error("Stripe did not return a client_secret.")
  }
  return clientSecret
}

/** Convert the paid cart into an order (triggers AliExpress auto-fulfillment). */
export async function completeCart(
  cartId: string
): Promise<{ orderId: string }> {
  const res = await api<{
    type: string
    order?: { id: string }
  }>(`/store/carts/${cartId}/complete`, { method: "POST" })

  if (res.type !== "order" || !res.order) {
    throw new Error("Cart did not complete into an order.")
  }
  return { orderId: res.order.id }
}
