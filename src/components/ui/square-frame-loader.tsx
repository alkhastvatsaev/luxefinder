"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/** Matches Tailwind rounded-[1.75rem] on the upload card. */
const CORNER_RADIUS_PX = 28;
const STROKE_PX = 2.5;
const SNAKE_LEN = 24;
/** Soft Apple-like blue accent */
const ACCENT_BLUE = "#0071E3";

function roundedRectPath(size: number, radius: number, inset: number): string {
  const x = inset;
  const y = inset;
  const w = size - inset * 2;
  const h = size - inset * 2;
  const r = Math.min(radius, w / 2, h / 2);

  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    "Z",
  ].join(" ");
}

/** Snake segment tracing the rounded-square frame. */
export function SquareFrameLoader({ className }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [geom, setGeom] = useState({ r: 10, stroke: 0.9, inset: 0.45 });

  useEffect(() => {
    const card = ref.current?.parentElement;
    if (!card) return;

    const measure = () => {
      const w = card.offsetWidth;
      if (!w) return;
      const corner = Math.min(CORNER_RADIUS_PX, w / 2);
      const stroke = STROKE_PX;
      setGeom({
        r: (corner / w) * 100,
        stroke: (stroke / w) * 100,
        inset: (stroke / w) * 100 * 0.5,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  const path = useMemo(
    () => roundedRectPath(100, geom.r, geom.inset),
    [geom.inset, geom.r]
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke={ACCENT_BLUE}
        strokeWidth={geom.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={`${SNAKE_LEN} ${100 - SNAKE_LEN}`}
        className="animate-frame-snake"
      />
    </svg>
  );
}
