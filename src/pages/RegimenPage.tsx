import { Link } from "react-router"
import TopBar from "@/components/TopBar"
import CartDrawer from "@/components/CartDrawer"
import SiteFooter from "@/components/SiteFooter"
import Seo from "@/lib/seo"
import { formatMoney, BRANDS, type BrandKey } from "@/lib/catalog"
import { useCart } from "@/store/CartContext"

/* ── Content ─────────────────────────────────────────────── */

type Block = {
  id: string
  kicker: string
  title: string
  body: string
  steps: string[]
  handle: string | null
  cta: string | null
}

const MEN_BLOCKS: Block[] = [
  {
    id: "scalp",
    kicker: "BLOCK 01 · MORNING · 2 MINUTES",
    title: "THICKER-LOOKING HAIR STARTS AT THE SCALP",
    body: "Everything grows from the root. Two minutes of mechanical scalp massage each morning — dry, or in the shower with shampoo — is designed to support circulation where your hair actually lives. It also deep-cleans product buildup that fingers leave behind, so hair sits fuller and healthier-looking.",
    steps: [
      "Dry or in the shower — both work.",
      "Slow small circles, hairline to crown. Two minutes.",
      "Light pressure. Let the rotation do the work.",
    ],
    handle: "apex-scalp-massager",
    cta: "APEX — ELECTRIC SCALP MASSAGER",
  },
  {
    id: "jaw",
    kicker: "BLOCK 02 · ANYWHERE · 5–10 MINUTES",
    title: "HOW TO SHARPEN YOUR JAWLINE: TRAIN IT",
    body: "The masseter is a muscle like any other — it responds to progressive resistance. Start at 40 lb, work up through 50 and 60 over weeks. Ten minutes at your desk or on the couch beats an hour of mewing you’ll never stick to. This is the anchor habit of the whole routine.",
    steps: [
      "Start at 40 lb, chew slowly and evenly on both sides.",
      "5–10 minutes a day, one rest day per week.",
      "Level up when the current resistance feels easy.",
    ],
    handle: "jaw-forge-trainer-kit",
    cta: "EDGE — JAW TRAINER KIT",
  },
  {
    id: "frame",
    kicker: "BLOCK 03 · ALL DAY · ZERO EFFORT",
    title: "LOOK BROADER AND TALLER WHILE YOU LIVE YOUR LIFE",
    body: "Some of the routine trains. Some of it just works while you wear it. Adhesive shoulder inserts widen your frame under anything opaque; silicone heel cups hide inside any closed shoe and quietly add about 1.5 inches. Nobody sees the tools — they just see the proportions.",
    steps: [
      "Shoulder inserts on clean, dry skin before you dress.",
      "Height insoles on bare feet, then into sneakers or boots.",
      "Wash both after wear; they’re reusable for months.",
    ],
    handle: "frame-shoulder-inserts",
    cta: "FRAME + LIFT — INSTANT PROPORTIONS",
  },
  {
    id: "fundamentals",
    kicker: "BLOCK 04 · DAILY · NON-NEGOTIABLE",
    title: "THE FUNDAMENTALS NO TOOL REPLACES",
    body: "The tools compound. The base is boring: sleep 7–9 hours, drink water, stand up straight, keep a haircut fresh, keep skin clean. Looksmaxxing isn’t a purchase — it’s a system run daily. Small inputs, compounded over months, are the entire secret.",
    steps: [
      "Sleep 7–9 hours. Recovery is when change happens.",
      "Water, posture, grooming — every day, not some days.",
      "Run the full system for 90 days before you judge it.",
    ],
    handle: null,
    cta: null,
  },
]

