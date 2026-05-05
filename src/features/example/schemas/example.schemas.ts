import { z } from "zod";

/**
 * Zod schemas for all external input boundaries in the Example feature.
 *
 * Rules:
 *   - One schema per mutation shape (create, update, delete).
 *   - Never skip `.safeParse()` — always handle the error branch.
 *   - Keep schemas in sync with database columns.
 */

export const createExampleSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().max(1000).nullable().optional(),
});

export const updateExampleSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).nullable().optional(),
});

export const deleteExampleSchema = z.object({
  id: z.string().uuid(),
});

export type CreateExampleSchema = z.infer<typeof createExampleSchema>;
export type UpdateExampleSchema = z.infer<typeof updateExampleSchema>;
export type DeleteExampleSchema = z.infer<typeof deleteExampleSchema>;
