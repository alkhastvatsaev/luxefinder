import { list, put } from "@vercel/blob";
import { createHash } from "crypto";

export type GovernanceDecision =
  | { allow: true; mode: "live" }
  | { allow: true; mode: "fallback"; reason: string }
  | { allow: false; reason: string; status: number };

type MonthMeter = { month: string; credits: number };
type SessionMeter = { id: string; day: string; count: number };

function monthKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function dayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function numEnv(name: string, fallback: number): number {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export function monthlyCap(): number {
  return numEnv("SEARCH_MONTHLY_CREDIT_CAP", 10_000);
}

export function sessionDailyCap(): number {
  return numEnv("SEARCH_SESSION_DAILY_CAP", 30);
}

export function ipPerMinuteCap(): number {
  return numEnv("SEARCH_RATE_LIMIT_IP_PER_MIN", 20);
}

const ipWindow = new Map<string, { count: number; reset: number }>();

export function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const cap = ipPerMinuteCap();
  const cur = ipWindow.get(ip);
  if (!cur || now > cur.reset) {
    ipWindow.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (cur.count >= cap) return false;
  cur.count += 1;
  return true;
}

async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const hit = blobs.find((b) => b.pathname === pathname);
    if (!hit) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getGlobalCreditsUsed(): Promise<number> {
  // Prefer telemetry meter (source of truth for provider credits)
  try {
    const { getMonthUsage } = await import("./telemetry");
    const usage = await getMonthUsage(monthKey());
    if (usage.total_credits > 0) return usage.total_credits;
  } catch {
    /* fall through */
  }
  const m = monthKey();
  const meter = await readJson<MonthMeter>(`metering/cap/${m}.json`);
  return meter?.credits || 0;
}

export async function addGlobalCredits(n: number): Promise<number> {
  const m = monthKey();
  const path = `metering/cap/${m}.json`;
  const prev = (await readJson<MonthMeter>(path)) || { month: m, credits: 0 };
  prev.credits += Math.max(0, n);
  await writeJson(path, prev);
  return prev.credits;
}

export async function getSessionCount(sessionId: string): Promise<number> {
  const day = dayKey();
  const id = createHash("sha256").update(sessionId).digest("hex").slice(0, 24);
  const meter = await readJson<SessionMeter>(`metering/sessions/${day}/${id}.json`);
  return meter?.count || 0;
}

export async function bumpSessionCount(sessionId: string): Promise<number> {
  const day = dayKey();
  const id = createHash("sha256").update(sessionId).digest("hex").slice(0, 24);
  const path = `metering/sessions/${day}/${id}.json`;
  const prev = (await readJson<SessionMeter>(path)) || { id, day, count: 0 };
  prev.count += 1;
  await writeJson(path, prev);
  return prev.count;
}

/**
 * Decide whether live external search is allowed.
 * Over monthly cap → silent fallback (not a hard error).
 */
export async function decideGovernance(opts: {
  ip: string;
  sessionId: string;
  estimatedCredits?: number;
}): Promise<GovernanceDecision> {
  if (!checkIpRateLimit(opts.ip || "unknown")) {
    return { allow: false, reason: "rate_limit_ip", status: 429 };
  }

  const sessionCount = await getSessionCount(opts.sessionId);
  if (sessionCount >= sessionDailyCap()) {
    return {
      allow: true,
      mode: "fallback",
      reason: "session_daily_cap",
    };
  }

  const used = await getGlobalCreditsUsed();
  const estimate = opts.estimatedCredits ?? 1;
  if (used + estimate > monthlyCap()) {
    return {
      allow: true,
      mode: "fallback",
      reason: "monthly_cap",
    };
  }

  return { allow: true, mode: "live" };
}

/** Simple bot heuristics — no third-party dependency. */
export function looksLikeBot(headers: Headers): boolean {
  const ua = (headers.get("user-agent") || "").toLowerCase();
  if (!ua || ua.length < 10) return true;
  if (/(curl|wget|python-requests|scrapy|httpclient|go-http|bot|spider|crawl)/i.test(ua)) {
    // Allow explicit health checks via header
    if (headers.get("x-luxefinder-bot-ok") === "1") return false;
    return true;
  }
  return false;
}

export function sessionIdFromRequest(req: Request): string {
  const fromHeader = req.headers.get("x-luxefinder-session")?.trim();
  if (fromHeader && fromHeader.length >= 8) return fromHeader.slice(0, 128);
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(/(?:^|;\s*)lf_sid=([^;]+)/);
  if (m?.[1]) return decodeURIComponent(m[1]).slice(0, 128);
  // Ephemeral — better than nothing when cookie missing
  return createHash("sha256")
    .update(`${req.headers.get("x-forwarded-for") || ""}|${Date.now()}`)
    .digest("hex")
    .slice(0, 32);
}

export function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for") || "";
  const first = xf.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip") || "unknown";
}
