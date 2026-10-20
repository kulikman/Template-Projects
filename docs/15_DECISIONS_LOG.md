# Decisions Log

This file records important product and technical decisions.
Log a decision here whenever you make a meaningful architectural, stack, or product choice that would be non-obvious to a future developer (or AI agent) reading the code.

---

## Template: How to log a decision

```markdown
## DECISION-XXX: [Short title]

### Date
YYYY-MM-DD

### Decision
[What was decided in one sentence]

### Context
[Why this decision was needed — what problem or question triggered it]

### Options Considered

#### Option 1: [Name]
Pros: ...
Cons: ...

#### Option 2: [Name]
Pros: ...
Cons: ...

### Final Reason
[Why this option was chosen over others]

### Consequences
- Positive: ...
- Negative / trade-offs: ...
- Risks: ...
```

---

## DECISION-001: Tech Stack

### Date
[YYYY-MM-DD]

### Decision
Use Next.js 16 + Supabase + Stripe + Tailwind v4 as the primary stack.

### Context
Starting from the SaaS template. Stack was pre-selected in the template.

### Final Reason
- Next.js 16 App Router: best-in-class DX for full-stack React with Server Components
- Supabase: Postgres + Auth + Realtime + Storage in one managed service, generous free tier
- Stripe: industry standard for SaaS billing, best webhook reliability
- Tailwind v4: no config file, CSS-native theme tokens, fast build

### Consequences
- Positive: fast setup, great documentation, strong ecosystem
- Negative: locked into Supabase for auth; migrating away would be expensive
- Risks: Supabase vendor dependency for production data

---

## DECISION-002: Auth Microservice (Better Auth)

### Date
2026-07-13

### Decision
Extract authentication into a standalone Better Auth microservice instead of per-project Supabase Auth.

### Context
Ecosystem of 7+ projects (Next.js, Expo, Python) needed a unified identity provider. Managing separate Supabase Auth setups per project led to duplicated user tables, no SSO, and no cross-project org management.

### Options Considered

#### Option 1: Supabase Auth per project (status quo)
Pros: zero infra overhead, built into Supabase
Cons: no SSO, no OIDC for non-JS clients, duplicate users across projects

#### Option 2: Better Auth microservice (chosen)
Pros: single source of truth, OIDC for Python/Go, organization plugin for multi-tenant, passkeys + magic link, self-hosted
Cons: requires VPS to run, separate Postgres DB, more ops complexity

### Final Reason
OIDC support was non-negotiable for Python services. Organization plugin enables multi-tenant across all projects from one place. Cost of VPS is predictable; Supabase Auth is serverless but per-project complexity compounds.

### Consequences
- Positive: SSO across ecosystem, OIDC for all stacks, one user table, one org structure
- Negative: another service to operate (Docker + VPS); must keep Better Auth upgraded
- Risks: auth service downtime affects all projects — requires health monitoring and restart policy

---

## DECISION-003: Clean Architecture + Dependency Injection

### Date
2026-07-13

### Decision
Adopt Clean Architecture (domain → features → app) with explicit Dependency Injection in use cases for all non-trivial features.

### Context
Template codebase started with fat Server Actions mixing Supabase queries, business logic, email sending, and audit logging in one function. This made testing impossible without vi.mock() and made cross-feature reuse hard.

### Options Considered

#### Option 1: Fat Server Actions (status quo)
Pros: simple, one file per mutation
Cons: untestable without mocking entire modules, no clear boundary between infra and logic

#### Option 2: Clean Architecture with DI (chosen)
Pros: use cases testable with stubs, domain layer has zero external deps, clear responsibility per layer
Cons: more files per feature, unfamiliar to junior devs, need to explain DI pattern in CLAUDE.md

### Final Reason
The canonical orgs feature showed the pattern works: `create-org.ts` takes a `CreateOrgDeps` object and can be tested by passing stubs directly. No vi.mock() needed. The benefits compound as the feature count grows.

### Consequences
- Positive: testable business logic, clear layer boundaries, easy to stub in tests and Storybook
- Negative: 2–3 extra files per feature vs. a single Server Action
- Risks: developers may bypass the pattern if not explained in CLAUDE.md (hence the rules file)

---

## DECISION-004: 2SkyMobile Brand Palette as Template Default

### Date
2026-10-20

### Decision
Replace the default shadcn/ui slate palette with 2SkyMobile brand colors (Electric Blue `#026BD4`, Astro dark `#0B0F1A`) using oklch color space throughout `globals.css`.

### Context
The template was initialized with the standard shadcn/ui slate/zinc tokens. When 2SkyMobile projects fork this template, they would need to manually replace every color token. Baking the brand palette in as the default eliminates that step and makes the template immediately on-brand.

### Options Considered

#### Option 1: Keep neutral slate palette
Pros: maximally generic, works for any project
Cons: every 2SkyMobile fork must re-apply the palette manually; risk of inconsistency

#### Option 2: Apply 2SkyMobile palette as default (chosen)
Pros: forks are immediately on-brand; oklch ensures perceptual uniformity; semantic tokens (--success, --info, --warning) are brand-neutral status colors
Cons: slightly less generic — non-2SkyMobile forks need to swap the palette

### Final Reason
This template is maintained primarily for 2SkyMobile products. The brand palette is the sensible default. Non-2SkyMobile forks can replace the six root-level oklch values in `globals.css` in under a minute.

### Consequences
- Positive: forks start on-brand, oklch gives consistent perceptual contrast, dark mode is first-class
- Negative: the template is no longer palette-neutral
- Risks: none — palette change is CSS-only, no TypeScript or logic impact
