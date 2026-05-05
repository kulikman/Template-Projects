"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { TOTAL_STEPS } from "../lib/steps";

/**
 * Advance the onboarding wizard to the next step.
 * Called by the "Next" button on each step.
 */
export async function advanceOnboardingStep(currentStep: number): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const nextStep = currentStep + 1;
  const isLast = nextStep >= TOTAL_STEPS - 1;

  await supabase
    .from("profiles")
    .update({
      onboarding_step: nextStep,
      ...(isLast ? { onboarding_completed: true } : {}),
    })
    .eq("id", user.id);

  revalidatePath("/onboarding");

  if (isLast) {
    redirect("/dashboard");
  }
}

/**
 * Skip onboarding entirely — marks it as completed immediately.
 */
export async function skipOnboarding(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  await supabase.from("profiles").update({ onboarding_completed: true }).eq("id", user.id);

  redirect("/dashboard");
}

/**
 * Save profile data collected in step 2 (profile).
 */
export async function saveOnboardingProfile(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const fullName = String(formData.get("full_name") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();

  if (!fullName || !username) return;

  await supabase.from("profiles").update({ full_name: fullName, username }).eq("id", user.id);
}
