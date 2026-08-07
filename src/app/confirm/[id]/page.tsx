"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { AiDescription, ProductCandidate, luxefinderApi } from "@/lib/api";

type Stored = {
  request_id: number;
  client_token: string;
  photo_url: string;
  ai_description: AiDescription;
};

function draftFromAi(ai: AiDescription, pick?: ProductCandidate) {
  if (pick) return [pick.brand, pick.model].filter(Boolean).join(" ");
  if (ai.product_name) return ai.product_name;
  return [ai.brand, ai.model].filter(Boolean).join(" ");
}

export default function ConfirmPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [data, setData] = useState<Stored | null>(null);
  const [edit, setEdit] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`luxefinder:${id}`);
    if (!raw) {
      setError("Session expirée");
      return;
    }
    const parsed = JSON.parse(raw) as Stored;
    setData(parsed);
    const ai = parsed.ai_description || {};
    const cands = ai.candidates || [];
    setSelectedIdx(0);
    setEdit(draftFromAi(ai, cands[0]));
  }, [id]);

  function pickCandidate(i: number) {
    if (!data) return;
    setSelectedIdx(i);
    const c = data.ai_description.candidates?.[i];
    setEdit(draftFromAi(data.ai_description, c));
  }

  async function confirm() {
    if (!data) return;
    setBusy(true);
    setError(null);
    try {
      const res = await luxefinderApi.confirm({
        request_id: data.request_id,
        user_edit: edit,
      });
      router.push(`/r/${res.client_token}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setBusy(false);
    }
  }

  if (!data && !error) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-foreground/30" />
      </main>
    );
  }

  const photo = data ? luxefinderApi.photoUrl(data.photo_url) : "";
  const ai = data?.ai_description;
  const candidates = ai?.candidates || [];
  const links = (ai?.match_links || []).slice(0, 10);

  const kindDot: Record<string, string> = {
    official: "bg-foreground",
    resale: "bg-foreground/40",
    shopping: "bg-foreground/25",
    other: "bg-foreground/15",
  };

  return (
    <main className="mx-auto min-h-[100dvh] max-w-lg px-5 pb-28 pt-6">
      <header className="mb-8 flex items-center justify-between">
        <BrandMark />
        <span className="text-[12px] text-muted-foreground">1 / 2</span>
      </header>

      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          className="mx-auto mb-8 h-48 w-48 rounded-[1.75rem] object-cover shadow-soft ring-1 ring-black/[0.04] animate-rise"
        />
      )}

      <input
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
        aria-label="Nom du produit"
        className="animate-rise w-full bg-transparent text-center text-[28px] font-semibold leading-tight tracking-[-0.03em] text-foreground outline-none placeholder:text-foreground/20"
        placeholder="Nom du produit"
      />

      {candidates.length > 1 && (
        <div className="animate-rise-delay mt-6 flex flex-wrap justify-center gap-2">
          {candidates.map((c, i) => (
            <button
              key={`${c.brand}-${c.model}-${i}`}
              type="button"
              onClick={() => pickCandidate(i)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                selectedIdx === i
                  ? "bg-foreground text-white"
                  : "bg-muted text-foreground/70 hover:bg-black/[0.06]"
              }`}
            >
              {c.model || c.brand}
            </button>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <section className="animate-rise-delay mt-10">
          <ul className="divide-y divide-black/[0.06] overflow-hidden rounded-[1.5rem] bg-muted/80 ring-1 ring-black/[0.03]">
            {links.map((m) => (
              <li key={`${m.rank}-${m.link}`}>
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-white/60 active:bg-white"
                >
                  <span className={`size-1.5 shrink-0 rounded-full ${kindDot[m.kind] || kindDot.other}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium tracking-tight text-foreground">
                      {m.source}
                    </span>
                    <span className="block truncate text-[12px] text-muted-foreground">
                      {m.title}
                    </span>
                  </span>
                  {m.price && (
                    <span className="shrink-0 text-[12px] font-medium text-foreground/70">{m.price}</span>
                  )}
                  <ArrowUpRight className="size-4 shrink-0 text-foreground/25" strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {error && <p className="mt-6 text-center text-sm text-red-500">{error}</p>}
      {error === "Session expirée" && (
        <p className="mt-2 text-center">
          <Link href="/" className="text-sm font-medium underline">
            Recommencer
          </Link>
        </p>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.04] bg-white/80 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            disabled={busy || !edit.trim()}
            onClick={confirm}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-[15px] font-semibold text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
          >
            {busy ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <Check className="size-4" strokeWidth={2.5} />
                Continuer
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
