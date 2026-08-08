"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt?: string;
  onClose: () => void;
};

/** Fullscreen preview for home marquee tiles — click backdrop / Esc / X to close. */
export function ImageLightbox({ src, alt = "", onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Aperçu de l’image"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-5 animate-lightbox-in sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-soft ring-1 ring-black/[0.06] transition hover:bg-white"
      >
        <X className="size-5" strokeWidth={2} />
      </button>

      <div
        className={cn(
          "relative flex max-h-[min(88vh,920px)] max-w-[min(92vw,720px)] items-center justify-center",
          "animate-lightbox-image"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[min(88vh,920px)] max-w-full rounded-[1.5rem] object-contain shadow-soft ring-1 ring-white/20"
          draggable={false}
        />
      </div>
    </div>
  );
}
