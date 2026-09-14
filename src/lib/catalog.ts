/**
 * FIXETTA static catalog — ALL 9 products across both sub-brands.
 *
 * Two sub-brands live under one storefront, one shared cart:
 *   - /ascend   → ASCEND, men's looksmaxxing toolkit (4 products)
 *   - /glowup → glowup, women's beauty tools (5 products)
 *
 * Used as an instant-loading fallback when the Medusa backend isn't
 * connected (no VITE_MEDUSA_BACKEND_URL), and merged with live data when it is.
 * Prices are integer cents; render with formatMoney().
 *
 * IMAGERY — every product here uses PAID listing/UGC photos. No AI-generated
 * or research images remain. Men's photos live in /images/ascend/*.webp (copied
 * from the paid seller listing shots); women's live in /images/glowup/<slug>/*.png
 * (copied from the paid UGC set). A product must never be added here without a
 * paid photo source.
 */

export type BrandKey = "ascend" | "glowup"

/** Build-time base (import.meta.env.BASE_URL — already includes trailing slash). */
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") + "/"
const IMG = (p: string) => `${BASE}${p.replace(/^\//, "")}`

export type StoreProduct = {
  brand: BrandKey
  handle: string
  title: string
  shortName: string
  tagline: string
  description: string
  /** one per entry in `images` — descriptive alt text for SEO + a11y */
  imageAlts: string[]
  /** "WHY IT WORKS" bullets on the PDP */
  benefits: string[]
  /** "THE PROTOCOL" — numbered daily-use steps on the PDP */
  protocol: string[]
  /** key/value spec rows on the PDP */
  specs: [string, string][]
  price: number // cents
  currency: string
  images: string[]
  aliexpressProductId: string
  /** filled when live backend is connected */
  variantId?: string
  live?: boolean
}

export const ASCEND_IMG = (stem: string) => IMG(`images/ascend/${stem}.webp`)
export const GLOWUP_IMG = (slug: string, stem: string) =>
  IMG(`images/glowup/${slug}/${stem}.png`)

/* ── Women's — glowup (5) ─────────────────────────────────── */

