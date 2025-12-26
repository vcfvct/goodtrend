# Repository Agent Guide (goodtrend)

## Commands (CI uses Node 20)
- Install deps: `npm install`
- Dev server: `npm run dev` (EverShop)
- Build: `npm run build` (also builds extensions + theme via SWC)
- Build only contact ext: `npm run build:contact_extension`
- Build only eve theme: `npm run build:theme:eve`
- Tests (all): `npm test` (runs `vitest run`)
- Single test file: `npx vitest run extensions/contact/src/tests/validation.test.ts`
- Single test by name: `npx vitest run -t "validateEmail"`

## Code Style / Conventions
- No repo-wide formatter/linter config detected; match surrounding file style and avoid reformat-only diffs.
- Imports: third-party first, then internal/relative modules; `*.scss`/style imports last.
- TypeScript: `strict` is enabled; avoid `any`, type exported functions/props, and use interfaces for request bodies.
- React: components `PascalCase`, hooks at top-level, constants `SCREAMING_SNAKE_CASE`, keep `layout` exports as-is.
- Error handling: validate input early, return `res.status(...).json({ message })`; don’t leak secrets/stack traces.
- Cursor/Copilot rules: none found in `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md`.
