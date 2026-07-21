# Contributing

This project uses a **branch + pull request** workflow. Direct pushes to `main` are not allowed — every change goes through a PR and gets reviewed before merging.

## Workflow

1. **Create a branch off `main`**

   ```bash
   git checkout main
   git pull
   git checkout -b <type>/<short-description>
   ```

   Branch types:
   - `feat/` — new feature (e.g. `feat/vehicle-search-filters`)
   - `fix/` — bug fix (e.g. `fix/appointment-form-api-url`)
   - `chore/` — tooling, deps, config, cleanup
   - `docs/` — documentation only

2. **Commit using [Conventional Commits](https://www.conventionalcommits.org/)**

   This repo already uses this style (`feat:`, `fix:`, etc.) — keep it consistent:

   ```
   feat: add price range filter to vehicle catalog
   fix: use VITE_API_URL in AppointmentForm instead of hardcoded localhost
   ```

3. **Push and open a pull request against `main`**

   ```bash
   git push -u origin <type>/<short-description>
   ```

   Fill out the PR template. Link any related issue.

4. **Get at least one review approval before merging.**

   Prefer **Squash and merge** to keep `main` history clean.

5. **Delete the branch** after merging.

## Before opening a PR

- [ ] `pnpm install` runs cleanly in both `apps/web` and `apps/api`
- [ ] Frontend builds: `cd apps/web && pnpm build`
- [ ] Backend builds: `cd apps/api && pnpm build`
- [ ] Lint passes in both apps: `pnpm lint`
- [ ] No `.env` files, credentials, or other secrets are committed
- [ ] New environment variables are documented in the relevant `.env.example`

## Versioning

This project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`) with a **single, shared version number** for the whole repo (root `package.json`, `apps/web/package.json`, and `apps/api/package.json` are always kept in sync) — the frontend and backend are deployed together and only make sense paired with each other, so separate version numbers would add confusion without benefit.

- **MAJOR** — breaking change (e.g. incompatible API change, DB migration that isn't backward-compatible)
- **MINOR** — new feature, backward-compatible (e.g. new endpoint, new page)
- **PATCH** — bug fix, no new functionality (e.g. fixing the hardcoded API URL)

### Changelog

Every PR that changes behavior (not pure `docs`/`chore`) must add an entry under `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md), describing:
- **What** changed
- **Why** it changed (the problem it solves, or the motivation)

When a release is cut:
1. Rename `[Unreleased]` to the new version number + date, e.g. `## [1.1.0] - 2026-07-21`
2. Bump the version in all three `package.json` files to match
3. Add a fresh empty `[Unreleased]` section above it

## Reporting issues

Use GitHub Issues for bugs and feature proposals. Include steps to reproduce for bugs.
