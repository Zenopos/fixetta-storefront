import { useMemo, useState } from "react"
import { Link, useParams } from "react-router"
import TopBar from "@/components/TopBar"
import CartDrawer from "@/components/CartDrawer"
import SiteFooter from "@/components/SiteFooter"
import { formatMoney } from "@/lib/catalog"
import { BRANDS, type BrandKey } from "@/lib/catalog"
import Seo, { SITE_URL } from "@/lib/seo"
import { useCart } from "@/store/CartContext"

const BRAND_LABEL: Record<BrandKey, string> = {
  ascend: "ASCEND",
  glowup: "glowup",
}

export default function ProductPage({ brand }: { brand: BrandKey }) {
  const { handle } = useParams()
  const { live, addItem } = useCart()
  const product = live.products.find((p) => p.handle === handle && p.brand === brand)
  const brandPath = BRANDS[brand].path
  const [activeImage, setActiveImage] = useState(0)

  // Navigating PDP → PDP reuses this component; reset the gallery by
  // adjusting state during render (React-endorsed alternative to an effect).
  const [prevHandle, setPrevHandle] = useState(handle)
  if (prevHandle !== handle) {
    setPrevHandle(handle)
    setActiveImage(0)
  }

  const others = useMemo(
    () => live.products.filter((p) => p.brand === brand && p.handle !== handle),
    [live.products, handle, brand]
  )

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <TopBar />
        <div className="pt-40 text-center">
          <p className="font-display text-4xl text-neutral-600">NOT FOUND</p>
          <Link
            to={brandPath}
            className="font-mono2 text-[11px] tracking-[0.25em] text-gold mt-4 inline-block"
          >
            ← BACK TO {BRAND_LABEL[brand]}
          </Link>
        </div>
      </div>
    )
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => `${SITE_URL}${img}`),
    brand: { "@type": "Brand", name: BRAND_LABEL[brand] },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${brandPath}/product/${product.handle}`,
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title={`${product.title} | ${BRAND_LABEL[brand]} · FIXETTA`}
        description={product.description}
        path={`${brandPath}/product/${product.handle}`}
        ogType="product"
        image={product.images[0]}
        jsonLd={productJsonLd}
      />
      <TopBar />
      <CartDrawer />

      <div className="pt-14 mx-auto max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="px-5 py-4 border-b hairline font-mono2 text-[10px] tracking-[0.25em] text-neutral-500"
        >
          <Link to={brandPath} className="hover:text-white">
            {BRAND_LABEL[brand]}
          </Link>
          <span className="mx-2">/</span>
          <Link to={`${brandPath}/roadmap`} className="hover:text-white">
            ROADMAP
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{product.shortName}</span>
        </nav>

        <div className="grid lg:grid-cols-2">
          {/* ── Gallery ──────────────────────────────────── */}
          <div className="border-r hairline">
            <div className="aspect-square bg-[#111]">
              <img
                src={product.images[activeImage]}
                alt={product.imageAlts[activeImage] ?? product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex flex-wrap justify-center gap-px bg-white/10 border-t hairline">
                {product.images.map((img, i) => {
                  if (i === activeImage) return null
                  return (
                    <button
                      key={img}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1} of ${product.images.length}`}
                      className="w-[calc(50%-0.5px)] aspect-square bg-[#111] opacity-70 hover:opacity-100"
                    >
                      <img
                        src={img}
                        alt={product.imageAlts[i] ?? `${product.shortName} view ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── Details ──────────────────────────────────── */}
          <div className="px-5 lg:px-12 py-12 flex flex-col">
            <p className="font-mono2 text-[11px] tracking-[0.3em] text-gold">
              {product.tagline.toUpperCase()}
            </p>
            <h1 className="font-display text-6xl text-white mt-4">
              {product.shortName}
            </h1>
            <p className="font-mono2 text-2xl text-white mt-4">
              {formatMoney(product.price)}
            </p>
            <p className="text-neutral-400 leading-relaxed mt-8 max-w-md">
              {product.description}
            </p>

            {/* ── Why it works ─────────────────────────── */}
            <h2 className="font-mono2 text-[11px] tracking-[0.3em] text-gold mt-10">
              WHY IT WORKS
            </h2>
            <ul className="mt-4 space-y-2 max-w-md">
              {product.benefits.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 text-sm text-neutral-300 leading-relaxed"
                >
                  <span className="text-gold mt-0.5 shrink-0">—</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* ── The protocol ─────────────────────────── */}
            <h2 className="font-mono2 text-[11px] tracking-[0.3em] text-gold mt-10">
              THE PROTOCOL
            </h2>
            <ol className="mt-4 space-y-2 max-w-md">
              {product.protocol.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-3 text-sm text-neutral-300 leading-relaxed"
                >
                  <span className="font-mono2 text-[10px] text-gold mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-10 space-y-px max-w-md">
              {[
                ...product.specs,
                ["SHIPPING", "Free tracked · 7–15 days"],
                ["RETURNS", "30-day money-back"],
                ["PAYMENT", "Stripe — cards, Apple Pay, Link"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border hairline px-4 py-3 font-mono2 text-[11px]"
                >
                  <span className="tracking-[0.25em] text-neutral-500 shrink-0">
                    {k}
                  </span>
                  <span className="text-neutral-300 text-right">{v}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => addItem(product.handle)}
              className="mt-10 max-w-md bg-gold text-black font-mono2 text-xs tracking-[0.3em] py-5 hover:bg-[#c5a878] transition-colors"
            >
              ADD TO CART — {formatMoney(product.price)}
            </button>
            <p className="mt-4 max-w-md font-mono2 text-[9px] tracking-[0.15em] text-neutral-600 leading-relaxed">
              COSMETIC TOOL — NOT A MEDICAL DEVICE. INDIVIDUAL RESULTS VARY. SEE{" "}
              <Link to="/terms" className="underline hover:text-neutral-400">
                TERMS
              </Link>
              .
            </p>
          </div>
        </div>

        {/* ── More from the ritual ───────────────────────── */}
        {others.length > 0 && (
          <div className="border-t hairline px-5 py-16">
            <h2 className="font-display text-3xl text-white mb-8">
              COMPLETE THE RITUAL
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((p) => (
                <Link
                  key={p.handle}
                  to={`${brandPath}/product/${p.handle}`}
                  className="group border hairline hover:border-gold transition-colors"
                >
                  <div className="aspect-square bg-[#111]">
                    <img
                      src={p.images[0]}
                      alt={p.imageAlts[0] ?? p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-4 py-3 flex justify-between items-center">
                    <span className="font-display text-lg text-white group-hover:text-gold transition-colors">
                      {p.shortName}
                    </span>
                    <span className="font-mono2 text-xs text-gold">
                      {formatMoney(p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteFooter brand={brand} />
    </div>
  )
}