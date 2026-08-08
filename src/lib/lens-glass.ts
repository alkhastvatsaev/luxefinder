import { cn } from "@/lib/utils";

/** Idle Lens face — keep translucent; audited by scripts/audit-lens-frost.js */
export const LENS_GLASS_CLASS = "lens-glass";
export const LENS_GLASS_DRAGGING_CLASS = "lens-glass-dragging";

export function lensFaceClassName(opts: {
  showPhoto: boolean;
  dragging: boolean;
  busy: boolean;
}): string {
  return cn(
    "group relative z-10 flex h-full w-full flex-col items-center justify-center rounded-[1.75rem] shadow-soft ring-1 ring-black/[0.06] transition",
    opts.showPhoto
      ? "overflow-hidden bg-white"
      : cn(LENS_GLASS_CLASS, opts.dragging && LENS_GLASS_DRAGGING_CLASS),
    opts.busy && "pointer-events-none"
  );
}
