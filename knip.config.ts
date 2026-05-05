import type { KnipConfig } from "knip";

/**
 * Knip — dead code detector.
 *
 * Finds unused files, exports, and dependencies. Run: `pnpm knip`.
 *
 * Docs: https://knip.dev/overview/configuration
 *
 * The `ignore*` lists below cover **intentional** template-public APIs and
 * peer-dep style imports that knip can't statically resolve. Any new entry
 * here needs a one-line comment explaining why it's kept.
 */
const config: KnipConfig = {
  entry: [
    // Next.js App Router entry points
    "src/app/**/{page,layout,loading,error,not-found,route,opengraph-image,icon,sitemap,robots}.{ts,tsx}",
    // Instrumentation (loaded by Next.js runtime)
    "src/instrumentation.ts",
    // Proxy (Next.js 16 convention)
    "src/proxy.ts",
    // Sentry config files (auto-loaded by @sentry/nextjs)
    "sentry.client.config.ts",
    "sentry.server.config.ts",
    // Config files loaded by tools, not imported
    "commitlint.config.ts",
    "vitest.config.ts",
    "eslint.config.mjs",
    "postcss.config.mjs",
    "playwright.config.ts",
  ],
  project: ["src/**/*.{ts,tsx}"],
  ignore: [
    "scripts/**", // standalone Node scripts, not imported
    "supabase/**", // SQL migrations, not TS
    "tests/e2e/**", // Playwright runner discovers these directly
    "tests/ai-evals/**", // README only — wired when AI features land
    ".husky/**", // shell hook scripts
    "**/*.d.ts", // ambient declarations
    "src/lib/supabase/client.ts", // template-public API for client components
  ],
  ignoreDependencies: [
    "server-only", // sentinel package: imports prove server-side, no runtime
    "tailwindcss", // loaded via PostCSS plugin, not imported in TS
    "shadcn", // CLI: `pnpm dlx shadcn@latest add ...`
    "postcss", // peer dep of @tailwindcss/postcss, used in postcss.config.mjs
  ],
  ignoreExportsUsedInFile: true,
  // Exports tagged with `@public` in JSDoc are template-public APIs —
  // exported on purpose for consumers, even if nothing in-repo imports them.
  tags: ["-public"],
  ignoreBinaries: [
    "supabase", // CLI used in pnpm scripts, installed globally / via npx
  ],
  paths: {
    "@/*": ["./src/*"],
  },
};

export default config;
