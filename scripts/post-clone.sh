#!/usr/bin/env bash
# post-clone.sh — Run after forking Template-SAAS-Projects to personalize the project.
#
# Usage:
#   bash scripts/post-clone.sh "My Product" "my-product" "https://myproduct.com"
#
# Arguments:
#   $1 — Display name (e.g. "NeoSIM", "2Sky CRM")
#   $2 — Package name / slug (e.g. "neosim", "2sky-crm")
#   $3 — Production URL (e.g. "https://neosim.app")

set -euo pipefail

DISPLAY_NAME="${1:-}"
SLUG="${2:-}"
PROD_URL="${3:-}"

if [[ -z "$DISPLAY_NAME" || -z "$SLUG" || -z "$PROD_URL" ]]; then
  echo "Usage: bash scripts/post-clone.sh \"Display Name\" \"slug\" \"https://url.com\"" >&2
  exit 1
fi

# ── Footgun guard ────────────────────────────────────────────────────────────
# This script ends with `rm -rf .git && git init`. Running it in an existing
# project nukes history. Refuse unless the repo looks like a fresh template
# checkout (≤5 commits) or the user explicitly opts in via --force-reinit.
FORCE_REINIT=false
for arg in "$@"; do
  [[ "$arg" == "--force-reinit" ]] && FORCE_REINIT=true
done

if [[ -d .git && "$FORCE_REINIT" != "true" ]]; then
  COMMITS=$(git log --oneline 2>/dev/null | wc -l | tr -d ' ')
  if [[ "$COMMITS" -gt 5 ]]; then
    echo "✋ Refusing to reinit git: this repo has $COMMITS commits." >&2
    echo "   This script is meant for fresh template checkouts." >&2
    echo "   If you really mean it, re-run with --force-reinit." >&2
    exit 1
  fi
fi

# Refuse if package.json doesn't look like our template (already renamed).
if [[ -f package.json ]] && ! grep -q '"name": "template-saas-projects"' package.json; then
  echo "✋ package.json is not template-saas-projects — looks already personalized." >&2
  echo "   Re-run with --force-reinit if you really want to overwrite." >&2
  [[ "$FORCE_REINIT" != "true" ]] && exit 1
fi

echo "→ Personalizing project: $DISPLAY_NAME ($SLUG)"

# ── package.json ─────────────────────────────────────────────────────────────
if [[ -f package.json ]]; then
  sed -i.bak "s/\"name\": \"template-saas-projects\"/\"name\": \"$SLUG\"/" package.json
  rm -f package.json.bak
  echo "  ✓ package.json name → $SLUG"
fi

# ── .env.example ─────────────────────────────────────────────────────────────
# `.env.example` is committed and shared across local devs — it must keep
# `NEXT_PUBLIC_APP_URL=http://localhost:3000` so a fresh `cp .env.example
# .env.local` boots correctly. Production values live in `vercel env`.
# Only patch the human-facing display name here.
if [[ -f .env.example ]]; then
  sed -i.bak "s|NEXT_PUBLIC_APP_NAME=Template-SAAS-Projects|NEXT_PUBLIC_APP_NAME=$DISPLAY_NAME|" .env.example
  rm -f .env.example.bak
  echo "  ✓ .env.example APP_NAME → $DISPLAY_NAME"
fi

# ── src/config/site.ts ───────────────────────────────────────────────────────
# `siteConfig` is the single source of truth — `layout.tsx` reads from it,
# so we only need to touch site.ts (no separate layout sed).
if [[ -f src/config/site.ts ]]; then
  sed -i.bak "s|name: \"Template-SAAS-Projects\"|name: \"$DISPLAY_NAME\"|" src/config/site.ts
  sed -i.bak "s|Template-SAAS-Projects — Next.js 16 + Supabase SaaS starter.|$DISPLAY_NAME — powered by Next.js + Supabase.|" src/config/site.ts
  sed -i.bak "s|url: \"http://localhost:3000\"|url: \"$PROD_URL\"|" src/config/site.ts
  sed -i.bak "s|https://github.com/kulikman/Template-SAAS-Projects|https://github.com/kulikman/$SLUG|" src/config/site.ts
  # Legacy URLs from older template forks (no-op if absent)
  sed -i.bak "s|https://github.com/kulikman/Template-Projects|https://github.com/kulikman/$SLUG|" src/config/site.ts
  sed -i.bak "s|https://github.com/kulikman/template-starter|https://github.com/kulikman/$SLUG|" src/config/site.ts
  rm -f src/config/site.ts.bak
  echo "  ✓ site.ts → $DISPLAY_NAME ($PROD_URL)"
fi

# ── robots.txt ───────────────────────────────────────────────────────────────
# We ship `src/app/robots.ts` (Next 16 file convention) — it reads the canonical
# URL from `getPublicMetadataEnv().NEXT_PUBLIC_APP_URL` at request time, so the
# Sitemap URL stays correct without any post-clone patching. There is no static
# `public/robots.txt` to rewrite — do not add one.

# ── public/llms.txt ──────────────────────────────────────────────────────────
if [[ -f public/llms.txt ]]; then
  sed -i.bak "s|# ProjectName|# $DISPLAY_NAME|" public/llms.txt
  sed -i.bak "s|https://example.com|$PROD_URL|" public/llms.txt
  rm -f public/llms.txt.bak
  echo "  ✓ llms.txt → $DISPLAY_NAME"
fi

# ── src/lib/env.ts (default display name in Zod) ─────────────────────────────
if [[ -f src/lib/env.ts ]]; then
  sed -i.bak "s|default(\"Template-SAAS-Projects\")|default(\"$DISPLAY_NAME\")|g" src/lib/env.ts
  rm -f src/lib/env.ts.bak
  echo "  ✓ env.ts default NEXT_PUBLIC_APP_NAME → $DISPLAY_NAME"
fi

# ── Clean up git for fresh start ─────────────────────────────────────────────
if [[ -d .git ]]; then
  rm -rf .git
  git init
  git add .
  git commit -m "chore: initialize $DISPLAY_NAME from template-saas-projects"
  echo "  ✓ Fresh git history"
fi

echo ""
echo "✅ Project personalized: $DISPLAY_NAME"
echo ""
echo "Next steps:"
echo "  1. cp .env.example .env.local && fill in Supabase keys + NEXT_PUBLIC_APP_URL"
echo "  2. pnpm install"
echo "  3. pnpm dev"
echo "  4. Update public/llms.txt with product description"
echo ""
echo "  robots.txt is generated dynamically by src/app/robots.ts — it"
echo "  picks up NEXT_PUBLIC_APP_URL automatically, no manual edits."
echo ""
