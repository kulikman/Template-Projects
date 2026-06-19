# SFO CLI

Minimal CLI for Solo Founder Agent OS.

## Commands

```bash
pnpm sfo:list
pnpm sfo:validate
pnpm sfo:validate neosim-web
pnpm sfo:generate neosim-web
pnpm sfo:write-local neosim-web
pnpm sfo:merge-local neosim-web
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
- merge only controlled SFO blocks into `.sfo-merged/<project>/`
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

## Controlled-block merge

```bash
pnpm sfo:merge-local neosim-web
```

Reads existing generated files from:

```text
.sfo-generated/neosim-web/
```

Writes merged files to:

```text
.sfo-merged/neosim-web/
```

The merge updates only blocks like:

```md
<!-- SFO:BEGIN core/git-protocol -->
...
<!-- SFO:END core/git-protocol -->
```

Manual content outside SFO blocks is preserved.

## Next steps

1. Add real YAML parser or keep strict internal YAML subset.
2. Add conflict detector rules.
3. Add GitHub sync via PR mode.
4. Add rollback metadata.
5. Add agent behavior tests.
