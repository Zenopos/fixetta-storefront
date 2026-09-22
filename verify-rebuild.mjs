// Post-rebuild theme verification — run against a local static server of dist/.
// Verifies: both sub-brand themes paint (glowup pastel, ascend dark), both
// FIX-ETA timelines render, and the reconciled scalp price ($27.99) shows.
// Usage: node verify-rebuild.mjs <base-url>
import puppeteer from "puppeteer"

const BASE = process.argv[2] || "http://localhost:4450"

const rgb = (c) => c // readable color string already from computed style

async function check(page, path, label, fns) {
  const url = BASE + path
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 })
  const res = await page.evaluate(() => {
    const bg = (sel) => {
      const el = document.querySelector(sel)
      return el ? getComputedStyle(el).backgroundColor : null
    }
    const col = (sel) => {
      const el = document.querySelector(sel)
      return el ? getComputedStyle(el).color : null
    }
    return {
      brand: document.getElementById("root")?.firstElementChild?.getAttribute("data-brand") ?? null,
      bodyText: document.body.innerText,
      btnPrimary: bg(".g-btn-primary,.rma-btn-primary"),
      heroCol: bg(".g-hero,.rma-hero,.g-pagehero"),
      roadmapBg: bg(".roadmap-ascend"),
      gold: col(".text-gold"),
    }
  })
  let ok = true
  const notes = []
  for (const [name, fn] of Object.entries(fns)) {
    const pass = fn(res)
    if (!pass) ok = false
    notes.push(`${name}:${pass ? "PASS" : "FAIL"}`)
  }
  console.log(`${ok ? "PASS" : "**FAIL**"} ${label} ${notes.join(" ")}`)
  if (!ok) {
    console.log("   brand=", res.brand, "btnPrimary=", res.btnPrimary, "heroCol=", res.heroCol, "roadmapBg=", res.roadmapBg, "gold=", res.gold)
    console.log("   head:", JSON.stringify(res.bodyText.slice(0, 120)))
  }
  return ok
}

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
})
const page = await browser.newPage()
let all = true

all &= await check(page, "/glowup/", "glowup pastel home", {
  brand: (r) => r.brand === "glowup",
  pastelHero: (r) => r.heroCol === "rgb(250, 247, 251)", // #faf7fb
  violetBtn: (r) => r.btnPrimary === "rgb(138, 99, 184)", // #8a63b8
  price: (r) => r.bodyText.includes("$27.99"),
  blooming: (r) => r.bodyText.includes("blooming"),
  fixeta: (r) => r.bodyText.toLowerCase().includes("fix-eta"),
})

all &= await check(page, "/ascend/", "ascend dark home", {
  ascendBrand: (r) => r.brand === "ascend",
  gold: (r) => r.gold === "rgb(175, 145, 95)", // #af915f
  system: (r) => r.bodyText.includes("THE SYSTEM"),
})

all &= await check(page, "/ascend/roadmap/", "ascend acid-lime roadmap", {
  limeBtn: (r) => r.btnPrimary === "rgb(229, 255, 33)", // #e5ff21
  darkBg: (r) => r.roadmapBg === "rgb(10, 10, 10)", // #0a0a0a
  fixeta: (r) => r.bodyText.toLowerCase().includes("fix-eta"),
  code: (r) => r.bodyText.includes("Discreet by design"),
})

all &= await check(page, "/glowup/roadmap/", "glowup pastel timeline", {
  violetBtn: (r) => r.btnPrimary === "rgb(138, 99, 184)",
  fixeta: (r) => r.bodyText.toLowerCase().includes("fix-eta"),
  promise: (r) => r.bodyText.includes("THE GLOWUP PROMISE"),
})

await browser.close()
console.log(all ? "\nALL CHECKS PASSED" : "\nSOME CHECKS FAILED")
process.exit(all ? 0 : 1)