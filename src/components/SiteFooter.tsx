import { Link } from "react-router"
import { BRANDS, type BrandKey } from "@/lib/catalog"
import { useBrand } from "@/lib/useBrand"

/**
 * Shared site footer. `slim` drops the trust badges for checkout,
 * where we don't want exit distractions.
 *
 * On a sub-brand route the footer hangs off that brand's wordmark and
 * points its RITUAL link at that brand's roadmap. On shared routes
 * (checkout/confirmation/legal) it links out to both sub-brands.
 */
export default function SiteFooter({
  slim = false,
  brand: brandProp,
}: {
  slim?: boolean
  brand?: BrandKey
}) {
  const hookBrand = useBrand()
  const brand = brandProp ?? hookBrand
  const brandPath = brand ? BRANDS[brand].path : "/"
  const wordmark = brand ? BRANDS[brand].wordmark : "FIXETTA"

  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-7xl px-5 py-12 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            to={brandPath}
            className="font-display text-2xl text-[var(--c-ink)] hover:text-[var(--c-accent)] transition-colors"
          >
            {wordmark}
            <span className="text-[var(--c-accent)]">.</span>
          </Link>
          <nav
            aria-label="Footer"
            className="font-mono2 text-[10px] tracking-[0.2em] text-[var(--c-mut)] flex flex-wrap gap-x-6 gap-y-2"
          >
            {brand ? (
              <Link
                to={`${brandPath}/roadmap`}
                className="hover:text-[var(--c-ink)] transition-colors"
              >
                {brand === "glowup" ? "THE RITUAL" : "THE ROADMAP"}
              </Link>
            ) : (
              <>
                <Link to="/ascend" className="hover:text-[var(--c-ink)] transition-colors">
                  ASCEND — MEN'S
                </Link>
                <Link
                  to="/glowup"
                  className="hover:text-[var(--c-ink)] transition-colors"
                >
                  GLOWUP — WOMEN'S
                </Link>
              </>
            )}
            <Link to="/privacy" className="hover:text-[var(--c-ink)] transition-colors">
              PRIVACY POLICY
            </Link>
            <Link to="/terms" className="hover:text-[var(--c-ink)] transition-colors">
              TERMS OF SERVICE
            </Link>
          </nav>
        </div>
        <div className="font-mono2 text-[10px] tracking-[0.2em] text-[var(--c-mut2)] flex flex-wrap gap-x-6 gap-y-2">
          {!slim && (
            <>
              <span>FREE TRACKED SHIPPING</span>
              <span>30-DAY RETURNS</span>
              <span>SECURE CHECKOUT</span>
            </>
          )}
          <span>© {new Date().getFullYear()} FIXETTA</span>
        </div>
      </div>
    </footer>
  )
}