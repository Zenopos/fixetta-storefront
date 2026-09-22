import { Link } from "react-router"
import TopBar from "@/components/TopBar"
import CartDrawer from "@/components/CartDrawer"
import SiteFooter from "@/components/SiteFooter"
import Seo from "@/lib/seo"

/**
 * glowup — FIX-ETA TIMELINE page (/glowup/roadmap, owner-approved pastel
 * floral expression of the FIXETA value line). Same compliant copy as the
 * glowup home timeline section; rendered as a standalone roadmap page.
 */
export default function GlowupTimeline() {
  return (
    <div className="min-h-screen bg-[var(--c-bg)] pt-14">
      <Seo
        title="The glowup FIX-ETA — A Beauty Habit, Ten Minutes a Day | FIXETTA"
        description="The glowup fix-eta timeline: ice facials, scalp rituals, lash tools, and hair clips mapped across day one to 6–12 months. Tools only, no chemicals, honest outcomes."
        path="/glowup/roadmap"
        ogType="article"
      />
      <TopBar />
      <CartDrawer />

      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="g-pagehero">
        <div className="g-wrap">
          <span className="g-eyebrow" style={{ color: "#c27a99" }}>THE GLOWUP FIX-ETA TIMELINE</span>
          <h1 className="mt-5">THE<br /><em>FIX-ETA.</em></h1>
          <p className="g-sub" style={{ marginTop: 26 }}>
            Five tools, five gentle blocks, a few minutes a day. No chemicals,
            no heat damage, no gimmicks — a beauty ritual for scalp, skin,
            lashes, and hair that compounds over months. This is the glowup way.
          </p>
        </div>
      </section>

      {/* ── THE FIXETA TIMELINE ────────────────────────────────── */}
      <section className="g-timeline" style={{ borderTop: "none" }}>
        <div className="g-head">
          <span className="g-kicker">★ THE FIXETA VALUE LINE</span>
          <h2>This isn't a product.<br />It's a <em>fix-eta.</em></h2>
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
          <Link to="/glowup" className="g-btn-primary">Start your timeline today →</Link>
          <p className="g-rubric">
            Honest framing: seen by most users over consistent use; outcomes
            vary by body, routine and consistency. A tool is a habit, not a
            guarantee — we never claim medical or "cure" results.
          </p>
        </div>
      </section>

      {/* ── ETHOS ──────────────────────────────────────────────── */}
      <section className="g-ethos">
        <span className="g-kicker">THE GLOWUP PROMISE</span>
        <div className="g-h2">Small tools,<br />kept daily.</div>
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