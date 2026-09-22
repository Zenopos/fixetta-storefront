import { Link } from "react-router"
import TopBar from "@/components/TopBar"
import CartDrawer from "@/components/CartDrawer"
import SiteFooter from "@/components/SiteFooter"
import Seo from "@/lib/seo"
import { useCart } from "@/store/CartContext"
import { formatMoney } from "@/lib/catalog"

/**
 * glowup — pastel floral home (owner-approved):
 * design-mockups/glowup-pastel-mockup.html rendered for the real catalog.
 * UGC product photos are frozen real files; prices come from catalog.ts.
 */
export default function GlowupHome() {
  const { live, addItem } = useCart()
  const products = live.products.filter((p) => p.brand === "glowup")

  return (
    <div className="min-h-screen bg-[var(--c-bg)] pt-14">
      <Seo
        title="glowup — Beauty Tools, No Chemicals: Ice Facials, Scalp Rituals, Lashes"
        description="Five viral beauty tools for women — ice roller + gua sha, scalp massager brush, heated lash curler, lash applicator kit, and acetate claw clips. Tools only, zero chemicals, free tracked shipping."
        path="/glowup"
      />
      <TopBar />
      <CartDrawer />

      {/* ── HERO (asymmetric editorial, photography-led) ─────────────── */}
      <section className="g-hero">
        <div className="g-grid">
          <div>
            <span className="g-eyebrow">GLOWUP · BEAUTY TOOLS · NO CHEMICALS</span>
            <h1>
              Your daily<br/>ritual, <em>blooming.</em>
            </h1>
            <p className="g-sub">
              Viral beauty tools — ice facials, scalp rituals, lash tools, hair
              clips. Nothing you swallow, nothing you apply. Just small, honest
              tools that turn five minutes a day into a ritual your future self
              feels.
            </p>
            <div className="g-cta-row">
              <a href="#g-catalog" onClick={(e) => { e.preventDefault(); document.getElementById("g-catalog")?.scrollIntoView({ behavior: "smooth" }) }} className="g-btn-primary">Shop the ritual ↓</a>
              <a href="#g-timeline" onClick={(e) => { e.preventDefault(); document.getElementById("g-timeline")?.scrollIntoView({ behavior: "smooth" }) }} className="g-btn-ghost">See the timeline →</a>
            </div>
            <div className="g-facts">
              <div className="g-f"><div className="g-n">0</div><div className="g-l">Chemicals</div></div>
              <div className="g-f"><div className="g-n">5</div><div className="g-l">Tools</div></div>
              <div className="g-f"><div className="g-n">5+</div><div className="g-l">min / day</div></div>
              <div className="g-f"><div className="g-n">30</div><div className="g-l">Day return</div></div>
            </div>
          </div>
          <div className="g-media-panel">
            <span className="g-flourish">✿</span>
            {products[0] && (
              <img src={products[0].images[0]} alt={products[0].imageAlts[0] ?? products[0].title} />
            )}
            <div className="g-cap">the 60-second face reset — chilled roller + sculpting gua sha</div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID · THE COLLECTION ───────────────────────────── */}
      <section id="g-catalog" className="g-shop">
        <div className="g-head">
          <div>
            <span className="g-eyebrow g-eyebrow-lilac">THE COLLECTION</span>
            <h2>Five tools.<br/>One ritual.</h2>
          </div>
          <span className="g-idx">05 INSTRUMENTS / ONE CART</span>
        </div>
        <div className="g-grid-products">
          {products.map((p, i) => (
            <article key={p.handle} className={`g-goods ${i === 0 ? "g-featured" : ""}`}>
              <Link to={`/glowup/product/${p.handle}`} className="g-imgwrap">
                <div className="g-imgbox">
                  <img src={p.images[0]} alt={p.imageAlts[0] ?? p.title} loading="lazy" />
                </div>
                <span className="g-no">{String(i + 1).padStart(2, "0")}</span>
              </Link>
              <div className="g-info">
                <div className="g-row">
                  <Link to={`/glowup/product/${p.handle}`} className="g-nm">{p.shortName}</Link>
                  <span className="g-price">{formatMoney(p.price)}</span>
                </div>
                <p className="g-tl">{p.tagline}</p>
                <button onClick={() => addItem(p.handle)} className="g-add">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── THE FIXETA TIMELINE ─────────────────────────────────────── */}
      <section id="g-timeline" className="g-timeline">
        <div className="g-head">
          <span className="g-kicker">★ THE FIXETA VALUE LINE</span>
          <h2>This isn't a product.<br/>It's a <em>fix-eta.</em></h2>
          <p>
            Every tool here is a small, daily rep you can keep. Gather them up,
            and you're not buying a gadget — you're starting a quiet, compounding
            habit. Here's what five minutes a day honestly looks like, up close.
            No miracles, just the momentum of showing up.
          </p>
        </div>

        <div className="g-line-rule">
          <span className="g-rail"></span>
          <span className="g-tag g-tag-violet" style={{ margin: "0 14px" }}>DAY 1 ▸ YOU SHOW UP</span>
          <span className="g-rail"></span>
        </div>

        <div className="g-horizon">
          <div className="g-hcard g-lilac">
            <span className="g-when">Now — day one</span>
            <span className="g-where">Every tool</span>
            <p className="g-body">It feels good the first time you use it. Cold on puffy skin, kneading fingers on a tired scalp, a curl that holds. The first payoff is <em>feeling</em> — and that's what gets you to tomorrow.</p>
            <div className="g-mood">↪ The hook: it should feel good tonight.</div>
            <div className="g-foot">SCALP · SKIN · LASH · HAIR</div>
          </div>
          <div className="g-hcard g-petal">
            <span className="g-when">30 days</span>
            <span className="g-where">Scalp · skin</span>
            <p className="g-body">A habit has taken root — you reach for it without thinking. Regular scalp work and a gentler cleanse routine can leave hair looking fuller-bodied and skin calmer. You start noticing the <em>before</em> vs. the now.</p>
            <div className="g-mood">↪ The habit is the product now.</div>
            <div className="g-foot">CONSISTENCY &gt; intensity</div>
          </div>
          <div className="g-hcard g-lilac">
            <span className="g-when">90 days</span>
            <span className="g-where">Scalp · skin · tool skill</span>
            <p className="g-body">Two to three months is where kinder routines show their real face — calmer scalp, softer skin, and your technique has sharpened. You've stopped forcing it; it's just your thing now.</p>
            <div className="g-mood">↪ Visible ease, honest gains.</div>
            <div className="g-foot">NATURAL-BODY, NOT HERO CLAIMS</div>
          </div>
          <div className="g-hcard g-petal">
            <span className="g-when">6–12 months</span>
            <span className="g-where">The whole ritual</span>
            <p className="g-body">A year from now you don't think about "doing a routine" — you just have one. That's the quiet compounding: not one dramatic change, but a baseline that's calmer, softer, more yours. The tools are the least interesting part. <em>You</em> are.</p>
            <div className="g-mood">↪ Maintenance mode, on autopilot.</div>
            <div className="g-foot">THE ACTUAL ENDPOINT</div>
          </div>
        </div>

        <div className="g-tline-cta">
          <a href="/glowup/product/ice-roller-guasha-set" onClick={(e) => { e.preventDefault(); document.getElementById("g-catalog")?.scrollIntoView({ behavior: "smooth" }) }} className="g-btn-primary">Start your timeline today →</a>
          <p className="g-rubric">Honest framing: seen by most users over consistent use; outcomes vary by body, routine and consistency. A tool is a habit, not a guarantee — we never claim medical or "cure" results.</p>
        </div>
      </section>

      {/* ── ETHOS ───────────────────────────────────────────────────── */}
      <section className="g-ethos">
        <span className="g-kicker">THE GLOWUP PROMISE</span>
        <div className="g-h2">Small tools,<br/>kept daily.</div>
        <p className="g-lead" style={{ marginTop: 22 }}>
          Nothing you swallow. Nothing you smear on. Just five honest tools that
          meet you where you are — and quietly raise the floor of your day.
        </p>
        <div className="g-cols">
          <div className="g-p"><div className="g-no">01 / GENTLE</div><h3>Ritual, not routine-farm</h3><p>Five minutes, built to be kept — not a 12-step regimen you abandon by Tuesday.</p></div>
          <div className="g-p"><div className="g-no">02 / HONEST</div><h3>Lotions-free results</h3><p>These are physical tools with real upkeep, and we say exactly that. No ingredient lists, no false promises.</p></div>
          <div className="g-p"><div className="g-no">03 / COMPOUNDING</div><h3>You show up, it adds up</h3><p>The value line isn't a marketing frame — it's literally the name: fix-eta. Consistency is the active ingredient.</p></div>
        </div>
      </section>

      <div className="pt-6">
        <SiteFooter brand="glowup" />
      </div>
    </div>
  )
}