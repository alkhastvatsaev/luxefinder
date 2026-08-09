import { NextRequest, NextResponse } from "next/server";
import { getMonthUsage, getYesterdayCost } from "@/lib/search/telemetry";
import {
  getGlobalCreditsUsed,
  monthlyCap,
  sessionDailyCap,
  ipPerMinuteCap,
} from "@/lib/search/governance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const token = (process.env.SEARCH_ADMIN_TOKEN || "").trim();
  if (!token) return false;
  const hdr = req.headers.get("authorization") || "";
  const bearer = hdr.startsWith("Bearer ") ? hdr.slice(7).trim() : "";
  const q = req.nextUrl.searchParams.get("token") || "";
  return bearer === token || q === token;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, detail: "unauthorized" }, { status: 401 });
  }

  const month =
    req.nextUrl.searchParams.get("month") ||
    new Date().toISOString().slice(0, 7);

  const [usage, yesterday, used] = await Promise.all([
    getMonthUsage(month),
    getYesterdayCost(),
    getGlobalCreditsUsed(),
  ]);

  return NextResponse.json({
    ok: true,
    month,
    usage,
    yesterday,
    caps: {
      monthly: monthlyCap(),
      used,
      remaining: Math.max(0, monthlyCap() - used),
      session_daily: sessionDailyCap(),
      ip_per_minute: ipPerMinuteCap(),
    },
      flags: {
      serp_fallback: (process.env.SEARCH_SERP_FALLBACK || "true").toLowerCase() !== "false",
      gemini: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY),
      gemini_grounding: process.env.GEMINI_GROUNDING || "auto",
      vision_enrich_on_hit:
        (process.env.VISION_ENRICH_ON_HIT || "").toLowerCase() === "true",
      ebay: Boolean(process.env.EBAY_CLIENT_ID && process.env.EBAY_CLIENT_SECRET),
      serper: Boolean(process.env.SERPER_API_KEY),
      serp: Boolean(
        process.env.SERPAPI_KEY ||
          process.env.SERPAPI_API_KEY ||
          process.env.SERP_API_KEY
      ),
    },
  });
}
