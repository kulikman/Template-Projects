# SFO CLI

Minimal CLI for Solo Founder Agent OS.

## Commands

```bash
pnpm sfo:list
pnpm sfo:validate
pnpm sfo:validate neosim-web
pnpm sfo:generate neosim-web
pnpm sfo:dry-run
```

## Current status

This is the first safe MVP skeleton.

It can:

- list project profiles
- validate references to core, stack, domain and skill files
- detect conflicting `next15` + `next16` stack usage
- generate a combined rules bundle to stdout
- perform a dry-run summary

It does not yet write to other repositories.

## Next steps

1. Add real YAML parser or keep strict internal YAML subset.
2. Add generated output templates for AGENTS.md, CLAUDE.md, Cursor and Claude commands.
3. Add conflict detector rules.
4. Add local file writer with controlled SFO blocks.
5. Add GitHub sync via PR mode.
