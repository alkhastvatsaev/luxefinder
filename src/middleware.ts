import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveLocale } from "@/lib/detect-locale";

export function middleware(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    null;

  const locale = resolveLocale(country, request.headers.get("accept-language"));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-luxefinder-locale", locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: "/",
};
