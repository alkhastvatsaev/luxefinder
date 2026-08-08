#!/usr/bin/env node
/**
 * Marquee JPEG export helpers.
 * Keeps original photos; if the source has real transparency, composite onto white
 * so JPEG tiles / Safari don't render a black hole.
 */
const sharp = require("sharp");

const WHITE = { r: 255, g: 255, b: 255 };

/**
 * True when the image has an alpha channel with at least some non-opaque pixels.
 * Opaque RGBA (hasAlpha but all α=255) returns false — no need to flatten.
 */
async function hasTransparentPixels(abs) {
  const meta = await sharp(abs).metadata();
  if (!meta.hasAlpha) return false;

  const { data, info } = await sharp(abs)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  if (channels < 4) return false;

  // Sample up to ~50k pixels for speed on large assets
  const pixels = info.width * info.height;
  const stride = Math.max(1, Math.floor(pixels / 50_000));
  for (let i = 0; i < pixels; i += stride) {
    if (data[i * channels + 3] < 250) return true;
  }
  return false;
}

/**
 * Square JPEG for home marquees.
 * @returns {{ buf: Buffer, method: string }}
 */
async function toCarouselJpeg(abs, size = 800) {
  const transparent = await hasTransparentPixels(abs);
  let pipeline = sharp(abs).rotate();

  if (transparent) {
    // Flatten alpha onto white before JPEG (no alpha support → black otherwise)
    pipeline = pipeline.flatten({ background: WHITE });
  }

  const buf = await pipeline
    .resize(size, size, { fit: "cover", position: "centre" })
    .jpeg({ quality: 88 })
    .toBuffer();

  return { buf, method: transparent ? "original+white-bg" : "original" };
}

module.exports = { WHITE, hasTransparentPixels, toCarouselJpeg };
