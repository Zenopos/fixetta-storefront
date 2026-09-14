import { Link } from "react-router"
import TopBar from "@/components/TopBar"
import SiteFooter from "@/components/SiteFooter"
import Seo from "@/lib/seo"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Seo
        title="Page Not Found | FIXETTA"
        description="This page doesn't exist. Head back to FIXETTA."
        path="/404"
        robots="noindex,follow"
      />
      <TopBar />
      <div className="flex-1 pt-14 flex flex-col items-center justify-center px-5 py-32 text-center">
        <p className="font-mono2 text-[11px] tracking-[0.35em] text-gold">
          404 / OFF THE PATH
        </p>
        <h1 className="font-display text-[clamp(3rem,9vw,6rem)] text-white leading-[0.95] mt-6">
          WRONG
          <br />
          TURN<span className="text-gold">.</span>
        </h1>
        <p className="mt-6 max-w-md text-neutral-400">
          This page doesn’t exist. FIXETTA does.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block bg-gold text-black font-mono2 text-xs tracking-[0.3em] px-8 py-4 hover:bg-[#c5a878] transition-colors"
        >
          ← BACK TO THE STORES
        </Link>
      </div>
      <SiteFooter slim />
    </div>
  )
}
