import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import {
  createSnapshotManifest,
  parseProfile,
  readSnapshotHistory,
  resolveProfiles,
  writeSnapshotManifest,
} from './sfo'

const tempDirs: string[] = []

function makeTempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'sfo-cli-test-'))
  tempDirs.push(dir)
  return dir
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) rmSync(dir, { recursive: true, force: true })
  }
})

describe('parseProfile()', () => {
  it('keeps nested inherits, outputs and overrides', () => {
    const profile = parseProfile(`
project: demo
repo: kulikman/demo
status: draft

inherits:
  core:
    - git-protocol
  stacks:
    - next16

outputs:
  - AGENTS.md

overrides:
  forbidden:
    - middleware.ts
`)

    expect(profile.project).toBe('demo')
    expect(profile.inherits?.core).toEqual(['git-protocol'])
    expect(profile.inherits?.stacks).toEqual(['next16'])
    expect(profile.outputs).toEqual(['AGENTS.md'])
    expect(profile.overrides?.forbidden).toEqual(['middleware.ts'])
  })
})

describe('snapshot history', () => {
  it('creates a manifest with generated file metadata', () => {
    const manifest = createSnapshotManifest(
      {
        project: 'demo',
        repo: 'kulikman/demo',
        status: 'draft',
        inherits: { core: ['git-protocol'] },
      },
      [{ path: 'AGENTS.md', content: 'hello world' }],
      { timestamp: '2026-06-19T10:00:00.000Z', batchId: 'batch-1' },
    )

    expect(manifest).toMatchObject({
      batchId: 'batch-1',
      project: 'demo',
      repo: 'kulikman/demo',
      profileStatus: 'draft',
      command: 'snapshot',
    })
    expect(manifest.generatedFiles).toEqual([{ path: 'AGENTS.md', bytes: 11 }])
    expect(manifest.ruleVersions).toContain('core/git-protocol@1.0.0')
  })

  it('writes and reads manifests sorted by newest timestamp first', () => {
    const historyRoot = makeTempDir()

    writeSnapshotManifest(
      {
        batchId: 'batch-old',
        project: 'demo',
        repo: 'kulikman/demo',
        profileStatus: 'draft',
        timestamp: '2026-06-19T09:00:00.000Z',
        command: 'snapshot',
        generatedFiles: [{ path: 'AGENTS.md', bytes: 10 }],
        ruleVersions: ['core/git-protocol@1.0.0'],
      },
      historyRoot,
    )

    writeSnapshotManifest(
      {
        batchId: 'batch-new',
        project: 'demo',
        repo: 'kulikman/demo',
        profileStatus: 'draft',
        timestamp: '2026-06-19T10:00:00.000Z',
        command: 'snapshot',
        generatedFiles: [{ path: 'CLAUDE.md', bytes: 20 }],
        ruleVersions: ['core/git-protocol@1.0.0'],
      },
      historyRoot,
    )

    const entries = readSnapshotHistory({ historyRoot, target: 'demo' })

    expect(entries.map((entry) => entry.batchId)).toEqual(['batch-new', 'batch-old'])
  })
})

describe('resolveProfiles()', () => {
  it('throws on unknown target instead of silently returning empty output', () => {
    expect(() =>
      resolveProfiles([{ project: 'demo', repo: 'kulikman/demo' }], 'missing-project'),
    ).toThrow('project profile not found: missing-project')
  })

  it('normalizes repo targets to the underlying project name', () => {
    const [profile] = resolveProfiles([{ project: 'demo', repo: 'kulikman/demo' }], 'kulikman/demo')

    expect(profile?.project).toBe('demo')
  })
})
