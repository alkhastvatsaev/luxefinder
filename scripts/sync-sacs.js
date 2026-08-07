#!/usr/bin/env node
/** Sync ../sacs (or etude/sacs) → public/sacs as optimized JPEGs */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const candidates = [
  path.join(__dirname, "../../sacs"),
  path.join(__dirname, "../../../sacs"),
  path.join(process.cwd(), "../sacs"),
];
const srcDir = candidates.find((d) => fs.existsSync(d));
const outDir = path.join(process.cwd(), "public/sacs");
if (!srcDir) {
  console.error("No sacs folder found next to luxefinder");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
(async () => {
  const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith("."));
  let i = 0;
  for (const f of files) {
    i++;
    const out = path.join(outDir, `bag-${String(i).padStart(2, "0")}.jpg`);
    await sharp(path.join(srcDir, f))
      .rotate()
      .resize(800, 800, { fit: "cover", position: "centre" })
      .jpeg({ quality: 82 })
      .toFile(out);
    console.log(f, "->", path.basename(out));
  }
  console.log("Synced", files.length, "from", srcDir);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
