/**
 * `public/hero-banner.png` -> crisp HD WebP.
 * Uses a two-pass upscale + denoise + sharpen for clearer details.
 * Run after replacing the PNG: `npm run hero-hd`
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public", "hero-banner.png");
/** Output name — change if browser still shows an old hero (cache bust). */
const outPath = join(root, "public", "sunlong-hero-hd.webp");

const TARGET_W = 1920;

async function main() {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;
  const newH = Math.max(1, Math.round((h / w) * TARGET_W));

  // Pass 1: upscale strongly for a better reconstruction base.
  const pass1 = await sharp(inputPath)
    .resize(Math.round(TARGET_W * 1.25), Math.round(newH * 1.25), {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .median(2)
    .toBuffer();

  // Pass 2: downsample to final size to tighten details and reduce blur.
  await sharp(pass1)
    .resize(TARGET_W, newH, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .sharpen({ sigma: 1.05, m1: 0.95, m2: 0.45 })
    .modulate({ saturation: 1.06, brightness: 1.02 })
    .webp({
      quality: 93,
      effort: 6,
      smartSubsample: true,
      alphaQuality: 100,
    })
    .toFile(outPath);

  console.log(`Written ${TARGET_W}×${newH} → sunlong-hero-hd.webp`);
}

await main();
