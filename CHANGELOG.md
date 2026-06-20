## [0.7.0](https://github.com/kulikman/Template-Projects/compare/v0.6.0...v0.7.0) (2026-06-20)

### ✨ Features

* **sfo:** define canonical agent policy source ([440560d](https://github.com/kulikman/Template-Projects/commit/440560d15db3f7f50174f14643f0cb1d9ce79beb))

## [0.6.0](https://github.com/kulikman/Template-Projects/compare/v0.5.0...v0.6.0) (2026-06-19)

### ✨ Features

* add solo founder agent skillset ([fb3c161](https://github.com/kulikman/Template-Projects/commit/fb3c1616cb73ae3689f7335d15728e6132037dc5))

## [0.5.0](https://github.com/kulikman/Template-Projects/compare/v0.4.0...v0.5.0) (2026-06-19)

### ✨ Features

* **solo-founder-os:** add snapshot history mvp ([4c902ef](https://github.com/kulikman/Template-Projects/commit/4c902ef52e7c573978c5fe53c30aac8cde78252c))

## [0.4.0](https://github.com/kulikman/Template-Projects/compare/v0.3.2...v0.4.0) (2026-06-19)

### ✨ Features

* add basic conflict detector ([5abbf8e](https://github.com/kulikman/Template-Projects/commit/5abbf8e5c22185f971aa30e13547b16f881052f5))
* add controlled block merge command ([0319732](https://github.com/kulikman/Template-Projects/commit/03197325790e6798f7643bb7b21b81fa3a80c7e3))
* add local generation output ([2927c34](https://github.com/kulikman/Template-Projects/commit/2927c3410197abd60fd16e13f031ff964d468c20))
* add sfo status command ([edcd189](https://github.com/kulikman/Template-Projects/commit/edcd189070a72394b4d542b83e729fadeee453c0))
* generate agent files from templates ([418f6c4](https://github.com/kulikman/Template-Projects/commit/418f6c40d4b81b45f92c8542b8ac737eb595bb58))

### 🐛 Bug Fixes

* unblock cli typecheck and lint ([25dcc2f](https://github.com/kulikman/Template-Projects/commit/25dcc2f88bc7c4c7bec3ca4189a4c2e9167fd8f5))

### 📝 Docs

* add sfo cli usage ([139317d](https://github.com/kulikman/Template-Projects/commit/139317d28cffc948f88782316e15128897b6b096))
* **docs:** add /docs template folder and prompt library ([4ebd312](https://github.com/kulikman/Template-Projects/commit/4ebd3127d5ee27c810a98e7b8c42f67cd921cbff))
* document controlled block merge ([a301414](https://github.com/kulikman/Template-Projects/commit/a301414aa1609e498748933b113bb344fbbd63e7))
* document sfo status command ([8cb1ff2](https://github.com/kulikman/Template-Projects/commit/8cb1ff25b03f327b7bb7524c0012ba1b79df1222))
* expand cursor project rules ([5c627df](https://github.com/kulikman/Template-Projects/commit/5c627df658eafbd53a6e4f875bc5e5ae72c0993f))
* update sfo cli local write docs ([ddcff84](https://github.com/kulikman/Template-Projects/commit/ddcff848a05add18fcb7b6eb399a7b4bc0bd435a))

## [0.3.2](https://github.com/kulikman/Template-Projects/compare/v0.3.1...v0.3.2) (2026-05-27)

### 🐛 Bug Fixes

* allow template build without backend env ([a2312b0](https://github.com/kulikman/Template-Projects/commit/a2312b0b83fadac57d8c90754662ea4c13573670))

### ♻️ Refactoring

* harden api key verification ([22aafb4](https://github.com/kulikman/Template-Projects/commit/22aafb442dab77892f1342e0ddc88d2e278043c1))
* move non-stripe logic into feature layers ([2ee4a55](https://github.com/kulikman/Template-Projects/commit/2ee4a55524014ecec59621b904bd34676c30a012))

### 📝 Docs

* correct cron example auth comment ([ece9bc1](https://github.com/kulikman/Template-Projects/commit/ece9bc1272d2c780242f3941ad337e9943b1ec3a))
* include build in template qa checklist ([afe6ae8](https://github.com/kulikman/Template-Projects/commit/afe6ae809b2e4792dacd088a80d57ece04024573))

## [0.3.1](https://github.com/kulikman/Template-Projects/compare/v0.3.0...v0.3.1) (2026-05-16)

### 🐛 Bug Fixes

* **deps:** bump next to 16.2.6 and override fast-uri for audit gate ([0e439e3](https://github.com/kulikman/Template-Projects/commit/0e439e301a7dd331eba50961005a8e15ef2c7fac))

## [0.3.0](https://github.com/kulikman/Template-Projects/compare/v0.2.0...v0.3.0) (2026-05-16)

### ✨ Features

* wire all stub features — auth onboarding, stripe plans, email, usage, cron, org ui ([14e1ddf](https://github.com/kulikman/Template-Projects/commit/14e1ddffb0bc88da2b7a23ed40de26b52bb91441))

### 🐛 Bug Fixes

* **ci:** use github-hosted runners and fix settings link types ([c0403db](https://github.com/kulikman/Template-Projects/commit/c0403dbe434edb24a28ac7cdf1b3f40248fdb984))

### 📝 Docs

* **docs:** add commit & push protocol to claude.md ([1eb7c0f](https://github.com/kulikman/Template-Projects/commit/1eb7c0fb2104e808013e87390f55308952cf787a))

## [0.2.0](https://github.com/kulikman/Template-Projects/compare/v0.1.0...v0.2.0) (2026-05-05)

### ✨ Features

* add analytics, onboarding, plan limits, notifications, API keys, CI/CD, and docs ([dc015f2](https://github.com/kulikman/Template-Projects/commit/dc015f2010dcef025070dcf21dc57e69dd575246))

### 🐛 Bug Fixes

* **build:** avoid prerendering auth-gated settings ([c49b09b](https://github.com/kulikman/Template-Projects/commit/c49b09b395b32dacef0c63551e25414d0c91cca1))
* **ci:** anchor release-please to current sha to avoid graphql timeout ([86d0f4f](https://github.com/kulikman/Template-Projects/commit/86d0f4f8da4c9a6d9ac4f0592492d48ae7678d44))
* **ci:** commit missing devdeps and [@public](https://github.com/public) tags; fix release workflow pnpm version ([b136f88](https://github.com/kulikman/Template-Projects/commit/b136f8864fab77d7cfc11c7f3a135436724aea4d))
* **ci:** upgrade release-please-action to v5 with manifest mode ([7461509](https://github.com/kulikman/Template-Projects/commit/74615099769cf3efb73322a1c7ed23505526c870))
* **ci:** use pnpm exec instead of pnpm dlx for semantic-release ([1ff5e6b](https://github.com/kulikman/Template-Projects/commit/1ff5e6b551211215204da8373d22dceb866811c5))
* resolve lint and ts errors from dc015f2 (imports, process.env, entities) ([91330e8](https://github.com/kulikman/Template-Projects/commit/91330e8195233f60284067cb83dab2acae80acee))
* resolve remaining ts, knip, and lint errors after dc015f2 ([76a430d](https://github.com/kulikman/Template-Projects/commit/76a430db836d6d5a5d25b69131e1ab31f677d782))

# Changelog

All notable changes to this project will be documented in this file.

This file is auto-generated by [semantic-release](https://github.com/semantic-release/semantic-release)
based on [Conventional Commits](https://www.conventionalcommits.org/).

<!-- semantic-release will prepend new entries above this line -->
