import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LuxeFinder (Luxe Finder)",
    short_name: "LuxeFinder",
    description:
      "LuxeFinder (Luxe Finder) — photo + budget pour trouver des vendeurs de sacs et accessoires de luxe.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "fr",
    icons: [
      {
        src: "/og-default.jpg",
        sizes: "1200x1200",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
