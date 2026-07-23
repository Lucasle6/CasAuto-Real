# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/). See [CONTRIBUTING.md](CONTRIBUTING.md#versioning) for the versioning policy.

## [Unreleased]

### Added
- `terraform/security_groups.tf`: security groups for the backend EC2 instance (SSH + API port) and MySQL (only reachable from the backend's security group, referenced by ID rather than a CIDR).
  - **Why:** the private subnet already has no route to the internet, but a security group referencing the backend group specifically is a second, independent layer — MySQL stays locked down even if the subnet routing ever changes.
- `terraform/` module for the VPC networking layer: VPC, public subnet (backend), private subnet (MySQL), Internet Gateway, and route tables, matching `docs/architecture.svg`.
  - **Why:** the app currently runs on Railway, not the AWS architecture documented in the README/diagram. This starts building that architecture for real via Infrastructure as Code, beginning with the networking foundation everything else (security groups, EC2, MySQL, S3) depends on.
  - The private subnet's route table has no route to the Internet Gateway, so MySQL stays unreachable from the internet by construction, not just by convention.
- `CONTRIBUTING.md` documenting the branch/PR workflow, branch naming (`feat/`, `fix/`, `chore/`, `docs/`), commit convention, and a pre-PR checklist.
  - **Why:** the project had no documented workflow — all commits were being pushed directly to `main` with no review step, which is risky for a team project with a live deployment (Railway).
- `.github/PULL_REQUEST_TEMPLATE.md` so new PRs are pre-filled with a summary field, change-type checkboxes, and the checklist from `CONTRIBUTING.md`.
  - **Why:** a checklist that isn't automatically shown tends not to get used; the template removes the need to remember and copy it manually.
- This `CHANGELOG.md`, plus a "Versioning" section in `CONTRIBUTING.md` defining Semantic Versioning rules and the process for moving `[Unreleased]` entries into a dated release.
  - **Why:** the repo had no changelog and inconsistent version numbers across `package.json` files (root `1.0.0`, `web` `0.0.0`, `api` `0.0.1`), making it impossible to tell what shipped in which state of the app.

### Changed
- Synced version numbers across `package.json` (root), `apps/web/package.json`, and `apps/api/package.json` to `1.0.0`.
  - **Why:** frontend and backend are deployed together and are only meaningful as a pair — three different, unrelated version numbers for one deployed app was misleading rather than useful.

### Fixed
- `apps/api/.env.example` documented the database variables under the wrong names (`DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`), but the backend actually reads `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE` (`apps/api/src/app.module.ts`). Corrected the names and added the previously undocumented `PORT` variable.
  - **Why:** a new contributor copying `.env.example` to `.env` would end up with an app that silently fails to reach MySQL, because none of the documented names are the ones the code reads. The correct names are the ones Railway injects for its MySQL service, so the example now matches both the code and the deployment, and stays valid when the same variables are set manually on AWS later.

## [1.0.0] - 2026-07-21

Baseline release, corresponding to the state of `main` prior to introducing formal versioning and changelog tracking. Earlier history is available via `git log`.
