# Agent Policy Sync

Updated: 2026-06-20

This repo contains a manual dry-run sync workflow for the canonical Solo
Founder Agent OS policy bundle.

## Workflow

```text
.github/workflows/agent-policy-sync.yml
```

The workflow is `workflow_dispatch` only. It does not run automatically on every
push.

Default mode is dry-run:

```text
dry_run: true
```

`dry_run: false` is intentionally blocked until the custom PR engine is
implemented.

## Local Dry Run

```text
pnpm agent:sync-dry-run
```

The local dry run reads `.github/agent-policy-sync.yml` and
`docs/18_AGENT_REPO_INVENTORY.md`, then compares canonical policy bundle files
against local repository checkouts.

## Sync Config

```text
.github/agent-policy-sync.yml
```

The config plans sync for only canonical policy bundle files:

- `.agent-policy-version`
- `solo-founder-os/core/`
- `solo-founder-os/stacks/`
- `solo-founder-os/domains/`
- `solo-founder-os/skills/`
- `solo-founder-os/policy/`

It does not sync live repository files such as `AGENTS.md`, `CLAUDE.md`,
`.claude/`, `.cursor/` or `.github/workflows/`. Those files can contain
repo-specific manual sections and need a safer generated-block workflow before
automatic updates.

## Required Secret For Future Write Sync

Future write sync will require a repository secret:

```text
GH_PAT
```

Cross-repository write access requires a personal access token. The default
`GITHUB_TOKEN` is not enough for creating branches and pull requests in other
repositories.

## Safety Rules

- Current workflow is dry-run only.
- Keep `dry_run: true` for test runs.
- Do not add `AGENTS.md`, `CLAUDE.md`, `.claude/` or `.cursor/` to this sync
  config until generated-block merging exists.
- Exclude archived and miscellaneous local-only repositories from the active
  sync target list.
