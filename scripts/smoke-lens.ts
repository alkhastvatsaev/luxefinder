import { readFileSync } from "fs";
import { put } from "@vercel/blob";
import { bestLensTitle, fetchGoogleLensByUrl, rankMatchLinks } from "../src/lib/google-lens";

async function main() {
  const img = process.argv[2];
  if (!img) throw new Error("Usage: tsx scripts/smoke-lens.ts <image>");
  const bytes = readFileSync(img);
  const blob = await put(`tmp/lens-test-${Date.now()}.png`, bytes, {
    access: "public",
    contentType: "image/png",
    addRandomSuffix: true,
  });
  console.log("blob", blob.url);
  const products = await fetchGoogleLensByUrl(blob.url, { timeoutMs: 25_000 });
  console.log("products", products.length);
  console.log(JSON.stringify(products.slice(0, 8), null, 2));
  console.log("best", bestLensTitle(products));
  console.log("ranked", JSON.stringify(rankMatchLinks(products, 10), null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
