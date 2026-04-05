---
name: socket-firewall
description: Use when running dependency-fetching npm or pnpm commands so public registry packages go through Socket Firewall while private GitHub Packages remain allowed.
---

# Socket Firewall

Apply Socket Firewall (`sfw`) when running `npm` / `pnpm` commands that fetch or modify dependencies.

## When to use

- `pnpm install`
- `pnpm add`
- `pnpm remove`
- `pnpm update`
- `pnpm up`
- `pnpm fetch`
- `npm install`
- `npm add`
- `npm update`

Do not use for commands that don't fetch dependencies: `dev`, `build`, `lint`, `check`, `test`, `exec`, etc.

## Required rule

Prefix dependency-fetching commands with `sfw`:

```bash
sfw pnpm install --frozen-lockfile
sfw pnpm add zod
sfw pnpm -C web add @tanstack/react-query
sfw pnpm remove lodash
sfw pnpm up
```

## Private GitHub Packages

- If `.npmrc` fetches scoped packages (e.g. `@tricot-inc`) from GitHub Packages, the free Socket Firewall tier does not officially support private/custom registries.
- However, if private packages are first-party, it is acceptable for them to pass through unscanned.
- The goal is to route public npm dependencies through `sfw`.

## Decision rule

1. If the command fetches dependencies, check whether `sfw` can be prepended
2. If the command is read-only and `sfw` adds no value, run it as-is
3. If the command already starts with `sfw pnpm ...` / `sfw npm ...`, run it as-is
4. On failure, do not silently retry without `sfw` — report the failure

## Reporting

- When running a dependency-fetching command, briefly note that it was executed with `sfw`
- If private registry packages pass through unscanned, note that public dependency protection was still applied
