import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import TopBar from "@/components/TopBar"
import SiteFooter from "@/components/SiteFooter"
import { formatMoney } from "@/lib/catalog"
import Seo from "@/lib/seo"
import { useCart } from "@/store/CartContext"
import {
  STRIPE_PUBLISHABLE_KEY,
  completeCart,
  createCart,
  initiateStripePayment,
  prepareCart,
  type AddressInput,
} from "@/lib/medusa"

const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null

type Stage = "address" | "payment" | "processing"

function StripePaymentForm({
  onPaid,
  total,
}: {
  onPaid: () => void
  total: number
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const pay = async () => {
    if (!stripe || !elements) return
    setBusy(true)
    setError(null)
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })
    if (stripeError) {
      setError(stripeError.message || "Payment failed.")
      setBusy(false)
      return
    }
    onPaid()
  }

  return (
    <div className="space-y-6">
      <div className="border hairline-strong p-5 bg-[#0d0d0d]">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>
      {error && (
        <p className="font-mono2 text-xs text-red-400 border border-red-400/40 px-4 py-3">
          {error}
        </p>
      )}
      <button
        onClick={pay}
        disabled={!stripe || busy}
        className="w-full bg-gold text-black font-mono2 text-xs tracking-[0.3em] py-5 hover:bg-[#c5a878] transition-colors disabled:opacity-40"
      >
        {busy ? "PROCESSING…" : `PAY ${formatMoney(total)} →`}
      </button>
    </div>
  )
}

