"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
  /** Custom center card (e.g. image drop zone). */
  kind?: "image" | "upload";
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  label?: string;
  className?: string;
  cardClassName?: string;
  /** Initial center index (default: middle). */
  initialIndex?: number;
  /** Rendered inside slides with kind === "upload". */
  renderUpload?: (active: boolean) => React.ReactNode;
  /** Allow cards to extend to viewport edges (desktop). */
  edgeToEdge?: boolean;
  /** Flat carousel — no 3D tilt, cards stay perfect squares. */
  flat?: boolean;
  /** Less vertical padding (for one-screen layouts). */
  compact?: boolean;
  /** Snap carousel to this index (e.g. center upload on analyze). */
  snapToIndex?: number;
  /** Dim non-focused cards (e.g. during analyze). */
  focusIndex?: number;
  /** Disable swipe / drag. */
  locked?: boolean;
  onIndexChange?: (index: number) => void;
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = "Cover carousel",
  className,
  cardClassName,
  initialIndex,
  renderUpload,
  edgeToEdge = false,
  flat = false,
  compact = false,
  snapToIndex,
  focusIndex,
  locked = false,
  onIndexChange,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const suppressClickRef = React.useRef(false);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
    moved: boolean;
  } | null>(null);

  const start = initialIndex ?? Math.floor(count / 2);
  const [selected, setSelected] = React.useState(start);

  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count]
  );

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const isCenter = distance < 0.5;
      const isFocused =
        focusIndex === undefined || Math.abs(index - posRef.current) < 0.5;
      const slide = slides[index];

      if (flat) {
        card.style.transform = `translateX(calc(-50% + ${offset * pitch}px))`;
      } else {
        const ramp = Math.pow(distance, falloff);
        const tilt = Math.min(rotate * ramp, 55) * Math.sign(offset);
        const scale = Math.max(0.82, 1 - distance * 0.04);

        card.style.transform =
          `translateX(calc(-50% + ${offset * pitch}px)) ` +
          `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg) scale(${scale})`;
      }

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      let opacity = Math.max(0, 1 - fade * distance) * edge;
      if (focusIndex !== undefined && !isFocused) opacity *= 0.28;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - Math.round(distance));

      if (locked) {
        card.style.pointerEvents = "none";
        card.style.cursor = "default";
      } else if (slide?.kind === "upload" && isCenter) {
        // Swipe through card; only Lens button is clickable (pointer-events-auto inside)
        card.style.pointerEvents = "none";
        card.style.cursor = "default";
      } else {
        // All product cards: let touches reach the frame so swipe works on side photos
        card.style.pointerEvents = "none";
        card.style.cursor = "default";
      }
    });
  }, [count, depth, fade, falloff, flat, focusIndex, gap, locked, loop, rotate, slides]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      const idx = indexAt(target);
      setSelected(idx);
      onIndexChange?.(idx);

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, onIndexChange, paint]
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const goTo = React.useCallback(
    (index: number) => {
      if (locked) return;
      if (!loop) {
        settle(clamp(index));
        return;
      }
      const current = posRef.current;
      const base = ((index % count) + count) % count;
      const currentBase = indexAt(current);
      let diff = base - currentBase;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      settle(current + diff);
    },
    [clamp, count, indexAt, locked, loop, settle]
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  React.useEffect(() => {
    if (snapToIndex !== undefined) goTo(snapToIndex);
  }, [goTo, snapToIndex]);

  React.useEffect(() => {
    paint();
  }, [focusIndex, paint]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (locked) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    suppressClickRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    const deltaX = event.clientX - drag.x;
    if (Math.abs(deltaX) > 6) {
      drag.moved = true;
      suppressClickRef.current = true;
    }
    posRef.current = clamp(drag.pos - deltaX / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) {
      setSelected(index);
      onIndexChange?.(index);
    }
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;

    // Tap (no swipe): center the card under the finger
    if (!drag.moved && !locked) {
      let bestIndex: number | null = null;
      let bestZ = -1;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        if (
          event.clientX >= r.left &&
          event.clientX <= r.right &&
          event.clientY >= r.top &&
          event.clientY <= r.bottom
        ) {
          const z = Number(card.style.zIndex) || 0;
          if (z > bestZ) {
            bestZ = z;
            bestIndex = index;
          }
        }
      });
      if (bestIndex != null && bestIndex !== indexAt(Math.round(posRef.current))) {
        goTo(bestIndex);
        return;
      }
    }

    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    posRef.current = start;
    targetRef.current = start;
  }, [start]);

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const wheelCooldownRef = React.useRef(0);

  React.useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onWheel = (event: WheelEvent) => {
      if (locked) return;

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const horizontal = absX > 1 || (event.shiftKey && absY > 1);
      if (!horizontal) return;

      // Block browser back/forward
      event.preventDefault();
      event.stopPropagation();

      // Ignore trackpad inertia / residual events after a snap
      if (Date.now() < wheelCooldownRef.current) return;

      const delta = absX >= absY ? event.deltaX : event.deltaY;
      // Need a clear intentional flick (ignore tiny inertia ticks)
      if (Math.abs(delta) < 12) return;

      // ~0.5s lock — then ready again without moving the mouse
      wheelCooldownRef.current = Date.now() + 480;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      const dir = delta > 0 ? 1 : -1;
      settle(clamp(Math.round(targetRef.current) + dir));
    };

    frame.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      frame.removeEventListener("wheel", onWheel, { capture: true } as AddEventListenerOptions);
    };
  }, [clamp, locked, settle]);

  const active = slides[selected];

  return (
    <div
      className={cn("w-full", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className={cn(
            "outline-none ring-ring focus-visible:ring-2 [overscroll-behavior-x:none]",
            compact ? "py-2" : "py-6",
            locked ? "cursor-default" : "cursor-grab active:cursor-grabbing",
            edgeToEdge ? "overflow-visible" : "overflow-hidden"
          )}
          style={
            flat
              ? { touchAction: "none" }
              : {
                  perspective: `calc(var(--cf-card) * ${perspective})`,
                  touchAction: "none",
                }
          }
        >
          <div
            className="relative select-none"
            style={{
              height: "var(--cf-card)",
              transformStyle: flat ? undefined : "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                  className={cn(
                  "absolute left-1/2 top-0 will-change-transform",
                  slide.kind === "upload"
                    ? "overflow-visible bg-transparent shadow-none ring-0"
                    : "overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-black/[0.04]",
                  cardClassName
                )}
                style={{ width: "var(--cf-card)", height: "var(--cf-card)" }}
              >
                {slide.kind === "upload" && renderUpload ? (
                  renderUpload(index === selected)
                ) : slide.src ? (
                  <div className="pointer-events-none relative h-full w-full bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      draggable={false}
                      className="absolute inset-0 h-full w-full select-none object-contain bg-white"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {showNavigation && !locked && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-3 top-1/2 z-[200] hidden -translate-y-1/2 rounded-full glass p-2.5 text-foreground shadow-card transition hover:scale-105 active:scale-95 md:flex lg:left-8"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-3 top-1/2 z-[200] hidden -translate-y-1/2 rounded-full glass p-2.5 text-foreground shadow-card transition hover:scale-105 active:scale-95 md:flex lg:right-8"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {showCaption && active?.kind !== "upload" && active?.title && (
        <div
          key={selected}
          className="mt-1 flex flex-col items-center px-6 duration-300 animate-in fade-in"
        >
          <p className="text-[13px] font-medium tracking-tight text-foreground/80">{active.title}</p>
        </div>
      )}

      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "size-2 rounded-full bg-foreground transition-opacity",
                index === selected ? "opacity-100" : "opacity-30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
