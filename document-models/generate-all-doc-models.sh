#!/bin/sh

pushd ./document-models/atlas-scope && pnpm generate --file atlas-scope.json && popd
pushd ./document-models/atlas-exploratory && pnpm generate --file atlas-exploratory.json && popd
pushd ./document-models/atlas-foundation && pnpm generate --file atlas-foundation.json && popd
pushd ./document-models/atlas-grounding && pnpm generate --file atlas-grounding.json && popd
pushd ./document-models/atlas-multiparent && pnpm generate --file atlas-multiparent.json && popd
pushd ./document-models/atlas-set && pnpm generate --file atlas-set.json && popd
