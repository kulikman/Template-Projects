import "server-only";

/**
 * Tiny rate-limiter abstraction.
 *
 * Default implementation is in-memory and per-instance — fine for local
 * dev and single-region deploys, useless for serverless / multi-region.
 * For production swap with Upstash:
 *
 *   import { Ratelimit } from "@upstash/ratelimit"
 *   import { Redis } from "@upstash/redis"
 *   const limiter = new Ratelimit({
 *     redis: Redis.fromEnv(),
 *     limiter: Ratelimit.slidingWindow(10, "1 m"),
 *   })
 *
 * The `limit()` API below intentionally mirrors `@upstash/ratelimit`
 * so the swap is one import + remove this file's body.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

export interface RateLimitOptions {
  /** Max requests per window. */
  limit: number;
  /** Window in milliseconds. */
  windowMs: number;
}

/**
 * Increment-and-check. Returns whether the request is allowed.
 *
 * @example
 *   const { success } = await limit(`login:${ip}`, { limit: 5, windowMs: 60_000 })
 *   if (!success) throw new Error("Too many attempts")
 */
export async function limit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): Promise<RateLimitResult> {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (bucket.count >= limit) {
    return { success: false, remaining: 0, reset: bucket.resetAt };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count, reset: bucket.resetAt };
}
