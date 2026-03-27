#!/usr/bin/env bash
set -euo pipefail

# Move to the deployment directory
cd "$(dirname "$0")/.."

# Pull newest image and restart services
docker compose --env-file .env -f ops/stack-compose.yml pull
docker compose --env-file .env -f ops/stack-compose.yml up -d
docker image prune -f