const WOMEN_BLOCKS: Block[] = [
  {
    id: "scalp",
    kicker: "BLOCK 01 · SHOWER · 3 MINUTES",
    title: "HAPPY HAIR STARTS AT THE SCALP",
    body: "Your hair grows from the scalp, so that’s where the ritual begins. A soft silicone brush works shampoo into a real lather, lifts away buildup fingers miss, and turns every wash into a mini head-spa. Three minutes, a few times a week — the rest of your routine builds on a clean root.",
    steps: [
      "Apply shampoo as usual, then bring in the brush.",
      "Massage in small circles, hairline to crown.",
      "Rinse the brush after every shower and air dry.",
    ],
    handle: "scalp-massager-brush",
    cta: "SCALP MASSAGER BRUSH",
  },
  {
    id: "skin",
    kicker: "BLOCK 02 · MORNING · 2 MINUTES",
    title: "DE-PUFF AND SCULPT BEFORE YOUR PRODUCTS",
    body: "Cold and stone work before anything you apply. A cryo ice roller calms morning puffiness and eye bags in about a minute; a sculpting gua sha glides along the jaw and neck to ease tension. Tools first, then your usual routine — they’re the perfect primer.",
    steps: [
      "Roll the ice roller in upward strokes, 60 seconds per side.",
      "Glide the gua sha along the jaw and up the neck.",
      "Follow with your own serum or moisturizer.",
    ],
    handle: "ice-roller-guasha-set",
    cta: "ICE ROLLER + GUA SHA",
  },
  {
    id: "lashes",
    kicker: "BLOCK 03 · AS NEEDED · 10 MINUTES",
    title: "SALON LASHES, ON YOUR OWN SCHEDULE",
    body: "The finishing detail. A heated curler locks in a lift on even the straightest lashes — no glue, no perms — and it does the work while you stay in control. A few delicate seconds at the base, a roll upward, and the curl holds the day.",
    steps: [
      "Press the warm ceramic pad at the lash base, hold 3–5 seconds.",
      "Roll upward slowly; curl lasts the day.",
      "Store dry; wipe the pad clean between uses.",
    ],
    handle: "heated-lash-curler",
    cta: "HEATED LASH CURLER",
  },
  {
    id: "lash-app",
    kicker: "BLOCK 04 · AS NEEDED · 10 MINUTES",
    title: "CLUSTER LASHES, WITHOUT THE MESS",
    body: "The precision helpers for the DIY cluster-lash boom. Soft crescent pads sit under the eye to shield your lower lashes while you place clusters up top — catching slips and stray glue so your set goes on clean. Tool-only: no adhesives included, use the bond you already trust.",
    steps: [
      "Press a crescent pad along the lower lash line to cover the bottom lashes.",
      "Apply your clusters as usual — the pad catches slips and stray glue.",
      "Peel the pad away once the glue sets; rinse and air-dry the pads.",
    ],
    handle: "lash-applicator-kit",
    cta: "LASH APPLICATOR KIT",
  },
  {
    id: "accessory",
    kicker: "BLOCK 05 · AS NEEDED · 30 SECONDS",
    title: "THE EFFORTLESS FINISH: CLIP IT UP",
    body: "Not every day is a wash-and-style day. Acetate claw clips pull hair up in seconds with a clean, secure hold that flatters every face — the pulled-together look that takes no time at all. The accessory that finishes the ritual.",
    steps: [
      "Twist or gather hair at the nape or crown.",
      "Clamp the clip closed over the twist, tines secured.",
      "Adjust height to your comfort — it stays put all day.",
    ],
    handle: "acetate-claw-clip-set",
    cta: "ACETATE CLAW CLIP SET",
  },
  {
    id: "foundation",
    kicker: "BLOCK 06 · DAILY · NON-NEGOTIABLE",
    title: "THE FOUNDATION NO TOOL REPLACES",
    body: "The tools compound; the base is boring and mandatory. Sleep 7–9 hours, drink water, protect your hair and skin, and stay consistent. A ritual run daily beats a spa day run rarely. Small inputs, compounded over months, are the entire secret.",
    steps: [
      "Sleep 7–9 hours. Recovery is when change happens.",
      "Water, SPF on skin, protective styles for hair — every day.",
      "Run the full ritual for 90 days before you judge it.",
    ],
    handle: null,
    cta: null,
  },
]

const CONTENT: Record<BrandKey, { blocks: Block[]; week: [string, string][] }> = {
  ascend: {
    blocks: MEN_BLOCKS,
    week: [
      ["MON–FRI", "Full system — all four blocks, every day"],
      ["SAT", "Full system + take a progress photo (same light, same spot)"],
      ["SUN", "Rest day for EDGE — everything else runs as normal"],
    ],
  },
  glowup: {
    blocks: WOMEN_BLOCKS,
    week: [
      ["MON–WED", "Full ritual — scalp, skin, lashes, accessories"],
      ["THU–SAT", "Ritual without the lash block, plus a self-care evening"],
      ["SUN", "Full ritual + take a progress photo (same light, same spot)"],
    ],
  },
}

const SEO_META: Record<
  BrandKey,
  { title: string; description: string; kicker: string; heading: string }
