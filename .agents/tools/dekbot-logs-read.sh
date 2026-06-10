#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

set -a
source "apps/dekbot-server/.env"
set +a

exec node ".agents/tools/dekbot-logs-read.mjs" "$@"

