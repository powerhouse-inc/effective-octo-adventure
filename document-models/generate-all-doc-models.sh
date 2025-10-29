#!/bin/sh

pushd ./document-models/atlas-scope && rm -rf gen && pnpm generate --file atlas-scope.json && popd
pushd ./document-models/atlas-exploratory && rm -rf gen && pnpm generate --file atlas-exploratory.json && popd
pushd ./document-models/atlas-foundation && rm -rf gen && pnpm generate --file atlas-foundation.json && popd
pushd ./document-models/atlas-grounding && rm -rf gen && pnpm generate --file atlas-grounding.json && popd
pushd ./document-models/atlas-multi-parent && rm -rf gen && pnpm generate --file atlas-multi-parent.json && popd
pushd ./document-models/atlas-set && rm -rf gen && pnpm generate --file atlas-set.json && popd
pushd ./document-models/atlas-feedback-issues && rm -rf gen && pnpm generate --file atlas-feedback-issues.json && popd
