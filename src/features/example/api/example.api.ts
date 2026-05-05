import "server-only";

import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";
import type { ExampleItem } from "../types/example.types";

/**
 * Data-access layer for the Example feature.
 *
 * Rules:
 *   - Every function is async and returns typed data or throws.
 *   - Never expose raw Supabase errors to the caller — log them here,
 *     re-throw a clean Error with a stable message.
 *   - Auth + role checks happen in Server Actions or Route Handlers
 *     before calling these functions.
 */

export interface GetExamplesOptions {
  limit?: number;
  offset?: number;
}

export async function getExamples(options: GetExamplesOptions = {}): Promise<ExampleItem[]> {
  const { limit = 50, offset = 0 } = options;
  const supabase = await createClient();

  // Replace 'examples' with your actual table name.
  // This is a placeholder — the table does NOT exist in the DB yet.
  // Add a migration in supabase/migrations/ before enabling this.
  const { data, error } = await supabase
    .from("examples" as never) // 'as never' silences TS until table is real
    .select("id, title, description, created_at, updated_at")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    logger.error("getExamples failed", error, { limit, offset });
    throw new Error("Failed to fetch examples");
  }

  return (data ?? []).map(mapRow);
}

export async function getExampleById(id: string): Promise<ExampleItem | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("examples" as never)
    .select("id, title, description, created_at, updated_at")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    logger.error("getExampleById failed", error, { id });
    throw new Error("Failed to fetch example");
  }

  return data ? mapRow(data) : null;
}

// ─── Mapper ──────────────────────────────────────────────────────────────────

function mapRow(row: Record<string, unknown>): ExampleItem {
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
