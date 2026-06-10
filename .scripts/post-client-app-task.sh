#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

pnpm --recursive postinstall
pnpm --recursive lint
pnpm --recursive format
pnpm --recursive type-check
pnpm --recursive test

