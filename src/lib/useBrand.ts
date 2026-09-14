/**
 * Brand-aware hooks for the FIXETTA dual-sub-brand storefront.
 * Sub-brands: ASCEND (men's, /ascend) and glowup (women's, /glowup).
 */
import { useLocation } from "react-router"
import type { BrandKey } from "./catalog"

const PATHS: Record<string, BrandKey> = {
  "/ascend": "ascend",
  "/glowup": "glowup",
}

/**
 * Returns the active sub-brand key (or null for shared routes like
 * checkout/confirmation/legal) by matching the current pathname prefix.
 */
export function useBrand(): BrandKey | null {
  const { pathname } = useLocation()
  for (const [prefix, key] of Object.entries(PATHS)) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return key
  }
  return null
}
