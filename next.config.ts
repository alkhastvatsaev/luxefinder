import type { NextConfig } from "next";

/** Former grey / counterfeit SEO URLs → legitimate anti-scam guide. */
const GREY_REDIRECT_SLUGS = [
  "comment-commander-yupoo",
  "yupoo-vs-weidian",
  "acheter-louis-vuitton-replique",
  "acheter-hermes-replique",
  "acheter-chanel-replique",
  "acheter-dior-replique",
  "acheter-gucci-replique",
  "acheter-cartier-replique",
  "acheter-rolex-replique",
  "acheter-saint-laurent-replique",
  "acheter-bottega-replique",
  "acheter-fendi-replique",
  "acheter-celine-replique",
  "acheter-van-cleef-replique",
  "ou-acheter-replique-france",
  "meilleur-site-replique-france",
  "replique-sac-luxe-qualite",
  "yupoo-louis-vuitton",
  "yupoo-chanel",
  "replica-france-livraison",
  "sac-louis-vuitton-pas-cher",
  "copie-hermes-birkin",
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return GREY_REDIRECT_SLUGS.map((slug) => ({
      source: `/guide/${slug}`,
      destination: "/guide/eviter-arnaques-vendeurs",
      permanent: true,
    }));
  },
};

export default nextConfig;
