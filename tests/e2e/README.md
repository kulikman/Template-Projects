# E2E tests

This folder is reserved for Playwright end-to-end tests. The runner is
**not** installed by default — Playwright pulls ~300 MB of browser
binaries, which is overkill for a starter.

## Bootstrap when you need them

```bash
pnpm add -D @playwright/test
pnpm exec playwright install --with-deps
```

Add to `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

Add to `.github/workflows/ci.yml` (after the `test` job):

```yaml
  e2e:
    name: E2E (Playwright)
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:e2e
```

## What to cover first

The 80/20 of E2E for this template:

1. **Login flow** — happy path + invalid credentials
2. **Protected route redirect** — visiting `/dashboard` while signed out
   redirects to `/login`
3. **Theme persistence** — toggle theme, reload, verify class on `<html>`

Skip exhaustive UI coverage — Vitest already covers utilities and pure
logic; Playwright should only chase the bugs that only a real browser
can find (auth cookies, redirects, hydration).
