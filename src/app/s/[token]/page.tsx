"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { luxefinderApi } from "@/lib/api";

const PAYMENTS = ["PayPal", "Carte", "Apple Pay", "Virement", "WU", "Autre"];

export default function SupplierFormPage() {
  const params = useParams();
  const token = String(params.token || "");
  const [product, setProduct] = useState("");
  const [clientBudget, setClientBudget] = useState<number | null>(null);
  const [clientBudgetCurrency, setClientBudgetCurrency] = useState("EUR");
  const [photo, setPhoto] = useState("");
  const [already, setAlready] = useState(false);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState("");
  const [methods, setMethods] = useState<string[]>([]);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    luxefinderApi
      .supplier(token)
      .then((v) => {
        setProduct(String(v.product || ""));
        const budget = v.client_budget;
        setClientBudget(typeof budget === "number" ? budget : budget ? Number(budget) : null);
        setClientBudgetCurrency(String(v.client_budget_currency || "EUR"));
        setPhoto(luxefinderApi.photoUrl(String(v.photo_url || "")));
        setAlready(Boolean(v.already_quoted));
        const q = v.quote as Record<string, unknown> | null;
        if (q) {
          setPrice(String(q.price ?? ""));
          setCurrency(String(q.currency || "USD"));
          setDescription(String(q.description || ""));
          setShipping(String(q.shipping || ""));
          setMethods((q.payment_methods as string[]) || []);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Lien invalide"))
      .finally(() => setLoading(false));
  }, [token]);

  function toggle(m: string) {
    setMethods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await luxefinderApi.quote(token, {
        price: Number(price),
        currency,
        description,
        shipping,
        payment_methods: methods,
      });
      setOk(true);
      setAlready(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-foreground/30" />
      </main>
    );
  }

  if (ok) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center px-5 text-center">
        <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-foreground text-white shadow-soft">
          <Check className="size-7" strokeWidth={2} />
        </span>
        <p className="text-[22px] font-semibold tracking-[-0.03em]">Envoyé</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[100dvh] max-w-md px-5 pb-16 pt-6">
      <header className="mb-8 flex items-center justify-between">
        <BrandMark />
        <span className="text-[12px] text-muted-foreground">Devis</span>
      </header>

      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          className="mx-auto mb-5 h-40 w-40 rounded-[1.5rem] object-cover shadow-soft ring-1 ring-black/[0.04]"
        />
      )}

      {product && (
        <h1 className="mb-2 text-balance text-center text-[20px] font-semibold tracking-[-0.03em]">
          {product}
        </h1>
      )}
      {clientBudget != null && clientBudget > 0 && (
        <p className="mb-2 text-center text-[14px] text-muted-foreground">
          Budget client :{" "}
          <span className="font-semibold text-foreground">
            {clientBudget} {clientBudgetCurrency}
          </span>
        </p>
      )}
      {already && (
        <p className="mb-6 text-center text-[12px] text-muted-foreground">Mise à jour</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <div className="flex gap-2">
          <input
            required
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex-1 rounded-[1.25rem] bg-muted/80 px-4 py-3.5 text-[17px] font-semibold tabular-nums outline-none ring-1 ring-black/[0.03] focus:ring-black/10"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-[1.25rem] bg-muted/80 px-3 text-[14px] font-medium outline-none ring-1 ring-black/[0.03]"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CNY">CNY</option>
          </select>
        </div>
        <textarea
          placeholder="Détails"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-[1.25rem] bg-muted/80 px-4 py-3 text-[14px] outline-none ring-1 ring-black/[0.03] focus:ring-black/10"
        />
        <input
          placeholder="Livraison"
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
          className="w-full rounded-[1.25rem] bg-muted/80 px-4 py-3 text-[14px] outline-none ring-1 ring-black/[0.03] focus:ring-black/10"
        />
        <div className="flex flex-wrap gap-2 pt-1">
          {PAYMENTS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggle(m)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                methods.includes(m)
                  ? "bg-foreground text-white"
                  : "bg-muted text-foreground/60"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={busy || !price}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-[15px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
        >
          {busy ? <Loader2 className="size-5 animate-spin" /> : "Envoyer"}
        </button>
      </form>
    </main>
  );
}
