import { ImageResponse } from "next/og";
import { brandIconStyle } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={brandIconStyle(180)}>LF</div>,
    { ...size }
  );
}
