import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
// NOTE: prerendering happens in scripts/prerender.mjs (chained after `vite
// build` in the "build" script) — vite-plugin-prerender's ESM build is broken
// under "type": "module", so we prerender with raw puppeteer instead.
export default defineConfig({
  // Base is configurable so the same repo can deploy at a domain root (production,
  // base "/") or as a GitHub Pages project page (base "/fixetta-storefront/").
  // Set VITE_BASE (or VITE_PUBLIC_PATH) at build time for a sub-path deploy.
  base: process.env.VITE_BASE || process.env.VITE_PUBLIC_PATH || "/",
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
