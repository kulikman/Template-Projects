import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { OnboardingWizard } from "@/features/onboarding";

/**
 * /onboarding — multi-step setup wizard for new users.
 *
 * Access rules:
 *   - Unauthenticated → redirect to /login
 *   - Already completed → redirect to /dashboard
 */
export default async function OnboardingPage(): Promise<React.ReactElement> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed, onboarding_step")
    .eq("id", user.id)
    .single();

  if (profile?.onboarding_completed) redirect("/dashboard");

  const currentStep = profile?.onboarding_step ?? 0;

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <OnboardingWizard currentStep={currentStep} />
    </div>
  );
}
