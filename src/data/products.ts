export type StoreKey = "beauty" | "maxxed";

export interface Product {
  id: string;               // local id
  medusaHandle: string;     // maps to Medusa product handle when backend is connected
  name: string;
  tagline: string;
  description: string;
  price: number;            // USD sell price
  compareAt?: number;
  image: string;
  category: string;
  viral: number;            // 1-10
  painPoint: number;        // 1-10
  saturation: "Low" | "Low-Medium" | "Medium" | "Medium-High" | "High";
  sourceUrl: string;        // AliExpress sourcing link
  badge?: string;
}

export const BEAUTY_PRODUCTS: Product[] = [
  {
    id: "b1", medusaHandle: "heatless-curl-ritual-set",
    name: "Heatless Curl Ritual Set", tagline: "overnight waves, zero heat",
    description: "Satin curling rod, two scrunchies and a carry bag. Wrap, sleep, wake up to heatless curls — no damage, no effort.",
    price: 24.99, compareAt: 33, image: "/images/heatless-curler.jpg", category: "Hair",
    viral: 9, painPoint: 8, saturation: "High",
    sourceUrl: "https://www.aliexpress.com/item/1005002751935784.html", badge: "Viral",
  },
  {
    id: "b2", medusaHandle: "cryo-ice-face-roller",
    name: "Cryo Ice Face Roller", tagline: "de-puff in 60 seconds",
    description: "Freezable silicone ice mold roller. Fill, freeze, roll — calms morning puffiness, eye bags and tension.",
    price: 21.99, compareAt: 32.99, image: "/images/ice-roller.jpg", category: "Skin Tools",
    viral: 9, painPoint: 8, saturation: "Medium",
    sourceUrl: "https://www.aliexpress.com/item/1005007427723636.html", badge: "Best Seller",
  },
  {
    id: "b3", medusaHandle: "heated-lash-curler",
    name: "Heated Lash Curler", tagline: "a 12-hour lift in 10 seconds",
    description: "USB-rechargeable ceramic heated curler. Locks in a dramatic curl on even the straightest lashes — no glue, no chemicals.",
    price: 24.99, compareAt: 45, image: "/images/heated-lash-curler.jpg", category: "Lash",
    viral: 8, painPoint: 7, saturation: "Low-Medium",
    sourceUrl: "https://www.aliexpress.com/p/wiki/article.html?keywords=aliexpress-heated-eyelashes-curler-usb_1005004220464773", badge: "New",
  },
  {
    id: "b4", medusaHandle: "cloud-satin-bonnet",
    name: "Cloud Satin Bonnet", tagline: "frizz protection while you sleep",
    description: "Double-layer jumbo satin bonnet with tie band. Preserves edges, braids and curls overnight — fits every hair length.",
    price: 21.99, compareAt: 29, image: "/images/satin-bonnet.jpg", category: "Hair",
    viral: 8, painPoint: 9, saturation: "Medium-High",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-double-layer-satin-bonnet.html",
  },
  {
    id: "b5", medusaHandle: "maderoterapia-sculpt-kit",
    name: "Maderoterapia Sculpt Kit", tagline: "the wood-therapy body ritual",
    description: "8-piece beechwood massage set for lymphatic drainage and body sculpting. The spa treatment, at home.",
    price: 34.99, compareAt: 45, image: "/images/wood-therapy.jpg", category: "Body",
    viral: 8, painPoint: 7, saturation: "Low-Medium",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-wood-therapy-massage-tools.html", badge: "Low Saturation",
  },
  {
    id: "b6", medusaHandle: "scalp-ritual-brush-duo",
    name: "Scalp Ritual Brush Duo", tagline: "the #hairgrowthhack staple",
    description: "Two soft-silicone scalp massager brushes. Deep-cleanses, exfoliates and turns every shower into a head spa.",
    price: 22.99, compareAt: 28, image: "/images/scalp-massager-w.jpg", category: "Hair",
    viral: 9, painPoint: 8, saturation: "Medium-High",
    sourceUrl: "https://inbusiness.aliexpress.com/easysale/en/Soft-Silicone-Scalp-Massager",
  },
  {
    id: "b7", medusaHandle: "lash-pro-applicator-kit",
    name: "Lash Pro Applicator Kit", tagline: "salon precision, at home",
    description: "Applicator, tweezers, comb and case — everything for flawless DIY cluster lash application. Tools only, no glue.",
    price: 21.99, compareAt: 27, image: "/images/lash-applicator.jpg", category: "Lash",
    viral: 7, painPoint: 8, saturation: "Low-Medium",
    sourceUrl: "https://www.aliexpress.com/item/1005007504475785.html",
  },
  {
    id: "b8", medusaHandle: "titanium-derma-roller",
    name: "Titanium Derma Roller", tagline: "540 micro-needles, real results",
    description: "0.25–0.5mm titanium micro-needle roller for skin texture and hairline routines. Cosmetic tool — pairs with your own routine.",
    price: 24.99, compareAt: 26, image: "/images/derma-roller.jpg", category: "Skin Tools",
    viral: 7, painPoint: 8, saturation: "High",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-derma-roller-titanium.html",
  },
];

