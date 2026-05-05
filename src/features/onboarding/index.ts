/**
 * Onboarding feature — public API.
 *
 * External code imports only from this barrel.
 * Do NOT import from internal paths like @/features/onboarding/lib/...
 */
export { OnboardingWizard } from "@/features/onboarding/components/onboarding-wizard";
export { advanceOnboardingStep, skipOnboarding, saveOnboardingProfile } from "@/features/onboarding/api/actions";
export { ONBOARDING_STEPS, TOTAL_STEPS } from "@/features/onboarding/lib/steps";
export type { OnboardingStep } from "@/features/onboarding/lib/steps";
