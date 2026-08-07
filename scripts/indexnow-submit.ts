/**
 * Submit all LuxeFinder SEO URLs to IndexNow (Bing + partners).
 *
 * Usage:
 *   INDEXNOW_KEY=... npx tsx scripts/indexnow-submit.ts
 *   npm run indexnow
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { allSeoUrls } from "../src/lib/seo-url-catalog";
import { submitIndexNowBatched } from "../src/lib/indexnow";

function loadEnvFile(name: string) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main() {
  loadEnvFile(".env.local");
  loadEnvFile(".env");
  if (!process.env.INDEXNOW_KEY) {
    const fallback = resolve(process.cwd(), "docs/seo/.indexnow-key");
    if (existsSync(fallback)) {
      process.env.INDEXNOW_KEY = readFileSync(fallback, "utf8").trim();
    }
  }

  const urls = allSeoUrls();
  console.log(`IndexNow: submitting ${urls.length} URLs for luxefinder.app …`);
  const results = await submitIndexNowBatched(urls, 100);
  for (const [i, r] of results.entries()) {
    console.log(
      `  batch ${i + 1}: status=${r.status} ok=${r.ok} count=${r.submitted}${r.body ? ` body=${JSON.stringify(r.body)}` : ""}`
    );
  }
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`IndexNow: ${failed.length} batch(es) failed`);
    process.exit(1);
  }
  console.log("IndexNow: done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
