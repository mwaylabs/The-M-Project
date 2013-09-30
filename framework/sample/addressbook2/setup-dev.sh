#!/bin/bash

read -p "Update npm dependencies (y/N)? " NPM
read -p "Update bower dependencies (y/N)? " BOWER
read -p "Build framewrok (Y/n)? " BUILD
read -p "Create symlink (Y/n)? " SYMLINK

# Update npm
if [ "$NPM" = "y" ]; then
	rm -rf ./node_modules
	npm install
fi

# Update bower
if [ "$BOWER" = "y" ]; then
	rm -rf ./app/bower_components
	bower install
fi

# Build framework
if [ "$BUILD" != "n" ]; then
	cd ./../../ && grunt
	cd -
fi

# Create symlink
if [ "$SYMLINK" != "n" ]; then
	rm -rf ./app/bower_components/tmp2
	ln -s ./../../../../dist/ app/bower_components/tmp2
fi