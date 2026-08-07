"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { luxefinderApi } from "@/lib/api";

type Quote = {
  id: number;
  price: number;
  currency: string;
  description?: string;
  shipping?: string;
  payment_methods?: string[];
  status: string;
};

export default function ClientRfqPage() {
  const params = useParams();
  const token = String(params.token || "");
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const v = await luxefinderApi.client(token);
      setData(v);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    }
  }, [token]);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load]);

  async function select(quoteId: number) {
    setBusy(true);
    try {
      await luxefinderApi.select(token, quoteId);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  async function review() {
    setBusy(true);
    try {
      await luxefinderApi.review(token, rating, comment);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
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

  const quotes = (data?.quotes as Quote[]) || [];
  const status = String(data?.status || "");
  const photo = luxefinderApi.photoUrl(String(data?.photo_url || ""));
  const sent = Number(data?.sent_count || 0);
  const product = String(
    data?.user_edit || (data?.ai_description as { summary?: string })?.summary || ""
  );
  const clientBudget = data?.client_budget != null ? Number(data.client_budget) : null;
  const clientBudgetCurrency = String(data?.client_budget_currency || "EUR");
  const waiting = quotes.length === 0;

  return (
    <main className="mx-auto min-h-[100dvh] max-w-lg px-5 pb-16 pt-6">
      <header className="mb-8 flex items-center justify-between">
        <BrandMark />
        <span className="text-[12px] tabular-nums text-muted-foreground">
          {quotes.length} · {sent}/10
        </span>
      </header>

      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          className="mx-auto mb-6 h-36 w-36 rounded-[1.5rem] object-cover shadow-soft ring-1 ring-black/[0.04]"
        />
      )}

      {product && (
        <h1 className="text-balance text-center text-[22px] font-semibold tracking-[-0.03em]">
          {product}
        </h1>
      )}

      {clientBudget != null && clientBudget > 0 && (
        <p className="mt-3 text-center text-[14px] text-muted-foreground">
          Budget :{" "}
          <span className="font-semibold text-foreground">
            {clientBudget} {clientBudgetCurrency}
          </span>
        </p>
      )}

      {data?.blast_error ? (
        <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-center text-[13px] text-amber-800">
          {String(data.blast_error)}
        </p>
      ) : null}

      <section className="mt-10">
        {waiting ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <Loader2 className="size-7 animate-spin text-foreground/25" strokeWidth={1.5} />
            <p className="text-[13px] text-muted-foreground">En attente…</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {quotes.map((q) => (
              <li
                key={q.id}
                className="rounded-[1.5rem] bg-muted/80 p-5 ring-1 ring-black/[0.03] transition"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[28px] font-semibold tracking-[-0.03em]">
                    {q.price}
                    <span className="ml-1.5 text-[14px] font-medium text-muted-foreground">
                      {q.currency}
                    </span>
                  </p>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {q.status}
                  </span>
                </div>
                {q.description && (
                  <p className="mt-2 text-[13px] text-foreground/70">{q.description}</p>
                )}
                {q.shipping && (
                  <p className="mt-1 text-[12px] text-muted-foreground">{q.shipping}</p>
                )}
                {status !== "selected" && status !== "completed" && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => select(q.id)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-[14px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
                  >
                    <Check className="size-4" strokeWidth={2.5} />
                    Choisir
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {(status === "selected" || status === "completed") && (
        <section className="mt-12">
          <p className="mb-4 text-center text-[13px] text-muted-foreground">Avis</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`flex size-11 items-center justify-center rounded-full text-[14px] font-medium transition ${
                  rating >= n
                    ? "bg-foreground text-white"
                    : "bg-muted text-foreground/50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            placeholder="…"
            className="mt-4 w-full resize-none rounded-[1.25rem] bg-muted/80 px-4 py-3 text-[14px] outline-none ring-1 ring-black/[0.03] focus:ring-black/10"
          />
          <button
            type="button"
            disabled={busy || status === "completed"}
            onClick={review}
            className="mt-3 w-full rounded-full border border-black/10 py-3 text-[14px] font-semibold disabled:opacity-40"
          >
            {status === "completed" ? "Merci" : "Envoyer"}
          </button>
        </section>
      )}

      {error && <p className="mt-6 text-center text-sm text-red-500">{error}</p>}
    </main>
  );
}
