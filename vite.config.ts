import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
// NOTE: prerendering happens in scripts/prerender.mjs (chained after `vite
// build` in the "build" script) — vite-plugin-prerender's ESM build is broken
// under "type": "module", so we prerender with raw puppeteer instead.
export default defineConfig({
  // Absolute base: prerendered pages live in subdirectories (dist/product/<h>/),
  // so relative './' asset URLs would 404. Deploy at a domain root.
  base: "/",
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
