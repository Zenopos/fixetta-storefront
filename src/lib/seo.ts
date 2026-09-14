/**
 * SEO layer for the ASCEND storefront.
 *
 * The app is client-rendered but prerendered at build time
 * (vite-plugin-prerender): tags set here in useEffect are captured into the
 * static HTML of each route, so crawlers see real titles, meta and JSON-LD.
 *
 * SITE_URL is the single swap point for the production domain — also update
 * public/sitemap.xml and public/robots.txt when the real domain is known.
 */

import { useEffect } from "react"

// FIXETTA — production domain for the dual-sub-brand storefront.
export const SITE_URL = "https://fixetta.com"

export const SITE_NAME = "FIXETTA"
export const SUPPORT_EMAIL = "support@fixetta.com"
export const DEFAULT_OG_IMAGE = "/images/ascend/lift-height-booster-insole-clean-side-profile.jpg"

type SeoProps = {
  /** <title> and og:title */
  title: string
  /** meta description + og:description */
  description: string
  /** route path, e.g. "/product/edge-jawline-exerciser" — builds canonical + og:url */
  path: string
  /** defaults to "index,follow"; checkout/confirmation pass "noindex,nofollow" */
  robots?: string
  /** absolute-ish image path for og:image; defaults to DEFAULT_OG_IMAGE */
  image?: string
  ogType?: "website" | "product" | "article"
  /** optional JSON-LD object, injected as application/ld+json */
  jsonLd?: Record<string, unknown>
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement("meta")
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export default function Seo({
  title,
  description,
  path,
  robots = "index,follow",
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
}: SeoProps) {
  // Serialize so the effect keys on content, not object identity.
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const imageUrl = `${SITE_URL}${image}`

    document.title = title
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    })
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots })
    upsertLink("canonical", url)

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    })
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url })
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: ogType,
    })
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    })
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    })

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    })

    let ld = document.head.querySelector<HTMLScriptElement>(
      'script[data-seo-jsonld="route"]'
    )
    if (jsonLdText) {
      if (!ld) {
        ld = document.createElement("script")
        ld.type = "application/ld+json"
        ld.setAttribute("data-seo-jsonld", "route")
        document.head.appendChild(ld)
      }
      ld.textContent = jsonLdText
    } else {
      ld?.remove()
    }
  }, [title, description, path, robots, image, ogType, jsonLdText])

  return null
}
