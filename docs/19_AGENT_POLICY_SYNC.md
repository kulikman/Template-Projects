# Agent Policy Sync

Updated: 2026-06-20

This repo contains a manual, PR-only sync workflow for the canonical Solo
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

Set `dry_run` to `false` only when you want the action to create sync branches
and pull requests in target repositories.

## Sync Config

```text
.github/agent-policy-sync.yml
```

The config syncs only canonical policy bundle files:

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

## Required Secret

The workflow requires a repository secret:

```text
GH_PAT
```

`repo-file-sync-action` requires a personal access token for cross-repository
write access. The default `GITHUB_TOKEN` is not enough for this use case.

## Safety Rules

- Sync opens pull requests; it should not push directly to target default
  branches.
- Keep `dry_run: true` for test runs.
- Review generated PRs before merge.
- Do not add `AGENTS.md`, `CLAUDE.md`, `.claude/` or `.cursor/` to this sync
  config until generated-block merging exists.
- Exclude archived and miscellaneous local-only repositories from the active
  sync target list.
