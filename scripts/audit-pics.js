#!/usr/bin/env node
/**
 * Audit public/pics cutout quality — run after sync:pics.
 * Usage: node scripts/audit-pics.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = path.join(process.cwd(), "public/pics");

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

async function audit(file) {
  const { data, info } = await sharp(path.join(outDir, file))
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let grayFringe = 0;
  let darkBorder = 0;
  let cornerArtifacts = 0;
  const margin = 10;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const white = r > 245 && g > 245 && b > 245;
      if (white) continue;
      const L = lum(r, g, b);
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      const onBorder = x < margin || y < margin || x >= w - margin || y >= h - margin;
      const inCorner =
        (x < margin || x >= w - margin) && (y < margin || y >= h - margin);
      if (L > 175 && L < 245 && spread < 25) grayFringe++;
      if (L < 200 && onBorder) darkBorder++;
      if (inCorner) cornerArtifacts++;
    }
  }

  const score = Math.max(
    0,
    100 -
      grayFringe / 80 -
      darkBorder / 40 -
      cornerArtifacts * 5
  );

  let grade = "A";
  if (score < 85) grade = "B";
  if (score < 70) grade = "C";
  if (score < 55) grade = "D";

  return { file, grade, score: score.toFixed(1), grayFringe, darkBorder, cornerArtifacts };
}

(async () => {
  const files = fs
    .readdirSync(outDir)
    .filter((f) => /^item-\d+\.jpg$/i.test(f))
    .sort();

  if (!files.length) {
    console.error("No item-*.jpg in public/pics — run npm run sync:pics first");
    process.exit(1);
  }

  console.log("LuxeFinder — audit détourage carousel\n");
  let total = 0;
  for (const f of files) {
    const r = await audit(f);
    total += Number(r.score);
    const flag = r.grade === "A" ? "✓" : r.grade === "B" ? "~" : "✗";
    console.log(
      `${flag} ${r.file}  grade=${r.grade}  score=${r.score}  gray=${r.grayFringe}  darkEdge=${r.darkBorder}`
    );
  }
  console.log(`\nMoyenne: ${(total / files.length).toFixed(1)}/100`);
})();
