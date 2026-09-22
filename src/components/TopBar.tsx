import { Link, useLocation, useNavigate } from "react-router"
import { useCart } from "@/store/CartContext"
import { useBrand } from "@/lib/useBrand"
import { BRANDS } from "@/lib/catalog"

export default function TopBar() {
  const { count, setDrawerOpen, live } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const brand = useBrand()

  // Shared routes (checkout/legal/404) have no sub-brand; wordmark → landing.
  const brandPath = brand ? BRANDS[brand].path : "/"
  const wordmark = brand ? BRANDS[brand].wordmark : "FIXETTA"
  const homePath = brand ? BRANDS[brand].path : "/"

  const goToSection =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (!brand || pathname !== brandPath) {
        navigate(homePath)
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          )
        )
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }
    }

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[var(--c-bg)]/90 backdrop-blur border-b hairline">
      <div className="mx-auto max-w-7xl px-5 h-14 flex items-center justify-between">
        <Link
          to={homePath}
          className="font-display text-xl tracking-wide text-[var(--c-ink)]"
        >
          {wordmark}
          <span className="text-[var(--c-accent)]">.</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 font-mono2 text-[11px] tracking-[0.25em] text-[var(--c-mut)]">
          {brand ? (
            <>
              <a
                href={`${brandPath}/#catalog`}
                onClick={goToSection("catalog")}
                className="hover:text-[var(--c-ink)] transition-colors"
              >
                SHOP
              </a>
              <Link
                to={`${brandPath}/roadmap`}
                className="hover:text-[var(--c-ink)] transition-colors"
              >
                {brand === "glowup" ? "RITUAL" : "ROADMAP"}
              </Link>
              <a
                href={`${brandPath}/#ethos`}
                onClick={goToSection("ethos")}
                className="hover:text-[var(--c-ink)] transition-colors"
              >
                ETHOS
              </a>
            </>
          ) : (
            <>
              {(["ascend", "glowup"] as const).map((b) => (
                <Link
                  key={b}
                  to={BRANDS[b].path}
                  className="hover:text-[var(--c-ink)] transition-colors"
                >
                  {BRANDS[b].wordmark.toUpperCase()}
                </Link>
              ))}
            </>
          )}
          <span
            className={`px-2 py-1 border hairline ${
              live.live
                ? "text-[var(--c-accent)] border-[var(--c-accent)]"
                : "text-[var(--c-mut2)]"
            }`}
            title={
              live.live
                ? "Connected to Medusa backend"
                : "Demo mode — connect the Medusa backend to go live"
            }
          >
            {live.live ? "● LIVE" : "○ DEMO"}
          </span>
        </nav>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label={`Open cart, ${count} items`}
          className="font-mono2 text-[11px] tracking-[0.25em] text-[var(--c-ink)] border hairline-strong px-4 py-2 hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)] transition-colors"
        >
          CART [{count}]
        </button>
      </div>
    </header>
  )
}