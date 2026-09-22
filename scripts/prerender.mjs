/**
 * FIXETTA prerenderer — bakes each route's rendered HTML into dist/.
 *
 * Why this exists instead of vite-plugin-prerender: that plugin's ESM build
 * calls require() and crashes under "type": "module" + Vite 7. This script is
 * the same idea with no magic: serve dist/ locally, visit every route in
 * headless Chrome, wait for the app's "app-rendered" event (dispatched by
 * App.tsx after first paint — by which point the <Seo> effects have already
 * set the route's title/meta/JSON-LD), then save the DOM as static HTML.
 *
 *   node scripts/prerender.mjs        # after `vite build`
 *
 * Keep ROUTES in sync with src/lib/catalog.ts handles + public/sitemap.xml.
 */

import { createServer } from "node:http"
import { readFile, mkdir, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, "..", "dist")

// Must mirror vite.config's base so built asset URLs resolve during capture.
// e.g. base "/fixetta-storefront/" -> mount "/fixetta-storefront".
const BASE = process.env.VITE_BASE || process.env.VITE_PUBLIC_PATH || "/"
const MOUNT = BASE === "/" ? "" : BASE.replace(/\/$/, "")

const ROUTES = [
  "/",
  // ASCEND — men's (home + roadmap + 4 products)
  "/ascend",
  "/ascend/roadmap",
  "/ascend/product/height-insole-system",
  "/ascend/product/frame-shoulder-inserts",
  "/ascend/product/jaw-forge-trainer-kit",
  "/ascend/product/apex-scalp-massager",
  // glowup — women's (home + roadmap + 5 products)
  "/glowup",
  "/glowup/roadmap",
  "/glowup/product/ice-roller-guasha-set",
  "/glowup/product/scalp-massager-brush",
  "/glowup/product/heated-lash-curler",
  "/glowup/product/lash-applicator-kit",
  "/glowup/product/acetate-claw-clip-set",
  // Legal + shared base
  "/privacy",
  "/terms",
  "/checkout",
  "/confirmation",
]

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

/** Static server for dist/ with SPA fallback to index.html for clean URLs. */
function serve() {
  const server = createServer(async (req, res) => {
    try {
      const raw = decodeURIComponent((req.url || "/").split("?")[0])
      let url = raw
      if (MOUNT && raw.startsWith(MOUNT + "/")) url = raw.slice(MOUNT.length) || "/"
      else if (MOUNT && raw === MOUNT) url = "/"
      let file = path.join(DIST, url === "/" ? "index.html" : url)
      if (!file.startsWith(DIST)) {
        res.writeHead(403).end()
        return
      }
      if (!existsSync(file) || !path.extname(file)) {
        file = path.join(DIST, "index.html")
      }
      const body = await readFile(file)
      res.writeHead(200, {
        "content-type": MIME[path.extname(file)] || "application/octet-stream",
      })
      res.end(body)
    } catch {
      res.writeHead(404).end()
    }
  })
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () =>
      resolve({ server, port: server.address().port })
    )
  })
}

async function main() {
  // Vercel's build sandbox can't launch headless Chrome (missing system libs:
  // libnspr4.so etc.) and Vercel serves the SPA itself via vercel.json rewrites.
  // Skip static prerender there — local builds and GH Pages keep full prerender.
  if (process.env.VERCEL) {
    console.log(
      "Vercel build: skipping static prerender (SPA served via vercel.json rewrites)."
    )
    return
  }

  if (!existsSync(path.join(DIST, "index.html"))) {
    console.error("dist/index.html not found — run `vite build` first.")
    process.exit(1)
  }

  const { server, port } = await serve()
  // CI (GitHub Actions Ubuntu ≥23.10) blocks the unprivileged-user-namespace
  // sandbox that headless Chrome wants. Prerender only fetches our own local
  // 127.0.0.1 server, so --no-sandbox is safe here. No-op on mac/win.
  const browser = await puppeteer.launch({
    headless: true,
    args:
      process.platform === "linux"
        ? ["--no-sandbox", "--disable-setuid-sandbox"]
        : [],
  })

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      // Install the listener before any app code runs so the event can't race us.
      await page.evaluateOnNewDocument(() => {
        window.__appRendered = false
        document.addEventListener("app-rendered", () => {
          window.__appRendered = true
        })
      })
      await page.goto(`http://127.0.0.1:${port}${MOUNT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      })
      await page.waitForFunction("window.__appRendered === true", {
        timeout: 15000,
      })
      const html = await page.content()

      const outDir =
        route === "/" ? DIST : path.join(DIST, route.slice(1))
      await mkdir(outDir, { recursive: true })
      await writeFile(path.join(outDir, "index.html"), html)
      console.log(`prerendered ${route}`)
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }

  console.log(`\n${ROUTES.length} routes prerendered into dist/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
