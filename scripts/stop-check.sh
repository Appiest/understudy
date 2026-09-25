#!/usr/bin/env bash
# Stop hook: block finishing while uncommitted source changes fail `npm run check`.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/..}" || exit 0

has_source_changes() {
  ! git diff --quiet HEAD -- src public scripts || [ -n "$(git ls-files --others --exclude-standard -- src public scripts)" ]
}

has_source_changes || exit 0

if ! output=$(npm run check --silent 2>&1); then
  echo "npm run check failed on uncommitted changes. Fix these before finishing:" >&2
  echo "$output" | tail -40 >&2
  exit 2
fi
