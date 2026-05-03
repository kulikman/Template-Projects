/**
 * Next.js instrumentation hook — runs once per server start (and once per
 * Edge runtime cold start). We use it to fail fast if any required env
 * variable is missing or malformed: better to crash on `next start` than
 * to discover a missing Supabase key inside a Server Action at runtime.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */
export async function register(): Promise<void> {
  // Only validate on the Node.js runtime — Edge runtime gets a smaller
  // env surface and validates lazily on first use.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { getServerEnv } = await import("@/lib/env");
  getServerEnv();
}
