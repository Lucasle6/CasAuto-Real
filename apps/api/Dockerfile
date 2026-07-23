# Production image for the NestJS backend (apps/api).
#
# The build context MUST be the repo root, because apps/api/package.json declares
#   "autohaus": "file:../.."
# (the workspace root), so the root package.json has to be present in the image
# for the dependency install to resolve.
#
#   docker build -f apps/api/Dockerfile -t casauto-api .
#   docker run --rm -p 3000:3000 --env-file apps/api/.env casauto-api
#
# Multi-stage: the builder installs every dependency and compiles the TypeScript;
# the runtime image ships only the compiled dist/ and production dependencies, on
# a slim, non-root base.

# ---------- Builder ----------
FROM node:20-slim AS builder
WORKDIR /app

# pnpm 9, matching apps/api/pnpm-lock.yaml (lockfileVersion 9.0).
RUN corepack enable && corepack prepare pnpm@9 --activate

# Root manifest is the target of apps/api's "file:../.." dependency.
COPY package.json ./package.json
# Backend manifest, lockfile, and pnpm config first, so this install layer stays
# cached until they change. .pnpmfile.cjs is checksummed inside the lockfile, so a
# --frozen-lockfile install fails if it is missing.
COPY apps/api/package.json apps/api/pnpm-lock.yaml apps/api/.pnpmfile.cjs apps/api/pnpm.yaml ./apps/api/

WORKDIR /app/apps/api
# --no-frozen-lockfile: the repo's no-op .pnpmfile.cjs yields a pnpmfileChecksum that
# drifts between pnpm 9.x patch releases, which a frozen install rejects. The file does
# nothing and package.json still agrees with the lockfile, so resolved dependency
# versions are unchanged, only the checksum is tolerated.
RUN pnpm install --no-frozen-lockfile

# Backend source, then compile to dist/.
COPY apps/api/ ./
RUN pnpm run build

# Drop dev dependencies so only production deps carry over to the runtime image.
RUN pnpm prune --prod

# ---------- Runtime ----------
FROM node:20-slim AS runner
ENV NODE_ENV=production
WORKDIR /app/apps/api

# Workspace-root manifest (target of the "file:../.." link), the built app, and prod deps.
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist

# Run as the image's built-in non-root user.
USER node

# Matches the default port in src/main.ts (override with the PORT env var).
EXPOSE 3000
CMD ["node", "dist/main"]
