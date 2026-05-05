/**
 * Public API for the Example feature.
 *
 * Only export what other features and pages need.
 * Never reach into src/features/example/components/X from outside —
 * always import via this barrel: `import { ExampleList } from '@/features/example'`
 *
 * Data-access functions are server-only — do NOT import from 'use client' files.
 */

// Types
export type { ExampleItem, CreateExampleInput, UpdateExampleInput } from "./types/example.types";

// Schemas
export {
  createExampleSchema,
  updateExampleSchema,
  deleteExampleSchema,
} from "./schemas/example.schemas";
export type { CreateExampleSchema, UpdateExampleSchema } from "./schemas/example.schemas";

// Data access (server-only)
export { getExamples, getExampleById } from "./api/example.api";

// Components
export { ExampleList } from "./components/ExampleList";

// Hooks (client-only)
export { useExample } from "./hooks/use-example";
