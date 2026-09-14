/**
 * ASCEND brand image generator.
 *
 * Restyles the ACTUAL AliExpress listing photos (assets_raw/listings/) into
 * ASCEND's dark-luxury look using Flux Kontext Pro (image-to-image), which
 * preserves the product instead of inventing one like text-only models do.
 *
 * Usage:
 *   node --env-file=.env scripts/generate-images.mjs            # all shots
 *   node --env-file=.env scripts/generate-images.mjs edge 1     # one shot
 *
 * Providers (IMAGE_PROVIDER in app/.env, default "replicate"):
 *   replicate  — Flux Kontext Pro via Replicate. Requires REPLICATE_API_TOKEN,
 *                optional REPLICATE_MODEL.
 *   openrouter — Gemini image editing via OpenRouter chat completions. Requires
 *                OPENROUTER_API_KEY, optional OPENROUTER_MODEL
 *                (default google/gemini-2.5-flash-image). Billed against your
 *                OpenRouter credit balance.
 *
 * No npm dependencies — Node 20+ built-in fetch only.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.join(__dirname, "..", "..", "assets_raw", "listings")
const OUT_DIR = path.join(__dirname, "..", "public", "images", "ascend")

const PROVIDER = (process.env.IMAGE_PROVIDER || "replicate").toLowerCase()

const MODEL = process.env.REPLICATE_MODEL || "black-forest-labs/flux-kontext-pro"
const API = `https://api.replicate.com/v1/models/${MODEL}/predictions`

const OR_MODEL = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash-image"
const OR_API = "https://openrouter.ai/api/v1/chat/completions"

const RESTYLE =
  "Keep the product in this image exactly unchanged — identical shape, color, " +
  "material, proportions and details. Place it on a matte black studio backdrop " +
  "with dark slate surface, dramatic soft rim lighting and a subtle warm gold " +
  "accent light, shallow depth of field, photorealistic premium editorial " +
  "product photography. Remove all text, logos, brand names, dimension lines, " +
  "watermarks and annotation graphics. Do not add any new objects or people."

// Gemini (OpenRouter) refuses prompts phrased as "remove watermarks/logos", so
// the same intent is framed positively: generate a clean studio shot that only
// ever contains the product.
const RESTYLE_OR =
  "Generate a new product photograph of the exact product shown in this image " +
  "— identical shape, color, material, proportions and details. Place it on a " +
  "matte black studio backdrop with a dark slate surface, dramatic soft rim " +
  "lighting and a subtle warm gold accent light, shallow depth of field, " +
  "photorealistic premium editorial product photography. The output image must " +
  "contain only the product itself: no text, no logos, no dimension lines, no " +
  "annotation graphics, no people, no extra objects."

const RESTYLE_ACTIVE = PROVIDER === "openrouter" ? RESTYLE_OR : RESTYLE

/**
 * Shot entry:
 *   stem   — output file is <OUT_DIR>/<stem>.jpg
 *   src    — reference image(s): a filename or array of filenames, resolved
 *            against assets_raw/listings/ first, then public/images/ascend/
 *            (so generated shots can serve as references for lifestyle shots)
 *   prompt — full prompt; defaults to RESTYLE_ACTIVE
 *   prefix — prepended to RESTYLE_ACTIVE (ignored when prompt is set)
 *   model  — per-shot OpenRouter model override (e.g. gemini-3-pro-image-preview
 *            for shots with people)
 *   model  — per-shot OpenRouter model override (e.g. gemini-3-pro-image-preview
 *            for shots with people)
 *   imageConfig — OpenRouter/Gemini image_config passthrough, e.g.
 *            { aspect_ratio: "1:1", image_size: "2K" }
 */
