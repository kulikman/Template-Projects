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
 * Each flag reads a literal `NEXT_PUBLIC_FF_<NAME>=true|1` to enable;
 * anything else (including unset) is disabled.
 *
 * Why static literals (not `process.env[`NEXT_PUBLIC_FF_${name}`]`)?
 *   Next.js / Turbopack inlines `process.env.NEXT_PUBLIC_*` references
 *   into the client bundle ONLY when the property name is a static
 *   identifier. Dynamic computed reads (`process.env[expr]`) are stripped
 *   to `undefined` on the client, so flags would always be `false` in
 *   the browser regardless of the env value. Keep the access static.
 *
 * Public-prefixed so client and server agree without an extra round-trip;
 * safe to import from both server and client code (no `server-only`).
 *
 * For complex rollouts (% rollouts, user-targeted) swap to GrowthBook
 * or Vercel Edge Config.
 */

function parse(raw: string | undefined): boolean {
  return raw === "true" || raw === "1";
}

export const flags = {
  billing: parse(process.env.NEXT_PUBLIC_FF_BILLING),
  ai: parse(process.env.NEXT_PUBLIC_FF_AI),
  analytics: parse(process.env.NEXT_PUBLIC_FF_ANALYTICS),
} as const;

export type FeatureFlag = keyof typeof flags;
