# SFO CLI

Minimal CLI for Solo Founder Agent OS.

## Commands

```bash
pnpm sfo:list
pnpm sfo:validate
pnpm sfo:validate neosim-web
pnpm sfo:generate neosim-web
pnpm sfo:write-local neosim-web
pnpm sfo:dry-run
```

## Current status

This is the first safe MVP skeleton.

It can:

- list project profiles
- validate references to core, stack, domain and skill files
- detect conflicting `next15` + `next16` stack usage
- generate concrete agent files from templates to stdout
- write generated files into `.sfo-generated/<project>/`
- perform a dry-run summary

It does not write to other repositories yet.

## Safe local generation

```bash
pnpm sfo:write-local neosim-web
```

Writes generated files to:

```text
.sfo-generated/neosim-web/
```

This allows reviewing generated `AGENTS.md`, `CLAUDE.md`, Cursor rules and Claude commands before syncing them into real repositories.

## Next steps

1. Add real YAML parser or keep strict internal YAML subset.
2. Add controlled-block merge for existing files.
3. Add conflict detector rules.
4. Add GitHub sync via PR mode.
5. Add rollback metadata.
