import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | LuxeFinder" },
  description: "Cette page n’existe pas ou a été déplacée. Retrouvez les guides et l’app LuxeFinder.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 text-[#141414]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page introuvable</h1>
      <p className="mt-3 text-sm leading-relaxed text-black/60">
        Le lien est incorrect ou la page a été retirée. Essayez l’app ou un guide ci-dessous.
      </p>
      <nav className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/" className="rounded-full bg-black px-4 py-2 font-medium text-white">
          App LuxeFinder
        </Link>
        <Link href="/guide" className="rounded-full border border-black/10 px-4 py-2 text-black/70">
          Guides
        </Link>
        <Link href="/articles" className="rounded-full border border-black/10 px-4 py-2 text-black/70">
          Articles
        </Link>
        <Link href="/marques" className="rounded-full border border-black/10 px-4 py-2 text-black/70">
          Marques
        </Link>
        <Link href="/faq" className="rounded-full border border-black/10 px-4 py-2 text-black/70">
          FAQ
        </Link>
      </nav>
    </main>
  );
}
