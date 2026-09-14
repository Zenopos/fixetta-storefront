import { Link } from "react-router"
import TopBar from "@/components/TopBar"
import CartDrawer from "@/components/CartDrawer"
import ProductCard from "@/components/ProductCard"
import SiteFooter from "@/components/SiteFooter"
import Seo from "@/lib/seo"
import { useCart } from "@/store/CartContext"
import { BRANDS, type BrandKey } from "@/lib/catalog"

export default function Home({ brand }: { brand: BrandKey }) {
  const { live } = useCart()
  const cfg = BRANDS[brand]
  // Products currently in the live pool for this brand.
  const products = live.products.filter((p) => p.brand === brand)
  const featured = products[0]
  const brandPath = cfg.path

  const seo: Record<BrandKey, { title: string; description: string }> = {
    ascend: {
      title: "ASCEND — Looksmaxxing Tools for Men: Height, Frame, Jaw, Hair",
      description:
        "Four precision looksmaxxing tools for men — height-boosting insoles, shoulder pads, a jawline exerciser, and a scalp massager. Discreet by design, free tracked shipping.",
    },
    glowup: {
      title: "glowup — Beauty Tools, No Chemicals: Ice Facials, Scalp Rituals, Lashes",
      description:
        "Five viral beauty tools for women — ice roller + gua sha, scalp massager brush, heated lash curler, lash applicator kit, and acetate claw clips. Tools only, zero chemicals, free tracked shipping.",
    },
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title={seo[brand].title}
        description={seo[brand].description}
        path={brandPath}
      />
      <TopBar />
      <CartDrawer />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-14 border-b hairline">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2">
          <div className="px-5 py-20 lg:py-32 flex flex-col justify-center">
            <p className="font-mono2 text-[11px] tracking-[0.35em] text-gold mb-6">
              {cfg.heroKicker}
            </p>
            <h1 className="font-display text-white text-[clamp(4rem,11vw,9rem)] leading-[0.9]">
              {cfg.heroTitle[0]}
              <br />
              <span className="text-gold">{cfg.heroAccent}</span>
            </h1>
            <p className="mt-8 max-w-md text-neutral-400 leading-relaxed">
              {cfg.heroSub}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`${brandPath}/#catalog`}
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
                className="bg-gold text-black font-mono2 text-xs tracking-[0.3em] px-8 py-4 hover:bg-[#c5a878] transition-colors"
              >
                {cfg.ctaLabel}
              </a>
              <Link
                to={`${brandPath}/roadmap`}
                className="border hairline-strong text-white font-mono2 text-xs tracking-[0.3em] px-8 py-4 hover:border-gold hover:text-gold transition-colors"
              >
                {brand === "glowup" ? "THE BEAUTY RITUAL →" : "THE ROADMAP →"}
              </Link>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-px bg-white/10 border hairline max-w-md">
              {[
                ["FREE", "TRACKED SHIPPING"],
                ["STRIPE", "SECURE CHECKOUT"],
                ["7–15", "DAY DELIVERY"],
              ].map(([big, small]) => (
                <div key={small} className="bg-[#0a0a0a] px-4 py-4">
                  <div className="font-display text-xl text-white">{big}</div>
                  <div className="font-mono2 text-[9px] tracking-[0.2em] text-neutral-500 mt-1">
                    {small}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {featured && (
            <div className="hidden lg:flex items-center justify-center border-l hairline relative min-h-[560px] bg-[#111]">
              <img
                src={featured.images[0]}
                alt={featured.imageAlts[0] ?? featured.title}
                className="w-full h-full object-cover absolute inset-0"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute bottom-6 left-6 bg-[#0a0a0a] border hairline px-5 py-4">
                <div className="font-mono2 text-[10px] tracking-[0.25em] text-gold">
                  FLAGSHIP
                </div>
                <div className="font-display text-2xl text-white mt-1">
                  {featured.shortName}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Catalog ──────────────────────────────────────── */}
      <section id="catalog" className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between mb-10 border-b hairline pb-6">
          <h2 className="font-display text-5xl text-white">THE SYSTEM</h2>
          <span className="font-mono2 text-[11px] tracking-[0.25em] text-neutral-500">
            {products.length} INSTRUMENTS
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <ProductCard key={p.handle} product={p} index={i} brand={brand} />
          ))}
        </div>
      </section>

      {/* ── Ethos ────────────────────────────────────────── */}
      <section id="ethos" className="border-t hairline">
        <div className="mx-auto max-w-7xl px-5 py-24 grid md:grid-cols-3 gap-px bg-white/10 border-y hairline">
          {[
            [
              "01 / MEASURED",
              "Each tool exists because it moves something you can see — height, width, definition, texture. Nothing else made the cut.",
            ],
            [
              "02 / DISCREET",
              "No logos, no noise. The work is invisible; the result is not.",
            ],
            [
              "03 / CONSISTENT",
              `${brand === "glowup" ? "A few minutes a day" : "Ten minutes a day, every day"}. Small inputs, compounded over months.`,
            ],
          ].map(([title, body]) => (
            <div key={title} className="bg-[#0a0a0a] px-8 py-12">
              <div className="font-mono2 text-[11px] tracking-[0.3em] text-gold">
                {title}
              </div>
              <p className="mt-4 text-neutral-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter brand={brand} />
    </div>
  )
}
