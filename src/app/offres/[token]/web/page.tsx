"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { luxefinderApi } from "@/lib/api";
import { cn } from "@/lib/utils";

type Offer = {
  title: string;
  link: string;
  source: string;
  price?: string;
  thumbnail?: string;
  region: "usa" | "europe" | "asia" | "africa";
  country: string;
  kind: "official" | "resale" | "shopping" | "other";
};

type RegionFilter = "all" | Offer["region"];

const REGION_LABEL: Record<Offer["region"], string> = {
  usa: "USA",
  europe: "Europe",
  asia: "Asie",
  africa: "Afrique",
};

export default function OffresWebPage() {
  const params = useParams();
  const token = String(params.token || "");
  const [product, setProduct] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [byRegion, setByRegion] = useState<Record<Offer["region"], number>>({
    usa: 0,
    europe: 0,
    asia: 0,
    africa: 0,
  });
  const [marketsOk, setMarketsOk] = useState(0);
  const [marketsTotal, setMarketsTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<RegionFilter>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await luxefinderApi.webOffers(token);
      setProduct(res.product || res.query || "");
      setOffers(res.offers || []);
      setByRegion(res.by_region || { usa: 0, europe: 0, asia: 0, africa: 0 });
      setMarketsOk(res.markets_ok || 0);
      setMarketsTotal(res.markets_total || 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(
    () => (filter === "all" ? offers : offers.filter((o) => o.region === filter)),
    [offers, filter]
  );

  const filters: { id: RegionFilter; label: string; count: number }[] = [
    { id: "all", label: "Tout", count: offers.length },
    { id: "europe", label: "Europe", count: byRegion.europe },
    { id: "usa", label: "USA", count: byRegion.usa },
    { id: "asia", label: "Asie", count: byRegion.asia },
    { id: "africa", label: "Afrique", count: byRegion.africa },
  ];

  return (
    <main className="mx-auto min-h-[100dvh] max-w-lg px-5 pb-16 pt-6">
      <header className="mb-6 flex items-center justify-between">
        <BrandMark />
        <Link
          href={`/offres/${token}`}
          className="flex items-center gap-1 text-[13px] font-medium text-foreground/40 transition hover:text-foreground/70"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.75} />
          Choix
        </Link>
      </header>

      <h1 className="text-balance text-[22px] font-semibold leading-tight tracking-[-0.03em] text-foreground">
        Offres sur internet
      </h1>
      {product && (
        <p className="mt-1.5 line-clamp-2 text-[14px] text-foreground/50">{product}</p>
      )}

      {loading && (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <Loader2 className="size-7 animate-spin text-foreground/30" />
          <p className="max-w-xs text-[14px] font-medium text-foreground/55">
            Recherche approfondie en cours…
          </p>
          <p className="max-w-xs text-[12px] text-foreground/35">
            USA, Europe, Asie et Afrique — ça peut prendre quelques secondes.
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="mt-10 text-center">
          <p className="text-sm text-red-500">{error}</p>
          <button
            type="button"
            onClick={load}
            className="mt-4 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="mt-3 text-[12px] text-foreground/40">
            {offers.length} offre{offers.length === 1 ? "" : "s"} · {marketsOk}/{marketsTotal}{" "}
            marchés
          </p>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition",
                  filter === f.id
                    ? "bg-foreground text-white"
                    : "bg-muted/80 text-foreground/60 ring-1 ring-black/[0.04]"
                )}
              >
                {f.label}
                {f.count > 0 ? ` · ${f.count}` : ""}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-center text-[14px] text-foreground/45">
              Aucune offre trouvée pour ce filtre. Essayez une autre région.
            </p>
          ) : (
            <ul className="mt-5 flex flex-col gap-2.5">
              {visible.map((o) => (
                <li key={`${o.region}-${o.link}`}>
                  <a
                    href={o.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 rounded-[1.15rem] bg-muted/50 p-3 ring-1 ring-black/[0.03] transition hover:bg-muted"
                  >
                    <div className="size-16 shrink-0 overflow-hidden rounded-[0.9rem] bg-white ring-1 ring-black/[0.04]">
                      {o.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={o.thumbnail}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-foreground/25">
                          {REGION_LABEL[o.region]}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[13px] font-semibold leading-snug tracking-[-0.02em] text-foreground">
                        {o.title}
                      </p>
                      <p className="mt-1 truncate text-[11px] text-foreground/45">
                        {o.source} · {o.country}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold tabular-nums text-foreground">
                          {o.price || "Voir le prix"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0071E3]">
                          Acheter
                          <ArrowUpRight className="size-3" strokeWidth={1.75} />
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
