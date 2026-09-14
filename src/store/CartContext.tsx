import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { CATALOG, type StoreProduct } from "@/lib/catalog"
import { probeBackend, type CheckoutItem, type LiveState } from "@/lib/medusa"

export type CartLine = { handle: string; quantity: number }

type CartContextValue = {
  lines: CartLine[]
  items: CheckoutItem[]
  count: number
  subtotal: number
  live: LiveState
  addItem: (handle: string) => void
  removeLine: (handle: string) => void
  setQuantity: (handle: string, quantity: number) => void
  clear: () => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "ascend_cart_v1"

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    } catch {
      return []
    }
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [live, setLive] = useState<LiveState>({
    live: false,
    products: CATALOG,
  })

  useEffect(() => {
    probeBackend().then(setLive)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const addItem = useCallback((handle: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.handle === handle)
      if (existing) {
        return prev.map((l) =>
          l.handle === handle ? { ...l, quantity: l.quantity + 1 } : l
        )
      }
      return [...prev, { handle, quantity: 1 }]
    })
    setDrawerOpen(true)
  }, [])

  const removeLine = useCallback((handle: string) => {
    setLines((prev) => prev.filter((l) => l.handle !== handle))
  }, [])

  const setQuantity = useCallback((handle: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.handle !== handle))
      return
    }
    setLines((prev) =>
      prev.map((l) => (l.handle === handle ? { ...l, quantity } : l))
    )
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const items = useMemo<CheckoutItem[]>(
    () =>
      lines
        .map((line) => {
          const product = live.products.find(
            (p: StoreProduct) => p.handle === line.handle
          )
          return product ? { product, quantity: line.quantity } : null
        })
        .filter(Boolean) as CheckoutItem[],
    [lines, live.products]
  )

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        lines,
        items,
        count,
        subtotal,
        live,
        addItem,
        removeLine,
        setQuantity,
        clear,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
