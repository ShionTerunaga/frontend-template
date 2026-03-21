# main-template

## Overview

This repository is a **template collection** used by a template CLI.  
It manages multiple React and Vue templates with `pnpm workspace` and `Turborepo`.

This repository is **not intended to be used directly as a standalone application**.  
The expected workflow is that a CLI copies, generates, or transforms one of these templates into a new project.

## Notes

- This repository is the source of templates
- It is not a single production-ready app by itself
- `apps/` contains multiple independent templates
- `pnpm install` should be run at the monorepo root
- Build and test reports are written to [`.reports`](./.reports)

## Setup

```bash
pnpm install
```

If the workspace dependency state gets broken, you can use:

```bash
pnpm reinstall:all
pnpm doctor:deps
```

## Scripts

### Development

```bash
pnpm dev
pnpm dev:list
pnpm dev:rna-tw
pnpm dev:rna-ve
pnpm dev:rnp-tw
pnpm dev:rnp-ve
pnpm dev:rr-ve
pnpm dev:rtr-tw
pnpm dev:rtr-ve
pnpm dev:vn-sc
pnpm dev:vn-ve
pnpm dev:vr-sc
pnpm dev:vr-ve
```

- `pnpm dev`: prints the available dev commands
- `pnpm dev:list`: prints the available dev commands
- `pnpm dev:<alias>`: starts the dev server for a single template
- `pnpm dev:all`: runs dev for all templates in parallel

### Build

```bash
pnpm build
pnpm build:list
pnpm build:all
pnpm build:rna-tw
pnpm build:rna-ve
pnpm build:rnp-tw
pnpm build:rnp-ve
pnpm build:rr-ve
pnpm build:rtr-tw
pnpm build:rtr-ve
pnpm build:vn-sc
pnpm build:vn-ve
pnpm build:vr-sc
pnpm build:vr-ve
```

- `pnpm build`: runs `pnpm build:all`
- `pnpm build:list`: prints available build commands
- `pnpm build:all`: builds all templates sequentially
- `pnpm build:<alias>`: builds a single template
- build commands print a success/failure summary and the report path

### Test

```bash
pnpm test
pnpm test:list
pnpm test:all
pnpm test:rna-tw
pnpm test:rna-ve
pnpm test:rnp-tw
pnpm test:rnp-ve
pnpm test:rr-ve
pnpm test:rtr-tw
pnpm test:rtr-ve
pnpm test:vn-sc
pnpm test:vn-ve
pnpm test:vr-sc
pnpm test:vr-ve
```

- `pnpm test`: runs `pnpm test:all`
- `pnpm test:list`: prints available test commands
- `pnpm test:all`: tests all templates sequentially
- `pnpm test:<alias>`: tests a single template
- test commands print a success/failure summary and the report path

### Utility

```bash
pnpm lint
pnpm typecheck
pnpm check
pnpm install:all
pnpm clean:workspace
pnpm reinstall:all
pnpm doctor:deps
```

- `pnpm lint`: runs lint across the workspace
- `pnpm typecheck`: runs type checking across the workspace
- `pnpm check`: runs lint, test, and typecheck together
- `pnpm install:all`: installs dependencies for the whole monorepo
- `pnpm clean:workspace`: removes stale nested `node_modules` and `pnpm-lock.yaml` files inside apps
- `pnpm reinstall:all`: cleans and reinstalls the workspace
- `pnpm doctor:deps`: verifies dependency visibility across workspace packages

## Alias Reference

- `rna-tw`: React / Next / App Router / Tailwind
- `rna-ve`: React / Next / App Router / Vanilla Extract
- `rnp-tw`: React / Next / Pages Router / Tailwind
- `rnp-ve`: React / Next / Pages Router / Vanilla Extract
- `rr-ve`: React / React Router / Vanilla Extract
- `rtr-tw`: React / TanStack Router / Tailwind
- `rtr-ve`: React / TanStack Router / Vanilla Extract
- `vn-sc`: Vue / Nuxt / Scoped CSS
- `vn-ve`: Vue / Nuxt / Vanilla Extract
- `vr-sc`: Vue / Vue Router / Scoped CSS
- `vr-ve`: Vue / Vue Router / Vanilla Extract
