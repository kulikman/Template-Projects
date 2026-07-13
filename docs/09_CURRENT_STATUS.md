# Current Status

> **AI Agent:** Read this file at the start of every session before writing any code.
> Update this file after every completed task.
> Do not invent progress — only write what is confirmed from the current codebase.

---

## Last Updated
2026-07-13

## Current Phase
- [x] Template — production-ready, actively maintained

---

## Currently Working On
Template maintenance complete. Ready for use in new projects.

---

## Completed (template scope)
- [x] Next.js 16 + React 19.2 + Tailwind v4 + TypeScript 6 scaffold
- [x] Supabase Auth, RLS, Storage, Realtime wired
- [x] Stripe subscriptions + webhooks + plan limits
- [x] Resend email (templates + send helper)
- [x] Onboarding wizard (`src/features/onboarding/`)
- [x] In-app notifications with Realtime bell (`src/features/notifications/`)
- [x] API key management (`src/features/api-keys/`)
- [x] Multi-tenant organizations (`src/features/orgs/`)
- [x] Clean Architecture: `src/domain/` (pure interfaces), use cases with DI
- [x] Rate limiting (Upstash sliding window) on org + Stripe routes
- [x] Playwright E2E tests (navigation + health)
- [x] Full `.claude/rules/` set (9 files incl. clean-architecture)
- [x] Synced rules to 7 ecosystem repos (Elaurion-Options, neosim-web, neosim-backend, neosim-admin, Founder-OS, Secret-project, Elliott-wave)

---

## In Progress
- [ ] —

---

## Blocked
- [ ] —

---

## Next Step
Fork this template for a new project → run SETUP-001 (Supabase) → SETUP-002 (Stripe) → SETUP-003 (Resend) → start feature backlog.

---

## Do Not Touch
These areas must not be changed without explicit discussion:

- `supabase/migrations/` — no manual edits, only new migration files
- `src/lib/supabase/admin.ts` — never import from client-side code
- `src/proxy.ts` — auth + security headers wiring
- Payment webhook logic (`src/app/api/webhooks/stripe/`)
- Auth callback logic (`src/app/auth/callback/`)
- `src/domain/` — pure interfaces only, zero external deps

---

## Known Issues
- None

---

## Recent Decisions
- 2026-07-13: Clean Architecture + DI pattern adopted — see `15_DECISIONS_LOG.md` DECISION-003

---

## Environment Status

| Environment | URL | Status |
|---|---|---|
| Local | http://localhost:3000 | ✅ |
| Staging | https://staging.[domain] | ⬜ Not configured |
| Production | https://[domain] | ⬜ Not deployed |
