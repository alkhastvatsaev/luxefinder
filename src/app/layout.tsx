import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";
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
  alt: "LuxeFinder — photo, budget, vendeurs de luxe",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "LuxeFinder — photo + budget → vendeurs de sacs de luxe",
    template: "%s | LuxeFinder",
  },
  description:
    "Envoyez une photo de sac ou accessoire de luxe, indiquez votre budget — LuxeFinder trouve des pistes de vendeurs. App gratuite.",
  applicationName: "LuxeFinder",
  keywords: [
    "LuxeFinder",
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
    title: "LuxeFinder — photo + budget → vendeurs de sacs de luxe",
    description: "Photo + budget → pistes vendeurs pour sacs et accessoires de luxe.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeFinder — photo, budget, vendeurs",
    description: "Photo. Budget. Offres vendeurs.",
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
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
