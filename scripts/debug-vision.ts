import { readFileSync } from "fs";

async function main() {
  const img = process.argv[2];
  const key = process.env.GOOGLE_VISION_API_KEY;
  if (!img || !key) throw new Error("need image arg + GOOGLE_VISION_API_KEY");
  const b64 = readFileSync(img).toString("base64");
  const r = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        {
          image: { content: b64 },
          features: [
            { type: "WEB_DETECTION", maxResults: 20 },
            { type: "LOGO_DETECTION", maxResults: 5 },
            { type: "TEXT_DETECTION", maxResults: 3 },
            { type: "IMAGE_PROPERTIES" },
          ],
        },
      ],
    }),
  });
  const data = await r.json();
  const resp = data.responses[0];
  console.log("http", r.status, "err", resp.error);
  const web = resp.webDetection || {};
  console.log("best", web.bestGuessLabels);
  console.log(
    "entities",
    (web.webEntities || []).slice(0, 10).map((e: { description?: string; score?: number }) => `${e.description}:${e.score}`)
  );
  console.log(
    "pages",
    (web.pagesWithMatchingImages || [])
      .slice(0, 8)
      .map((p: { pageTitle?: string; url?: string }) => ({ t: p.pageTitle, u: p.url }))
  );
  console.log(
    "counts full/partial/similar",
    (web.fullMatchingImages || []).length,
    (web.partialMatchingImages || []).length,
    (web.visuallySimilarImages || []).length
  );
  console.log("logos", resp.logoAnnotations);
  console.log("ocr", (resp.textAnnotations?.[0]?.description || "").slice(0, 120));
  console.log(
    "colors",
    (resp.imagePropertiesAnnotation?.dominantColors?.colors || []).slice(0, 4)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
