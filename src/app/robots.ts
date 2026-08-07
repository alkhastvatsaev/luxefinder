import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/confirm/", "/s/", "/r/"],
      },
    ],
    sitemap: "https://luxefinder.app/sitemap.xml",
    host: "https://luxefinder.app",
  };
}
