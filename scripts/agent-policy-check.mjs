#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const errors = [];

function read(path) {
  return readFileSync(path, "utf8");
}

function captureList(text, pattern) {
  return [...text.matchAll(pattern)].map((match) => match[1].trim());
}

function addError(message) {
  errors.push(message);
}

function assertExists(path, context) {
  if (!existsSync(path)) addError(`${context}: missing ${path}`);
}

function versionFromManifest(text) {
  return text.match(/^version:\s*(.+)$/m)?.[1]?.trim() || "";
}

function validateVersion() {
  const marker = read(".agent-policy-version").trim();
  const manifest = read("solo-founder-os/policy/manifest.yml");
  const manifestVersion = versionFromManifest(manifest);

  if (marker !== manifestVersion) {
    addError(
      `.agent-policy-version (${marker}) does not match manifest version (${manifestVersion})`
    );
  }
}

function validateManifestPaths() {
  const manifest = read("solo-founder-os/policy/manifest.yml");
  const paths = captureList(manifest, /^\s+-\s+(solo-founder-os\/[^\s]+)$/gm);

  for (const path of paths) {
    assertExists(path, "manifest canonical_paths");
  }

  return paths;
}

function validatePolicyPacks() {
  const packDir = "solo-founder-os/policy/packs";
  const packs = readdirSync(packDir)
    .filter((file) => file.endsWith(".yml"))
    .sort();

  for (const file of packs) {
    const packPath = join(packDir, file);
    validateInherits(packPath, read(packPath));
  }
}

function validateProjectProfiles() {
  const profileDir = "solo-founder-os/project-profiles";
  const profiles = readdirSync(profileDir)
    .filter((file) => file.endsWith(".yml"))
    .sort();

  for (const file of profiles) {
    const profilePath = join(profileDir, file);
    validateInherits(profilePath, read(profilePath));
  }
}

function validateInherits(path, text) {
  let inInherits = false;
  let section = "";

  for (const line of text.split("\n")) {
    if (line.match(/^inherits:/)) {
      inInherits = true;
      continue;
    }

    if (inInherits && line.match(/^[a-z_]+:/)) {
      inInherits = false;
      section = "";
    }

    if (!inInherits) continue;

    const sectionMatch = line.match(/^\s{2}(core|stacks|domains|skills):/);
    if (sectionMatch) {
      section = sectionMatch[1];
      continue;
    }

    const itemMatch = line.match(/^\s{4}- ([a-z0-9-]+)$/);
    if (!itemMatch || !section) continue;

    const name = itemMatch[1];
    const folder = section === "core" ? "core" : section;
    const extension = section === "skills" ? "yml" : "md";
    assertExists(`solo-founder-os/${folder}/${name}.${extension}`, `${path} ${section}`);
  }
}

function validateSkillRequirements() {
  const skillDir = "solo-founder-os/skills";
  const skills = readdirSync(skillDir)
    .filter((file) => file.endsWith(".yml"))
    .sort();

  for (const file of skills) {
    const skillPath = join(skillDir, file);
    const text = read(skillPath);
    let inRequires = false;
    let section = "";

    for (const line of text.split("\n")) {
      if (line.match(/^requires:/)) {
        inRequires = true;
        continue;
      }
      if (inRequires && line.match(/^[a-z_]+:/)) {
        inRequires = false;
        section = "";
      }
      if (!inRequires) continue;

      const sectionMatch = line.match(/^\s{2}(core|stacks|domains|skills):/);
      if (sectionMatch) {
        section = sectionMatch[1];
        continue;
      }

      const itemMatch = line.match(/^\s{4}- ([a-z0-9-]+)$/);
      if (!itemMatch || !section) continue;

      const name = itemMatch[1];
      const folder = section === "core" ? "core" : section;
      const extension = section === "skills" ? "yml" : "md";
      assertExists(`solo-founder-os/${folder}/${name}.${extension}`, `${skillPath} requires`);
    }
  }
}

function inventoryRemotes() {
  const inventoryPath = "docs/18_AGENT_REPO_INVENTORY.md";
  if (!existsSync(inventoryPath)) return new Set();

  const remotes = new Set();
  for (const line of read(inventoryPath).split("\n")) {
    if (!line.startsWith("| ") || line.includes("---")) continue;

    const cells = line.split("|").map((cell) => cell.trim());
    const remote = cells.at(-2);
    if (!remote || remote === "Remote" || remote === "none") continue;

    const match = remote.match(/github\.com[:/]kulikman\/([^/.]+)(?:\.git)?$/);
    if (match) remotes.add(`kulikman/${match[1]}`);
  }

  return remotes;
}

function validateSyncConfig() {
  const syncPath = ".github/agent-policy-sync.yml";
  if (!existsSync(syncPath)) return;

  const sync = read(syncPath);
  const sources = captureList(sync, /^\s+- source: (.+)$/gm);
  const targets = sync
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("kulikman/"));
  const remotes = inventoryRemotes();

  for (const source of sources) {
    assertExists(source, "agent-policy-sync source");
  }

  if (remotes.size === 0) return;

  for (const target of targets) {
    if (!remotes.has(target)) {
      addError(`agent-policy-sync target is not present in inventory remotes: ${target}`);
    }
  }
}

validateVersion();
validateManifestPaths();
validatePolicyPacks();
validateProjectProfiles();
validateSkillRequirements();
validateSyncConfig();

if (errors.length > 0) {
  console.error("Agent policy check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Agent policy check passed");
