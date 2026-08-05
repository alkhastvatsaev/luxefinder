import { readFileSync } from "fs";
import { extractVisionSignals } from "../src/lib/google-vision";
import { resolveLuxuryProduct } from "../src/lib/luxury-resolve";
import { fromResolvedOnly, synthesizeLuxuryProduct } from "../src/lib/synthesize-product";

async function main() {
  const path = process.argv[2];
  if (!path) {
    console.error("Usage: tsx scripts/smoke-analyze.ts <image>");
    process.exit(1);
  }
  const bytes = readFileSync(path);
  const signals = await extractVisionSignals(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const resolved = resolveLuxuryProduct(signals);
  const synth =
    (await synthesizeLuxuryProduct(signals, resolved, {
      imageBytes: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
      contentType: "image/png",
    })) || fromResolvedOnly(signals, resolved);
  console.log(
    JSON.stringify(
      {
        brand: synth.brand,
        model: synth.model,
        color: synth.color,
        material: synth.material,
        provider: synth.provider,
        conf: synth.confidence,
        candidates: synth.candidates,
        best: signals.bestGuess,
        pages: signals.pages.slice(0, 4).map((p) => p.title),
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
