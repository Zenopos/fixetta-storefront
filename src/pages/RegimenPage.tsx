import type { BrandKey } from "@/lib/catalog"
import AscendRoadmap from "@/pages/AscendRoadmap"
import GlowupTimeline from "@/pages/GlowupTimeline"

/**
 * Route dispatcher for the FIX-ETA timeline pages.
 *  - /ascend/roadmap → AscendRoadmap (acid-lime men's roadmap mockup)
 *  - /glowup/roadmap → GlowupTimeline (pastel floral timeline)
 */
export default function RegimenPage({ brand }: { brand: BrandKey }) {
  if (brand === "ascend") return <AscendRoadmap />
  return <GlowupTimeline />
}