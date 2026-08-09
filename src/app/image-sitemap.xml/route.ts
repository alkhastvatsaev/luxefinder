import { ARTICLE_CATALOG, articleAbsoluteImageUrl, articleUrl } from "@/lib/article-catalog";

export const dynamic = "force-static";

/** Dedicated image sitemap for Google Images (LuxeFinder branding in title/caption). */
export async function GET() {
  const urls = ARTICLE_CATALOG.map((a) => {
    const page = articleUrl(a.slug);
    const img = articleAbsoluteImageUrl(a);
    const title = escapeXml(a.imageAlt);
    const caption = escapeXml(a.imageCaption);
    return `  <url>
    <loc>${page}</loc>
    <image:image>
      <image:loc>${img}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${caption}</image:caption>
    </image:image>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
