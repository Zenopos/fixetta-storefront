import TopBar from "@/components/TopBar"
import CartDrawer from "@/components/CartDrawer"
import Seo from "@/lib/seo"
import { useCart } from "@/store/CartContext"
import type { StoreProduct } from "@/lib/catalog"

const ROLE: Record<string, string> = {
  "height-insole-system": "Height insole",
  "frame-shoulder-inserts": "Shoulder insert",
  "jaw-forge-trainer-kit": "Jaw trainer",
  "apex-scalp-massager": "Scalp massager",
}

const byHandle = (list: StoreProduct[], h: string) => list.find((p) => p.handle === h)

/**
 * ASCEND — men's FIX-ETA TIMELINE / roadmap (owner-approved):
 * design-mockups/ascend-roadmap-mockup.html. Acid-lime surgical system,
 * Oswald + Space Mono, copy reused from the approved mockup (honest
 * compliant framing, no re-research). Real frozen UGC imagery.
 */
export default function AscendRoadmap() {
  const { live } = useCart()
  const products = live.products.filter((p) => p.brand === "ascend")
  const lift = byHandle(products, "height-insole-system")

  const go =
    (id: string) =>
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

  return (
    <div className="roadmap-ascend pt-14">
      <Seo
        title="ASCEND Roadmap — The Men's FIX-ETA Timeline | FIXETTA"
        description="The ASCEND fix-eta: height, frame, jawline, and scalp tools mapped across day one to 6–12 months. Progressive resistance, honest compliant timeline, no medical claims."
        path="/ascend/roadmap"
        ogType="article"
      />
      <TopBar />
      <CartDrawer />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="rma-hero">
        <div className="rma-rule-flare"></div>
        <div className="rma-grid">
          <div>
            <span className="rma-eyebrow">ASCEND · PRECISION TOOLS · NO GIMMICKS</span>
            <h1>ASCEND.<br /><em>MORE.</em></h1>
            <p className="rma-sub">
              Four tools for height, frame, jawline, and scalp — the looksmaxxing
              essentials. Discreet by design, honest in price, shipped tracked to
              your door.
            </p>
            <div className="rma-cta-row">
              <button className="rma-btn-primary" onClick={go("rma-shop")}>Shop the system ↓</button>
              <button className="rma-btn-ghost" onClick={go("rma-timeline")}>See the timeline →</button>
            </div>
            <div className="rma-facts">
              <div className="rma-f"><div className="rma-n">0</div><div className="rma-l">Pills</div></div>
              <div className="rma-f"><div className="rma-n">4</div><div className="rma-l">Tools</div></div>
              <div className="rma-f"><div className="rma-n">10</div><div className="rma-l">min / day</div></div>
              <div className="rma-f"><div className="rma-n">US</div><div className="rma-l">Shipped</div></div>
            </div>
          </div>
          <div className="rma-media-panel">
            {lift && (
              <img src={lift.images[0]} alt={lift.imageAlts[0] ?? lift.title} loading="eager" />
            )}
            <div className="rma-cap">+1.5in · invisible · the lift works standing up</div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT STRIP — THE FOUR TOOLS ───────────────────────── */}
      <section id="rma-shop" className="rma-strip">
        <div className="rma-inner">
          {products.map((p, i) => (
            <div key={p.handle} className="rma-tool">
              <span className="rma-who">{String(i + 1).padStart(2, "0")}</span>
              <span className="rma-what">{p.shortName}<br />{ROLE[p.handle]}</span>
            </div>
          ))}
        </div>
        <div className="rma-trail"></div>
      </section>

      {/* ── THE FIXETA TIMELINE ──────────────────────────────────── */}
      <section id="rma-timeline" className="rma-timeline">
        <div className="rma-head">
          <span className="rma-kicker">★ THE FIXETA VALUE LINE</span>
          <h2>You don't buy a gadget.<br />You run a <em>fix-eta.</em></h2>
          <p>
            Same value line as the rest of FIXETTA — but built for the men's
            maxim: small, physical, daily reps you can actually keep. No pills,
            no serums, no miracle copy. Here's what showing up every day
            honestly compounds into.
          </p>
        </div>

        <div className="rma-line-rule">
          <span className="rma-rail"></span>
          <span className="rma-tag rma-tag-lime" style={{ margin: "0 14px" }}>DAY 1 ▸ YOU SHOW UP</span>
          <span className="rma-rail"></span>
        </div>

        <div className="rma-horizon">
          <div className="rma-hcard rma-lift">
            <span className="rma-when">Now — day one</span>
            <span className="rma-where">Elevation · the moment you stand</span>
            <p className="rma-body">Height is the only one that's instant. Slip the cup on, stand up, <b>+1.5in</b> — nobody sees, everybody notices. The jaw trainer starts tonight too: 5–10 minutes, 40lb, chew slow and even. First payoff is <em>feeling</em> — you walked taller.</p>
            <div className="rma-mood">↪ The hook: one visible win tonight.</div>
            <div className="rma-foot">LIFT · EDGE · TONIGHT</div>
          </div>
          <div className="rma-hcard rma-frame">
            <span className="rma-when">30 days</span>
            <span className="rma-where">Frame · elevation · recovery</span>
            <p className="rma-body">The habit has taken root. Shoulder inserts dress your line out of the box each morning, the insole is just your walk now, and you've rested one day a week so the jaw muscle started <b>building on recovery days</b>. Posture reads different without you prompting it.</p>
            <div className="rma-mood">↪ The habit is the product now.</div>
            <div className="rma-foot">CONSISTENCY &gt; intensity</div>
          </div>
          <div className="rma-hcard rma-edge">
            <span className="rma-when">90 days</span>
            <span className="rma-where">Jaw · technique · scalp</span>
            <p className="rma-body">Two to three weeks in you moved 40→50lb; when that felt easy, 60. Masseter volume and definition come from exactly this — <b>progressive resistance, not willpower</b>. Scalp work is a two-minute daily ritual. You've stopped forcing it; it's your thing now.</p>
            <div className="rma-mood">↪ Visible ease, honest gains.</div>
            <div className="rma-foot">PROGRESSIVE LOAD · NATURAL-BODY</div>
          </div>
          <div className="rma-hcard rma-apex">
            <span className="rma-when">6–12 months</span>
            <span className="rma-where">The whole system</span>
            <p className="rma-body">A year out you don't think "routine" — you just have one. That's the quiet compounding: not one dramatic flip, but a baseline that reads different in the mirror and the doorway. The tools are the least interesting part. <em>You</em> are.</p>
            <div className="rma-mood">↪ Maintenance mode, on autopilot.</div>
            <div className="rma-foot">THE ACTUAL ENDPOINT</div>
          </div>
        </div>

        <div className="rma-tline-cta">
          <button className="rma-btn-primary" onClick={go("rma-shop")}>Run your own timeline →</button>
          <p className="rma-rubric" style={{ marginTop: 12 }}>
            Honest framing: cosmetic tools that support consistent self-care.
            Height works standing up; jaw definition requires progressive use
            over months and varies by individual anatomy. We make no medical,
            bone-structure, or "cure" claims. Tools are habits, not guarantees.
          </p>
        </div>
      </section>

      {/* ── THE CODE / HONEST LINE ───────────────────────────────── */}
      <section className="rma-ethos">
        <div className="rma-inner">
          <div>
            <span className="rma-kicker">THE ASCEND CODE</span>
            <div className="rma-h2">Physical tools.<br />Honest claims.</div>
            <p className="rma-lead">
              Looksmaxxing isn't a pill or a serum — it's a set of physical
              habits you can keep. We sell the tools, show the real protocol,
              and stay out of fake-apothecary territory.
            </p>
          </div>
          <div className="rma-list">
            <div className="rma-i"><div className="rma-no">01</div><div><h3>No pills. No serums.</h3><p>The whole line is hardware you hold in your hand — nothing to ingest, nothing to smear on.</p></div></div>
            <div className="rma-i"><div className="rma-no">02</div><div><h3>Progressive, not magical.</h3><p>Jaw definition and scalp change are slow, muscle-driven processes. We say the real timeline, not a 7-day miracle.</p></div></div>
            <div className="rma-i"><div className="rma-no">03</div><div><h3>Discreet by design.</h3><p>Lift, frame, edge — none of it reads on camera or at eye level. The edge is yours to keep.</p></div></div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="rma-foot">
        <div className="rma-inner">
          <div className="rma-mark">ASCEND<span className="rma-sm">a FIXETTA brand · precision tools</span></div>
          <div
            className="rma-legal"
            style={{ gridColumn: "1/-1", fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: 30 }}
          >
            ASCEND / FIXETTA — cosmetic self-care tools (height insoles,
            shoulder inserts, jaw trainers, scalp massagers). These are physical
            tools that support consistent grooming and self-care; they are not
            medical devices, supplements, or treatments, and we make no medical,
            bone-structure, hair-growth, or cure claims. Individual results vary
            with anatomy, routine, and consistency. © 2026 FIXETTA.
          </div>
        </div>
      </footer>
    </div>
  )
}