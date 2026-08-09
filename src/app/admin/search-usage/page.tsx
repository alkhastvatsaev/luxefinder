"use client";

import { useCallback, useState } from "react";

type UsagePayload = {
  ok: boolean;
  month: string;
  usage: {
    total_credits: number;
    by_provider: Record<string, number>;
    by_day: Record<string, number>;
  };
  yesterday: { day: string; credits: number };
  caps: {
    monthly: number;
    used: number;
    remaining: number;
    session_daily: number;
    ip_per_minute: number;
  };
  flags: Record<string, boolean>;
  detail?: string;
};

export default function SearchUsageAdminPage() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<UsagePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/search-usage", {
        headers: { Authorization: `Bearer ${token.trim()}` },
        cache: "no-store",
      });
      const json = (await res.json()) as UsagePayload;
      if (!res.ok) throw new Error(json.detail || `HTTP ${res.status}`);
      setData(json);
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }, [token]);

  return (
    <main className="mx-auto min-h-[100dvh] max-w-lg px-5 py-10">
      <h1 className="text-[22px] font-semibold tracking-[-0.03em]">Search usage</h1>
      <p className="mt-1 text-[13px] text-foreground/50">
        Metering providers · caps · flags (token admin requis)
      </p>

      <div className="mt-6 flex gap-2">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="SEARCH_ADMIN_TOKEN"
          className="min-w-0 flex-1 rounded-xl bg-muted/70 px-3 py-2.5 text-[13px] outline-none ring-1 ring-black/[0.04]"
        />
        <button
          type="button"
          onClick={load}
          disabled={loading || !token.trim()}
          className="rounded-xl bg-foreground px-4 py-2.5 text-[13px] font-semibold text-white disabled:opacity-40"
        >
          {loading ? "…" : "Charger"}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {data && (
        <div className="mt-8 space-y-6 text-[13px]">
          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-foreground/40">
              Caps ({data.month})
            </h2>
            <p className="mt-2 tabular-nums">
              {data.caps.used} / {data.caps.monthly} crédits · reste {data.caps.remaining}
            </p>
            <p className="mt-1 text-foreground/50">
              Session/jour {data.caps.session_daily} · IP/min {data.caps.ip_per_minute}
            </p>
            <p className="mt-1 text-foreground/50">
              Hier ({data.yesterday.day}): {data.yesterday.credits}
            </p>
          </section>

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-foreground/40">
              Par provider
            </h2>
            <ul className="mt-2 space-y-1">
              {Object.entries(data.usage.by_provider || {}).map(([k, v]) => (
                <li key={k} className="flex justify-between tabular-nums">
                  <span>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
              {!Object.keys(data.usage.by_provider || {}).length && (
                <li className="text-foreground/40">Aucune donnée</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-foreground/40">
              Flags
            </h2>
            <ul className="mt-2 space-y-1">
              {Object.entries(data.flags).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}</span>
                  <span className={v ? "text-emerald-600" : "text-foreground/35"}>
                    {v ? "on" : "off"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
