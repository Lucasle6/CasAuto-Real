# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/). See [CONTRIBUTING.md](CONTRIBUTING.md#versioning) for the versioning policy.

## [Unreleased]

### Added
- `terraform/ec2.tf` + `terraform/iam.tf`: backend EC2 instance in the public subnet, with an IAM role/instance profile granting only SSM Session Manager access. `templates/backend_user_data.sh.tpl` clones the repo, builds `apps/api/Dockerfile`, and runs it with the DB connection and JWT secret injected as env vars.
  - **Why:** no container registry exists in this setup, so the instance builds its own image from source at boot rather than pulling a prebuilt one. The IAM role only grants SSM, not broader AWS access, because the app doesn't call any AWS APIs at runtime — SSM's value is shelling into the instance without managing SSH keys, on top of the existing (open by default) port-22 rule.
- `terraform/mysql.tf`: self-hosted MySQL 8 on an EC2 instance in the private subnet (`templates/mysql_user_data.sh.tpl` installs MySQL Community Server 8 and creates the app database/user on boot), instead of RDS.
  - **Why:** RDS availability/instance-type limits in the team's AWS training sandbox are unknown; a plain EC2 instance only needs basic compute, which every sandbox allows. `mysql_app_password`/`mysql_root_password` are required, sensitive Terraform variables with no default so they can never end up committed.
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

## [1.0.0] - 2026-07-21

Baseline release, corresponding to the state of `main` prior to introducing formal versioning and changelog tracking. Earlier history is available via `git log`.
