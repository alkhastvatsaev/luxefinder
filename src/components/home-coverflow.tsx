"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Search } from "lucide-react";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { luxmatchApi } from "@/lib/api";

type Props = {
  bagSlides: { src: string; alt: string; title: string }[];
};

export default function HomeCoverflow({ bagSlides }: Props) {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slides: CoverflowSlide[] = useMemo(() => {
    const mid = Math.ceil(bagSlides.length / 2);
    const left = bagSlides.slice(0, mid).map((b) => ({
      kind: "image" as const,
      src: b.src,
      alt: b.alt,
      title: b.title,
      subtitle: "Inspiration",
    }));
    const right = bagSlides.slice(mid).map((b) => ({
      kind: "image" as const,
      src: b.src,
      alt: b.alt,
      title: b.title,
      subtitle: "Inspiration",
    }));
    return [
      ...left,
      {
        kind: "upload" as const,
        alt: "Déposer une photo pour Google Lens",
        title: "Chercher",
        subtitle: "Google Lens",
      },
      ...right,
    ];
  }, [bagSlides]);

  const uploadIndex = useMemo(
    () => slides.findIndex((s) => s.kind === "upload"),
    [slides]
  );

  const onFile = useCallback(
    async (file: File | null) => {
      if (!file || busy) return;
      if (!file.type.startsWith("image/")) {
        setError("Image uniquement (jpg, png, webp)");
        return;
      }
      setBusy(true);
      setError(null);
      try {
        const res = await luxmatchApi.analyze(file);
        sessionStorage.setItem(
          `luxmatch:${res.request_id}`,
          JSON.stringify({
            request_id: res.request_id,
            client_token: res.client_token,
            photo_url: res.photo_url,
            ai_description: res.ai_description,
          })
        );
        router.push(`/confirm/${res.request_id}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur analyse");
        setBusy(false);
      }
    },
    [busy, router]
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-3 pb-16 pt-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,165,116,0.14),_transparent_55%)]" />

      <p className="relative z-10 mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
        LuxMatch
      </p>
      <h1 className="font-display relative z-10 mb-2 text-center text-3xl font-semibold tracking-tight md:text-5xl">
        Trouvez le modèle exact
      </h1>
      <p className="relative z-10 mb-8 max-w-md text-center text-sm text-muted-foreground">
        Glissez le carrousel · déposez une photo au centre · Google Lens retrouve le sac et les sites
        d’occasion.
      </p>

      <div className="relative z-10 w-full max-w-5xl">
        <CoverflowCarousel
          slides={slides}
          initialIndex={uploadIndex >= 0 ? uploadIndex : 0}
          showCaption
          showNavigation
          label="Carrousel sacs luxe"
          cardWidth="clamp(160px, 28vw, 280px)"
          rotate={40}
          depth={0.55}
          perspective={2.8}
          renderUpload={(active) => (
            <label
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragging(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragging(false);
                onFile(e.dataTransfer.files?.[0] || null);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 px-4 text-center transition ${
                dragging || active ? "bg-accent/10" : "bg-background/60"
              } ${busy ? "pointer-events-none opacity-70" : ""}`}
            >
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={busy}
                onChange={(e) => onFile(e.target.files?.[0] || null)}
              />
              {busy ? (
                <Loader2 className="size-8 animate-spin text-accent" />
              ) : (
                <span className="flex size-14 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
                  <ImagePlus className="size-7" />
                </span>
              )}
              <span className="font-display text-lg font-semibold text-foreground">
                {busy ? "Analyse…" : "Déposer une photo"}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                <Search className="size-3.5" />
                Google Lens
              </span>
            </label>
          )}
        />
      </div>

      {error && <p className="relative z-10 mt-6 text-sm text-rose-300">{error}</p>}

      <p className="relative z-10 mt-10 text-[11px] text-white/30">
        Ajoutez des images dans <code className="text-white/45">public/sacs/</code> — elles
        apparaîtront ici.
      </p>
    </main>
  );
}
