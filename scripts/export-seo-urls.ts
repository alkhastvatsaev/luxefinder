/**
 * Export SEO URLs for Google Search Console manual inspection / records.
 *
 *   npx tsx scripts/export-seo-urls.ts
 *   npm run seo:export-urls
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { allSeoUrls, gscPriorityUrls } from "../src/lib/seo-url-catalog";

function main() {
  const dir = resolve(process.cwd(), "docs/seo");
  mkdirSync(dir, { recursive: true });

  const all = allSeoUrls();
  const p0 = gscPriorityUrls();

  writeFileSync(resolve(dir, "URLS_ALL.txt"), all.join("\n") + "\n", "utf8");
  writeFileSync(resolve(dir, "URLS_TO_SUBMIT.txt"), p0.join("\n") + "\n", "utf8");

  console.log(`Wrote ${all.length} URLs → docs/seo/URLS_ALL.txt`);
  console.log(`Wrote ${p0.length} P0 URLs → docs/seo/URLS_TO_SUBMIT.txt`);
}

main();
