import "server-only";

import Stripe from "stripe";

import { getServerEnv } from "@/lib/env";

/**
 * Lazy singleton — instantiated only when first called.
 * Avoids import-time crashes when STRIPE_SECRET_KEY is not set
 * (e.g. CI builds, non-billing deployments).
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const { STRIPE_SECRET_KEY } = getServerEnv();
  if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured. Add it to .env.local and Vercel.");
  }

  _stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2026-04-22.dahlia",
    typescript: true,
  });

  return _stripe;
}

/**
 * Create or retrieve the Stripe customer ID for a Supabase user.
 * Persists the customer ID to `profiles.stripe_customer_id`.
 */
export async function getOrCreateStripeCustomer(params: {
  userId: string;
  email: string;
  existingCustomerId?: string | null;
}): Promise<string> {
  const stripe = getStripe();

  if (params.existingCustomerId) {
    return params.existingCustomerId;
  }

  const customer = await stripe.customers.create({
    email: params.email,
    metadata: { supabase_user_id: params.userId },
  });

  return customer.id;
}
