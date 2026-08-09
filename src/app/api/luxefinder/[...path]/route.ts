import { NextRequest, NextResponse } from "next/server";
import {
  addReview,
  clientView,
  handleAnalyze,
  handleConfirm,
  handleSuggest,
  handleTextSearch,
  handleWebOffers,
  selectQuote,
  submitQuote,
  supplierView,
} from "@/lib/luxefinder-core";
import {
  bumpSessionCount,
  clientIp,
  decideGovernance,
  looksLikeBot,
  sessionIdFromRequest,
} from "@/lib/search/governance";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const SESSION_COOKIE = "lf_sid";

function err(e: unknown, fallback = 500) {
  const status = (e as { status?: number })?.status || fallback;
  const detail = e instanceof Error ? e.message : "error";
  return NextResponse.json({ ok: false, detail }, { status });
}

function withSessionCookie(res: NextResponse, sessionId: string, hadCookie: boolean) {
  if (!hadCookie) {
    res.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return res;
}

async function gateSearch(req: NextRequest): Promise<
  | { ok: false; res: NextResponse }
  | { ok: true; mode: "live" | "fallback"; sessionId: string; hadCookie: boolean }
> {
  if (looksLikeBot(req.headers)) {
    return {
      ok: false,
      res: NextResponse.json({ ok: false, detail: "blocked" }, { status: 403 }),
    };
  }

  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const hadCookie = Boolean(cookie && cookie.length >= 8);
  const sessionId = hadCookie ? cookie! : sessionIdFromRequest(req) || randomUUID();

  const decision = await decideGovernance({
    ip: clientIp(req),
    sessionId,
    estimatedCredits: 2,
  });

  if (!decision.allow) {
    return {
      ok: false,
      res: NextResponse.json(
        { ok: false, detail: decision.reason },
        { status: decision.status }
      ),
    };
  }

  if (decision.mode === "live") {
    void bumpSessionCount(sessionId).catch(() => {});
  }

  return { ok: true, mode: decision.mode, sessionId, hadCookie };
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  try {
    if (path.length === 1 && path[0] === "suggest") {
      const q = req.nextUrl.searchParams.get("q") || "";
      const out = await handleSuggest(q);
      return NextResponse.json(out);
    }
    if (path[0] === "r" && path[1] && path.length === 2) {
      const view = await clientView(path[1]);
      if (!view) return NextResponse.json({ detail: "not found" }, { status: 404 });
      return NextResponse.json(view);
    }
    if (path[0] === "s" && path[1] && path.length === 2) {
      const view = await supplierView(path[1]);
      if (!view) return NextResponse.json({ detail: "not found" }, { status: 404 });
      return NextResponse.json(view);
    }
    return NextResponse.json({ detail: "not found" }, { status: 404 });
  } catch (e) {
    return err(e);
  }
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  try {
    if (path.length === 1 && path[0] === "analyze") {
      const gate = await gateSearch(req);
      if (!gate.ok) return gate.res;
      const form = await req.formData();
      const file = form.get("file");
      if (!(file instanceof File)) {
        return NextResponse.json({ detail: "file required" }, { status: 400 });
      }
      const out = await handleAnalyze(file, { searchMode: gate.mode });
      return withSessionCookie(NextResponse.json(out), gate.sessionId, gate.hadCookie);
    }

    if (path.length === 1 && path[0] === "search") {
      const gate = await gateSearch(req);
      if (!gate.ok) return gate.res;
      const body = await req.json().catch(() => ({}));
      const query = typeof body?.query === "string" ? body.query : "";
      const out = await handleTextSearch(query, { searchMode: gate.mode });
      return withSessionCookie(NextResponse.json(out), gate.sessionId, gate.hadCookie);
    }

    if (path.length === 1 && path[0] === "confirm") {
      const body = await req.json();
      const out = await handleConfirm(body);
      return NextResponse.json(out);
    }

    if (path[0] === "r" && path[1] && path[2] === "offers" && path.length === 3) {
      const gate = await gateSearch(req);
      if (!gate.ok) return gate.res;
      const out = await handleWebOffers(path[1], { searchMode: gate.mode });
      return withSessionCookie(NextResponse.json(out), gate.sessionId, gate.hadCookie);
    }

    if (path[0] === "s" && path[1] && path[2] === "quote") {
      const body = await req.json();
      const out = await submitQuote(path[1], body);
      return NextResponse.json(out);
    }

    if (path[0] === "r" && path[1] && path[2] === "select") {
      const body = await req.json();
      const out = await selectQuote(path[1], Number(body.quote_id));
      return NextResponse.json(out);
    }

    if (path[0] === "r" && path[1] && path[2] === "review") {
      const body = await req.json();
      const out = await addReview(path[1], Number(body.rating), body.comment);
      return NextResponse.json(out);
    }

    if (path[0] === "r" && path[1] && path[2] === "blast") {
      return NextResponse.json({ ok: true, note: "blast handled on confirm (cloud)" });
    }

    return NextResponse.json({ detail: "not found" }, { status: 404 });
  } catch (e) {
    return err(e);
  }
}