const WOMEN_PRODUCTS: StoreProduct[] = [
  {
    brand: "glowup",
    handle: "ice-roller-guasha-set",
    title: "glowup — Ice Roller + Gua Sha Set",
    shortName: "ICE + GUA SHA",
    tagline: "de-puff and sculpt in 60 seconds",
    description:
      "A freezable silicone ice roller paired with a sculpting gua sha. Roll the chilled ice to calm morning puffiness and eye bags, then glide the sculpting tool along the jaw, neck, and cheekbones to ease tension. A 60-second face reset that needs no products, just cold.",
    imageAlts: [
      "Ice roller and gua sha set on a bathroom counter",
      "Ice roller and gua sha set on a bathroom vanity",
      "Ice roller and gua sha set on a bedroom nightstand",
      "Ice roller set on a kitchen counter",
      "Ice roller and gua sha set on a bedroom dresser",
    ],
    benefits: [
      "Freezable silicone roller holds cold for a whole grooming session",
      "Calms morning puffiness, eye bags, and facial tension on contact",
      "Gua sha glides along the jaw, neck, and cheekbones to ease tension",
      "No products, no clean-up — just water and a freezer",
    ],
    protocol: [
      "Fill the roller with water and freeze for 4+ hours, ideally overnight.",
      "Roll in upward strokes from the center of the face outward, 60 seconds per side.",
      "Glide the gua sha along the jaw and up the neck in outward strokes.",
      "Use on clean, dry skin; rinse and pat residual water dry after each session.",
    ],
    specs: [
      ["USE", "Morning / evening"],
      ["RUNTIME", "60 sec per side"],
      ["INCLUDES", "Ice roller + gua sha"],
      ["CARE", "Rinse + refreeze"],
    ],
    price: 2199,
    currency: "USD",
    images: [
      GLOWUP_IMG("ice-roller-guasha-set", "ice-roller-guasha-set_01_bathroom-counter"),
      GLOWUP_IMG("ice-roller-guasha-set", "ice-roller-guasha-set_02_bathroom"),
      GLOWUP_IMG("ice-roller-guasha-set", "ice-roller-guasha-set_03_bedroom-nightstand"),
      GLOWUP_IMG("ice-roller-guasha-set", "ice-roller-guasha-set_04_kitchen-counter"),
      GLOWUP_IMG("ice-roller-guasha-set", "ice-roller-guasha-set_05_bedroom-dresser"),
    ],
    aliexpressProductId: "1005002817101",
  },
  {
    brand: "glowup",
    handle: "scalp-massager-brush",
    title: "glowup — Scalp Massager Brush",
    shortName: "SCALP BRUSH",
    tagline: "the #hairgrowthhack staple",
    description:
      "A soft-silicone scalp massager brush. It deep-cleans the scalp, exfoliates, and turns every shower into a head spa — a staple of every healthy-hair routine.",
    imageAlts: [
      "Soft-silicone scalp massager brush on a bathroom shelf",
      "Soft-silicone scalp massager brush in a bathroom",
      "Scalp massager brush on a bathroom counter",
      "Scalp massager brush in a bedroom",
      "Scalp massager brush on a kitchen table",
    ],
    benefits: [
      "Soft silicone bristles gently exfoliate and deep-clean the scalp",
      "Stimulates the scalp and turns every wash into a head-spa moment",
      "Splash-proof and easy to rinse clean after each use",
      "Fits in the palm — travel-friendly daily scalp work",
    ],
    protocol: [
      "Wet hair and apply shampoo as usual.",
      "Massage the scalp in small circles with the brush from hairline to crown.",
      "Focus on the front hairline and part lines for an extra-clean feel.",
      "Rinse the brush after every shower and let it air dry.",
    ],
    specs: [
      ["BRISTLES", "Soft silicone"],
      ["USE", "In the shower / dry"],
      ["CARE", "Rinse + air dry"],
      ["ROUTINE", "A few min per wash"],
    ],
    price: 2299,
    currency: "USD",
    images: [
      GLOWUP_IMG("scalp-massager-brush", "scalp-massager-brush_01_bathroom-shelf"),
      GLOWUP_IMG("scalp-massager-brush", "scalp-massager-brush_02_bathroom"),
      GLOWUP_IMG("scalp-massager-brush", "scalp-massager-brush_03_bathroom-counter"),
      GLOWUP_IMG("scalp-massager-brush", "scalp-massager-brush_04_bedroom"),
      GLOWUP_IMG("scalp-massager-brush", "scalp-massager-brush_05_kitchen-table"),
    ],
    aliexpressProductId: "1005002817106",
  },
  {
    brand: "glowup",
    handle: "heated-lash-curler",
    title: "glowup — Heated Lash Curler",
    shortName: "HEATED LASH CURLER",
    tagline: "a 12-hour lift in 10 seconds",
    description:
      "A USB-rechargeable ceramic heated lash curler. Locks in a dramatic curl on even the straightest lashes — no glue, no chemicals, no clamps yanking at your lash line.",
    imageAlts: [
      "Heated lash curler on a bedroom vanity",
      "Heated lash curler in a bathroom",
      "Heated lash curler in a bedroom",
      "Heated lash curler in a car on the go",
      "Heated lash curler on a bedroom dresser",
    ],
    benefits: [
      "Ceramic heating element sets a curl that holds through the day",
      "Works on straight lashes without glue or chemical perms",
      "USB-rechargeable — no batteries, no heat-wait",
      "Gentle on the lash line; no mechanical clamping pressure",
    ],
    protocol: [
      "Charge fully; the ceramic pad warms in seconds when powered on.",
      "Press the warm pad against the base of the lashes and hold 3–5 seconds.",
      "Roll upward slowly, repeating at the base, middle, and tip.",
      "Turn off and store dry; wipe the pad clean between uses.",
    ],
    specs: [
      ["POWER", "USB rechargeable"],
      ["WARM-UP", "A few seconds"],
      ["RESULT", "Holds up to 12h"],
      ["USE", "Clean, product-free lashes"],
    ],
    price: 2499,
    currency: "USD",
    images: [
      GLOWUP_IMG("heated-lash-curler", "heated-lash-curler_01_bedroom-vanity"),
      GLOWUP_IMG("heated-lash-curler", "heated-lash-curler_02_bathroom"),
      GLOWUP_IMG("heated-lash-curler", "heated-lash-curler_03_bedroom"),
      GLOWUP_IMG("heated-lash-curler", "heated-lash-curler_04_car"),
      GLOWUP_IMG("heated-lash-curler", "heated-lash-curler_05_bedroom-dresser"),
    ],
    aliexpressProductId: "1005002817102",
  },
  {
    brand: "glowup",
    handle: "acetate-claw-clip-set",
    title: "glowup — Acetate Claw Clip Set",
    shortName: "CLAW CLIPS",
    tagline: "effortless hair, held all day",
    description:
      "A set of acetate claw clips in soft, dimensional colors. Snag your hair up in seconds for a clean, secure hold that flatters every face — the pull-it-up-and-go accessory of the season.",
    imageAlts: [
      "Acetate claw clip set on a wooden dresser",
      "Acetate claw clip set in a bedroom",
      "Acetate claw clips on a living room couch",
      "Acetate claw clip set on a kitchen counter",
      "Acetate claw clips on a bed",
    ],
    benefits: [
      "Set of acetate claw clips in soft, dimensional colors",
      "Clean, secure all-day hold — up in seconds, no elastic",
      "Flattering on every hair length and face shape",
      "Lightweight, comfortable, and easy to rinse clean",
    ],
    protocol: [
      "Gather hair into a loose ponytail or twist at the nape or crown.",
      "Open the clip wide and clamp it closed over the twist, tines secured.",
      "Adjust height to your comfort — high or low, it stays put.",
      "Remove gently to avoid snags; wipe clips clean between uses.",
    ],
    specs: [
      ["INCLUDES", "Multi-clip acetate set"],
      ["MATERIAL", "Acetate"],
      ["FIT", "One size"],
      ["CARE", "Wipe clean"],
    ],
    price: 1499,
    currency: "USD",
    images: [
      GLOWUP_IMG("acetate-claw-clip-set", "acetate-claw-clip-set_01_wooden-dresser"),
      GLOWUP_IMG("acetate-claw-clip-set", "acetate-claw-clip-set_02_bedroom"),
      GLOWUP_IMG("acetate-claw-clip-set", "acetate-claw-clip-set_03_living-room-couch"),
      GLOWUP_IMG("acetate-claw-clip-set", "acetate-claw-clip-set_04_kitchen-counter"),
      GLOWUP_IMG("acetate-claw-clip-set", "acetate-claw-clip-set_05_bed"),
    ],
    aliexpressProductId: "1005002817109",
  },
  {
    brand: "glowup",
    handle: "lash-applicator-kit",
    title: "glowup — Lash Applicator Kit",
    shortName: "LASH KIT",
    tagline: "precision helpers for the cluster-lash boom",
    description:
      "Soft crescent silicone pads that sit under the eye to shield your lower lashes while you place DIY cluster lashes up top — catching slips and stray glue so your set goes on clean. Tool-only kit, no adhesives included.",
    imageAlts: [
      "Lash applicator kit with clear case and lavender crescent pads on a bedroom vanity",
      "Holding a crescent pad under the eye in front of a bathroom mirror",
      "Fingers bending a flexible lavender under-eye pad in a bedroom",
      "Lash applicator kit and pads on a rumpled bed duvet",
      "Under-eye pads leaning against the clear case by a bathroom counter corner",
    ],
    benefits: [
      "Soft crescent pads shield lower lashes while you place clusters up top",
      "Flexible silicone bends to your eye shape and stays put without adhesive",
      "Reusable and washable — rinse, dry, and ready for the next set",
      "Clear hard case keeps the pads clean in any makeup bag",
    ],
    protocol: [
      "Start with clean, dry under-eyes so the pads grip gently.",
      "Press a crescent pad along the lower lash line to cover the bottom lashes.",
      "Apply your clusters as usual — the pad catches slips and stray glue.",
      "Peel the pad away once the glue sets.",
      "Rinse the pads with mild soap, air-dry, and store in the case.",
    ],
    specs: [
      ["INCLUDES", "Under-eye pads + clear case"],
      ["PADS", "Crescent soft silicone, 2 pairs"],
      ["GLUE", "None — tool-only kit"],
      ["CARE", "Rinse + air dry"],
    ],
    price: 2199,
    currency: "USD",
    images: [
      GLOWUP_IMG("lash-applicator-kit", "lash-applicator-kit_01_bedroom-vanity"),
      GLOWUP_IMG("lash-applicator-kit", "lash-applicator-kit_02_bathroom"),
      GLOWUP_IMG("lash-applicator-kit", "lash-applicator-kit_03_bedroom"),
      GLOWUP_IMG("lash-applicator-kit", "lash-applicator-kit_04_bed"),
      GLOWUP_IMG("lash-applicator-kit", "lash-applicator-kit_05_bathroom-counter-corner"),
    ],
    aliexpressProductId: "1005007504475785",
  },
]

