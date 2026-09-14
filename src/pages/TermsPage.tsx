import TopBar from "@/components/TopBar"
import SiteFooter from "@/components/SiteFooter"
import Seo, { SUPPORT_EMAIL } from "@/lib/seo"

const SECTIONS: [string, string][] = [
  [
    "01 / ACCEPTANCE",
    "By using this site or placing an order, you agree to these Terms of Service and our Privacy Policy. If you don’t agree, please don’t use the site. We may update these terms; the version posted here applies at the time of your order.",
  ],
  [
    "02 / PRODUCTS — READ THIS",
    "ASCEND and glowup products are cosmetic and lifestyle tools. They are not medical devices, are not intended to diagnose, treat, cure, or prevent any condition, and nothing on this site is medical advice. Individual results vary — any before/after imagery is illustrative, not a guarantee of outcome. Consult a qualified professional before starting any new physical routine, especially if you have jaw/TMJ issues, scalp or skin conditions, foot or posture problems, or any relevant medical history.",
  ],
  [
    "03 / SAFE USE",
    "Follow the usage instructions on each product page. Start gently, build gradually, and stop immediately if you feel pain, discomfort, dizziness, or irritation. Never exceed recommended session lengths. Keep small parts away from children and pets.",
  ],
  [
    "04 / PRICING & AVAILABILITY",
    "Prices are listed in USD and may change without notice. We may correct pricing or listing errors and cancel orders affected by them, with a full refund. Product images are representative; minor variations in color or finish can occur.",
  ],
  [
    "05 / SHIPPING",
    "Orders ship free with tracking, typically delivered in 7–15 business days. Tracking details are emailed when the order dispatches. Delivery estimates are not guarantees — carrier delays, customs, and remote destinations can add time.",
  ],
  [
    "06 / RETURNS & REFUNDS",
    "30-day money-back guarantee from delivery. Contact us before returning anything so we can issue instructions. Items must be returned in usable condition; for hygiene reasons, used oral-contact items may be ineligible unless defective. Refunds are issued to the original payment method after inspection.",
  ],
  [
    "07 / PAYMENTS",
    "Payments are processed by Stripe. By paying you also agree to Stripe’s terms. We never see or store your card number.",
  ],
  [
    "08 / INTELLECTUAL PROPERTY",
    "All content on this site — copy, imagery, design, the ASCEND and glowup names and marks — is our property or licensed to us. Don’t reproduce it without written permission.",
  ],
  [
    "09 / LIMITATION OF LIABILITY",
    "To the maximum extent permitted by law, FIXETTA is not liable for indirect, incidental, or consequential damages arising from use of the site or products. Our total liability for any claim is capped at the amount you paid for the product giving rise to the claim. Nothing here limits liability that cannot be limited by law.",
  ],
  [
    "10 / GOVERNING LAW & CONTACT",
    `These terms are governed by the laws of the operator’s jurisdiction (updated here at launch). Questions: ${SUPPORT_EMAIL}.`,
  ],
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title="Terms of Service | FIXETTA"
        description="FIXETTA terms of service — product disclaimers, safe use, shipping, 30-day returns, payments, and liability."
        path="/terms"
      />
      <TopBar />

      <div className="pt-14 mx-auto max-w-3xl px-5 py-16">
        <p className="font-mono2 text-[11px] tracking-[0.35em] text-gold mb-6">
          LEGAL
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-white leading-[0.95]">
          TERMS OF
          <br />
          SERVICE<span className="text-gold">.</span>
        </h1>
        <p className="font-mono2 text-[10px] tracking-[0.2em] text-neutral-500 mt-6">
          LAST UPDATED: {new Date().toISOString().slice(0, 10)}
        </p>

        <div className="mt-12 space-y-px">
          {SECTIONS.map(([title, body]) => (
            <section key={title} className="border hairline bg-[#0d0d0d] px-6 py-6">
              <h2 className="font-mono2 text-[11px] tracking-[0.3em] text-gold">
                {title}
              </h2>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                {body}
              </p>
            </section>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
