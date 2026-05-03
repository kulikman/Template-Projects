import "server-only";

/**
 * Tiny env-driven feature flags.
 *
 * Solo-founder pattern: ship half-finished features behind a `false`
 * flag, flip via Vercel env in seconds without redeploying.
 *
 * Usage:
 *   if (flags.billing) return <BillingPanel />
 *   else return <ComingSoon />
 *
 * Each flag reads `NEXT_PUBLIC_FF_<NAME>=true|1` to enable, anything
 * else (including unset) is disabled. Public-prefixed so client and
 * server agree without an extra round-trip.
 *
 * For complex rollouts (% rollouts, user-targeted) swap to GrowthBook
 * or Vercel Edge Config.
 */
function read(name: string): boolean {
  const value = process.env[`NEXT_PUBLIC_FF_${name}`];
  return value === "true" || value === "1";
}

export const flags = {
  billing: read("BILLING"),
  ai: read("AI"),
  analytics: read("ANALYTICS"),
} as const;

export type FeatureFlag = keyof typeof flags;
