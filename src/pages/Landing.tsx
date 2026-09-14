import { Link } from "react-router"
import Seo from "@/lib/seo"
import { BRANDS } from "@/lib/catalog"
import type { BrandKey } from "@/lib/catalog"

type LandingCardProps = {
  key: BrandKey
  name: string
  kicker: string
  blurb: string
  href: string
  accentClass: string
}

const CARDS: LandingCardProps[] = [
  {
    key: "ascend",
    name: BRANDS.ascend.wordmark,
    kicker: "MEN'S LOOKSMAXXING",
    blurb:
      "Height, frame, jawline, and scalp — four precision tools built to compound. Discreet by design, honest in price.",
    href: "/ascend",
    accentClass: "text-gold",
  },
  {
    key: "glowup",
    name: BRANDS.glowup.wordmark,
    kicker: "WOMEN'S BEAUTY TOOLS",
    blurb:
      "Ice facials, scalp rituals, lash tools, lash applicator tools, and hair clips — five viral beauty tools, no chemicals, priced honest.",
    href: "/glowup",
    accentClass: "text-glowup",
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title="FIXETTA — Two Stores, One Promise: Tools That Work"
        description="FIXETTA runs ASCEND — men's looksmaxxing tools for height, frame, jawline, grooming, and scalp — and glowup, women's beauty tools for hair, skin, lashes, and body. Physical tools only, no chemicals, free tracked shipping."
        path="/"
      />

      <section className="pt-14 border-b hairline">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:py-32 text-center">
          <p className="font-mono2 text-[11px] tracking-[0.35em] text-gold mb-6">
            FIXETTA · TOOLS THAT WORK
          </p>
          <h1 className="font-display text-white text-[clamp(3.5rem,9vw,8rem)] leading-[0.9]">
            ONE FAMILY,
            <br />
            <span className="text-gold">TWO SHOPS.</span>
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-neutral-400 leading-relaxed">
            Physical tools only — no pills, no serums, no chemicals. Pick your
            ritual: the men's looksmaxxing system or the women's beauty
            toolkit. One cart, one checkout, one promise.
          </p>
          <div className="mt-14 grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {CARDS.map((card) => (
              <Link
                key={card.key}
                to={card.href}
                className="group border hairline bg-[#0d0d0d] p-10 text-left hover:border-gold transition-colors"
              >
                <p
                  className={`font-mono2 text-[10px] tracking-[0.3em] ${card.accentClass} mb-4`}
                >
                  {card.kicker}
                </p>
                <h2 className="font-display text-4xl text-white group-hover:text-gold transition-colors">
                  {card.name}
                </h2>
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                  {card.blurb}
                </p>
                <span className="mt-8 inline-block border hairline-strong px-6 py-3 font-mono2 text-[11px] tracking-[0.25em] text-white group-hover:border-gold group-hover:text-gold transition-colors">
                  ENTER SHOP →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
