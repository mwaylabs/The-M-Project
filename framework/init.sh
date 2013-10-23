#!/bin/sh

echo "copy pre commit hook"
cp scripts/pre-commit ../.git/hooks/pre-commit
chmod +x ../.git/hooks/pre-commit

echo "done"
