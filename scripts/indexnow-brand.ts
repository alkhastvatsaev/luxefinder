/**
 * Submit brand-priority URLs to IndexNow (home, a-propos, faq, etc.).
 *
 * Usage:
 *   npx tsx scripts/indexnow-brand.ts
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { submitIndexNow } from "../src/lib/indexnow";

const BRAND_URLS = [
  "https://luxefinder.app/",
  "https://luxefinder.app/a-propos",
  "https://luxefinder.app/faq",
  "https://luxefinder.app/comment-ca-marche",
  "https://luxefinder.app/guide",
  "https://luxefinder.app/marques",
];

function loadEnvFile(name: string) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2].trim().replace(/^["']|["']$/g, "");
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

  console.log(`IndexNow brand cluster: submitting ${BRAND_URLS.length} URLs …`);
  const result = await submitIndexNow(BRAND_URLS);
  console.log(`  status=${result.status} ok=${result.ok} count=${result.submitted}`);
  if (!result.ok) {
    console.error(`IndexNow failed: ${result.body}`);
    process.exit(1);
  }
  console.log("IndexNow brand cluster: done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
