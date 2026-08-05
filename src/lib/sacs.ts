import { readdirSync } from "fs";
import path from "path";

/** Bags from public/sacs — add more images anytime, rebuild/redeploy. */
export function listSacsSlides(): { src: string; alt: string; title: string }[] {
  const dir = path.join(process.cwd(), "public", "sacs");
  let files: string[] = [];
  try {
    files = readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort();
  } catch {
    files = [];
  }
  return files.map((f, i) => ({
    src: `/sacs/${f}`,
    alt: `Sac luxe ${i + 1}`,
    title: `Sac ${i + 1}`,
  }));
}
