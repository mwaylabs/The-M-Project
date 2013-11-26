# The-M-Project Absinthe 

## Notice
This version is under development and not yet ready for production use.

## [Use the generator](https://github.com/mwaylabs/generator-tmp2/blob/master/README.md)


## Pre alpha setup for framework developer (Mac/Linux)

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

## commit hook
- run jshint
- run tests

## test

### node
```
grunt test
```

### browser
```
open test/index.html
```

----------
 

## Pre alpha setup for framework developer for Windows

### Dependencies

- [node](http://nodejs.org/)
- [grunt](http://gruntjs.com/)
- [bower](http://bower.io/) 
- [ruby](https://www.ruby-lang.org/en/)
- [compass](http://compass-style.org/)

### Installation order (for newbies)
First you have to install:
- [node](http://nodejs.org/)
- [ruby](http://rubyinstaller.org/downloads/)

Add node and ruby to your PATH variable like it is described in the next section.
(If you install node and ruby with the installer you can specify with the installer to add them directly to your PATH variable )

Install the node-modules:

```
npm install -g grunt-cli
```

```
npm install -g bower
```

Add the node-modules to your PATH variable like it is described in the next section

Install the ruby-module


```
gem install compass
```



### Add all the Modules to your PATH Variable
#### Winows Vista & Windows 7
(If you install node and ruby with the installer you can specify to add them directly to your PATH variable)

- From the Desktop, right-click My Computer and click Properties.
- Click Advanced System Settings link in the left column.
- In the System Properties window click the Environment Variables button.
- Highlight the Path variable and click the Edit button.

Check your PATH variable for these entries. If they are not there, add them.

- ruby: ";C:\Ruby193\bin"
- node: ";C:\Program Files\nodejs"
- node-module like grunt and bower: ";C:\Users\[USERNAME]\AppData\Roaming\npm"


#### Windows 8
(You can specify in the installation of node and ruby to add them directly to your PATH variable)

- from the Desktop click the Windows key + X, then click System.
- Click Advanced System Settings link in the left column.
- In the System Properties window click the Environment Variables button.
- Highlight the Path variable and click the Edit button.

Check your PATH variable for these entries. If they are not there, add them to the end of your PATH variable.

- ruby: ";C:\Ruby193\bin"
- node: ";C:\Program Files\nodejs"
- node-module like grunt and bower: ";C:\Users\[USERNAME]\AppData\Roaming\npm"

### Checkout the repository
Go to the Directory where you want to have the Project.
```
git clone https://github.com/mwaylabs/The-M-Project.git
cd The-M-Project
git fetch --all
git checkout absinthe
git pull origin absinthe
```

### Init the project
An easy way to run the shell script in Windows is to have [msysgit](https://code.google.com/p/msysgit/downloads/list) installed. You can find the sh.exe in C:\Program Files (x86)\Git\bin.
If you add ";C:\Program Files (x86)\Git\bin" to the end of your PATH variable you can execute the following shell command.
```
sh init-repo.sh
```
The script runs the following commands/checks:

- check dependencies
- npm install
- bower install
- add git pre-commit hook

If the shell-script isn't working well you can also execute the important commands by hand. (Be sure to have Node and Bower installed)
```
npm install
```
```
bower install
```


### Start building the framework

```
grunt dev
```

### Running an sample application


//navigate to a sample app
```
cd sample/addressbook/
```
//run the setup script
```
sh setup-dev.sh
```
//answer every question with y (4xy)
//start the app server
```
grunt server
```
//open your browser
```
open localhost:9000
```

## commit hook
- run jshint
- run tests

## test

### node
```
grunt test
```

### browser
```
open test/index.html
```