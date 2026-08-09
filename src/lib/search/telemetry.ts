import { list, put } from "@vercel/blob";
import type { ExternalCallLog } from "./types";

function monthKey(d = new Date()): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function dayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

type MeterMonth = {
  month: string;
  total_credits: number;
  by_provider: Record<string, number>;
  by_day: Record<string, number>;
};

async function readMeter(pathname: string): Promise<MeterMonth | null> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const hit = blobs.find((b) => b.pathname === pathname);
    if (!hit) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as MeterMonth;
  } catch {
    return null;
  }
}

async function writeMeter(pathname: string, data: MeterMonth): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function logExternalCall(entry: ExternalCallLog): Promise<void> {
  const month = monthKey();
  const day = dayKey();
  const path = `metering/${month}.json`;
  const prev =
    (await readMeter(path)) ||
    ({ month, total_credits: 0, by_provider: {}, by_day: {} } satisfies MeterMonth);

  const credits = Math.max(0, Number(entry.credits) || 0);
  prev.total_credits += credits;
  prev.by_provider[entry.provider] =
    (prev.by_provider[entry.provider] || 0) + credits;
  prev.by_day[day] = (prev.by_day[day] || 0) + credits;

  try {
    await writeMeter(path, prev);
  } catch (e) {
    console.error("[telemetry] meter write failed", e);
  }

  // Append-only daily log (best effort)
  try {
    const logPath = `metering/logs/${day}.jsonl`;
    const { blobs } = await list({ prefix: logPath, limit: 1 });
    const hit = blobs.find((b) => b.pathname === logPath);
    let prevLog = "";
    if (hit) {
      const res = await fetch(hit.url, { cache: "no-store" });
      if (res.ok) prevLog = await res.text();
    }
    const line = JSON.stringify(entry);
    await put(logPath, `${prevLog}${line}\n`, {
      access: "public",
      contentType: "application/x-ndjson",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (e) {
    console.error("[telemetry] log append failed", e);
  }
}

export async function getMonthUsage(month = monthKey()): Promise<MeterMonth> {
  const path = `metering/${month}.json`;
  return (
    (await readMeter(path)) || {
      month,
      total_credits: 0,
      by_provider: {},
      by_day: {},
    }
  );
}

export async function getYesterdayCost(): Promise<{ day: string; credits: number }> {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  const day = d.toISOString().slice(0, 10);
  const month = day.slice(0, 7);
  const usage = await getMonthUsage(month);
  return { day, credits: usage.by_day[day] || 0 };
}