/* ── Men's — ASCEND (4) ─────────────────────────────────── */

const MEN_PRODUCTS: StoreProduct[] = [
  {
    brand: "ascend",
    handle: "height-insole-system",
    title: "ASCEND — Height Insole System",
    shortName: "LIFT",
    tagline: "Extra height nobody can see.",
    description:
      "Translucent silicone heel cups that slip on barefoot and disappear inside any closed shoe, adding discreet height the moment you stand up. Soft perforated gel keeps them breathable; the half-sleeve design stays locked to your heel all day.",
    imageAlts: [
      "Side-by-side before/after of the same man in the same pose standing with and without hidden height insoles, showing added height, labeled BEFORE and AFTER",
      "Translucent pale-pink silicone heel insoles resting on a wooden floor beside a pair of white sneakers",
      "A hand slipping one translucent silicone heel insole over a bare heel on the edge of a bed",
      "Man standing tall in white sneakers holding one translucent heel insole up by his chest",
      "Clean side profile of a bare foot wearing a translucent height insole with added lift",
    ],
    benefits: [
      "Adds about 1.5 inches of real height the second you put them on",
      "Invisible — translucent gel hidden inside any closed shoe",
      "Perforated silicone breathes; soft gel cushions the heel",
      "Half-sleeve design grips the heel — no sliding, no readjusting",
    ],
    protocol: [
      "Stretch the cup over your bare heel, perforated side down.",
      "Pair with a roomier shoe — sneakers and boots swallow them whole.",
      "Give it 2–3 short wears to break in before a full day out.",
      "Rinse with warm water and air dry. That's the whole maintenance.",
    ],
    specs: [
      ["HEIGHT ADDED", "~1.5 in"],
      ["MATERIAL", "Perforated silicone gel"],
      ["FIT", "Stretches to fit"],
      ["CARE", "Rinse + air dry"],
    ],
    price: 2499,
    currency: "USD",
    images: [
      ASCEND_IMG("lift-height-booster-insole-04-before-after"),
      ASCEND_IMG("lift-height-booster-insole-01-hero"),
      ASCEND_IMG("lift-height-booster-insole-02-apply"),
      ASCEND_IMG("lift-height-booster-insole-03-standing"),
      IMG("images/ascend/lift-height-booster-insole-clean-side-profile.jpg"),
    ],
    aliexpressProductId: "height-insole-system",
  },
  {
    brand: "ascend",
    handle: "frame-shoulder-inserts",
    title: "ASCEND — Frame Shoulder Inserts",
    shortName: "FRAME",
    tagline: "A broader line under anything you wear.",
    description:
      "Soft silicone adhesive shoulder pads that stick directly to the shoulder and broaden your frame under tees, button-downs, and jackets. Skin-safe adhesive holds all day and washes clean for reuse.",
    imageAlts: [
      "Side-by-side before/after of the same man in a white tee with and without shoulder pads, showing a clearly broader shoulder line, labeled BEFORE and AFTER",
      "Man in a fitted white tee with invisible shoulder pads broadening his frame, one hand adjusting the collar",
      "Man guiding a light-peach silicone shoulder pad onto his bare shoulder in front of a mirror",
      "Pair of light-peach translucent silicone shoulder pads resting on a linen-covered bed",
    ],
    benefits: [
      "Instantly broadens the shoulder line — the V-taper shortcut",
      "Skin-safe adhesive holds through a full day, then peels off clean",
      "Washable and reusable — rinse, air dry, reapply",
      "Vanish against your skin tone under any opaque top",
    ],
    protocol: [
      "Apply to clean, dry, product-free skin — no moisturizer or oil first.",
      "Center each pad on top of the shoulder, following your natural line.",
      "Dress as normal — anything opaque covers them completely.",
      "Remove slowly from the edge, rinse the adhesive side, and store on the backing film.",
    ],
    specs: [
      ["MATERIAL", "Soft matte silicone"],
      ["ADHESIVE", "Skin-safe, reusable"],
      ["WEAR", "All-day hold"],
      ["CARE", "Rinse + reapply"],
    ],
    price: 2499,
    currency: "USD",
    images: [
      ASCEND_IMG("frame-structure-shoulder-pads-04-before-after"),
      ASCEND_IMG("frame-structure-shoulder-pads-03-on-ugc"),
      ASCEND_IMG("frame-structure-shoulder-pads-02-apply"),
      ASCEND_IMG("frame-structure-shoulder-pads-01-hero"),
    ],
    aliexpressProductId: "frame-shoulder-inserts",
  },
  {
    brand: "ascend",
    handle: "jaw-forge-trainer-kit",
    title: "ASCEND — Jaw Forge Trainer Kit",
    shortName: "EDGE",
    tagline: "Resistance training for your jaw.",
    description:
      "A jawline exerciser kit with three food-grade silicone chew trainers in progressive resistance — 40, 50, and 60 lb — that train the masseter muscles framing the jaw. Pocket-sized, ten minutes a day.",
    imageAlts: [
      "Six silicone jaw trainer chew pieces in white, black and gray laid on a wooden desk",
      "Man chewing a silicone jaw trainer at a home office desk, jaw muscles visibly flexing",
      "A hand holding one rounded silicone jaw trainer chew piece up",
      "Man chewing a silicone jaw trainer in a parked car, jaw flexing",
    ],
    benefits: [
      "Three progressive resistance levels — 40, 50, 60 lb — that scale as you do",
      "Trains the masseter muscles that define the jaw from the front and side",
      "Food-grade silicone: tasteless, durable, easy to clean",
      "Pocket-sized — desk, car, couch. No setup, no excuses",
    ],
    protocol: [
      "Start at 40 lb. 5–10 minutes a day, chewing slowly and evenly on both sides.",
      "Rest one day per week — muscle builds on recovery days, not training days.",
      "Move to 50 lb after 2–3 weeks, then 60 lb when 50 feels easy.",
      "Rinse with warm water and mild soap after each session. Air dry.",
    ],
    specs: [
      ["RESISTANCE", "40 / 50 / 60 lb"],
      ["MATERIAL", "Food-grade silicone"],
      ["SIZE", "Pocket-sized"],
      ["ROUTINE", "5–10 min daily"],
    ],
    price: 2999,
    currency: "USD",
    images: [
      ASCEND_IMG("edge-jawline-exerciser-01-hero"),
      ASCEND_IMG("edge-jawline-exerciser-02-using"),
      ASCEND_IMG("edge-jawline-exerciser-03-inhand"),
      ASCEND_IMG("edge-jawline-exerciser-04-on-the-go"),
    ],
    aliexpressProductId: "jaw-forge-trainer-kit",
  },
  {
    brand: "ascend",
    handle: "apex-scalp-massager",
    title: "ASCEND — Apex Scalp Massager",
    shortName: "APEX",
    tagline: "A better scalp, two minutes at a time.",
    description:
      "A multi-node electric scalp massager with rotating silicone clusters that knead the scalp — dry, or in the shower. Designed to support circulation at the root and a deeper clean than fingers alone. USB rechargeable.",
    imageAlts: [
      "Man using the electric scalp massager in a shampoo-lathered shower, eyes closed, relaxed",
      "Multi-node electric scalp massager with rotating silicone clusters",
      "Electric scalp brush showing the silicone cluster head",
      "Close-up of the electric scalp massager cluster head",
    ],
    benefits: [
      "Rotating silicone clusters knead the scalp like fingertips — without the effort",
      "Shower-safe — use it to work shampoo into a rich lather",
      "Designed to support scalp circulation and a cleaner environment at the root",
      "USB rechargeable — no batteries, no dock, no fuss",
    ],
    protocol: [
      "Two minutes a day. On dry scalp, move slowly in small circles from hairline to crown.",
      "In the shower: apply shampoo, then let the clusters work it into a lather.",
      "Light pressure only — let the rotation do the work.",
      "Rinse the head after shower use. Charge via USB when the motor slows.",
    ],
    specs: [
      ["WATERPROOF", "Shower-safe"],
      ["HEADS", "Silicone clusters"],
      ["POWER", "USB rechargeable"],
      ["ROUTINE", "2 min daily"],
    ],
    price: 2799,
    currency: "USD",
    images: [
      ASCEND_IMG("current-electric-scalp-brush-04-shower-ugc"),
      ASCEND_IMG("current-electric-scalp-brush-1"),
      ASCEND_IMG("current-electric-scalp-brush-2"),
      ASCEND_IMG("current-electric-scalp-brush-3"),
    ],
    aliexpressProductId: "apex-scalp-massager",
  },
]

