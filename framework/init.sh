#!/bin/sh

echo "run bower install"
bower install

echo "run npm install"
npm install

echo "copy pre commit hook"
cp scripts/pre-commit ../.git/hooks/pre-commit
chmod +x ../.git/hooks/pre-commit