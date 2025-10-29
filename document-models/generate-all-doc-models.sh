#!/bin/sh

pushd atlas-scope && ph generate --file atlas-scope.json && popd
pushd atlas-exploratory && ph generate --file atlas-exploratory.json && popd
pushd atlas-foundation && ph generate --file atlas-foundation.json && popd
pushd atlas-grounding && ph generate --file atlas-grounding.json && popd
pushd atlas-multiparent && ph generate --file atlas-multiparent.json && popd
pushd atlas-set && ph generate --file atlas-set.json && popd
