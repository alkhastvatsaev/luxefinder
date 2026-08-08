#!/usr/bin/env node
/**
 * Sync etude/sunglasses → public/sunglasses (top home marquee).
 * macOS 14+: native Vision subject lift — Linux/Vercel keeps committed JPEGs.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = process.cwd();
const outDir = path.join(root, "public/sunglasses");
const cacheDir = path.join(root, ".cache/sunglasses-processed");
const macScript = path.join(__dirname, "macos-cutout.swift");

const sourceDirs = [
  path.join(root, "sunglasses"),
  path.join(root, "../sunglasses"),
].filter((d, i, arr) => fs.existsSync(d) && arr.indexOf(d) === i);

const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif|tiff?)$/i;
const WHITE = { r: 255, g: 255, b: 255 };
const IS_MAC = process.platform === "darwin";
const SKIP_BG = process.env.SKIP_BG_REMOVAL === "1";

function colorDist(r, g, b, r2, g2, b2) {
  return Math.hypot(r - r2, g - g2, b - b2);
}

function collectFiles() {
  const byName = new Map();
  for (const dir of sourceDirs) {
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(".") || !IMAGE_RE.test(f)) continue;
      const abs = path.join(dir, f);
      if (!fs.statSync(abs).isFile()) continue;
      const key = f.toLowerCase();
      if (!byName.has(key)) byName.set(key, abs);
    }
  }
  return [...byName.values()].sort((a, b) =>
    path.basename(a).localeCompare(path.basename(b))
  );
}

function cacheKey(abs) {
  const st = fs.statSync(abs);
  return `${abs}:${st.mtimeMs}:${st.size}:vision-clean`;
}

function cornerPatch(data, w, h, x, y, size = 10) {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let dy = 0; dy < size; dy++) {
    for (let dx = 0; dx < size; dx++) {
      const px = Math.min(w - 1, x + dx);
      const py = Math.min(h - 1, y + dy);
      const i = (py * w + px) * 4;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n++;
    }
  }
  return [r / n, g / n, b / n];
}

async function studioFloodCutout(abs) {
  const { data, info } = await sharp(abs)
    .rotate()
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: false })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const margin = Math.max(4, Math.floor(Math.min(w, h) * 0.02));
  const patches = [
    cornerPatch(data, w, h, margin, margin),
    cornerPatch(data, w, h, w - margin - 10, margin),
    cornerPatch(data, w, h, margin, h - margin - 10),
    cornerPatch(data, w, h, w - margin - 10, h - margin - 10),
  ];

  const bg = [
    patches.reduce((s, p) => s + p[0], 0) / patches.length,
    patches.reduce((s, p) => s + p[1], 0) / patches.length,
    patches.reduce((s, p) => s + p[2], 0) / patches.length,
  ];

  if (
    Math.max(...patches.map((p) => colorDist(p[0], p[1], p[2], bg[0], bg[1], bg[2]))) >
    35
  ) {
    return null;
  }

  const tolerance = 36;
  const bgMask = new Uint8Array(w * h);
  const queue = [];

  const trySeed = (x, y) => {
    const i = y * w + x;
    if (bgMask[i]) return;
    const o = i * 4;
    if (colorDist(data[o], data[o + 1], data[o + 2], bg[0], bg[1], bg[2]) <= tolerance) {
      bgMask[i] = 1;
      queue.push(i);
    }
  };

  for (let x = 0; x < w; x++) {
    trySeed(x, 0);
    trySeed(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    trySeed(0, y);
    trySeed(w - 1, y);
  }

  while (queue.length) {
    const i = queue.pop();
    const x = i % w;
    const y = (i - x) / w;
    const neighbors = [];
    if (x > 0) neighbors.push(i - 1);
    if (x < w - 1) neighbors.push(i + 1);
    if (y > 0) neighbors.push(i - w);
    if (y < h - 1) neighbors.push(i + w);

    for (const ni of neighbors) {
      if (bgMask[ni]) continue;
      const o = ni * 4;
      if (colorDist(data[o], data[o + 1], data[o + 2], bg[0], bg[1], bg[2]) <= tolerance) {
        bgMask[ni] = 1;
        queue.push(ni);
      }
    }
  }

  let removed = 0;
  for (let i = 0; i < w * h; i++) {
    if (!bgMask[i]) continue;
    const o = i * 4;
    data[o] = 255;
    data[o + 1] = 255;
    data[o + 2] = 255;
    data[o + 3] = 0;
    removed++;
  }

  if (removed < w * h * 0.08) return null;
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
}

function macosCutout(inputPath, tmpPng) {
  execFileSync("swift", [macScript, inputPath, tmpPng], {
    stdio: ["ignore", "ignore", "pipe"],
    timeout: 120000,
  });
  return fs.readFileSync(tmpPng);
}

async function cutout(abs) {
  const key = cacheKey(abs);
  const safe = Buffer.from(key).toString("base64url").slice(0, 120);
  const cached = path.join(cacheDir, `${safe}.png`);
  if (fs.existsSync(cached)) {
    return { png: fs.readFileSync(cached), method: "cached" };
  }

  fs.mkdirSync(cacheDir, { recursive: true });
  let png = null;
  let method = "flatten";

  if (IS_MAC && !SKIP_BG && fs.existsSync(macScript)) {
    const tmp = path.join(cacheDir, `${safe}-macos.png`);
    try {
      png = macosCutout(abs, tmp);
      method = "macos-vision";
      fs.unlinkSync(tmp);
    } catch (e) {
      const msg = e.stderr?.toString() || e.message;
      console.warn(`  macOS Vision failed for ${path.basename(abs)}: ${msg.trim()}`);
    }
  }

  if (!png) {
    png = await studioFloodCutout(abs);
    if (png) method = "studio-flood";
  }

  if (!png) {
    png = await sharp(abs).rotate().flatten({ background: WHITE }).png().toBuffer();
    method = "flatten";
  }

  fs.writeFileSync(cached, png);
  return { png, method };
}

async function toCarouselJpeg(abs) {
  // Keep original photo (no subject cutout) — square crop for marquee tiles
  const buf = await sharp(abs)
    .rotate()
    .resize(800, 800, { fit: "cover", position: "centre" })
    .jpeg({ quality: 88 })
    .toBuffer();
  return { buf, method: "original" };
}

function hasCommittedGlasses() {
  try {
    return fs.readdirSync(outDir).some((f) => /^glass-\d+\.jpg$/i.test(f));
  } catch {
    return false;
  }
}

(async () => {
  if (!sourceDirs.length) {
    console.warn("sync-sunglasses: no source folder — keeping existing public/sunglasses");
    process.exit(0);
  }

  const files = collectFiles();
  if (!files.length) {
    console.warn("sync-sunglasses: no images found");
    process.exit(0);
  }

  if (!IS_MAC && process.env.VERCEL && hasCommittedGlasses()) {
    console.log(
      "sync-sunglasses: Vercel build — using committed public/sunglasses (run sync locally on Mac)"
    );
    process.exit(0);
  }

  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) {
    if (/^glass-\d+\.jpg$/i.test(f)) fs.unlinkSync(path.join(outDir, f));
  }

  let i = 0;
  for (const abs of files) {
    i++;
    const out = path.join(outDir, `glass-${String(i).padStart(2, "0")}.jpg`);
    const { buf, method } = await toCarouselJpeg(abs);
    fs.writeFileSync(out, buf);
    console.log(path.basename(abs), "→", path.basename(out), `(${method})`);
  }

  console.log(
    `sync-sunglasses: ${files.length} image(s) · engine: ${IS_MAC ? "macOS Vision (clean)" : "fallback"}`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
