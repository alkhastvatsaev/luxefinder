/** IndexNow client — notify Bing (and IndexNow partners) of URL updates. */

const HOST = "luxefinder.app";
const ENDPOINT = "https://api.indexnow.org/indexnow";

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: number;
  body: string;
};

export function getIndexNowKey(): string {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) {
    throw new Error(
      "INDEXNOW_KEY manquant. Définis-la dans .env.local (voir docs/seo/INDEXNOW.md)."
    );
  }
  return key;
}

/** Submit up to ~10k URLs; caller should batch ~100 for safety. */
export async function submitIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = getIndexNowKey();
  const unique = [...new Set(urls.map((u) => u.trim()).filter(Boolean))];
  if (unique.length === 0) {
    return { ok: true, status: 200, submitted: 0, body: "empty" };
  }

  const payload = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList: unique,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await res.text().catch(() => "");
  // IndexNow: 200 OK, 202 Accepted are success
  const ok = res.status === 200 || res.status === 202;
  return { ok, status: res.status, submitted: unique.length, body: body.slice(0, 500) };
}

export async function submitIndexNowBatched(
  urls: string[],
  batchSize = 100
): Promise<IndexNowResult[]> {
  const results: IndexNowResult[] = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const chunk = urls.slice(i, i + batchSize);
    results.push(await submitIndexNow(chunk));
  }
  return results;
}