export const CATALOG: StoreProduct[] = [...WOMEN_PRODUCTS, ...MEN_PRODUCTS]

export const BRANDS: Record<
  BrandKey,
  {
    key: BrandKey
    path: string
    name: string
    wordmark: string
    announcement: string
    heroKicker: string
    heroTitle: string[]
    heroAccent: string
    heroSub: string
    products: StoreProduct[]
    ctaLabel: string
  }
> = {
  glowup: {
    key: "glowup",
    path: "/glowup",
    name: "GLOWUP",
    wordmark: "glowup",
    announcement: "BEAUTY TOOLS, NO CHEMICALS — FREE US SHIPPING OVER $40 — 30-DAY RETURNS",
    heroKicker: "GLOWUP · BEAUTY TOOLS · NO CHEMICALS",
    heroTitle: ["GLOWUP.", "THE RITUAL."],
    heroAccent: "THE RITUAL.",
    heroSub:
      "Viral beauty tools — ice facials, scalp rituals, lash tools, and hair clips — sourced lean and priced honest. Nothing you ingest, nothing you apply. Just tools for your everyday ritual.",
    products: WOMEN_PRODUCTS,
    ctaLabel: "SHOP THE RITUAL ↓",
  },
  ascend: {
    key: "ascend",
    path: "/ascend",
    name: "ASCEND",
    wordmark: "ASCEND",
    announcement: "PRECISION TOOLS — NO PILLS, NO SERUMS — SHIPS FROM US WAREHOUSE",
    heroKicker: "PRECISION TOOLS · NO GIMMICKS",
    heroTitle: ["ASCEND.", "MORE."],
    heroAccent: "MORE.",
    heroSub:
      "Four tools for height, frame, jawline, and scalp — the looksmaxxing essentials. Discreet by design, honest in price, shipped tracked to your door.",
    products: MEN_PRODUCTS,
    ctaLabel: "SHOP THE SYSTEM ↓",
  },
}

export const formatMoney = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)

export const getProduct = (handle: string) => CATALOG.find((p) => p.handle === handle)
export const getBrandProducts = (brand: BrandKey) =>
  CATALOG.filter((p) => p.brand === brand)