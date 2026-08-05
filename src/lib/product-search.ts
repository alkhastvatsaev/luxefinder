/**
 * Google Vision Product Search — optional own luxury catalog.
 * Requires:
 *   GOOGLE_VISION_API_KEY (or OAuth)
 *   PRODUCT_SEARCH_PROJECT
 *   PRODUCT_SEARCH_LOCATION (e.g. us-west1)
 *   PRODUCT_SEARCH_PRODUCT_SET
 */

export type ProductSearchHit = {
  title: string;
  productName?: string;
  score: number;
};

export function hasProductSearchConfig(): boolean {
  return Boolean(
    process.env.PRODUCT_SEARCH_PROJECT &&
      process.env.PRODUCT_SEARCH_LOCATION &&
      process.env.PRODUCT_SEARCH_PRODUCT_SET &&
      (process.env.GOOGLE_VISION_API_KEY || process.env.GOOGLE_CLOUD_VISION_API_KEY)
  );
}

export async function searchLuxuryCatalog(bytes: ArrayBuffer): Promise<ProductSearchHit[]> {
  if (!hasProductSearchConfig()) return [];

  const project = process.env.PRODUCT_SEARCH_PROJECT!;
  const location = process.env.PRODUCT_SEARCH_LOCATION!;
  const productSet = process.env.PRODUCT_SEARCH_PRODUCT_SET!;
  const key = (
    process.env.GOOGLE_VISION_API_KEY ||
    process.env.GOOGLE_CLOUD_VISION_API_KEY ||
    ""
  ).trim();

  const productSetPath = `projects/${project}/locations/${location}/productSets/${productSet}`;
  const b64 = Buffer.from(bytes).toString("base64");

  try {
    const r = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: [
            {
              image: { content: b64 },
              features: [{ type: "PRODUCT_SEARCH", maxResults: 5 }],
              imageContext: {
                productSearchParams: {
                  productSet: productSetPath,
                  productCategories: ["apparel-v2", "homegoods-v2", "toys-v2", "packagedgoods-v1"],
                  filter: "",
                },
              },
            },
          ],
        }),
      }
    );
    if (!r.ok) {
      console.error("product_search http", r.status, await r.text().catch(() => ""));
      return [];
    }
    const data = await r.json();
    const results =
      data?.responses?.[0]?.productSearchResults?.results ||
      data?.responses?.[0]?.productSearchResults?.productGroupedResults?.[0]?.results ||
      [];
    return (results as Array<Record<string, unknown>>).slice(0, 5).map((row) => {
      const product = (row.product as Record<string, unknown>) || {};
      const display = String(product.displayName || product.name || "catalog hit");
      return {
        title: display,
        productName: String(product.name || ""),
        score: Number(row.score ?? 0.7),
      };
    });
  } catch (e) {
    console.error("product_search failed", e);
    return [];
  }
}
