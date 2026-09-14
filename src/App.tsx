import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router"
import { CartProvider } from "@/store/CartContext"
import Landing from "@/pages/Landing"
import Home from "@/pages/Home"
import ProductPage from "@/pages/ProductPage"
import CheckoutPage from "@/pages/CheckoutPage"
import ConfirmationPage from "@/pages/ConfirmationPage"
import RegimenPage from "@/pages/RegimenPage"
import PrivacyPage from "@/pages/PrivacyPage"
import TermsPage from "@/pages/TermsPage"
import NotFoundPage from "@/pages/NotFoundPage"

/** SPA scroll restoration — route changes reset to the top. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  // Signal to the prerenderer that the route has painted, so the
  // captured static HTML contains the full page (content + SEO tags).
  useEffect(() => {
    document.dispatchEvent(new Event("app-rendered"))
  }, [])

  return (
    <CartProvider>
      <ScrollToTop />
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
    </CartProvider>
  )
}
