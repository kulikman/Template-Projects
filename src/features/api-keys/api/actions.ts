"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { generateApiKey, hashApiKey, keyPrefix } from "../lib/crypto";

export interface CreateApiKeyResult {
  /** The full raw key — shown ONCE, not stored. */
  rawKey: string;
  /** The persisted key record ID. */
  id: string;
}

/**
 * Create a new API key for the current user.
 * Returns the raw key — it must be shown to the user immediately.
 * After this call the raw key cannot be recovered.
 */
export async function createApiKey(name: string): Promise<CreateApiKeyResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const rawKey = generateApiKey();
  const hash = await hashApiKey(rawKey);
  const prefix = keyPrefix(rawKey);

  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      user_id: user.id,
      name: name.trim(),
      key_hash: hash,
      key_prefix: prefix,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/settings/api-keys");

  return { rawKey, id: data.id };
}

/**
 * Delete an API key by ID.
 * RLS ensures users can only delete their own keys.
 */
export async function deleteApiKey(keyId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("api_keys").delete().eq("id", keyId).eq("user_id", user.id);

  revalidatePath("/settings/api-keys");
}

/**
 * Rename an existing API key.
 *
 * @public
 */
export async function renameApiKey(keyId: string, newName: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("api_keys")
    .update({ name: newName.trim() })
    .eq("id", keyId)
    .eq("user_id", user.id);

  revalidatePath("/settings/api-keys");
}

/**
 * Authenticate an incoming API request by looking up the hashed key.
 * Call this from Route Handlers that support API key auth.
 *
 * @example
 * @public
 *
 *   const userId = await verifyApiKey(request.headers.get("x-api-key"))
 *   if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 })
 */
export async function verifyApiKey(rawKey: string | null): Promise<string | null> {
  if (!rawKey) return null;

  const hash = await hashApiKey(rawKey);
  const supabase = await createClient();

  const { data } = await supabase
    .from("api_keys")
    .select("user_id")
    .eq("key_hash", hash)
    .maybeSingle();

  if (!data) return null;

  // Fire-and-forget: update last_used_at without blocking the response.
  void supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("key_hash", hash);

  return data.user_id;
}
