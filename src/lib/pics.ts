import { readdirSync } from "fs";
import path from "path";

/** Product photos from public/pics (generated at build via sync-pics). */
export function listPicsSlides(): { src: string; alt: string; title: string }[] {
  const dir = path.join(process.cwd(), "public", "pics");
  let files: string[] = [];
  try {
    files = readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort();
  } catch {
    files = [];
  }

  // Fallback legacy sacs folder if pics not synced yet
  if (!files.length) {
    try {
      const legacy = path.join(process.cwd(), "public", "sacs");
      files = readdirSync(legacy)
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
        .sort();
      if (files.length) {
        return files.map((f, i) => ({
          src: `/sacs/${f}`,
          alt: `Article luxe ${i + 1}`,
          title: "",
        }));
      }
    } catch {
      /* ignore */
    }
  }

  return files.map((f, i) => ({
    src: `/pics/${f}?v=7`,
    alt: `Article luxe ${i + 1}`,
    title: "",
  }));
}
