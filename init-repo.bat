@echo off
echo initializin project
echo Installing required npm packages ... & npm install & echo Installing required bower packages ... & bower install & echo Installing git hooks ... & xcopy scripts\pre-commit .git\hooks\pre-commit & pause



