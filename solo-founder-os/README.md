# Solo Founder Agent OS

A rules and skills operating system for solo-founder AI development across Claude Code, Cursor, Codex and future coding agents.

## Goal

Keep shared engineering rules in one place while allowing every repository to keep its own stack, domain and project-specific behavior.

The system is designed around layered inheritance:

```text
core rules
+ stack rules
+ domain rules
+ skills
+ project overrides
= generated agent files
```

## Initial MVP scope

Phase 1 focuses on:

1. Repository discovery
2. Core rules
3. Stack rules
4. Domain rules
5. Project profiles
6. Generator specification
7. Sync specification

## Target generated outputs

```text
AGENTS.md
CLAUDE.md
.cursor/rules/agent-workflow.mdc
.claude/commands/check.md
.claude/commands/save-work.md
.claude/commands/release-work.md
.claude/commands/review-work.md
.codex/instructions.md
```

## Safety principle

Generated blocks must be clearly marked and updateable without overwriting manual project-specific sections.

```md
<!-- SFO:BEGIN core/git-protocol@1.0.0 -->
...
<!-- SFO:END core/git-protocol@1.0.0 -->
```

Manual project sections must stay outside generated blocks.
