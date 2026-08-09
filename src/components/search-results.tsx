"use client";

import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GradientShimmer } from "@/components/ui/gradient-shimmer";
import { AiDescription, luxefinderApi, type MatchLink } from "@/lib/api";
import { cn } from "@/lib/utils";

type IdentityProps = {
  ai: AiDescription;
  className?: string;
};

type ActionsProps = {
  requestId: number;
  clientToken: string;
  ai: AiDescription;
  budget: string;
};

function officialProductTitle(ai: AiDescription): string {
  const links = ai.match_links || [];
  const official = links.find((l) => l.kind === "official");
  if (official?.title?.trim()) return official.title.trim();
  if (ai.lens_title?.trim()) return ai.lens_title.trim();
  if (ai.product_name?.trim()) return ai.product_name.trim();
  if (links[0]?.title?.trim()) return links[0].title.trim();
  const c = ai.candidates?.[0];
  if (c) return [c.brand, c.model].filter(Boolean).join(" ").trim();
  return [ai.brand, ai.model].filter(Boolean).join(" ").trim();
}

function officialProductLink(ai: AiDescription): MatchLink | undefined {
  const links = ai.match_links || [];
  return links.find((l) => l.kind === "official") || links[0];
}

/** Title + source link — shown above the photo carousel. */
export function SearchResultsIdentity({ ai, className }: IdentityProps) {
  const title = officialProductTitle(ai);
  const topLink = officialProductLink(ai);

  return (
    <div className={`mx-auto flex w-full max-w-sm flex-col items-center px-5 text-center ${className || ""}`}>
      {title ? (
        <GradientShimmer
          gradient="bay"
          easing="smooth"
          duration={5.8}
          spread={3}
          pauseBetween={5000}
          pauseBetweenMax={9000}
          as="p"
          className="line-clamp-2 text-balance text-[17px] font-semibold leading-snug tracking-[-0.03em] text-foreground sm:text-[19px]"
        >
          {title}
        </GradientShimmer>
      ) : null}

      {topLink && (
        <a
          href={topLink.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex max-w-full items-center justify-center gap-1.5 rounded-full bg-muted/80 px-4 py-1.5 text-[12px] font-medium text-foreground/80 ring-1 ring-black/[0.04] transition hover:bg-muted"
        >
          <span className="truncate">{topLink.source}</span>
          <ArrowUpRight className="size-3 shrink-0 text-foreground/30" strokeWidth={1.5} />
        </a>
      )}

      {Array.isArray(ai.grounding_sources) && ai.grounding_sources.length > 0 && (
        <div className="mt-3 flex max-w-full flex-wrap items-center justify-center gap-1.5">
          {ai.grounding_sources.slice(0, 4).map((g, i) =>
            g.url ? (
              <a
                key={`${g.title}-${i}`}
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[9.5rem] truncate rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-medium text-foreground/55 transition hover:bg-black/[0.07]"
              >
                {g.title}
              </a>
            ) : (
              <span
                key={`${g.title}-${i}`}
                className="max-w-[9.5rem] truncate rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-medium text-foreground/45"
              >
                {g.title}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}

/** Confirm CTA — stays below budget / bottom zone. */
export function SearchResultsActions({
  requestId,
  clientToken,
  ai,
  budget,
}: ActionsProps) {
  const router = useRouter();
  const title = officialProductTitle(ai);
  const hasBudget = Boolean(budget.trim());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    if (!hasBudget) return;
    setBusy(true);
    setError(null);
    try {
      const amount = budget.trim() ? Number(budget) : undefined;
      await luxefinderApi.confirm({
        request_id: requestId,
        user_edit: title,
        client_budget: amount,
        client_budget_currency: amount != null ? "EUR" : undefined,
        start_blast: false,
      });
      router.push(`/offres/${clientToken}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center px-5 text-center">
      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

      <button
        type="button"
        disabled={busy || !title.trim() || !hasBudget}
        onClick={confirm}
        className={cn(
          "flex w-full max-w-xs items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold transition active:scale-[0.98]",
          hasBudget
            ? "bg-[#0071E3] text-white hover:opacity-90 disabled:opacity-40"
            : "cursor-not-allowed bg-black/[0.06] text-foreground/35"
        )}
      >
        {busy ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Voir les offres"
        )}
      </button>
      <p className="mt-2 text-[11px] font-medium tracking-[-0.01em] text-foreground/40">
        Sans engagement · Gratuit
      </p>
    </div>
  );
}

/** @deprecated Prefer SearchResultsIdentity + SearchResultsActions */
export function SearchResults(props: ActionsProps) {
  return (
    <>
      <SearchResultsIdentity ai={props.ai} />
      <SearchResultsActions {...props} />
    </>
  );
}
