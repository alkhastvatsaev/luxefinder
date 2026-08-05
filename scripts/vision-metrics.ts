/**
 * Offline metrics harness for luxury resolve + KB (no network).
 * Run: npx tsx scripts/vision-metrics.ts
 */
import { resolveLuxuryProduct, type VisionSignals } from "../src/lib/luxury-resolve";

type Case = {
  name: string;
  expectBrand: string;
  expectModelIncludes: string;
  signals: VisionSignals;
};

const cases: Case[] = [
  {
    name: "LV Lockme via trusted title",
    expectBrand: "Louis Vuitton",
    expectModelIncludes: "Lockme",
    signals: {
      logos: [{ description: "Louis Vuitton", score: 0.95 }],
      labels: [{ description: "Handbag", score: 0.9 }],
      ocr: "LOUIS VUITTON PARIS",
      bestGuess: "tote bag",
      webEntities: [{ description: "Handbag", score: 0.5 }],
      pages: [
        {
          url: "https://eu.louisvuitton.com/eng-e1/products/lockme-tote",
          title: "Louis Vuitton Lockme Tote Black",
          score: 0.9,
        },
      ],
      dominantColor: { r: 20, g: 20, b: 20 },
    },
  },
  {
    name: "LV Lock Go from page title",
    expectBrand: "Louis Vuitton",
    expectModelIncludes: "Lock Go",
    signals: {
      logos: [{ description: "Louis Vuitton", score: 0.9 }],
      labels: [{ description: "Bag", score: 0.8 }],
      ocr: "LOUIS VUITTON",
      bestGuess: "tote bag",
      webEntities: [],
      pages: [
        {
          url: "https://www.farfetch.com/shopping/lock-go-pm",
          title: "Louis Vuitton Lock Go PM black grained leather",
          score: 0.85,
        },
      ],
      dominantColor: { r: 15, g: 15, b: 18 },
    },
  },
  {
    name: "Chanel Classic Flap",
    expectBrand: "Chanel",
    expectModelIncludes: "Classic Flap",
    signals: {
      logos: [{ description: "Chanel", score: 0.92 }],
      labels: [{ description: "Handbag", score: 0.88 }],
      ocr: "",
      bestGuess: "shoulder bag",
      webEntities: [{ description: "Chanel", score: 0.8 }],
      pages: [
        {
          url: "https://www.chanel.com/classic-flap",
          title: "Classic Handbag - CHANEL",
          score: 0.9,
        },
        {
          url: "https://www.fashionphile.com/p/chanel-classic-flap",
          title: "Chanel Classic Flap Medium Black Caviar",
          score: 0.88,
        },
      ],
    },
  },
  {
    name: "Replica heavy → authenticity flag",
    expectBrand: "Louis Vuitton",
    expectModelIncludes: "Speedy",
    signals: {
      logos: [{ description: "Louis Vuitton", score: 0.8 }],
      labels: [],
      ocr: "",
      bestGuess: "handbag",
      webEntities: [],
      pages: [
        { url: "https://replica-bags.example/speedy", title: "1:1 Louis Vuitton Speedy replica", score: 0.9 },
        { url: "https://fake-lv.example/x", title: "AAA+ Speedy fake", score: 0.8 },
        { url: "https://mirror-bags.example/y", title: "miroir Speedy 30", score: 0.7 },
        {
          url: "https://eu.louisvuitton.com/speedy-30",
          title: "Speedy 30",
          score: 0.6,
        },
      ],
    },
  },
];

let pass = 0;
for (const c of cases) {
  const r = resolveLuxuryProduct(c.signals);
  const brandOk = r.brand.toLowerCase().includes(c.expectBrand.toLowerCase().split(" ")[0]);
  const modelOk = r.model.toLowerCase().includes(c.expectModelIncludes.toLowerCase());
  const ok = brandOk && modelOk;
  if (ok) pass += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"} ${c.name} → ${r.brand} / ${r.model} (conf ${r.confidence}, replica ${r.replicaHits}, trusted ${r.trustedHits}, uncertain ${r.authenticity_uncertain})`
  );
  if (r.candidates.length) {
    console.log(
      "  candidates:",
      r.candidates.map((x) => `${x.brand} ${x.model} ${x.score.toFixed(2)}`).join(" | ")
    );
  }
}

console.log(`\nScore: ${pass}/${cases.length} (${((pass / cases.length) * 100).toFixed(0)}% brand+model)`);
process.exit(pass === cases.length ? 0 : 1);
