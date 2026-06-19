#!/usr/bin/env tsx

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

type Command = 'validate' | 'generate' | 'dry-run' | 'list' | 'help'

type ProjectProfile = {
  project?: string
  repo?: string
  status?: string
  inherits?: {
    core?: string[]
    stacks?: string[]
    domains?: string[]
    skills?: string[]
  }
  outputs?: string[]
  overrides?: {
    protected_files?: string[]
    forbidden?: string[]
    checks?: string[]
  }
}

type GeneratedFile = {
  path: string
  content: string
}

const ROOT = resolve(process.cwd(), 'solo-founder-os')

function main() {
  const command = (process.argv[2] ?? 'help') as Command
  const target = process.argv[3]

  if (!existsSync(ROOT)) {
    fail(`solo-founder-os directory was not found at ${ROOT}`)
  }

  switch (command) {
    case 'list':
      listProfiles()
      return
    case 'validate':
      validate(target)
      return
    case 'generate':
      generate(target)
      return
    case 'dry-run':
      dryRun(target)
      return
    case 'help':
    default:
      printHelp()
      return
  }
}

function listProfiles() {
  const profiles = loadProfiles()
  for (const profile of profiles) {
    console.log(`${profile.project ?? 'unknown'} -> ${profile.repo ?? 'no repo'}`)
  }
}

function validate(target?: string) {
  const profiles = filterProfiles(loadProfiles(), target)
  let errors = 0

  for (const profile of profiles) {
    const result = validateProfile(profile)
    if (result.length > 0) {
      errors += result.length
      console.log(`\n${profile.project ?? 'unknown'}: invalid`)
      for (const item of result) console.log(`- ${item}`)
    } else {
      console.log(`${profile.project}: ok`)
    }
  }

  if (errors > 0) process.exitCode = 1
}

function generate(target?: string) {
  const profiles = filterProfiles(loadProfiles(), target)
  for (const profile of profiles) {
    const errors = validateProfile(profile)
    if (errors.length > 0) {
      console.log(`${profile.project}: skipped, invalid profile`)
      for (const error of errors) console.log(`- ${error}`)
      continue
    }

    const files = buildGeneratedFiles(profile)
    for (const file of files) {
      console.log(`\n--- ${profile.project}: ${file.path} ---\n`)
      console.log(file.content)
    }
  }
}

function dryRun(target?: string) {
  const profiles = filterProfiles(loadProfiles(), target)
  for (const profile of profiles) {
    const errors = validateProfile(profile)
    const files = errors.length ? [] : buildGeneratedFiles(profile)
    console.log(`\n${profile.project}`)
    console.log(`repo: ${profile.repo}`)
    console.log(`status: ${errors.length ? 'invalid' : 'valid'}`)
    console.log(`outputs: ${(profile.outputs ?? []).join(', ') || 'none'}`)
    console.log(`generated files: ${files.map((file) => file.path).join(', ') || 'none'}`)
    console.log(`checks: ${(profile.overrides?.checks ?? []).join(', ') || 'none'}`)
    if (errors.length) {
      console.log('errors:')
      for (const error of errors) console.log(`- ${error}`)
    }
  }
}

function loadProfiles(): ProjectProfile[] {
  const dir = join(ROOT, 'project-profiles')
  if (!existsSync(dir)) fail(`project-profiles directory was not found at ${dir}`)

  return readdirSync(dir)
    .filter((file) => file.endsWith('.yml') || file.endsWith('.yaml'))
    .map((file) => parseProfile(readFileSync(join(dir, file), 'utf8')))
}

function filterProfiles(profiles: ProjectProfile[], target?: string): ProjectProfile[] {
  if (!target) return profiles
  return profiles.filter((profile) => profile.project === target || profile.repo === target)
}

function validateProfile(profile: ProjectProfile): string[] {
  const errors: string[] = []

  if (!profile.project) errors.push('missing project')
  if (!profile.repo) errors.push('missing repo')

  for (const core of profile.inherits?.core ?? []) {
    if (!existsSync(join(ROOT, 'core', `${core}.md`))) errors.push(`missing core rule: ${core}`)
  }

  for (const stack of profile.inherits?.stacks ?? []) {
    if (!existsSync(join(ROOT, 'stacks', `${stack}.md`))) errors.push(`missing stack rule: ${stack}`)
  }

  for (const domain of profile.inherits?.domains ?? []) {
    if (!existsSync(join(ROOT, 'domains', `${domain}.md`))) errors.push(`missing domain rule: ${domain}`)
  }

  for (const skill of profile.inherits?.skills ?? []) {
    if (!existsSync(join(ROOT, 'skills', `${skill}.yml`))) errors.push(`missing skill: ${skill}`)
  }

  if ((profile.inherits?.stacks ?? []).includes('next15') && (profile.inherits?.stacks ?? []).includes('next16')) {
    errors.push('conflicting stacks: next15 and next16')
  }

  return errors
}

