import { z } from "zod";

import { logger } from "@/lib/logger";

interface FetcherOptions<TSchema extends z.ZodTypeAny> extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Zod schema to validate the response. Mandatory — never trust 3rd-party shape. */
  schema: TSchema;
  /** Total request budget in ms (default 10s). */
  timeoutMs?: number;
  /** Number of retries on 5xx / network failure (default 2). */
  retries?: number;
}

/**
 * Typed `fetch` wrapper for external APIs.
 *
 *   - Validates the response against a Zod schema (no `as Foo`).
 *   - Retries on 5xx and network errors with exponential backoff.
 *   - Hard timeout via AbortController.
 *   - JSON-encodes objects passed to `body`.
 *
 * Throws on non-2xx after retries, or on schema mismatch. Catch and
 * surface a user-friendly message in Server Actions.
 *
 * @example
 *   const user = await fetcher("https://api.example.com/users/me", {
 *     headers: { Authorization: `Bearer ${token}` },
 *     schema: z.object({ id: z.string(), email: z.string().email() }),
 *   })
 */
export async function fetcher<TSchema extends z.ZodTypeAny>(
  url: string,
  options: FetcherOptions<TSchema>
): Promise<z.infer<TSchema>> {
  const { schema, timeoutMs = 10_000, retries = 2, body, headers, ...rest } = options;

  const init: RequestInit = {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...init, signal: controller.signal });

      if (response.status >= 500 && attempt < retries) {
        await sleep(2 ** attempt * 250);
        continue;
      }

      if (!response.ok) {
        throw new Error(`Fetch ${response.status} ${response.statusText} — ${url}`);
      }

      const json: unknown = await response.json();
      const parsed = schema.safeParse(json);
      if (!parsed.success) {
        logger.error("fetcher schema mismatch", new Error(parsed.error.message), { url });
        throw new Error(`Response shape mismatch: ${url}`);
      }

      return parsed.data;
    } catch (error) {
      lastError = error;
      if (attempt >= retries) break;
      await sleep(2 ** attempt * 250);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`fetcher failed: ${url}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
