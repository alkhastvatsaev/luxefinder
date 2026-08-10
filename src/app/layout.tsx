import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";
import { BRAND_JSON_LD } from "@/lib/brand-schema";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const SITE = "https://luxefinder.app";
const OG_IMAGE = {
  url: "/og-default.jpg",
  width: 1200,
  height: 1200,
  alt: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs de luxe",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs de luxe",
    template: "%s | LuxeFinder",
  },
  description:
    "LuxeFinder (Luxe Finder) sur luxefinder.app : envoyez une photo de sac ou accessoire de luxe, indiquez votre budget — trouvez des pistes de vendeurs. App gratuite.",
  applicationName: "LuxeFinder",
  keywords: [
    "LuxeFinder",
    "Luxe Finder",
    "luxefinder",
    "luxe finder",
    "luxefinder.app",
    "trouver vendeur sac luxe",
    "sac luxe occasion photo",
    "identifier modèle sac",
  ],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE,
    siteName: "LuxeFinder",
    title: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs de luxe",
    description:
      "LuxeFinder (Luxe Finder) sur luxefinder.app — photo + budget → pistes vendeurs pour sacs et accessoires de luxe.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs",
    description: "Luxe Finder · luxefinder.app · photo, budget, offres vendeurs.",
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${sans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BRAND_JSON_LD) }}
        />
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
