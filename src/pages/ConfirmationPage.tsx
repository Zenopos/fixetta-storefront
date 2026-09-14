import { Link } from "react-router"
import TopBar from "@/components/TopBar"
import SiteFooter from "@/components/SiteFooter"
import { formatMoney } from "@/lib/catalog"
import Seo from "@/lib/seo"

type LastOrder = {
  demo: boolean
  orderId?: string
  email: string
  total: number
  items: Array<{ name: string; qty: number }>
}

export default function ConfirmationPage() {
  let order: LastOrder | null = null
  try {
    order = JSON.parse(sessionStorage.getItem("ascend_last_order") || "null")
  } catch {
    order = null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Seo
        title="Order Confirmed | FIXETTA"
        description="Your FIXETTA order confirmation."
        path="/confirmation"
        robots="noindex,nofollow"
      />
      <TopBar />
      <div className="pt-40 mx-auto max-w-2xl px-5 text-center pb-32">
        <p className="font-mono2 text-[11px] tracking-[0.35em] text-gold">
          ORDER {order?.demo ? "SIMULATED" : "CONFIRMED"}
        </p>
        <h1 className="font-display text-[clamp(3rem,9vw,6rem)] text-white leading-[0.95] mt-6">
          THE WORK
          <br />
          BEGINS<span className="text-gold">.</span>
        </h1>

        {order ? (
          <div className="mt-12 border hairline bg-[#0d0d0d] text-left">
            <div className="px-6 py-4 border-b hairline font-mono2 text-[10px] tracking-[0.25em] text-neutral-500">
              {order.demo ? "DEMO RECEIPT" : `ORDER ${order.orderId ?? ""}`}
            </div>
            <div className="px-6 py-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between font-mono2 text-xs text-neutral-300"
                >
                  <span className="font-display text-lg text-white">
                    {item.name}
                  </span>
                  <span>×{item.qty}</span>
                </div>
              ))}
              <div className="flex justify-between font-mono2 text-sm text-white pt-3 border-t hairline">
                <span className="tracking-[0.2em]">TOTAL</span>
                <span>{formatMoney(order.total)}</span>
              </div>
            </div>
            <div className="px-6 py-4 border-t hairline font-mono2 text-[10px] tracking-[0.15em] text-neutral-500 leading-relaxed">
              {order.demo ? (
                <>
                  DEMO MODE — NO CHARGE WAS MADE AND NO SUPPLIER ORDER WAS
                  PLACED. CONNECT THE MEDUSA BACKEND (SEE README) TO PROCESS
                  REAL PAYMENTS AND AUTO-FULFILL TO YOUR SUPPLIER.
                </>
              ) : (
                <>
                  A CONFIRMATION WAS SENT TO {order.email.toUpperCase()}. YOUR
                  ORDER IS BEING ROUTED TO OUR SUPPLIER NETWORK AUTOMATICALLY —
                  TRACKING ARRIVES BY EMAIL WITHIN 48–72H.
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-8 text-neutral-400">No recent order found.</p>
        )}

        <Link
          to="/"
          className="mt-12 inline-block border hairline-strong px-8 py-4 font-mono2 text-[11px] tracking-[0.3em] text-white hover:border-gold hover:text-gold transition-colors"
        >
          ← BACK TO THE STORES
        </Link>
      </div>
      <SiteFooter slim />
    </div>
  )
}
