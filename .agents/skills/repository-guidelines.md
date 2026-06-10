# Repository Guidelines

## Workspace Shape

- This is a `pnpm@10.33.0` workspace; `pnpm-workspace.yaml` includes `apps/**`, `layers/**`, and `shared`.
- Most packages are Nuxt 4. `apps/dekbot-docs` is the exception: it is VitePress and only defines `dev`, `build`, and `preview` scripts.
- Nuxt layers are the real boundaries: `shared` supplies imported models/utils, `layers/base-app` extends `shared`, product landing/consumer layers extend `base-app`, and style apps extend those product layers.
- `apps/dekbot-server` extends `shared` and keeps Nitro routes, middleware, services, and server utilities under `server/`.
- Component auto-import prefixes are deliberate: base-app components use `B`, product-layer components use `C`, and `apps/dekbot-super` uses `S`.

## Commands

- Run workspace commands from the repo root.
- `pnpm prep` runs every package `postinstall`; run it after install or after deleting `.nuxt`, because ESLint and TypeScript configs import/extend generated Nuxt files.
- Full verification commands: `pnpm type`, `pnpm lint`, `pnpm test`. `pnpm lint` runs `eslint . --fix` recursively, so it can modify files.
- Focus one package with filters, for example `pnpm --filter dekbot-server type`, `pnpm --filter schedly-landing-style dev`, or `pnpm --filter dekbot-docs build`.
- Run one Vitest file with `pnpm exec vitest run tests/static/schedule-clock-regression.test.ts --reporter=tree`.
- Avoid `pnpm clean` unless explicitly requested: `.scripts/cleaner.fish` removes `.nuxt`, `.output`, `node_modules`, and `pnpm-lock.yaml` under `/home/fabio/codes/**`, not only this repo.

## Style And Generated Config

- Prettier is configured for 3-space indentation, no semicolons, single quotes, trailing commas, 85-column width, and Tailwind class sorting.
- Package ESLint configs wrap generated `.nuxt/eslint.config.*` plus root `eslint-rules.js`; stale `.nuxt` directories cause lint/type setup failures.
- Repo ESLint rules allow only `console.info` and `console.warn`, require template literals over string concatenation, require arrow bodies, and spellcheck Vue/model/Markdown files with `en_US,pt_BR`.

## Testing Notes

- Vitest includes only `tests/**/*.test.ts` and runs in the Node environment.
- Several tests are static regression guards that read source files directly; update those guards only when intentionally changing the protected invariant.
- Smoke tests may write under `.logs/` through `DEKBOT_SERVER_LOG_FILE`.

## Agent Notes

- `apps/dekbot-super/app/templates-to-edit/AGENTS.md` is a runtime template for generated WhatsApp agents, not repository instructions.
- Business-copy READMEs live in landing apps; trust executable config and package scripts when docs and config disagree.
- `apps/dekbot-server/.env` exists but is ignored; use env names from `apps/dekbot-server/nuxt.config.ts` and do not commit secrets.
