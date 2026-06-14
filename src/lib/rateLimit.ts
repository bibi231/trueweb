// Lightweight in-memory rate limiter for Next.js route handlers.
//
// Vercel runs serverless instances, so this state is per-instance rather than
// global — but it still meaningfully blunts brute-force, credential-stuffing,
// and spam bursts (an attacker hammering one endpoint hits the same warm
// instance). For stronger, cross-instance guarantees, swap the Map for Upstash
// Ratelimit later; the call sites won't change.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Opportunistic cleanup so the Map can't grow unbounded on a long-lived instance.
let lastSweep = Date.now();
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfter: number; // seconds until the window resets
}

/**
 * Fixed-window limiter. Returns ok=false once `limit` requests have been made
 * within `windowMs` for the given key.
 *
 * @param key    Unique identifier — typically `${routeName}:${ip}`.
 * @param limit  Max requests allowed per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - existing.count, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Convenience wrapper: enforce a limit for `name` keyed by client IP.
 * Returns a 429 NextResponse when exceeded, or null when allowed.
 */
export function enforceRateLimit(
  req: Request,
  name: string,
  limit: number,
  windowMs: number,
): Response | null {
  const ip = clientIp(req);
  const result = rateLimit(`${name}:${ip}`, limit, windowMs);
  if (result.ok) return null;
  return new Response(
    JSON.stringify({ error: "Too many requests. Please slow down and try again shortly." }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(result.retryAfter),
      },
    },
  );
}
