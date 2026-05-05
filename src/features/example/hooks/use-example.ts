"use client";

import { useCallback, useState, useTransition } from "react";
import type { ExampleItem } from "../types/example.types";

/**
 * Example client-side hook pattern.
 *
 * For data fetching, prefer Server Components + `getExamples()` directly.
 * This hook is for optimistic UI updates after a Server Action mutation.
 *
 * Pattern:
 *   1. Server Component passes initial `items` as a prop.
 *   2. Client Component holds them in local state.
 *   3. On mutation, optimistically update, then revalidate via Server Action.
 */

interface UseExampleOptions {
  initialItems: ExampleItem[];
}

interface UseExampleReturn {
  items: ExampleItem[];
  isPending: boolean;
  removeOptimistic: (id: string) => void;
  restoreItem: (item: ExampleItem) => void;
}

export function useExample({ initialItems }: UseExampleOptions): UseExampleReturn {
  const [items, setItems] = useState<ExampleItem[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  const removeOptimistic = useCallback((id: string) => {
    startTransition(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    });
  }, []);

  const restoreItem = useCallback((item: ExampleItem) => {
    setItems((prev) => [item, ...prev]);
  }, []);

  return { items, isPending, removeOptimistic, restoreItem };
}
