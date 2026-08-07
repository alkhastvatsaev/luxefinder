import { NextRequest, NextResponse } from "next/server";
import {
  addReview,
  clientView,
  handleAnalyze,
  handleConfirm,
  handleSuggest,
  handleTextSearch,
  selectQuote,
  submitQuote,
  supplierView,
} from "@/lib/luxefinder-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function err(e: unknown, fallback = 500) {
  const status = (e as { status?: number })?.status || fallback;
  const detail = e instanceof Error ? e.message : "error";
  return NextResponse.json({ ok: false, detail }, { status });
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
      const form = await req.formData();
      const file = form.get("file");
      if (!(file instanceof File)) {
        return NextResponse.json({ detail: "file required" }, { status: 400 });
      }
      const out = await handleAnalyze(file);
      return NextResponse.json(out);
    }

    if (path.length === 1 && path[0] === "search") {
      const body = await req.json().catch(() => ({}));
      const query = typeof body?.query === "string" ? body.query : "";
      const out = await handleTextSearch(query);
      return NextResponse.json(out);
    }

    if (path.length === 1 && path[0] === "confirm") {
      const body = await req.json();
      const out = await handleConfirm(body);
      return NextResponse.json(out);
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
      // Cloud: slots already created on confirm — no-op success
      return NextResponse.json({ ok: true, note: "blast handled on confirm (cloud)" });
    }

    return NextResponse.json({ detail: "not found" }, { status: 404 });
  } catch (e) {
    return err(e);
  }
}
