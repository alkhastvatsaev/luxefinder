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

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs de luxe",
    template: "%s | LuxeFinder",
  },
  description:
    "LuxeFinder (aussi écrit Luxe Finder) : envoyez une photo de sac ou accessoire de luxe, indiquez votre budget — on trouve des vendeurs et des offres. App gratuite sur luxefinder.app.",
  applicationName: "LuxeFinder",
  keywords: [
    "LuxeFinder",
    "Luxe Finder",
    "luxefinder",
    "trouver vendeur sac luxe",
    "sac luxe occasion photo",
  ],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE,
    siteName: "LuxeFinder",
    title: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs de luxe",
    description:
      "LuxeFinder : photo + budget → on trouve les vendeurs. Sacs et mode luxe.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeFinder — Luxe Finder",
    description: "Photo. Budget. Offres vendeurs. luxefinder.app",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  // Pas de `maximumScale` : bloquer le zoom échoue à WCAG 2.2 (1.4.4 et 1.4.10).
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
