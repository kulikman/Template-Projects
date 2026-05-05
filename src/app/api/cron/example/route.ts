import { NextResponse, type NextRequest } from "next/server";

import { getServerEnv } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * Example scheduled cron route.
 *
 * Hooked at: `/api/cron/example`
 * Excluded from `src/proxy.ts` matcher — we don't refresh Supabase
 * sessions for unauthenticated cron pings.
 *
 * Authorization: when `CRON_SECRET` is set in the project's environment,
 * Vercel cron attaches the matching `Authorization: Bearer ${CRON_SECRET}`
 * header to every invocation. If the env var is unset, requests arrive
 * unauthenticated and this handler will reject them with 401 — set the
 * secret in `vercel env` (and `.env.local`) before enabling the cron.
 *
 * Generate a secret with:  openssl rand -hex 32
 *
 * @see https://vercel.com/docs/cron-jobs/manage-cron-jobs#secure-cron-jobs
 *
 * Example vercel.ts entry:
 *   crons: [{ path: "/api/cron/example", schedule: "0 0 * * *" }]
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const env = getServerEnv();
  const auth = request.headers.get("authorization");

  if (!env.CRON_SECRET || auth !== `Bearer ${env.CRON_SECRET}`) {
    logger.warn("cron unauthorized", { hasSecret: !!env.CRON_SECRET });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Replace with your scheduled work — sending digests, cleaning up
  // expired sessions, syncing 3rd-party data, etc.
  logger.info("cron tick", { route: "example" });

  return NextResponse.json({ ok: true });
}