export default function CheckoutPage() {
  const { items, subtotal, live, clear } = useCart()
  const navigate = useNavigate()
  const [stage, setStage] = useState<Stage>("address")
  const [error, setError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [cartId, setCartId] = useState<string | null>(null)
  const [address, setAddress] = useState<AddressInput>({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  })

  const input =
    "w-full bg-[#0d0d0d] border hairline-strong px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#af915f] transition-colors"
  const label = "font-mono2 text-[10px] tracking-[0.25em] text-neutral-500 block mb-2"

  const canSubmit = useMemo(
    () =>
      address.email.includes("@") &&
      address.firstName &&
      address.lastName &&
      address.address1 &&
      address.city &&
      address.state &&
      address.zip,
    [address]
  )

  const finishDemo = () => {
    sessionStorage.setItem(
      "ascend_last_order",
      JSON.stringify({
        demo: true,
        email: address.email,
        total: subtotal,
        items: items.map((i) => ({
          name: i.product.shortName,
          qty: i.quantity,
        })),
      })
    )
    clear()
    navigate("/confirmation")
  }

  const submitAddress = async () => {
    if (!canSubmit) return
    setError(null)

    // Demo mode — no backend connected
    if (!live.live || !live.regionId) {
      setStage("processing")
      setTimeout(finishDemo, 1200)
      return
    }

    if (!stripePromise) {
      setError(
        "Backend is live but VITE_STRIPE_PUBLISHABLE_KEY is missing. Add it to .env and rebuild."
      )
      return
    }

    setStage("processing")
    try {
      const cart = await createCart(items, live.regionId)
      setCartId(cart.id)
      await prepareCart(cart.id, address)
      const secret = await initiateStripePayment(cart.id)
      setClientSecret(secret)
      setStage("payment")
    } catch (err) {
      setError((err as Error).message)
      setStage("address")
    }
  }

  const onPaid = async () => {
    if (!cartId) return
    setStage("processing")
    try {
      const { orderId } = await completeCart(cartId)
      sessionStorage.setItem(
        "ascend_last_order",
        JSON.stringify({
          demo: false,
          orderId,
          email: address.email,
          total: subtotal,
          items: items.map((i) => ({
            name: i.product.shortName,
            qty: i.quantity,
          })),
        })
      )
      clear()
      navigate("/confirmation")
    } catch (err) {
      setError((err as Error).message)
      setStage("payment")
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title="Checkout | FIXETTA"
        description="Secure FIXETTA checkout."
        path="/checkout"
        robots="noindex,nofollow"
      />
      <TopBar />
      <div className="pt-14 mx-auto max-w-5xl px-5 py-16">
        <div className="flex items-end justify-between border-b hairline pb-6 mb-10">
          <h1 className="font-display text-5xl text-white">CHECKOUT</h1>
          <span
            className={`font-mono2 text-[10px] tracking-[0.25em] ${
              live.live ? "text-gold" : "text-neutral-500"
            }`}
          >
            {live.live ? "SECURE · STRIPE" : "DEMO MODE"}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-4xl text-neutral-600">
              CART IS EMPTY
            </p>
            <Link
              to="/"
              className="font-mono2 text-[11px] tracking-[0.25em] text-gold mt-6 inline-block"
            >
              ← BACK TO THE STORES
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-12">
            {/* Left: form / payment */}
            <div>
              {stage === "address" && (
                <div className="space-y-6">
                  <h2 className="font-mono2 text-[11px] tracking-[0.3em] text-gold">
                    01 / SHIPPING
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className={label}>EMAIL</label>
                      <input
                        className={input}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={address.email}
                        onChange={(e) =>
                          setAddress({ ...address, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className={label}>FIRST NAME</label>
                      <input
                        className={input}
                        autoComplete="given-name"
                        value={address.firstName}
                        onChange={(e) =>
                          setAddress({ ...address, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className={label}>LAST NAME</label>
                      <input
                        className={input}
                        autoComplete="family-name"
                        value={address.lastName}
                        onChange={(e) =>
                          setAddress({ ...address, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className={label}>ADDRESS</label>
                      <input
                        className={input}
                        autoComplete="address-line1"
                        placeholder="Street address"
                        value={address.address1}
                        onChange={(e) =>
                          setAddress({ ...address, address1: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        className={input}
                        autoComplete="address-line2"
                        placeholder="Apartment, suite, etc. (optional)"
                        value={address.address2}
                        onChange={(e) =>
                          setAddress({ ...address, address2: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className={label}>CITY</label>
                      <input
                        className={input}
                        autoComplete="address-level2"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={label}>STATE</label>
                        <input
                          className={input}
                          autoComplete="address-level1"
                          placeholder="CA"
                          value={address.state}
                          onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className={label}>ZIP</label>
                        <input
                          className={input}
                          autoComplete="postal-code"
                          value={address.zip}
                          onChange={(e) =>
                            setAddress({ ...address, zip: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className={label}>PHONE (OPTIONAL)</label>
                      <input
                        className={input}
                        type="tel"
                        autoComplete="tel"
                        value={address.phone}
                        onChange={(e) =>
                          setAddress({ ...address, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="font-mono2 text-xs text-red-400 border border-red-400/40 px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={submitAddress}
                    disabled={!canSubmit}
                    className="w-full bg-gold text-black font-mono2 text-xs tracking-[0.3em] py-5 hover:bg-[#c5a878] transition-colors disabled:opacity-40"
                  >
                    CONTINUE TO PAYMENT →
                  </button>
                  {!live.live && (
                    <p className="font-mono2 text-[10px] tracking-[0.15em] text-neutral-500 leading-relaxed">
                      DEMO MODE — no charge is made. Set VITE_MEDUSA_BACKEND_URL,
                      VITE_MEDUSA_PUBLISHABLE_KEY and VITE_STRIPE_PUBLISHABLE_KEY
                      to enable live Stripe checkout.
                    </p>
                  )}
                </div>
              )}

              {stage === "payment" && clientSecret && stripePromise && (
                <div className="space-y-6">
                  <h2 className="font-mono2 text-[11px] tracking-[0.3em] text-gold">
                    02 / PAYMENT
                  </h2>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "night",
                        variables: {
                          colorPrimary: "#af915f",
                          colorBackground: "#0d0d0d",
                          colorText: "#f5f3ef",
                          borderRadius: "0px",
                          fontFamily: "JetBrains Mono, monospace",
                        },
                      },
                    }}
                  >
                    <StripePaymentForm onPaid={onPaid} total={subtotal} />
                  </Elements>
                  {error && (
                    <p className="font-mono2 text-xs text-red-400 border border-red-400/40 px-4 py-3">
                      {error}
                    </p>
                  )}
                </div>
              )}

              {stage === "processing" && (
                <div className="py-24 text-center">
                  <p className="font-display text-3xl text-white animate-pulse">
                    PROCESSING
                  </p>
                  <p className="font-mono2 text-[10px] tracking-[0.25em] text-neutral-500 mt-4">
                    SECURING YOUR ORDER…
                  </p>
                </div>
              )}
            </div>

            {/* Right: summary */}
            <aside className="border hairline h-fit bg-[#0d0d0d]">
              <div className="px-6 py-4 border-b hairline font-mono2 text-[10px] tracking-[0.25em] text-neutral-500">
                ORDER SUMMARY
              </div>
              <div className="px-6 py-4 space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.handle} className="flex gap-3 items-center">
                    <div className="w-14 h-14 shrink-0 bg-[#111]">
                      <img
                        src={product.images[0]}
                        alt={product.imageAlts[0] ?? product.shortName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-base text-white">
                        {product.shortName}{" "}
                        <span className="font-mono2 text-[10px] text-neutral-500">
                          ×{quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono2 text-xs text-neutral-300">
                      {formatMoney(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t hairline space-y-2 font-mono2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>SHIPPING</span>
                  <span className="text-gold">FREE</span>
                </div>
                <div className="flex justify-between text-white text-sm pt-2 border-t hairline">
                  <span className="tracking-[0.2em]">TOTAL</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
      <SiteFooter slim />
    </div>
  )
}