> = {
  ascend: {
    title: "ASCEND Roadmap — The Men’s Daily Looksmaxxing Routine | FIXETTA",
    description:
      "The complete ASCEND looksmaxxing roadmap for men: scalp care for thicker-looking hair, jawline training, and discreet tools for a broader frame and about 1.5 inches of height. Phases and progressions, 20 minutes a day, compounded.",
    kicker: "THE ASCEND LOOKSMAXXING ROADMAP",
    heading: "ROADMAP.",
  },
  glowup: {
    title: "The glowup Ritual — A Daily Beauty Routine, No Chemicals | FIXETTA",
    description:
      "The complete glowup roadmap for women: scalp care for healthy hair, cryo de-puffing and sculpting, salon lashes at home, and effortless hair clips. A daily glowup routine with tools only — no chemicals, no damage, a few minutes a day, compounded.",
    kicker: "THE GLOWUP ROADMAP",
    heading: "ROADMAP.",
  },
}

export default function RegimenPage({ brand }: { brand: BrandKey }) {
  const { live } = useCart()
  const brandPath = BRANDS[brand].path
  const { blocks, week } = CONTENT[brand]
  const meta = SEO_META[brand]
  const byHandle = (h: string) => live.products.find((p) => p.handle === h)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title={meta.title}
        description={meta.description}
        path={`${brandPath}/roadmap`}
        ogType="article"
      />
      <TopBar />
      <CartDrawer />

      <section className="pt-14 border-b hairline">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <p className="font-mono2 text-[11px] tracking-[0.35em] text-gold mb-6">
            {meta.kicker}
          </p>
          <h1 className="font-display text-white text-[clamp(3.5rem,9vw,7rem)] leading-[0.9]">
            THE
            <br />
            {meta.heading}
          </h1>
          <p className="mt-8 max-w-xl text-neutral-400 leading-relaxed">
            {brand === "ascend"
              ? "Four tools, four daily blocks, roughly twenty minutes. No gimmicks — a system for jawline, hair, frame, and height that compounds over months. This is the exact protocol we built ASCEND around."
              : "Five tools, five gentle blocks, a few minutes a day. No chemicals, no heat damage, no gimmicks — a beauty ritual for scalp, skin, lashes, and hair that compounds over months. This is the glowup way."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 space-y-16">
        {blocks.map((block) => {
          const product = block.handle ? byHandle(block.handle) : undefined
          return (
            <article key={block.id} className="grid lg:grid-cols-2 border hairline">
              <div className="px-8 py-10 lg:py-14">
                <p className="font-mono2 text-[11px] tracking-[0.3em] text-gold">
                  {block.kicker}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl text-white mt-4 leading-tight">
                  {block.title}
                </h2>
                <p className="mt-5 text-neutral-400 leading-relaxed">
                  {block.body}
                </p>
                <ol className="mt-6 space-y-2">
                  {block.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-neutral-300">
                      <span className="font-mono2 text-[10px] text-gold mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                {product && block.cta && (
                  <Link
                    to={`${brandPath}/product/${product.handle}`}
                    className="mt-8 inline-block bg-gold text-black font-mono2 text-[11px] tracking-[0.25em] px-6 py-3 hover:bg-[#c5a878] transition-colors"
                  >
                    {block.cta} — {formatMoney(product.price)} →
                  </Link>
                )}
              </div>
              {product && (
                <Link
                  to={`${brandPath}/product/${product.handle}`}
                  className="relative block border-t lg:border-t-0 lg:border-l hairline bg-[#111] min-h-[320px]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.imageAlts[0] ?? product.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </Link>
              )}
            </article>
          )
        })}
      </section>

      <section className="border-t hairline">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="font-display text-4xl text-white mb-10">
            THE WEEK<span className="text-gold">.</span>
          </h2>
          <div className="max-w-2xl space-y-px">
            {week.map(([day, plan]) => (
              <div
                key={day}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 border hairline bg-[#0d0d0d] px-6 py-4"
              >
                <span className="font-mono2 text-[11px] tracking-[0.25em] text-gold w-24 shrink-0">
                  {day}
                </span>
                <span className="text-sm text-neutral-300">{plan}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-xl text-sm text-neutral-500 leading-relaxed">
            Consistency beats intensity. Miss a day, run it the next. The people
            who change are the ones still running the routine at day 90.
          </p>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            START DAY ONE<span className="text-gold">.</span>
          </h2>
          <Link
            to={brandPath}
            className="mt-8 inline-block bg-gold text-black font-mono2 text-xs tracking-[0.3em] px-8 py-4 hover:bg-[#c5a878] transition-colors"
          >
            {brand === "ascend" ? "SHOP THE FULL SYSTEM →" : "SHOP THE FULL RITUAL →"}
          </Link>
        </div>
      </section>

      <SiteFooter brand={brand} />
    </div>
  )
}