function buildGeneratedFiles(profile: ProjectProfile): GeneratedFile[] {
  const rulesBundle = buildRuleBundle(profile)
  const replacements = buildReplacements(profile, rulesBundle)

  return (profile.outputs ?? []).map((output) => {
    const template = templateForOutput(output)
    return {
      path: output,
      content: renderTemplate(template, replacements),
    }
  })
}

function templateForOutput(output: string): string {
  const map: Record<string, string> = {
    'AGENTS.md': 'AGENTS.md.tpl',
    'CLAUDE.md': 'CLAUDE.md.tpl',
    '.cursor/rules/agent-workflow.mdc': 'cursor-agent-workflow.mdc.tpl',
    '.claude/commands/check.md': 'claude-check.md.tpl',
    '.claude/commands/save-work.md': 'claude-save-work.md.tpl',
    '.claude/commands/release-work.md': 'claude-release-work.md.tpl',
  }

  const templateName = map[output]
  if (!templateName) return fallbackTemplate(output)

  const path = join(ROOT, 'templates', templateName)
  if (!existsSync(path)) return fallbackTemplate(output)
  return readFileSync(path, 'utf8')
}

function fallbackTemplate(output: string): string {
  return `# {{project}}\n\nGenerated output path: ${output}\n\n{{rules_bundle}}\n\nProtected files:\n{{protected_files}}\n\nForbidden patterns:\n{{forbidden}}\n\nChecks:\n{{checks}}\n`
}

function buildRuleBundle(profile: ProjectProfile): string {
  const sections: string[] = []

  for (const core of profile.inherits?.core ?? []) sections.push(readSection('core', core, 'md'))
  for (const stack of profile.inherits?.stacks ?? []) sections.push(readSection('stacks', stack, 'md'))
  for (const domain of profile.inherits?.domains ?? []) sections.push(readSection('domains', domain, 'md'))

  return sections.join('\n\n')
}

function buildReplacements(profile: ProjectProfile, rulesBundle: string): Record<string, string> {
  return {
    project: profile.project ?? 'unknown-project',
    repo: profile.repo ?? 'unknown-repo',
    rules_bundle: rulesBundle,
    protected_files: listOrNone(profile.overrides?.protected_files),
    forbidden: listOrNone(profile.overrides?.forbidden),
    checks: listOrNone(profile.overrides?.checks),
  }
}

function listOrNone(items?: string[]): string {
  if (!items?.length) return '- none'
  return items.map((item) => `- ${item}`).join('\n')
}

function renderTemplate(template: string, replacements: Record<string, string>): string {
  return Object.entries(replacements).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
    template,
  )
}

function readSection(folder: string, name: string, ext: string): string {
  const path = join(ROOT, folder, `${name}.${ext}`)
  const content = readFileSync(path, 'utf8')
  return `<!-- SFO:BEGIN ${folder}/${name} -->\n${content.trim()}\n<!-- SFO:END ${folder}/${name} -->`
}

function parseProfile(input: string): ProjectProfile {
  const profile: ProjectProfile = { inherits: {}, outputs: [], overrides: {} }
  let section: string | null = null
  let subsection: string | null = null

  for (const rawLine of input.split('\n')) {
    const line = rawLine.replace(/\s+$/g, '')
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    if (!line.startsWith(' ') && trimmed.endsWith(':')) {
      section = trimmed.slice(0, -1)
      subsection = null
      continue
    }

    if (!line.startsWith(' ') && trimmed.includes(':')) {
      const [key, ...rest] = trimmed.split(':')
      const value = rest.join(':').trim()
      ;(profile as Record<string, unknown>)[key] = value
      continue
    }

    if (section === 'inherits' && line.startsWith('  ') && trimmed.endsWith(':')) {
      subsection = trimmed.slice(0, -1)
      continue
    }

    if (section === 'overrides' && line.startsWith('  ') && trimmed.endsWith(':')) {
      subsection = trimmed.slice(0, -1)
      continue
    }

    if (trimmed.startsWith('- ')) {
      const item = trimmed.slice(2)
      if (section === 'outputs') profile.outputs?.push(item)
      if (section === 'inherits' && subsection) {
        const list = (profile.inherits as Record<string, string[]>)[subsection] ?? []
        list.push(item)
        ;(profile.inherits as Record<string, string[]>)[subsection] = list
      }
      if (section === 'overrides' && subsection) {
        const list = (profile.overrides as Record<string, string[]>)[subsection] ?? []
        list.push(item)
        ;(profile.overrides as Record<string, string[]>)[subsection] = list
      }
    }
  }

  return profile
}

function printHelp() {
  console.log(`Solo Founder Agent OS CLI\n\nCommands:\n  sfo list\n  sfo validate [project]\n  sfo generate [project]\n  sfo dry-run [project]\n`)
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

main()
