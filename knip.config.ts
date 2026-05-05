import type { KnipConfig } from 'knip'

/**
 * Knip — dead code detector.
 *
 * Finds unused files, exports, and dependencies.
 * Run: `pnpm knip`
 *
 * Docs: https://knip.dev/overview/configuration
 *
 * Ignored paths are intentional:
 *   - scripts/       — standalone Node scripts, not imported
 *   - supabase/      — SQL migrations, not TS
 *   - tests/e2e/     — Playwright stubs (not yet wired)
 *   - commitlint.config.ts — loaded by @commitlint/cli, not imported
 *   - vitest.config.ts     — loaded by vitest runner, not imported
 */
const config: KnipConfig = {
  entry: [
    // Next.js App Router entry points
    'src/app/**/{page,layout,loading,error,not-found,route,opengraph-image,icon,sitemap,robots}.{ts,tsx}',
    // Instrumentation (loaded by Next.js runtime)
    'src/instrumentation.ts',
    // Proxy (Next.js 16 convention)
    'src/proxy.ts',
    // Config files loaded by tools, not imported
    'commitlint.config.ts',
    'vitest.config.ts',
    'eslint.config.mjs',
    'postcss.config.mjs',
  ],
  project: ['src/**/*.{ts,tsx}'],
  ignore: [
    'scripts/**',
    'supabase/**',
    'tests/e2e/**',
    'tests/ai-evals/**',
    '.husky/**',
    '**/*.d.ts',
  ],
  ignoreDependencies: [
    // Peer deps / transitive requirements not directly imported
    'server-only',
  ],
  // Feature barrel — knip sees the barrel export and the internal files as used.
  paths: {
    '@/*': ['./src/*'],
  },
}

export default config
