import { readdirSync } from "fs";
import path from "path";

type Slide = { src: string; alt: string; title: string };

function listImagesIn(dir: string): string[] {
  try {
    return readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort();
  } catch {
    return [];
  }
}

/** Product photos from public/pics (generated at build via sync-pics). */
export function listPicsSlides(): Slide[] {
  const files = listImagesIn(path.join(process.cwd(), "public", "pics"));

  // Fallback legacy sacs folder if pics not synced yet
  if (!files.length) {
    const legacy = listImagesIn(path.join(process.cwd(), "public", "sacs"));
    if (legacy.length) {
      return legacy.map((f, i) => ({
        src: `/sacs/${f}`,
        alt: `Article luxe ${i + 1}`,
        title: "",
      }));
    }
  }

  return files.map((f, i) => ({
    src: `/pics/${f}?v=9`,
    alt: `Article luxe ${i + 1}`,
    title: "",
  }));
}

/** Sunglasses from public/sunglasses (top home marquee via sync-sunglasses). */
export function listSunglassesSlides(): Slide[] {
  const files = listImagesIn(path.join(process.cwd(), "public", "sunglasses"));
  return files.map((f, i) => ({
    src: `/sunglasses/${f}?v=5`,
    alt: `Lunettes de soleil ${i + 1}`,
    title: "",
  }));
}

/** Jewelry from public/jewelry (mid home marquee via sync-jewelry). */
export function listJewelrySlides(): Slide[] {
  const files = listImagesIn(path.join(process.cwd(), "public", "jewelry"));
  return files.map((f, i) => ({
    src: `/jewelry/${f}?v=3`,
    alt: `Bijou ${i + 1}`,
    title: "",
  }));
}
