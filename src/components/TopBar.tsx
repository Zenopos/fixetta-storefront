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
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0a0a0a]/90 backdrop-blur border-b hairline">
      <div className="mx-auto max-w-7xl px-5 h-14 flex items-center justify-between">
        <Link
          to={homePath}
          className="font-display text-xl tracking-wide text-white"
        >
          {wordmark}
          <span className="text-gold">.</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 font-mono2 text-[11px] tracking-[0.25em] text-neutral-400">
          {brand ? (
            <>
              <a
                href={`${brandPath}/#catalog`}
                onClick={goToSection("catalog")}
                className="hover:text-white transition-colors"
              >
                SHOP
              </a>
              <Link
                to={`${brandPath}/roadmap`}
                className="hover:text-white transition-colors"
              >
                {brand === "glowup" ? "RITUAL" : "ROADMAP"}
              </Link>
              <a
                href={`${brandPath}/#ethos`}
                onClick={goToSection("ethos")}
                className="hover:text-white transition-colors"
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
                  className="hover:text-white transition-colors"
                >
                  {BRANDS[b].wordmark.toUpperCase()}
                </Link>
              ))}
            </>
          )}
          <span
            className={`px-2 py-1 border hairline ${
              live.live ? "text-gold border-gold" : "text-neutral-500"
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
          className="font-mono2 text-[11px] tracking-[0.25em] text-white border hairline-strong px-4 py-2 hover:bg-white hover:text-black transition-colors"
        >
          CART [{count}]
        </button>
      </div>
    </header>
  )
}