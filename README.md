# The-M-Project Absinthe

To use this repository you definitely should know what you are doing.
This repo is under heavy construction.

## Notice
This version is under development and not yet ready for production use.


## Pre alpha setup for framework developer

### Dependencies

- [node](http://nodejs.org/)
- [grunt](http://gruntjs.com/)
- [bower](http://bower.io/) 
- [ruby](https://www.ruby-lang.org/en/)
- [compass](http://compass-style.org/)

### Checkout the repository

```
git clone https://github.com/mwaylabs/The-M-Project.git
cd The-M-Project
git checkout absinthe
```

### init the project

The script runs the following commands/checks:

- check dependencies
- npm install
- bower install
- add git pre-commit hook


```
sh init-repo.sh
```

### start building the framework

```
grunt dev
```

### running an sample application

```
//navigate to a sample app
cd sample/addressbook/

//run the setup script
sh setup-dev.sh
//answer every question with y (4xy)
//start the app server
grunt server
//open your browser
open localhost:9000
```