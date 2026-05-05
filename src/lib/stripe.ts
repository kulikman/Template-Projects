import "server-only";

import Stripe from "stripe";

import { getServerEnv } from "@/lib/env";

/**
 * Nullable Stripe singleton.
 *
 * Returns `undefined` when STRIPE_SECRET_KEY is not set, so the payments
 * feature degrades gracefully in dev/staging without a configured account.
 * All callers must handle the `undefined` case (e.g. `stripe?.prices.list()`).
 *
 * Never import this in a "use client" file — `import "server-only"` enforces it.
 */
const { STRIPE_SECRET_KEY } = getServerEnv();

export const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : undefined;

export type { Stripe };
