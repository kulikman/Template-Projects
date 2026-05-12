import { NextResponse, type NextRequest } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * Scheduled cleanup job — runs daily via Vercel Cron.
 *
 * Tasks:
 *   1. Delete read notifications older than 30 days.
 *   2. Delete expired org invites.
 *
 * Schedule: daily at 03:00 UTC (low-traffic window).
 * Vercel cron entry (vercel.json):
 *   { "path": "/api/cron/cleanup", "schedule": "0 3 * * *" }
 *
 * Authorization: Vercel sends `Authorization: Bearer ${CRON_SECRET}` on
 * every cron-triggered request. Set CRON_SECRET in your Vercel project env.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const env = getServerEnv();
  const auth = request.headers.get("authorization");

  if (!env.CRON_SECRET || auth !== `Bearer ${env.CRON_SECRET}`) {
    logger.warn("cron/cleanup: unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const results: Record<string, number> = {};

  // 1. Delete read notifications older than 30 days.
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error: notifError, count: notifCount } = await supabase
    .from("notifications")
    .delete({ count: "exact" })
    .eq("read", true)
    .lt("created_at", thirtyDaysAgo);

  if (notifError) {
    logger.error("cron/cleanup: notifications delete failed", notifError);
  } else {
    results.notificationsDeleted = notifCount ?? 0;
  }

  // 2. Delete expired org invites (expired_at < now and not yet accepted).
  const { error: inviteError, count: inviteCount } = await supabase
    .from("org_invites")
    .delete({ count: "exact" })
    .lt("expires_at", new Date().toISOString())
    .is("accepted_at", null);

  if (inviteError) {
    logger.error("cron/cleanup: org_invites delete failed", inviteError);
  } else {
    results.expiredInvitesDeleted = inviteCount ?? 0;
  }

  logger.info("cron/cleanup: complete", results);
  return NextResponse.json({ ok: true, ...results });
}
