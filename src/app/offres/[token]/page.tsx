"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Globe2, Loader2, Lock } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { luxefinderApi } from "@/lib/api";

export default function OffresChoicePage() {
  const params = useParams();
  const token = String(params.token || "");
  const [product, setProduct] = useState("");
  const [photo, setPhoto] = useState("");
  const [budget, setBudget] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const v = await luxefinderApi.client(token);
      const ai = (v?.ai_description || {}) as { summary?: string; brand?: string; model?: string };
      const title =
        String(v?.user_edit || "").trim() ||
        [ai.brand, ai.model].filter(Boolean).join(" ").trim() ||
        String(ai.summary || "").trim();
      setProduct(title);
      setPhoto(luxefinderApi.photoUrl(String(v?.photo_url || "")));
      setBudget(v?.client_budget != null ? Number(v.client_budget) : null);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-foreground/30" />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-lg flex-col px-5 pb-16 pt-6">
      <header className="mb-8 flex items-center justify-between">
        <BrandMark />
      </header>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          className="mx-auto mb-5 h-28 w-28 rounded-[1.25rem] object-cover shadow-soft ring-1 ring-black/[0.04]"
        />
      )}

      {product && (
        <h1 className="text-balance text-center text-[22px] font-semibold leading-tight tracking-[-0.03em] text-foreground">
          {product}
        </h1>
      )}
      {budget != null && (
        <p className="mt-1.5 text-center text-[13px] text-foreground/45">
          Budget {budget.toLocaleString("fr-FR")} €
        </p>
      )}

      <p className="mt-8 text-center text-[14px] font-medium text-foreground/55">
        Comment voulez-vous trouver des vendeurs ?
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <Link
          href={`/offres/${token}/web`}
          className="group flex w-full items-start gap-3 rounded-[1.35rem] bg-foreground px-5 py-4 text-left text-white transition active:scale-[0.99]"
        >
          <Globe2 className="mt-0.5 size-5 shrink-0 opacity-80" strokeWidth={1.75} />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold tracking-[-0.02em]">
              Chercher sur internet
            </span>
            <span className="mt-1 block text-[12px] leading-snug text-white/65">
              USA · Europe · Asie · Afrique — annonces et boutiques qui vendent ce modèle maintenant.
            </span>
          </span>
          <ArrowRight className="mt-0.5 size-4 shrink-0 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-90" />
        </Link>

        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-start gap-3 rounded-[1.35rem] bg-muted/80 px-5 py-4 text-left ring-1 ring-black/[0.04]"
        >
          <Lock className="mt-0.5 size-5 shrink-0 text-foreground/25" strokeWidth={1.75} />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-foreground/40">
              Deuxième voie
              <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/35">
                Bientôt
              </span>
            </span>
            <span className="mt-1 block text-[12px] leading-snug text-foreground/30">
              Une autre façon de trouver des vendeurs — on l’activera juste après.
            </span>
          </span>
        </button>
      </div>
    </main>
  );
}
