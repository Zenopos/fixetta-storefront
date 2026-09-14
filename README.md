# FIXETTA — Headless Commerce System

A dual-sub-brand dropshipping storefront running under one app and one domain,
`https://fixetta.com`:

- **Women's — Glamgirl** (`/glamgirl`): beauty tools for hair, skin, lashes, and body.
- **Men's — ASCEND** (`/ascend`): looksmaxxing tools for height, frame, jaw, grooming, and scalp.

Both share the same cart, checkout, payments, and fulfillment — one line item
schema, one Stripe session, one supplier network. The root `/` is a brand
chooser linking into both sub-brands.

- **Backend:** Medusa v2 (headless commerce engine)
- **Payments:** Stripe (Payment Element — cards, Apple Pay, Google Pay, Link)
- **Fulfillment:** automatic AliExpress dropshipping — every paid order is
  placed with the supplier without you touching anything
- **Storefront:** React + Vite + Tailwind, one shared base with two themes

```
┌────────────┐   store API    ┌─────────────┐   order.placed   ┌──────────────────┐
│  React      │ ────────────▶ │  Medusa v2   │ ───────────────▶ │  AliExpress       │
│  Storefront │ ◀──────────── │  + Postgres  │                  │  Open Platform    │
│  (Stripe.js)│  client_secret│  + Stripe    │ ◀────────────── │  (ds.order.*)     │
└────────────┘                └─────────────┘   tracking sync   └──────────────────┘
```

## Quick start

### 1. Infrastructure

```bash
docker compose up -d        # Postgres + Redis
```

### 2. Backend

```bash
cd medusa-backend
cp .env.template .env       # fill in later; defaults work locally
npm install
npm run migrate
npx medusa user -e admin@fixetta.local -p supersecret   # admin login
npm run seed                # creates region, shipping, publishable key, products
npm run dev                 # http://localhost:9000  (admin at /app)
```

The seed script prints a **publishable API key** (`pk_...`) — copy it.

### 3. Storefront

```bash
cd ..
cp .env.example .env        # paste backend URL + publishable key + Stripe pk
npm install
npm run build               # or: npm run dev
```

> Without a `.env`, the storefront runs in **demo mode**: full browsing, cart
> and a simulated checkout — no charges, no supplier orders.

## Going live

### Stripe

1. `medusa-backend/.env` → `STRIPE_API_KEY=sk_live_...`
2. Create a webhook in the Stripe Dashboard pointing at
   `https://<your-backend>/hooks/payment/stripe_stripe`, paste its secret into
   `STRIPE_WEBHOOK_SECRET`.
3. Storefront `.env` → `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...`, rebuild.

Until then use `sk_test_...` / `pk_test_...` and card `4242 4242 4242 4242`.

### AliExpress auto-fulfillment

