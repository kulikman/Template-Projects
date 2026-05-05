/**
 * Domain types for the Example feature.
 *
 * Keep this file pure TypeScript — no Zod, no Supabase imports.
 * Zod schemas live in ../schemas/; DB row types come from @/types/database.
 */

export interface ExampleItem {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateExampleInput = Pick<ExampleItem, "title" | "description">;
export type UpdateExampleInput = Partial<Pick<ExampleItem, "title" | "description">>;
