import { NextResponse, type NextRequest } from "next/server";

import { getServerEnv } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * Stripe webhook receiver — skeleton.
 *
 * Hooked at: `/api/webhooks/stripe`
 *
 * Excluded from the proxy in `src/proxy.ts` matcher (no session refresh
 * — Stripe doesn't carry cookies and the extra Supabase roundtrip races
 * the cookie store).
 *
 * To wire this up:
 *   1. `pnpm add stripe`
 *   2. Set STRIPE_WEBHOOK_SECRET in `.env.local` and Vercel.
 *   3. Replace the body below with `stripe.webhooks.constructEvent(...)`.
 *   4. Use `createAdminClient()` (RLS bypass) for any DB writes that the
 *      authenticated user wouldn't have permission for.
 *
 * @see https://stripe.com/docs/webhooks/signatures
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const env = getServerEnv();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    logger.warn("stripe webhook missing signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!env.STRIPE_WEBHOOK_SECRET) {
    logger.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // const body = await request.text()
  // const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  // switch (event.type) {
  //   case "checkout.session.completed": …
  //   case "customer.subscription.deleted": …
  // }

  logger.info("stripe webhook received (skeleton — no handler wired)");
  return NextResponse.json({ received: true });
}
