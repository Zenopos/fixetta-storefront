import TopBar from "@/components/TopBar"
import SiteFooter from "@/components/SiteFooter"
import Seo, { SUPPORT_EMAIL } from "@/lib/seo"

const SECTIONS: [string, string][] = [
  [
    "01 / OVERVIEW",
    "This Privacy Policy explains what information FIXETTA (“we”, “us”) collects when you use this store and its sub-brands, ASCEND and glowup, why we collect it, and the rights you have over it. By using the site you agree to this policy. If you don’t agree, please don’t use the site.",
  ],
  [
    "02 / WHAT WE COLLECT",
    "Order information: when you check out we collect your name, email address, shipping address, and (optionally) phone number — only what’s needed to process payment and deliver your order. Cart data: your shopping cart is stored in your browser’s localStorage and never leaves your device until you check out. We do not run analytics, advertising pixels, or tracking cookies on this site today.",
  ],
  [
    "03 / PAYMENTS",
    "Payments are processed by Stripe. Your card number and payment credentials go directly to Stripe over an encrypted connection and never touch our servers. Stripe’s use of your data is governed by the Stripe Privacy Policy (stripe.com/privacy).",
  ],
  [
    "04 / FULFILLMENT & SHARING",
    "To deliver your order, your name and shipping address are shared with our fulfillment partners and shipping carriers. We do not sell, rent, or trade your personal information to anyone, for any reason.",
  ],
  [
    "05 / RETENTION",
    "We keep order records for as long as needed to fulfill orders, handle returns and disputes, and meet tax and accounting obligations. Cart data lives in your browser until you clear it.",
  ],
  [
    "06 / SECURITY",
    "The site is served over HTTPS and payment data is handled exclusively by Stripe’s PCI-compliant infrastructure. No method of transmission over the internet is 100% secure, but we limit what we hold to the minimum required to run the store.",
  ],
  [
    "07 / YOUR RIGHTS (GDPR)",
    "If you are in the EEA or UK you have the right to access, correct, export, or erase your personal data, to object to or restrict processing, and to lodge a complaint with your local data protection authority. Email us to exercise any of these rights.",
  ],
  [
    "08 / YOUR RIGHTS (CCPA/CPRA)",
    "If you are a California resident you have the right to know what personal information we collect, to request its deletion, and to not be discriminated against for exercising these rights. We do not sell or share personal information as defined by the CCPA.",
  ],
  [
    "09 / CHILDREN",
    "This store is not directed at children under 13 (or under 16 in the EEA), and we do not knowingly collect their data. If you believe a child has provided us data, contact us and we will delete it.",
  ],
  [
    "10 / INTERNATIONAL TRANSFERS",
    "Orders are fulfilled through an international supplier network, so your shipping details may be processed in countries other than your own. By placing an order you consent to that transfer for the purpose of delivery.",
  ],
  [
    "11 / CHANGES & CONTACT",
    `We may update this policy as the store evolves; the current version is always posted on this page. Questions or requests: ${SUPPORT_EMAIL}.`,
  ],
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title="Privacy Policy | FIXETTA"
        description="How FIXETTA collects, uses, and protects your personal information — checkout data, Stripe payments, fulfillment, and your GDPR/CCPA rights."
        path="/privacy"
      />
      <TopBar />

      <div className="pt-14 mx-auto max-w-3xl px-5 py-16">
        <p className="font-mono2 text-[11px] tracking-[0.35em] text-gold mb-6">
          LEGAL
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-white leading-[0.95]">
          PRIVACY
          <br />
          POLICY<span className="text-gold">.</span>
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
