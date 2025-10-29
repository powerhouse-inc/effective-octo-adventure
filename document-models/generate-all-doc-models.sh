#!/bin/sh

pushd ./document-models/atlas-scope && ph generate --file atlas-scope.json && popd
pushd ./document-models/atlas-exploratory && ph generate --file atlas-exploratory.json && popd
pushd ./document-models/atlas-foundation && ph generate --file atlas-foundation.json && popd
pushd ./document-models/atlas-grounding && ph generate --file atlas-grounding.json && popd
pushd ./document-models/atlas-multiparent && ph generate --file atlas-multiparent.json && popd
pushd ./document-models/atlas-set && ph generate --file atlas-set.json && popd
