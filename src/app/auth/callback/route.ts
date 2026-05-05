import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";
import { ROUTES } from "@/lib/constants";

/**
 * Supabase Auth callback handler.
 *
 * Supabase redirects here after:
 *   - Email confirmation (signup)
 *   - Password reset (magic link)
 *   - OAuth flows (if added later)
 *
 * The `code` param is exchanged for a session; the user is then
 * redirected to `next` (default: dashboard).
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? ROUTES.dashboard;

  if (!code) {
    logger.warn("auth callback missing code param");
    return NextResponse.redirect(`${origin}${ROUTES.login}?error=auth_callback_failed`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    logger.warn("auth callback exchange failed", { reason: error.message });
    return NextResponse.redirect(`${origin}${ROUTES.login}?error=auth_callback_failed`);
  }

  logger.info("auth callback success", { next });
  return NextResponse.redirect(`${origin}${next}`);
}
