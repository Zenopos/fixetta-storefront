import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useCart } from "@/store/CartContext"
import { formatMoney } from "@/lib/catalog"

export default function CartDrawer() {
  const { items, subtotal, drawerOpen, setDrawerOpen, setQuantity, removeLine } =
    useCart()
  const navigate = useNavigate()

  // Escape closes; lock body scroll while open.
  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [drawerOpen, setDrawerOpen])

  return (
    <div
      className={`fixed inset-0 z-50 ${
        drawerOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!drawerOpen}
    >
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-[var(--c-bg-card)] border-l hairline-strong flex flex-col transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-14 border-b hairline">
          <span className="font-mono2 text-[11px] tracking-[0.25em] text-[var(--c-mut)]">
            YOUR CART
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close cart"
            className="font-mono2 text-[11px] tracking-[0.25em] text-[var(--c-ink)] hover:text-[var(--c-accent)]"
          >
            CLOSE ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-[var(--c-mut2)]">
              <span className="font-display text-3xl text-[var(--c-mut5)]">
                EMPTY
              </span>
              <span className="font-mono2 text-[11px] tracking-[0.25em]">
                NOTHING IN HERE YET
              </span>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.handle}
                className="flex gap-4 px-6 py-5 border-b hairline"
              >
                <div className="w-20 h-20 shrink-0 flex items-center justify-center overflow-hidden bg-[var(--c-bg-sub)]">
                  <img
                    src={product.images[0]}
                    alt={product.imageAlts[0] ?? product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <span className="font-display text-lg text-[var(--c-ink)]">
                      {product.shortName}
                    </span>
                    <span className="font-mono2 text-sm text-[var(--c-accent)]">
                      {formatMoney(product.price * quantity)}
                    </span>
                  </div>
                  <p className="font-mono2 text-[10px] tracking-[0.2em] text-[var(--c-mut2)] mt-1 truncate">
                    {product.tagline.toUpperCase()}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex border hairline-strong">
                      <button
                        className="w-7 h-7 text-[var(--c-mut)] hover:text-[var(--c-ink)]"
                        onClick={() => setQuantity(product.handle, quantity - 1)}
                        aria-label={`Decrease ${product.shortName} quantity`}
                      >
                        −
                      </button>
                      <span className="w-8 h-7 flex items-center justify-center font-mono2 text-xs border-x hairline">
                        {quantity}
                      </span>
                      <button
                        className="w-7 h-7 text-[var(--c-mut)] hover:text-[var(--c-ink)]"
                        onClick={() => setQuantity(product.handle, quantity + 1)}
                        aria-label={`Increase ${product.shortName} quantity`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeLine(product.handle)}
                      aria-label={`Remove ${product.shortName} from cart`}
                      className="font-mono2 text-[10px] tracking-[0.2em] text-[var(--c-mut2)] hover:text-red-400"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t hairline-strong px-6 py-5 space-y-4">
            <div className="flex justify-between font-mono2 text-sm">
              <span className="text-[var(--c-mut)] tracking-[0.2em]">SUBTOTAL</span>
              <span className="text-[var(--c-ink)]">{formatMoney(subtotal)}</span>
            </div>
            <p className="font-mono2 text-[10px] tracking-[0.15em] text-[var(--c-mut2)]">
              FREE TRACKED SHIPPING · 7–15 DAYS · SECURE STRIPE CHECKOUT
            </p>
            <button
              onClick={() => {
                setDrawerOpen(false)
                navigate("/checkout")
              }}
              className="w-full bg-[var(--c-accent)] text-[var(--c-accent-inv)] font-mono2 text-xs tracking-[0.3em] py-4 hover:bg-[var(--c-accent-hover)] transition-colors"
            >
              CHECKOUT →
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}