1. Register at [open.aliexpress.com](https://open.aliexpress.com), create an
   app, and request the Dropshipping APIs (`aliexpress.ds.order.create`,
   `aliexpress.ds.order.get`). Authorize with your **buyer** account to get an
   access token.
2. Fill `ALIEXPRESS_APP_KEY`, `ALIEXPRESS_APP_SECRET`,
   `ALIEXPRESS_ACCESS_TOKEN` in `medusa-backend/.env`.
3. Flip `ALIEXPRESS_MODE=live` and restart the backend.

**Queue mode (default):** with credentials missing or `mode=queue`, every
order's supplier payload (product ids, quantities, full shipping address) is
logged and stored on the fulfillment as `status: "queued"` — review in the
Medusa admin and place orders manually (or via DSers) until your API access
is approved.

**Verify the supplier ids:** the seeded `aliexpress_product_id` values come
from your item URLs. Confirm the exact id/SKU your dropshipping app expects in
the AliExpress Dropshipping Center before going live, and set
`aliexpress_sku_attr` in variant metadata if a listing has multiple variants.

## Project layout

```
.
├── docker-compose.yml          # Postgres + Redis
├── .env.example                # storefront env
├── medusa-backend/             # Medusa v2 backend
└── src/                        # React storefront (Vite)
    ├── lib/catalog.ts          # 16-product catalog (8 per sub-brand) + BRANDS config
    ├── lib/useBrand.ts         # useBrand(): resolve active sub-brand from the route
    ├── lib/medusa.ts           # store API client (live ⇄ demo)
    ├── lib/seo.ts              # <Seo> per-route meta/JSON-LD + SITE_URL (https://fixetta.com)
    ├── data/products.ts        # research source data (16 products, unused by runtime)
    ├── store/CartContext.tsx   # SHARED cart across both sub-brands
    ├── components/             # TopBar, CartDrawer, ProductCard, SiteFooter
    └── pages/                  # Landing (root chooser), Home, Product, Regimen,
                                # Privacy, Terms, Checkout, Confirmation, NotFound
```

## Routing model

React Router 7 (BrowserRouter). Product handes are unique across the whole
catalog, so one shared cart resolves lines regardless of which sub-brand added
them.

```
/                        → Landing (brand chooser: ASCEND / Glamgirl)
/ascend                  → ASCEND men's home (8 products)
/ascend/regimen          → men's looksmaxxing roadmap
/ascend/product/<handle> → ASCEND PDP (Product JSON-LD)
/glamgirl                → Glamgirl women's home (8 products)
/glamgirl/regimen        → women's beauty routine roadmap
/glamgirl/product/<handle> → Glamgirl PDP (Product JSON-LD)
/checkout, /confirmation → shared checkout + confirmation (noindex)
/privacy, /terms         → shared legal pages
```

## SEO & prerendering

`npm run build` runs `tsc -b`, `vite build`, then `scripts/prerender.mjs` —
headless Chrome (puppeteer) visits every route, waits for the app's
`app-rendered` event, and writes real static HTML per route into `dist/`
(e.g. `dist/ascend/product/jaw-forge-trainer-kit/index.html`). Crawlers get
full content + per-route `<title>`, meta description, canonical, OG/Twitter
tags and JSON-LD (`Product` schema on PDPs, `Organization`/`WebSite` in
`index.html`) without executing JavaScript.

- `scripts/prerender.mjs` ROUTES + `public/sitemap.xml` cover all 25 URLs:
  landing, both sub-brand homes + roadmaps + 8 products each, privacy, terms.
- `vite.config.ts` uses `base: "/"` (absolute) — deploy at a domain root.
- `SITE_URL` lives in `src/lib/seo.ts` (`https://fixetta.com`); the domain is
  also baked into `index.html`, `public/sitemap.xml`, and `public/robots.txt`.
- `/checkout` and `/confirmation` ship with `noindex,nofollow`.

## Catalog pricing (research source — verify before going live)

| Sub-brand | Product | Retail |
|---|---|---|
| Glamgirl | Cryo Ice Face Roller | $21.99 |
| Glamgirl | Heated Lash Curler | $24.99 |
| Glamgirl | Cloud Satin Bonnet | $21.99 |
| Glamgirl | Heatless Curl Ritual Set | $24.99 |
| Glamgirl | Maderoterapia Sculpt Kit | $34.99 |
| Glamgirl | Scalp Ritual Brush Duo | $22.99 |
| Glamgirl | Lash Pro Applicator Kit | $21.99 |
| Glamgirl | Titanium Derma Roller | $24.99 |
| ASCEND | Height Insole System | $24.99 |
| ASCEND | Frame Shoulder Inserts | $24.99 |
| ASCEND | Jaw Forge Trainer Kit | $29.99 |
| ASCEND | Apex Scalp Massager | $27.99 |
| ASCEND | Brow Precision Kit | $26.99 |
| ASCEND | Edge Beard Stencil | $22.99 |
| ASCEND | Nose Shaper Clip Set | $22.99 |
| ASCEND | Steel Gua Sha | $24.99 |

Free tracked shipping is priced in. Prices shown are the seeded storefront
retail from the research catalog; a teammate owns Medusa backend bring-up and
seeding — keep the storefront handles in sync with the backend seed.