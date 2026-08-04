#!/usr/bin/env bash
set -euo pipefail
cd "${HOME}/uk-theory-test-arabic/mobile-app"
test -f app.json
test -f eas.json
test -f package.json
npx tsc --noEmit
npx expo-doctor
npx expo config --type public >/tmp/drivepass-expo-config.txt
grep -q '"package": "uk.co.drivepass.theory"' app.json
grep -q '"bundleIdentifier": "uk.co.drivepass.theory"' app.json
grep -q '"projectId"' app.json
echo "Release checks passed."
