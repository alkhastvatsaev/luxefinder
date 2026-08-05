/**
 * Simple ROI crops without native image libs (pure JPEG/PNG re-encode not available).
 * We use OBJECT_LOCALIZATION bounding boxes when available by asking Vision on
 * center / corner crops built via canvas-free approach: sharp is not installed,
 * so we implement center-crop using a minimal PNG crop only when buffer is PNG,
 * otherwise skip binary crop and rely on full-frame + optional Product Search.
 *
 * Practical approach on Vercel: use `sharp` if available, else return [].
 */

export type CropSpec = { name: string; bytes: ArrayBuffer };

async function trySharp() {
  try {
    // dynamic optional dependency
    const sharp = (await import("sharp")).default;
    return sharp;
  } catch {
    return null;
  }
}

/** Produce center + upper-third (hardware) crops for bag photos. */
export async function makeRoiCrops(bytes: ArrayBuffer): Promise<CropSpec[]> {
  const sharp = await trySharp();
  if (!sharp) return [];

  const buf = Buffer.from(bytes);
  const img = sharp(buf);
  const meta = await img.metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  if (w < 64 || h < 64) return [];

  const crops: CropSpec[] = [];

  // Center 70%
  const cw = Math.floor(w * 0.7);
  const ch = Math.floor(h * 0.7);
  const cl = Math.floor((w - cw) / 2);
  const ct = Math.floor((h - ch) / 2);
  const center = await sharp(buf)
    .extract({ left: cl, top: ct, width: cw, height: ch })
    .jpeg({ quality: 85 })
    .toBuffer();
  crops.push({ name: "center", bytes: center.buffer.slice(center.byteOffset, center.byteOffset + center.byteLength) });

  // Upper middle (logo / twist lock zone)
  const uw = Math.floor(w * 0.55);
  const uh = Math.floor(h * 0.45);
  const ul = Math.floor((w - uw) / 2);
  const ut = Math.floor(h * 0.12);
  const upper = await sharp(buf)
    .extract({ left: ul, top: ut, width: uw, height: Math.min(uh, h - ut) })
    .jpeg({ quality: 85 })
    .toBuffer();
  crops.push({
    name: "hardware",
    bytes: upper.buffer.slice(upper.byteOffset, upper.byteOffset + upper.byteLength),
  });

  return crops;
}
