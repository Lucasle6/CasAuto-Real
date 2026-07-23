#!/bin/bash
set -euo pipefail

dnf install -y docker git
systemctl enable --now docker

cd /opt
git clone --branch "${git_branch}" --depth 1 "${git_repo_url}" app
cd app

# Build context is the repo root - apps/api/package.json depends on the
# workspace root via "file:../..".
docker build -f apps/api/Dockerfile -t casauto-api .

docker run -d \
  --name casauto-api \
  --restart unless-stopped \
  -p ${backend_port}:${backend_port} \
  -e PORT=${backend_port} \
  -e MYSQLHOST=${mysql_host} \
  -e MYSQLPORT=${mysql_port} \
  -e MYSQLUSER=${mysql_user} \
  -e MYSQLPASSWORD=${mysql_password} \
  -e MYSQLDATABASE=${mysql_database} \
  -e JWT_SECRET=${jwt_secret} \
  casauto-api
