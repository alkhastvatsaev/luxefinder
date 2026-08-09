/**
 * In-process request coalescing for identical in-flight work.
 * Best-effort on Vercel (per isolate); still collapses bursts on one instance.
 */

const inflight = new Map<string, Promise<unknown>>();

export async function coalesce<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const existing = inflight.get(key);
  if (existing) return existing as Promise<T>;

  const p = fn().finally(() => {
    inflight.delete(key);
  });
  inflight.set(key, p);
  return p;
}
