/**
 * Org domain — pure TypeScript interfaces.
 *
 * RULE: This file must have zero external dependencies.
 * No imports from @/lib, @/features, @/app, or any npm package.
 * Only TypeScript built-ins are allowed.
 *
 * Everything that depends on Supabase / Next.js / external services lives in
 * the infrastructure layer (src/features/orgs/lib/, src/lib/).
 */

/** @public */
export type OrgRole = "owner" | "admin" | "member";

/** @public */
export interface OrgMembership {
  orgId: string;
  orgName: string;
  orgSlug: string;
  role: OrgRole;
}

/** Parameters for creating a new organization. */
export interface CreateOrgParams {
  name: string;
  slug: string;
  userId: string;
}

/**
 * Repository interface for org persistence.
 * Implemented by SupabaseOrgRepository in the infrastructure layer.
 * Use cases depend on this interface, not the concrete class.
 */
export interface OrgRepository {
  create(params: CreateOrgParams): Promise<{ id: string; slug: string }>;
  getUserOrgs(userId: string): Promise<OrgMembership[]>;
  getMembership(userId: string, slug: string): Promise<OrgMembership | null>;
}
