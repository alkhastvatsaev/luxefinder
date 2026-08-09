import Link from "next/link";
import type { ReactNode } from "react";

/** Primary CTA from SEO pages back to the minimal app home. */
export function SeoTryCta({ source }: { source?: string }) {
  const href = source ? `/?from=${encodeURIComponent(source)}` : "/";
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={href}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071E3] px-5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Essayer LuxeFinder
      </Link>
      <Link
        href="/comment-ca-marche"
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-white/80 px-5 text-sm font-medium text-black/70 transition hover:border-black/20"
      >
        Comment ça marche
      </Link>
    </div>
  );
}

export function SeoShell({
  children,
  crumb,
}: {
  children: ReactNode;
  crumb?: { href: string; label: string };
}) {
  return (
    <div className="min-h-screen bg-white text-[#141414]">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            LuxeFinder
          </Link>
          <nav className="flex items-center gap-4 text-xs font-medium text-black/55">
            <Link href="/articles" className="hover:text-black">
              Articles
            </Link>
            <Link href="/guide" className="hover:text-black">
              Guides
            </Link>
            <Link href="/marques" className="hover:text-black">
              Marques
            </Link>
            <Link href="/" className="rounded-full bg-black px-3 py-1.5 text-white hover:bg-black/85">
              App
            </Link>
          </nav>
        </div>
      </header>
      <main className="relative mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        {crumb ? (
          <Link href={crumb.href} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
            ← {crumb.label}
          </Link>
        ) : null}
        {children}
        <footer className="mt-16 border-t border-black/[0.06] pt-6 text-xs text-black/40">
          <div className="flex flex-wrap gap-4">
            <Link href="/mentions-legales" className="hover:text-black/70">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-black/70">
              Confidentialité
            </Link>
            <Link href="/faq" className="hover:text-black/70">
              FAQ
            </Link>
          </div>
          <p className="mt-3">LuxeFinder — photo, budget, vendeurs. Contenu informatif.</p>
        </footer>
      </main>
    </div>
  );
}
