import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public", "hero-top.png");
const outPath = join(root, "public", "hero-top-hd.webp");

const TARGET_W = 1920;

async function main() {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;
  const newH = Math.max(1, Math.round((h / w) * TARGET_W));

  const pass1 = await sharp(inputPath)
    .resize(Math.round(TARGET_W * 1.5), Math.round(newH * 1.5), {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .median(2)
    .toBuffer();

  await sharp(pass1)
    .resize(TARGET_W, newH, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .sharpen({ sigma: 1.1, m1: 1.0, m2: 0.5 })
    .modulate({ saturation: 1.05, brightness: 1.02 })
    .webp({ quality: 94, effort: 6, smartSubsample: true })
    .toFile(outPath);

  console.log(`Written ${TARGET_W}x${newH} -> hero-top-hd.webp`);
}

await main();
