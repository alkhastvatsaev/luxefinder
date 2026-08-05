"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiDescription, ProductCandidate, luxmatchApi } from "@/lib/api";

type Stored = {
  request_id: number;
  client_token: string;
  photo_url: string;
  ai_description: AiDescription;
};

function draftFromAi(ai: AiDescription, pick?: ProductCandidate) {
  const brand = pick?.brand || ai.brand;
  const model = pick?.model || ai.model;
  return [brand, model, ai.color, ai.material, ai.summary].filter(Boolean).join(" — ");
}

export default function ConfirmPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [data, setData] = useState<Stored | null>(null);
  const [edit, setEdit] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`luxmatch:${id}`);
    if (!raw) {
      setError("Session expirée — déposez à nouveau une photo.");
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
      const res = await luxmatchApi.confirm({
        request_id: data.request_id,
        user_edit: edit,
        contact_email: email || undefined,
        contact_telegram: telegram || undefined,
      });
      router.push(`/r/${res.client_token}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setBusy(false);
    }
  }

  if (!data && !error) {
    return (
      <main className="flex min-h-screen items-center justify-center text-sm text-white/50">
        Chargement…
      </main>
    );
  }

  const photo = data ? luxmatchApi.photoUrl(data.photo_url) : "";
  const ai = data?.ai_description;
  const candidates = ai?.candidates || [];

  return (
    <main className="mx-auto min-h-screen max-w-lg px-5 py-12">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">LuxMatch · Étape 1</p>
      <h1 className="font-display mt-3 text-3xl font-semibold">C’est bien ça ?</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Choisissez la meilleure hypothèse, corrigez si besoin, puis confirmez.
      </p>

      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt="Produit"
          className="mt-8 max-h-64 w-full rounded-2xl object-contain bg-black/40"
        />
      )}

      {ai?.mock && (
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          Mode démo — configure <code className="text-amber-50">GOOGLE_VISION_API_KEY</code> pour une
          ID précise.
        </p>
      )}
      {!ai?.mock && (
        <p className="mt-4 text-[11px] text-white/35">
          Pipeline luxe · {ai?.provider || "vision"}
          {typeof ai?.confidence === "number" ? ` · confiance ${(ai.confidence * 100).toFixed(0)}%` : ""}
        </p>
      )}
      {ai?.authenticity_uncertain && (
        <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          Beaucoup de pages réplique détectées — vérifiez le modèle avant envoi.
        </p>
      )}

      {candidates.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-wide text-white/40">Hypothèses (top 3)</p>
          <div className="flex flex-col gap-2">
            {candidates.map((c, i) => (
              <button
                key={`${c.brand}-${c.model}-${i}`}
                type="button"
                onClick={() => pickCandidate(i)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  selectedIdx === i
                    ? "border-[var(--accent)] bg-[var(--accent)]/15"
                    : "border-white/12 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-lg">
                    {c.brand} {c.model}
                  </span>
                  <span className="text-[11px] text-white/40">{Math.round((c.score || 0) * 100)}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="mt-6 block text-xs uppercase tracking-wide text-white/40">Description</label>
      <textarea
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
        rows={5}
        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          type="email"
          placeholder="Email (optionnel)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
        />
        <input
          type="text"
          placeholder="@telegram (optionnel)"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
        />
      </div>

      {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

      <button
        type="button"
        disabled={busy || !edit.trim()}
        onClick={confirm}
        className="mt-8 w-full rounded-full bg-[var(--accent)] py-3.5 text-sm font-semibold text-[#0a0908] disabled:opacity-50"
      >
        {busy ? "Envoi aux vendeurs…" : "Oui, je cherche ça — recevoir des devis"}
      </button>
    </main>
  );
}
