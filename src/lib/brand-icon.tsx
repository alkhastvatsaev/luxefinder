/** Shared LuxeFinder mark for app/icon ImageResponse exports. */
export const BRAND_ICON_BG = "#141414";

export function brandIconStyle(size: number) {
  return {
    fontSize: Math.round(size * 0.34),
    background: BRAND_ICON_BG,
    width: "100%",
    height: "100%",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    color: "white",
    borderRadius: Math.round(size * 0.22),
    fontWeight: 600 as const,
    fontFamily: "system-ui, -apple-system, sans-serif",
    letterSpacing: "-0.04em",
  };
}
