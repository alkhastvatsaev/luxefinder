"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { LensUploadIcon } from "@/components/ui/lens-icon";
import { SquareFrameLoader } from "@/components/ui/square-frame-loader";
import { BudgetInput } from "@/components/ui/budget-input";
import { BrandMark } from "@/components/ui/brand-mark";
import { AmbientBirds } from "@/components/ui/ambient-birds";
import { ProductSearchBar } from "@/components/ui/product-search-bar";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { SearchResultsIdentity, SearchResultsActions } from "@/components/search-results";
import { luxefinderApi, type AiDescription } from "@/lib/api";
import { cn } from "@/lib/utils";

type Props = {
  bagSlides: { src: string; alt: string; title: string }[];
};

type Result = {
  request_id: number;
  client_token: string;
  photo_url: string;
  ai_description: AiDescription;
};

/** Straight horizontal track along the bottom of the screen. */
const BAG_PATH = "M0 50 L996 50";

export default function HomeCoverflow({ bagSlides }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [budget, setBudget] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Lock page scroll — one-screen home + no browser back-swipe
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehaviorX;
    const prevBodyOverscroll = body.style.overscrollBehaviorX;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehaviorX = "none";
    body.style.overscrollBehaviorX = "none";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      html.style.overscrollBehaviorX = prevHtmlOverscroll;
      body.style.overscrollBehaviorX = prevBodyOverscroll;
    };
  }, []);

  const revokePreview = useCallback((url: string | null) => {
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
  }, []);

  const onFile = useCallback(
    async (file: File | null) => {
      if (!file || busy) return;
      const looksLikeImage =
        !file.type ||
        file.type.startsWith("image/") ||
        /\.(jpe?g|png|webp|gif|bmp|tiff?|heic|heif|avif)$/i.test(file.name);
      if (!looksLikeImage) {
        setError("Photo uniquement");
        return;
      }

      const localUrl = URL.createObjectURL(file);
      setPreviewUrl((prev) => {
        revokePreview(prev);
        return localUrl;
      });
      setResult(null);
      setBusy(true);
      setError(null);

      try {
        const res = await luxefinderApi.analyze(file);
        setResult({
          request_id: res.request_id,
          client_token: res.client_token,
          photo_url: res.photo_url,
          ai_description: res.ai_description,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur");
        setPreviewUrl((prev) => {
          revokePreview(prev);
          return null;
        });
      } finally {
        setBusy(false);
      }
    },
    [busy, revokePreview]
  );

  const onTextSearch = useCallback(
    async (query: string) => {
      if (busy) return;
      setBusy(true);
      setError(null);
      setResult(null);

      try {
        const res = await luxefinderApi.search(query);
        const imageUrl = res.photo_url || "";
        setPreviewUrl((prev) => {
          revokePreview(prev);
          return imageUrl || null;
        });
        setResult({
          request_id: res.request_id,
          client_token: res.client_token,
          photo_url: imageUrl,
          ai_description: res.ai_description,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur");
        setPreviewUrl((prev) => {
          revokePreview(prev);
          return null;
        });
      } finally {
        setBusy(false);
      }
    },
    [busy, revokePreview]
  );

  const showPhoto = Boolean(previewUrl && (busy || result));
  const showTextLoading = busy && !previewUrl;
  const hasResult = Boolean(result);
  /** Step 1: pulse behind the Lens square until the user uploads or searches. */
  const showLensHalo = !hasResult && !showPhoto && !busy;
  const showBagMarquee = !hasResult && !showPhoto && !busy;

  const goBack = useCallback(() => {
    if (busy) return;
    setResult(null);
    setError(null);
    setPreviewUrl((prev) => {
      revokePreview(prev);
      return null;
    });
  }, [busy, revokePreview]);

  const lensSize = hasResult
    ? "clamp(112px, 28vmin, 168px)"
    : "clamp(148px, 36vmin, 240px)";

  return (
    <main className="fixed inset-0 flex flex-col overflow-hidden bg-white">
      <header className="animate-rise relative z-30 flex shrink-0 flex-col items-center gap-2.5 px-6 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="relative flex w-full items-center justify-center">
          <BrandMark href={undefined} found={hasResult} />
          <AmbientBirds />
        </div>
        <ProductSearchBar onSearch={onTextSearch} disabled={busy} />
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {result && (
          <div className="mb-2 w-full shrink-0 animate-rise">
            <SearchResultsIdentity ai={result.ai_description} />
          </div>
        )}

        <div className="animate-rise-delay relative flex w-screen max-w-[100vw] shrink items-center justify-center">
          {/* Lens CTA — centered */}
          <div
            className="relative z-20"
            style={{ width: lensSize, height: lensSize }}
          >
            <div className="relative h-full w-full">
              {showLensHalo && (
                <span
                  aria-hidden
                  className="animate-budget-halo pointer-events-none absolute -inset-3 z-0 rounded-[2rem] bg-[#0071E3]/40 blur-xl"
                />
              )}
              <div
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  onFile(e.dataTransfer.files?.[0] || null);
                }}
                className={cn(
                  "group relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[1.75rem] shadow-soft transition",
                  dragging ? "bg-black/[0.03]" : "bg-gradient-to-b from-neutral-50 to-white",
                  busy && "pointer-events-none"
                )}
              >
                {showPhoto ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl!}
                      alt=""
                      draggable={false}
                      className={cn(
                        "pointer-events-none absolute inset-0 h-full w-full object-cover",
                        busy && "animate-photo-settle"
                      )}
                    />
                    {busy && (
                      <>
                        <div className="pointer-events-none absolute inset-0 bg-white/10" />
                        <SquareFrameLoader />
                      </>
                    )}
                    {!busy && (
                      <span
                        className="pointer-events-auto absolute inset-0 z-20 touch-manipulation"
                        onPointerDown={(e) => e.stopPropagation()}
                        onPointerUp={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          ref={fileInputRef}
                          id="luxefinder-upload"
                          type="file"
                          accept="image/*"
                          aria-label="Choisir une autre photo"
                          onChange={(e) => {
                            onFile(e.target.files?.[0] || null);
                            e.target.value = "";
                          }}
                          className="absolute inset-0 z-20 cursor-pointer opacity-0"
                          style={{ fontSize: 16 }}
                        />
                        <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center justify-center rounded-full bg-white/90 p-1.5 shadow-sm ring-1 ring-black/[0.06] backdrop-blur-sm">
                          <LensUploadIcon className="size-5" />
                        </span>
                      </span>
                    )}
                  </>
                ) : showTextLoading ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <SquareFrameLoader />
                  </div>
                ) : (
                  <span
                    className="group relative z-10 inline-flex touch-manipulation items-center justify-center rounded-full p-3 outline-none transition-transform [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105"
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerUp={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LensUploadIcon className="pointer-events-none size-[3.5rem] md:size-[4.25rem]" />
                    <input
                      ref={fileInputRef}
                      id="luxefinder-upload"
                      type="file"
                      accept="image/*"
                      disabled={busy}
                      aria-label="Choisir une photo"
                      onChange={(e) => {
                        onFile(e.target.files?.[0] || null);
                        e.target.value = "";
                      }}
                      className="absolute inset-0 z-20 cursor-pointer opacity-0"
                      style={{ fontSize: 16 }}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-3 flex w-full shrink-0 flex-col items-center gap-2.5 px-5">
          {!hasResult && !showPhoto && !busy && (
            <p className="animate-rise-delay max-w-[280px] text-center text-[15px] font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-[16px]">
              Vous savez ce que vous voulez.
              <br />
              On vous trouve les vendeurs.
            </p>
          )}

          {(hasResult || showPhoto) && (
            <div className="w-full max-w-[220px] animate-rise">
              <BudgetInput
                value={budget}
                onChange={setBudget}
                disabled={busy}
                compact
                emphasize={!budget.trim() && !busy}
              />
            </div>
          )}

          {result && (
            <div className="w-full animate-rise">
              <SearchResultsActions
                key={result.request_id}
                requestId={result.request_id}
                clientToken={result.client_token}
                ai={result.ai_description}
                budget={budget}
              />
            </div>
          )}

          {error && (
            <p className="max-w-xs text-center text-sm text-red-500">{error}</p>
          )}

          {(hasResult || showPhoto) && !busy && (
            <button
              type="button"
              onClick={goBack}
              className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-foreground/40 transition hover:text-foreground/70"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.75} />
              Retour
            </button>
          )}
        </div>
      </div>

      {/* Straight bag track — bottom of screen */}
      {showBagMarquee && bagSlides.length > 0 && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-0 h-[7.5rem] w-full overflow-visible sm:h-36 md:h-40"
        >
          <MarqueeAlongSvgPath
            path={BAG_PATH}
            viewBox="0 0 996 100"
            baseVelocity={6}
            slowdownOnHover
            slowDownFactor={0.25}
            draggable
            grabCursor
            dragSensitivity={0.12}
            dragVelocityDecay={0.94}
            dragAwareDirection
            repeat={1}
            fadeEnds={14}
            keepUpright
            className="h-full w-full"
            responsive
            enableRollingZIndex
            zIndexBase={1}
            zIndexRange={8}
          >
            {bagSlides.map((bag, i) => (
              <div
                key={`${bag.src}-${i}`}
                className="h-28 w-28 select-none overflow-hidden rounded-[1.25rem] shadow-soft ring-1 ring-black/[0.04] sm:h-32 sm:w-32 md:h-36 md:w-36 md:rounded-[1.35rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bag.src}
                  alt=""
                  className="pointer-events-none h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>
      )}
    </main>
  );
}