const SHOTS = [
  {
    stem: "current-electric-scalp-brush-1",
    src: "current-electric-scalp-brush-2.webp",
    prefix:
      "Fill the entire square frame edge to edge with the photograph — the " +
      "scene extends to all four edges with no white bars, no borders and no " +
      "letterboxing. ",
  },
  {
    stem: "current-electric-scalp-brush-2",
    src: ["current-electric-scalp-brush-1.jpg", "current-electric-scalp-brush-2.webp"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend from a few feet away: a man in " +
      "his late 20s with short dark hair, wearing a plain t-shirt, sitting on " +
      "the edge of his bed in a modern bedroom, eyes closed in relaxation as " +
      "he slowly drags the handheld electric scalp massager from the reference " +
      "images across his dry scalp. The device is a small palm-sized dome with " +
      "a glossy white top, a rose-gold metallic band around the middle, a grey " +
      "rubber base with four soft silicone massage-claw heads and a single " +
      "round power button on top — it must match the reference images exactly. " +
      "His full upper body and the room behind him are in frame — bedside " +
      "lamp, window daylight — this is NOT a close-up or head crop. Candid UGC " +
      "aesthetic, slightly imperfect framing, realistic skin texture, " +
      "photorealistic. No text, no logos, no watermarks.",
  },
  {
    stem: "current-electric-scalp-brush-3",
    src: ["current-electric-scalp-brush-2.jpg", "current-electric-scalp-brush-2.webp"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend from the bathroom doorway: the " +
      "same man from the first reference photo, shirtless in a modern tiled " +
      "walk-in shower behind a glass door, water running, working a rich white " +
      "shampoo lather into his hair with the handheld electric scalp massager " +
      "from the second reference image — a small palm-sized dome with a glossy " +
      "white top, rose-gold metallic band, grey rubber base with four soft " +
      "silicone massage-claw heads, matching it exactly. Foam suds cover his " +
      "scalp, water droplets on the glass, light steam. His full upper body " +
      "and the whole shower are in frame — NOT a close-up. The device is " +
      "visibly wet, being used under running water. Candid, realistic skin " +
      "texture, photorealistic. No text, no logos, no watermarks.",
  },
  {
    stem: "current-electric-scalp-brush-4",
    src: "current-electric-scalp-brush-2.jpg",
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend in a bright modern bathroom: the " +
      "same man from the reference photo standing at the mirror in a plain " +
      "t-shirt, seen from the chest up with the whole vanity in frame — but " +
      "his hair is now visibly thinning: a receding hairline and a sparse " +
      "patch at the crown with scalp showing through. His expression is " +
      "neutral and slightly self-conscious, like a real 'before' progress " +
      "photo. Honest flat daylight, candid UGC aesthetic, realistic skin " +
      "texture, photorealistic — NOT a close-up. No text, no logos, no " +
      "watermarks.",
  },
  {
    stem: "current-electric-scalp-brush-5",
    src: "current-electric-scalp-brush-4.jpg",
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend in the same bright modern " +
      "bathroom from the reference photo: the same man in the same plain " +
      "t-shirt standing at the same mirror with the same framing from the " +
      "chest up — but now he has a thick, full, lush head of hair, dense at " +
      "the crown and hairline and neatly styled. He wears a quiet confident " +
      "smile, like a real 'after' progress photo. Honest flat daylight " +
      "matching the reference photo, candid UGC aesthetic, realistic skin " +
      "texture, photorealistic — NOT a close-up. No text, no logos, no " +
      "watermarks.",
  },
  {
    stem: "current-electric-scalp-brush-6",
    src: "current-electric-scalp-brush-5.jpg",
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "Candid 1x smartphone photo taken by a friend at a cozy bar in the " +
      "evening: the same man from the reference photo with his thick full " +
      "head of hair, laughing naturally with two friends around a high wooden " +
      "table with beer glasses, warm ambient bar lighting, blurred bottle " +
      "shelves in the background. He is relaxed and charismatic, the center " +
      "of the group. Everyone in frame from the waist up, slightly imperfect " +
      "candid framing, realistic skin texture, photorealistic UGC aesthetic. " +
      "No text, no logos, no watermarks.",
  },
  {
    stem: "lift-height-booster-insole-1",
    src: "lift-height-booster-insole-clean-side-profile.jpg",
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "Take the reference photo exactly as it is — the same side-profile shot " +
      "of a man's bare foot on a light wooden bedroom floor wearing the " +
      "translucent frosted silicone heel cup — and keep the photograph " +
      "completely unchanged. Add one clean, minimal infographic overlay: a " +
      "thin white vertical double-headed arrow line spanning the gap between " +
      "the underside of the elevated heel cup and the wooden floor, with the " +
      "label \"+1.5 in\" in a small, crisp, white modern sans-serif typeface " +
      "placed right beside the arrow. The annotation must be sharp, legible " +
      "and precisely aligned with the heel gap. No other text, no logos, no " +
      "watermarks, no other graphics.",
  },
  {
    stem: "lift-height-booster-insole-2",
    src: ["lift-height-booster-insole-1.webp", "lift-height-booster-insole-2.webp"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend: a man in his late 20s standing " +
      "front-facing in a bright modern bedroom, barefoot in a t-shirt and " +
      "shorts, in the middle of putting on the translucent silicone heel cups " +
      "from the reference images. His left foot already wears one frosted " +
      "translucent perforated silicone heel cup, lifting that heel about an " +
      "inch off the floor, while his right foot stays bare and flat — the " +
      "clear height difference between his two feet is the focus of the " +
      "photo. He holds the second heel cup in one hand. Full body in frame " +
      "from head to toe, honest daylight, candid UGC aesthetic, realistic " +
      "skin texture, photorealistic — NOT a close-up. The product must match " +
      "the reference images exactly. No text, no logos, no watermarks.",
  },
  {
    stem: "lift-height-booster-insole-3",
    src: "lift-height-booster-insole-2.jpg",
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend: the same man from the reference " +
      "photo, now wearing clean white sneakers, a fitted plain t-shirt and " +
      "dark jeans, standing tall and confident in a bright hallway — " +
      "shoulders back, upright posture, relaxed confident smile. Full body " +
      "from head to toe in frame, natural daylight, candid UGC aesthetic, " +
      "realistic skin texture, photorealistic — NOT a close-up. No text, no " +
      "logos, no watermarks.",
  },
  {
    stem: "lift-height-booster-insole-4",
    src: "lift-height-booster-insole-3.jpg",
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "Candid 1x smartphone photo taken by a friend in a dim nightclub lounge " +
      "with warm neon-accented lighting: the same man from the reference " +
      "photo in his white sneakers, t-shirt and dark jeans, standing a full " +
      "head taller than the group of three young women around him at a high " +
      "table with drinks. They are looking up at him admiringly, laughing at " +
      "something he said, and he looks relaxed and confident — clearly the " +
      "tallest person in the group. Everyone in frame from the waist up, " +
      "blurred crowd and bar shelves in the background, slightly imperfect " +
      "candid framing, realistic skin texture, photorealistic UGC aesthetic. " +
      "No text, no logos, no watermarks.",
  },
  { stem: "frame-structure-shoulder-pads-1", src: "frame-structure-shoulder-pads-1.webp" },
  {
    stem: "frame-structure-shoulder-pads-2",
    src: "frame-structure-shoulder-pads-2.webp",
    prompt:
      "Realistic smartphone photo of four pairs of soft silicone shoulder pads " +
      "arranged in a row on a light wooden table near a window: one clear " +
      "translucent pair, one flesh pink pair, one warm brown pair, and one " +
      "black pair with a dimpled perforated surface — matching the products in " +
      "the reference image, each pair oval teardrop-shaped, about 13 cm long, " +
      "matte silicone. Bright natural daylight, shallow depth of field. " +
      "No people, no text, no logos, no watermarks.",
  },
  {
    stem: "frame-structure-shoulder-pads-3",
    src: ["frame-structure-shoulder-pads-1.webp", "frame-structure-shoulder-pads-3.webp"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend from a few feet away: a fit man " +
      "in his mid-20s wearing a black tank top, standing in a bright modern " +
      "bedroom, both shoulders exposed with the flesh-toned silicone shoulder " +
      "pads from the reference images adhered on top of each shoulder — oval " +
      "teardrop-shaped matte silicone pads, about 13 cm long, that visibly " +
      "broaden his shoulder line. Full upper body in frame, natural window " +
      "light, candid, photorealistic, realistic skin texture. The pads must " +
      "match the reference images exactly. No text, no logos, no watermarks.",
  },
  {
    stem: "frame-structure-shoulder-pads-4",
    src: ["frame-structure-shoulder-pads-3.jpg", "frame-structure-shoulder-pads-1.webp"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend from a few feet away: the same man " +
      "from the reference photo, now wearing a crisp plain white Oxford " +
      "button-down shirt made of thick opaque cotton, in the same bedroom. " +
      "His shoulder line looks noticeably broader and squarer, filling out the " +
      "shirt — like someone who has been lifting. The fabric is completely " +
      "opaque everywhere; nothing shows through it. Full upper body in frame, " +
      "natural window light, candid, photorealistic, realistic skin texture. " +
      "No text, no logos, no watermarks.",
  },
  {
    stem: "frame-structure-shoulder-pads-5",
    src: ["frame-structure-shoulder-pads-3.jpg"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "Candid 1x smartphone photo taken by a friend at a casual house " +
      "gathering: the same man from the reference photo wearing a plain grey " +
      "crew-neck t-shirt — a completely ordinary, opaque shirt with full " +
      "sleeves and no shoulder cutouts — laughing naturally with two friends " +
      "in a living room, everyone in frame from the waist up. He is wearing " +
      "silicone shoulder pads UNDERNEATH the t-shirt; the pads are entirely " +
      "hidden by the fabric, and all you can see is that his shoulder line " +
      "looks broad and square. Warm indoor light, slightly imperfect candid " +
      "framing, genuine laughter, photorealistic UGC aesthetic. No text, no " +
      "logos, no watermarks.",
  },
  { stem: "edge-jawline-exerciser-1", src: "edge-jawline-exerciser-2.webp" },
  {
    stem: "edge-jawline-exerciser-2",
    src: "edge-jawline-exerciser-1.jpg",
    prompt:
      "Realistic smartphone photo of the exact product from the reference image " +
      "— a small black hexagonal silicone chew trainer about 2.8 cm wide with a " +
      "dimpled perforated top surface — sitting on a white bathroom countertop " +
      "next to a sink, bright morning window light, blurred toothbrush holder " +
      "and subway tile in the background, shallow depth of field. Candid, " +
      "lived-in, not a studio shot. No text, no logos, no watermarks, no people.",
  },
  {
    stem: "edge-jawline-exerciser-3",
    src: ["edge-jawline-exerciser-1.jpg", "edge-jawline-exerciser-2.webp"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "0.5x ultra-wide smartphone photo taken by a friend standing a few feet " +
      "away: a fit man in his mid-20s with a short trimmed beard, visible from " +
      "the chest up, standing at a modern bathroom mirror and biting down on " +
      "the small black hexagonal silicone jaw exerciser from the reference " +
      "images. The whole scene is in frame — mirror, sink, tiles, window light " +
      "— this is NOT a close-up or face crop. Candid, slightly imperfect " +
      "framing, realistic skin texture, photorealistic. The product must match " +
      "the reference images exactly: a small black hexagonal chew trainer about " +
      "2.8 cm wide with a dimpled perforated top surface. No text, no logos, " +
      "no watermarks.",
  },
  {
    stem: "edge-jawline-exerciser-4",
    src: ["edge-jawline-exerciser-1.jpg", "edge-jawline-exerciser-2.webp"],
    model: "google/gemini-3-pro-image-preview",
    imageConfig: { aspect_ratio: "1:1", image_size: "2K" },
    prompt:
      "1x smartphone photo taken by a friend from across the room: a man in his " +
      "mid-20s relaxing on a couch in a living room, leaning back with a casual " +
      "grin while holding the small black hexagonal silicone jaw exerciser from " +
      "the reference images up in one hand. His full torso, hand and the room " +
      "behind him are in frame — NOT a close-up. Natural indoor light, candid " +
      "UGC aesthetic, realistic skin texture, photorealistic. The product must " +
      "match the reference images exactly: a small black hexagonal chew trainer " +
      "about 2.8 cm wide with a dimpled perforated top surface. No text, no " +
      "logos, no watermarks.",
  },
  {
    stem: "edge-jawline-exerciser-5",
    src: "edge-jawline-exerciser-1.webp",
    prompt:
      "Realistic smartphone photo of three small hexagonal silicone chew " +
      "trainers — one white, one black, one grey, each about 2.8 cm wide with a " +
      "dimpled perforated top surface, matching the products in the reference " +
      "image — lined up on a wooden bedroom nightstand next to a smartphone " +
      "lying flat, warm bedside lamp light, cozy evening mood, shallow depth of " +
      "field. No people, no text, no logos, no watermarks.",
  },
]

const token =
  PROVIDER === "openrouter"
    ? process.env.OPENROUTER_API_KEY
    : process.env.REPLICATE_API_TOKEN
if (!token) {
  const name = PROVIDER === "openrouter" ? "OPENROUTER_API_KEY" : "REPLICATE_API_TOKEN"
  console.error(`${name} is missing. Run with: node --env-file=.env ...`)
  process.exit(1)
}

function sniffMime(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return "image/png"
  if (buf[0] === 0xff && buf[1] === 0xd8) return "image/jpeg"
  if (buf.toString("ascii", 0, 4) === "RIFF") return "image/webp"
  return "application/octet-stream"
}

function resolveSource(file) {
  const inSrc = path.join(SRC_DIR, file)
  if (existsSync(inSrc)) return inSrc
  return path.join(OUT_DIR, file)
}

async function toDataUri(file) {
  const buf = await readFile(resolveSource(file))
  return `data:${sniffMime(buf)};base64,${buf.toString("base64")}`
}

async function generateViaReplicate(prompt, inputImage) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        prefer: "wait",
      },
      body: JSON.stringify({
        input: {
          prompt,
          input_image: inputImage,
          aspect_ratio: "match_input_image",
          output_format: "jpg",
          safety_tolerance: 2,
        },
      }),
    })
    if (res.status === 429) {
      const body = await res.json().catch(() => ({}))
      const wait = (body.retry_after ?? 15) + 5
      console.log(`      throttled, retrying in ${wait}s`)
      await new Promise((r) => setTimeout(r, wait * 1000))
      continue
    }
    if (!res.ok) {
      throw new Error(`Replicate ${res.status}: ${(await res.text()).slice(0, 300)}`)
    }
    const prediction = await res.json()
    if (prediction.status !== "succeeded") {
      throw new Error(`Prediction ${prediction.status}: ${prediction.error ?? "unknown"}`)
    }
    const url = Array.isArray(prediction.output)
      ? prediction.output[0]
      : prediction.output
    if (!url) throw new Error("No output URL in prediction response")
    return url
  }
  throw new Error("Replicate kept throttling after 8 attempts")
}

async function generateViaOpenRouter(prompt, inputImages, model = OR_MODEL, imageConfig) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(OR_API, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "http-referer": "https://ascend.local",
        "x-title": "ASCEND image generator",
      },
      body: JSON.stringify({
        model,
        modalities: ["image", "text"],
        ...(imageConfig ? { image_config: imageConfig } : {}),
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              ...inputImages.map((url) => ({
                type: "image_url",
                image_url: { url },
              })),
            ],
          },
        ],
      }),
    })
    if (res.status === 429) {
      const wait = 15 + attempt * 10
      console.log(`      throttled, retrying in ${wait}s`)
      await new Promise((r) => setTimeout(r, wait * 1000))
      continue
    }
    if (res.status === 402) {
      throw new Error("OpenRouter 402: insufficient credits on the account")
    }
    if (!res.ok) {
      throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 300)}`)
    }
    const data = await res.json()
    if (data.error) {
      throw new Error(`OpenRouter error: ${data.error.message ?? JSON.stringify(data.error)}`)
    }
    const images = data.choices?.[0]?.message?.images
    const url = images?.[0]?.image_url?.url
    if (!url) {
      const text = data.choices?.[0]?.message?.content
      throw new Error(
        `No image in OpenRouter response` +
          (text ? ` (model said: ${String(text).slice(0, 200)})` : ""),
      )
    }
    return url
  }
  throw new Error("OpenRouter kept throttling after 8 attempts")
}

function generate(prompt, inputImages, model, imageConfig) {
  return PROVIDER === "openrouter"
    ? generateViaOpenRouter(prompt, inputImages, model, imageConfig)
    : // Flux Kontext Pro takes a single input image.
      generateViaReplicate(prompt, inputImages[0])
}

async function saveImage(url, dest) {
  if (url.startsWith("data:")) {
    // OpenRouter returns base64 data URLs directly.
    const base64 = url.slice(url.indexOf(",") + 1)
    await writeFile(dest, Buffer.from(base64, "base64"))
    return
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download ${res.status} for ${url}`)
  await writeFile(dest, Buffer.from(await res.arrayBuffer()))
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const [filterStem, filterIndex] = process.argv.slice(2)
  const shots = SHOTS.filter(({ stem }) => {
    if (!filterStem) return true
    if (!stem.includes(filterStem)) return false
    return filterIndex ? stem.endsWith(`-${filterIndex}`) : true
  })

  if (shots.length === 0) {
    console.error("No shots matched the filter.")
    process.exit(1)
  }

  for (const { stem, src, prompt, prefix, model, imageConfig } of shots) {
    const dest = path.join(OUT_DIR, `${stem}.jpg`)
    if (existsSync(dest)) {
      console.log(`skip  ${stem}.jpg (exists — delete to regenerate)`)
      continue
    }
    const sources = Array.isArray(src) ? src : [src]
    const missing = sources.filter((s) => !existsSync(resolveSource(s)))
    if (missing.length > 0) {
      console.error(`missing source ${missing.join(", ")} — skipping ${stem}`)
      continue
    }
    console.log(`gen   ${stem} ← ${sources.join(", ")} …`)
    const finalPrompt = prompt ?? (prefix ? prefix + RESTYLE_ACTIVE : RESTYLE_ACTIVE)
    const dataUris = await Promise.all(sources.map(toDataUri))
    const url = await generate(finalPrompt, dataUris, model, imageConfig)
    await saveImage(url, dest)
    console.log(`saved ${stem}.jpg`)
    // Pace requests: Replicate free-tier limit is 6 predictions/minute with
    // burst 1; OpenRouter limits are far looser.
    await new Promise((r) =>
      setTimeout(r, PROVIDER === "openrouter" ? 3000 : 12000),
    )
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
