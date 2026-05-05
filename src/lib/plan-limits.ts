import "server-only";

/**
 * Plan limits — single source of truth.
 *
 * Each key maps directly to a Stripe product ID (prod_xxx).
 * When `productId` is undefined (no active subscription) we fall back to "free".
 *
 * Usage:
 *   const limits = getPlanLimits(subscription?.product_id)
 *   if (projectCount >= limits.maxProjects) throw new Error("Upgrade required")
 *
 * To add a new plan:
 *   1. Create the product in Stripe.
 *   2. Add the product ID as a key below.
 *   3. Fill in the limit values.
 */

export interface PlanLimits {
  /** Human-readable name shown in the UI. */
  name: string;
  /** Max number of projects/items (use Infinity for unlimited). */
  maxProjects: number;
  /** Max number of team members. */
  maxMembers: number;
  /** Max storage in bytes. */
  maxStorageBytes: number;
  /** Max API calls per month. */
  maxApiCallsPerMonth: number;
  /** Whether AI features are unlocked. */
  aiEnabled: boolean;
}

/** Free plan — anyone without an active subscription. */
const FREE: PlanLimits = {
  name: "Free",
  maxProjects: 3,
  maxMembers: 1,
  maxStorageBytes: 5 * 1024 * 1024 * 1024, // 5 GB
  maxApiCallsPerMonth: 1_000,
  aiEnabled: false,
};

/** Pro plan — update STRIPE_PRODUCT_ID_PRO to your real Stripe product ID. */
const PRO: PlanLimits = {
  name: "Pro",
  maxProjects: Infinity,
  maxMembers: 10,
  maxStorageBytes: 50 * 1024 * 1024 * 1024, // 50 GB
  maxApiCallsPerMonth: 100_000,
  aiEnabled: true,
};

/** Team plan. */
const TEAM: PlanLimits = {
  name: "Team",
  maxProjects: Infinity,
  maxMembers: Infinity,
  maxStorageBytes: 500 * 1024 * 1024 * 1024, // 500 GB
  maxApiCallsPerMonth: Infinity,
  aiEnabled: true,
};

/**
 * Map Stripe product IDs → plan limits.
 * Replace keys with your real product IDs from the Stripe dashboard.
 */
const PRODUCT_PLAN_MAP: Record<string, PlanLimits> = {
  // prod_ProPlanId:  PRO,
  // prod_TeamPlanId: TEAM,
};

/**
 * Returns limits for the given Stripe productId.
 * Falls back to FREE if productId is undefined or unknown.
 */
export function getPlanLimits(productId: string | null | undefined): PlanLimits {
  if (!productId) return FREE;
  return PRODUCT_PLAN_MAP[productId] ?? FREE;
}

/** All named plan tiers — for rendering upgrade modals / pricing tables. */
export const PLANS = { FREE, PRO, TEAM } as const;
/** @public */
export type PlanName = keyof typeof PLANS;

/** Helper: format bytes for UI (e.g. "5 GB", "500 MB"). */
export function formatBytes(bytes: number): string {
  if (!isFinite(bytes)) return "Unlimited";
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(0)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

/** Helper: format a number limit for UI (e.g. "∞", "1,000"). */
export function formatLimit(n: number): string {
  if (!isFinite(n)) return "∞";
  return n.toLocaleString();
}