export const MAXXED_PRODUCTS: Product[] = [
  {
    id: "m1", medusaHandle: "height-insole-system",
    name: "Height Insole System", tagline: "+2 inches. invisible.",
    description: "Air-cushion layered height insoles, 1.5–2 inch adjustable lift. Nobody knows. Everybody notices.",
    price: 24.99, compareAt: 37, image: "/images/height-insoles.jpg", category: "Frame",
    viral: 9, painPoint: 10, saturation: "Medium",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-invisible-height-increase-insole.html", badge: "#1 Pain Point",
  },
  {
    id: "m2", medusaHandle: "frame-shoulder-inserts",
    name: "Frame Shoulder Inserts", tagline: "instant V-taper",
    description: "Invisible broad-shoulder pads that sit under any tee or jacket. Wider frame in seconds — no gym required for the illusion.",
    price: 24.99, compareAt: 32, image: "/images/shoulder-pads.jpg", category: "Frame",
    viral: 8, painPoint: 8, saturation: "Low",
    sourceUrl: "https://www.aliexpress.com/item/1005012371111431.html", badge: "Low Saturation",
  },
  {
    id: "m3", medusaHandle: "jaw-forge-trainer-kit",
    name: "Jaw Forge Trainer Kit", tagline: "train the jawline",
    description: "3-resistance silicone jaw exerciser set. Progressive bite training for masseter definition. Usage guidance included.",
    price: 29.99, compareAt: 35, image: "/images/jaw-exerciser.jpg", category: "Face",
    viral: 9, painPoint: 9, saturation: "High",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-jawline-exercise-ball.html", badge: "Viral",
  },
  {
    id: "m4", medusaHandle: "apex-scalp-massager",
    name: "Apex Scalp Massager", tagline: "the hairmaxxing ritual",
    description: "Multi-node electric scalp massager. Stimulates, relaxes, and upgrades the nightly routine — no chemicals, no serums.",
    price: 27.99, compareAt: 45, image: "/images/scalp-massager-m.jpg", category: "Hair",
    viral: 8, painPoint: 8, saturation: "Medium",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-automatic-head-massager.html",
  },
  {
    id: "m5", medusaHandle: "brow-precision-kit",
    name: "Brow Precision Kit", tagline: "straight. thick. clean.",
    description: "Men's eyebrow grooming kit: stencils, razors, scissors and brushes. Barbershop-sharp brows in minutes.",
    price: 26.99, compareAt: 29.95, image: "/images/brow-kit.jpg", category: "Face",
    viral: 7, painPoint: 7, saturation: "Low",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-eyebrow-stencils-kits.html", badge: "Low Saturation",
  },
  {
    id: "m6", medusaHandle: "edge-beard-stencil",
    name: "Edge Beard Stencil", tagline: "barber lines at home",
    description: "Beard shaping template for perfect cheek and neck lines. 30-second edge-ups, zero guesswork.",
    price: 22.99, compareAt: 24.99, image: "/images/beard-stencil.jpg", category: "Grooming",
    viral: 7, painPoint: 8, saturation: "Low-Medium",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-beard-shaping-tool.html",
  },
  {
    id: "m7", medusaHandle: "nose-shaper-clip-set",
    name: "Nose Shaper Clip Set", tagline: "the non-surgical angle",
    description: "3-piece soft silicone nose lift clip set. A viral experiment at an impulse price — realistic expectations, easy returns.",
    price: 22.99, compareAt: 24.99, image: "/images/nose-shaper.jpg", category: "Face",
    viral: 8, painPoint: 7, saturation: "Medium",
    sourceUrl: "https://www.aliexpress.com/w/wholesale-no-pain-nose-shaper.html",
  },
  {
    id: "m8", medusaHandle: "steel-gua-sha-jaw",
    name: "Steel Gua Sha — Jaw Sculpt", tagline: "de-puff. define.",
    description: "Stainless steel gua sha contoured for the jawline. Cold-touch sculpting tool for the morning routine.",
    price: 24.99, compareAt: 28.99, image: "/images/steel-guasha.jpg", category: "Face",
    viral: 8, painPoint: 7, saturation: "Medium",
    sourceUrl: "https://inbusiness.aliexpress.com/easysale/en/Gua-Sha-Stone",
  },
];

export interface StoreConfig {
  key: StoreKey;
  brand: string;
  wordmark: string;
  tagline: string;
  announcement: string;
  heroTitle: string[];
  heroSub: string;
  products: Product[];
}

export const STORES: Record<StoreKey, StoreConfig> = {
  beauty: {
    key: "beauty",
    brand: "VELURE",
    wordmark: "Velure",
    tagline: "beauty tools, no chemicals",
    announcement: "FREE US SHIPPING OVER $40 — TOOLS ONLY, ZERO CHEMICALS — 30-DAY RETURNS",
    heroTitle: ["The ritual,", "minus the chemicals."],
    heroSub: "Viral beauty tools — heatless curls, ice facials, scalp rituals — sourced lean and priced honest. Nothing you ingest, nothing you apply. Just tools.",
    products: BEAUTY_PRODUCTS,
  },
  maxxed: {
    key: "maxxed",
    brand: "MAXXED",
    wordmark: "Maxxed",
    tagline: "looksmaxxing supply co.",
    announcement: "FRAME / FACE / HAIR — NO PILLS, NO SERUMS — SHIPS FROM US WAREHOUSE",
    heroTitle: ["BUILD THE", "BETTER FRAME."],
    heroSub: "Looksmaxxing hardware: jaw trainers, height systems, frame tools. Physical tools only — no supplements, no chemicals, no copes.",
    products: MAXXED_PRODUCTS,
  },
};
