#!/usr/bin/env node
/**
 * Scan source folders for images with transparent pixels and list / optionally fix them.
 *
 * Usage:
 *   node scripts/fix-transparent-bg.js           # report only
 *   node scripts/fix-transparent-bg.js --fix   # write *-white.jpg next to sources (dry check)
 *
 * Home marquees are fixed via sync:pics / sync:sunglasses / sync:jewelry
 * (they call toCarouselJpeg which flattens transparent sources onto white).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { hasTransparentPixels, WHITE } = require("./lib/carousel-jpeg");

const root = process.cwd();
const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif|tiff?)$/i;
const doFix = process.argv.includes("--fix");

const folders = [
  path.join(root, "pics"),
  path.join(root, "../pics"),
  path.join(root, "../sacs"),
  path.join(root, "sunglasses"),
  path.join(root, "../sunglasses"),
  path.join(root, "jewelry"),
  path.join(root, "../jewelry"),
].filter((d, i, arr) => fs.existsSync(d) && arr.indexOf(d) === i);

async function main() {
  const hits = [];

  for (const dir of folders) {
    for (const f of fs.readdirSync(dir).sort()) {
      if (f.startsWith(".") || !IMAGE_RE.test(f)) continue;
      const abs = path.join(dir, f);
      if (!fs.statSync(abs).isFile()) continue;
      try {
        if (await hasTransparentPixels(abs)) {
          hits.push(abs);
          console.log("transparent:", abs);
          if (doFix) {
            const out = path.join(
              dir,
              `${path.basename(f, path.extname(f))}-on-white.jpg`
            );
            await sharp(abs)
              .rotate()
              .flatten({ background: WHITE })
              .jpeg({ quality: 92 })
              .toFile(out);
            console.log("  →", out);
          }
        }
      } catch (e) {
        console.warn("skip", abs, e.message);
      }
    }
  }

  console.log(
    hits.length
      ? `\n${hits.length} image(s) with transparency${doFix ? " (fixed copies written)" : ""}.\nRun: npm run sync:pics && npm run sync:sunglasses && npm run sync:jewelry`
      : "\nNo transparent images found in scanned folders."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
