import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router"
import { CartProvider } from "@/store/CartContext"
import { useBrand } from "@/lib/useBrand"
import Landing from "@/pages/Landing"
import Home from "@/pages/Home"
import ProductPage from "@/pages/ProductPage"
import CheckoutPage from "@/pages/CheckoutPage"
import ConfirmationPage from "@/pages/ConfirmationPage"
import RegimenPage from "@/pages/RegimenPage"
import PrivacyPage from "@/pages/PrivacyPage"
import TermsPage from "@/pages/TermsPage"
import NotFoundPage from "@/pages/NotFoundPage"

export default function App() {
  // Signal to the prerenderer that the route has painted, so the
  // captured static HTML contains the full page (content + SEO tags).
  useEffect(() => {
    document.dispatchEvent(new Event("app-rendered"))
  }, [])

  return (
    <CartProvider>
      <BrandShell />
    </CartProvider>
  )
}

/**
 * Applies the active sub-brand as `data-brand` onto a wrapper so the theme
 * layer (src/theme-brands.css) can restyle /glowup pastel while /ascend and
 * shared routes (checkout/legal) keep the dark-luxury shell. Also resets the
 * scroll position on route change (SPA scroll restoration).
 */
function BrandShell() {
  const brand = useBrand()
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div data-brand={brand}>
      <Routes>
        {/* Root landmark: dual-sub-brand chooser */}
        <Route path="/" element={<Landing />} />

        {/* ASCEND — men's looksmaxxing */}
        <Route path="/ascend" element={<Home brand="ascend" />} />
        <Route
          path="/ascend/product/:handle"
          element={<ProductPage brand="ascend" />}
        />
        <Route path="/ascend/roadmap" element={<RegimenPage brand="ascend" />} />

        {/* glowup — women's beauty tools */}
        <Route path="/glowup" element={<Home brand="glowup" />} />
        <Route
          path="/glowup/product/:handle"
          element={<ProductPage brand="glowup" />}
        />
        <Route
          path="/glowup/roadmap"
          element={<RegimenPage brand="glowup" />}
        />

        {/* Shared base: cart + checkout + legal */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}