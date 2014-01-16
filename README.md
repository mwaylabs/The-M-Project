![The-M-Project Absinthe][logo]
# The-M-Project 2.0 (Absinthe) Beta Release  [![Build Status](https://travis-ci.org/mwaylabs/The-M-Project.png?branch=master)](https://travis-ci.org/mwaylabs/The-M-Project)

The-M-Project is a Mobile HTML5 JavaScript Framework that helps you build great mobile apps, easy and fast.

**Version:** The-M-Project v.2.0 beta

**Codename:** Absinthe

## Overview
- [What's new](#whats-new)
- [Demo](#demo)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [Further Reading and Repositories](#further-reading-and-repositories)
- [Application Lifecycle](#application-lifecycle)
- [Folder structure](#folder-structure)
- [Bikini](#bikini)
- [Model–view–controller](#modelviewcontroller)
- [Layouts](#layouts-1)
- [Q&A](#qa)
- [compass](#sass-compass)
- [Styleguide](#styleguide)
- [Development Process](#development-process)
- [Setup for framework developer (Mac/Linux)](#setup-for-framework-developer-maclinux)
- [Setup for framework developer (Windows)](#setup-for-framework-developer-windows)

## What's new
The-M-Project 1.x as we call it was from our point of view pretty good, but has here and there little tweaks. We could have fix some bugs and work with the existing one. In this process we questioned everything and after huge discussions we decided to take what's good and remove everything we don't like. Furthermore we added everything what we think a mobile HTML5/JavaScript framework needs. The following list gives you an overview of changes:

- The-M-Project is based on [Backbone.js](http://backbonejs.org/)
- [Bikini](#bikini) - a implementation of Model/Server connectivity to write realtime, collaborative apps
- Espresso (command line tool) is now based on [Grunt](http://gruntjs.com/) and [Yeoman](http://yeoman.io/)
- No jQuery mobile support at the moment
- Different Themes out of the Box
	- Android
	- iOS 7
	- [Default](#styleguide)
- URL navigation and deep linking
- 60+ CSS Transitions
- [Sass](http://sass-lang.com/) support
- Best-of-Breed
	- [backbone.stickit](http://nytimes.github.io/backbone.stickit/)
	- [Hammer.js](http://eightmedia.github.io/hammer.js/)
	- [Font Awesome](http://fontawesome.io/)
	- [Bootstrap Grid system](http://getbootstrap.com/css/#grid)
	- [jQuery 2.0](http://jquery.com/)
	- [Socket.IO](http://socket.io/)
- Libraries inside The-M-Project
	- [Underscore.js](http://underscorejs.org/)
	- [Modernizr](http://modernizr.com/)
	- [Detectizr](https://github.com/barisaydinoglu/Detectizr)
	- [Moment.js](http://momentjs.com/)
	- [Shake.js](http://alxgbsn.co.uk/)
	- [Page Transitions](https://github.com/codrops/PageTransitions)
- Generator
	- [Bower](http://bower.io/)
	- [Grunt](http://gruntjs.com/)
	- [Yeoman](http://yeoman.io/)
- Stable on the following devices
	- Android 4.4 (Nexus 4, Nexus 5, Nexus 7,  Nexus 10)
	- Android > 4 (S3) 	
	- iOS 7 (iPad 2 - Air, iPhone 4 - 5s, iPad mini/retina)
	- iOS 6 (iPad 2 - 4, iPhone 4 - 5, iPad mini)
	- Kindle Fire
- Tested on the following devices
	- Android > 2.3 (with scrolling issues Nexus 1) 
	- Android (Acer Iconia Tab, Motorola Xoom)
	- Microsoft Surface
	- BlackBerry Z10

## Demo
### Kitchensink Demo
[![Try the Kitchensink][tryKitchensink]](http://www.the-m-project.org/apps/absinthe/kitchensink/index.html)

The Kitchensink gives a good overview of all Views and Layouts so far. Play around and see what the The-M-Project offers to you.

Beside the Kitchensink we have a second ready to launch sample app called Addressbook.


### Addressbook Demo
[![Try the Addressbook][tryAddressbook]](http://www.the-m-project.org/apps/absinthe/addressbook/index.html)

The Addressbook is the sample app for [Bikini](#bikini). [Open the app](http://www.the-m-project.org/apps/absinthe/addressbook/index.html) in different browser windows or devices for the full experience. A small [node.js](http://nodejs.org/) server is connected to a [MongoDB](http://www.mongodb.org/). The application syncronises via bikini the contact collection and stores it to the [WebSQL](http://en.wikipedia.org/wiki/Web_SQL_Database) Database. This guarantees offline and online manipulation of the data.

## Roadmap

### Absinthe release
- The-M-Project v.2.0 beta 1 
	- All the fancy stuff we mentioned above

- The-M-Project v.2.0 beta 2 (We are here - tagname beta3)
	- MenuView
	- SideMenu
	- MenuLayout
    	- Scaffold for MenuLayout
- The-M-Project v.2.0 RC1
	- touchable ToggleSwitch
	- Feedback from the Community
	- Complete documentation
	- Tutorials
	- More Samples
	- test coverage >100% https://coveralls.io/r/mwaylabs/generator-m?branch=
	- Themes for Android and iOS

- The-M-Project v.2.0
	- Final release

### Changelog
## The-M-Project v.2.0 beta 3
### Quickfixes like:
- Ignore unnecessary files and folder
- MenuView update/improvements
- CSS/SASS update/improvements
- Buttongroup setActive
- enhanced API for M.ViewManager.getView
- fixes to offline data handling
- Filter for M.ListView

## The-M-Project v.2.0 beta 2
- CSS/SASS update/improvements
  - M.ToolbarView
  - M.ButtonView
- Refactoring View: templates to single files
- Implemented Switch layout
- Getter for M.ListView
- Improved online/offline detection of bikini
- Implemented M.MenuView and MenuLayout

## The-M-Project v.2.0 beta 1
- Initial beta release
### Future plans

- The-M-Project 2.1
	- Full support for Windows
	- Enterprise Edition
	- Extending Bikini
	- A lot more to come

## Further Reading and Repositories

Use the yeoman [generator](https://github.com/mwaylabs/generator-m/) to develop your first app.


### Documentation
- [JSDoc](http://www.the-m-project.org/docs/absinthe/)


### Tutorials and Samples
- [write your first app from scratch](https://github.com/mwaylabs/The-M-Project-Sample-Apps/blob/master/demoapp/README.md)
- [GitHub](https://github.com/mwaylabs/The-M-Project-Sample-Apps)

### templ

This grunt plugin is similar to grunt-contrib-jst.

- [GitHub](https://github.com/mwaylabs/grunt-tmpl)

## Application Lifecycle
1. index.html
	- Start point of a application is the index.html file. After all dependencies and application files are loaded the framework uses a [Backbone.Router](http://backbonejs.org/#Router) to call the responsible controller.
	- The routes are defined inside the `main.js`

2. Controller

	**There are 3 entry points to a controller.**	
	1. Application Start 
		- If the application was started the first time the Router calls the `applicationStart` of the provided Controller. 
	2. Show
		- If a page switch happens the router calls the `show` function of the provided Controller
	3. Application Ready
		- After the application did load the `applicationReady` function is called on every Controller. In every case it gets called after the `applicationStart`

	

## Folder structure
```
.
├── Gruntfile.js
├── node_modules
├── app
│   ├── bower_components
│   ├── i18n
│   │   └── en.js
│   ├── icons
│   │   ├── android-l.png
│   │   ├── android-m.png
│   │   ├── android-s.png
│   │   ├── apple-ipad-retina.png
│   │   ├── apple-ipad.png
│   │   ├── apple-iphone-retina.png
│   │   ├── apple-iphone.png
│   │   └── favicon.png
│   ├── images
│   ├── index.html
│   ├── scripts
│   │   ├── config.js
│   │   ├── controllers
│   │   │   ├── absinthe.js
│   │   │   └── beer.js
│   │   ├── main.js
│   │   ├── models
│   │   ├── collections
│   │   ├── layouts
│   │   └── views
│   │       ├── absinthe.js
│   │       └── beer.js
│   └── styles
│       └── main.css
├── bower.json
├── grunt.config.js
├── package.json
└── test
    ├── index.html
    ├── lib
    │   ├── chai.js
    │   ├── expect.js
    │   └── mocha
    │       ├── mocha.css
    │       └── mocha.js
    └── spec
        └── test.js
        
```

### app - The Application
The app folder contains all app relevant files.

#### index.html
The starting point of the application is the index.html. You can add scripts by yourself. But don't delete any comments. The generator uses them to add code inside the file. If you create a controller with the generator the index will auto generate the script tag.

#### i18n
You find all the language files inside the i18n(internationalisation) folder.

#### icons
Out of the box we have provide relevant The-M-Project icons. If you add an application to the Home-Screen of your phone, these icons are used.

#### splash
Out of the box we have provide relevant The-M-Project splash screens. If you add an application to the Home-Screen of your phone, these splash screens are used.

#### images
Put all the images inside this directory.

#### scripts
Contains the most JavaScript files - like Model, View and Controller

##### config.js
Configuration for the application.

##### main.js
Contains all controllers and is used by the generator.

##### controllers
Contains all controllers and is used by the generator.

##### views
Contains all views and is used by the generator.

##### models
Contains all models and is used by the generator.

##### collections
Contains all collections and is used by the generator.

##### layouts
Contains all layouts and is used by the generator.

### test
Default/example test for the application

### grunt.config.js
This file allows you to modify the default grunt options without a full understanding how grunt works.

- paths
	- `dist` - The location for the build
	- `app` - The location for the app root
- server
	- `openBrowser` - Open the app in your default browser
	- `autoReload` - Reloads web server you save a file in your project
	- `port` - The port on which the web server will respond
	- `proxies` - We use [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) for the proxy task.
- test
	- `port` - The port on which the web server will respond
	
	
### Don't worry about

**package.json** - The-M-Project npm module 

**bower.json** - The-M-Project Bower module 

**Gruntfile.js** - Contains the configuration for the grunt tasks e.g. ```grunt server``` or ```grunt build```

**node_modules** - Contains the Node dependencies

**bower.json** - Manage the bower components

**bower_components** - Contains the Bower dependencies

## Bikini
**Bikini – everything a model needs.**

Without expense to the developer, data is synchronised from the server to the client. Changes are broadcast to all connected clients live, are available offline and changeable, and by limiting the transfer of modified records loading time and traffic can be optimised. Bikini is the connection between the Model and a Storage. It provides several adapters to access local and remote data storage.

## Model–view–controller
`M.View`, `M.Controller`, `M.Model` and `M.Collection` extending from Backbone.js. You can use them like you would use them with Backbone itself.

`M.Controller` implements `Backbone.Events` but does not extend anything else.

### inheritance
It is possible to extend from every `M` Object by calling the `extend` method. The first parameter are the options applied to the extended Object and overwrite the existing ones. `extend` always returns a function.

```javascript
M.CustomView = M.View.extend({
	// overwrite a property
	_type: 'M.CustomView',
	// implement an own property
	myOwnProperty: 1
});
```

### instances
To create an instance of an extended object you can use `new` or `create` which calls `new` by itself. 

```javascript
// create an instance with new
var v = new M.View();
M.isView(v); //true

// create an instance with create
var v = M.View.create();
M.isView(v); //true

```
### M.View

`M.View.extend` accepts two parameters. The first one is for view options and the second one for child views
`M.View.create` accepts three parameters. The first one is for view options and the second one for child views and the third one to use the first one as scope.

	
## Layouts

A template defines the look and feel of a page. Every Controller can set its own template or use a existing one from other controllers. After the layout is set the Controller add its Views to the Layout. This triggers the render process of the inserted Views.

### Blank
A blank/empty layout.

![Blank Layout][blank-layout]

### Switch Layout

Switch through different pages with over 60 transitions

![Switch Layout][switch-layout]


### Switch Layout (Header/Content)

Switch through different pages that have a Header and Content with over 60 transitions

![Switch Layout with Header and Content][switch-header-content-layout]

## Q&A

- *Is The-M-Project Absinthe release backward compatible?*
	- unfortunately not

- *What happens to The-M-Project before Absinthe?*
	- We call it `The-M-Project 1.x`
	- The source code is still available on [GitHub](https://github.com/mwaylabs/The-M-Project)
	- We still use it on our own to build projects/products
	- The [Sample-Apps](https://github.com/mwaylabs/The-M-Project-Sample-Apps/tree/1.x) aren't gone either
	- [Espresso](https://github.com/mwaylabs/Espresso) is still available

- *Why Absinthe?*
	- Since Google uses sweets, Apple animals and version numbers are boring we switched the release names to alcoholics ;)
	- Need inspiration? B(eer), B(randy) C(ognac), C(idre), D(aiquiri), E(gg nog), F(euerzangenbowle), G(in) - the list goes on like this. So stay tuned for the upcoming releases.


## Sass Compass

### What is SASS ?
SASS (Syntactically Awesome Style Sheets) is a programming language created for front end web development that defines a new set of rules and functions to empower and enhance CSS. With this programming language, you can create complex designs with minimal code in the most efficient way possible.

### What is Compass ?
Compass is a framework for SASS, the good thing about Compass is that it comes with a lot of CSS3 mixins and useful CSS stuff.

### How to install it ?
For installing SASS Compass you need to have Ruby installed.

This is very pretty simple for MAC users because there Ruby is already installed.
If your are a MAC user you just have to type
`gem install compass` into your console.

If your are a Windows user you have to install Ruby first. The installer can be downloaded [here](http://rubyinstaller.org/downloads/).
Afterwards if you have added Ruby to your PATH variable you can also type `gem install compass` into your console to install it.

### Where can I find more information about SASS Compass ?
For more informations about SASS Compass just visit their [website](http://compass-style.org/). They have a great blog and many examples to get a good insight into it.


## Styleguide

![The-M-Project Absinthe][styleguide-image]


[blank-layout]: http://www.the-m-project.org/docs/absinthe/img/layouts/Blank.png
[switch-header-content-layout]: http://www.the-m-project.org/docs/absinthe/img/layouts/Swipe_HeaderContent.png
[switch-layout]: http://www.the-m-project.org/docs/absinthe/img/layouts/Swipe_Blank.png
[logo]: http://www.the-m-project.org/docs/absinthe/img/the-m-project-logo.png
[styleguide-image]: http://www.the-m-project.org/docs/absinthe/img/styleguide.png
[tryKitchensink]: http://www.the-m-project.org/docs/absinthe/img/try-kitchensink.png
[tryAddressbook]: http://www.the-m-project.org/docs/absinthe/img/try-addressbook.png

## Development Process

- There should be a test for every component
    - add the test into the responding folder
    - add the test into the test/test.html
- There is a pre-commit hook
    - jshint
    - testrunner - run all tests
- [Travis](https://travis-ci.org/mwaylabs/The-M-Project) is used as build server
- The generator uses [coveralls](https://coveralls.io/r/mwaylabs/generator-m?branch=master) as code analyse tool

## Setup for framework developer (Mac/Linux)

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
git checkout master
```

### init the project

The script runs the following commands/checks:

- check dependencies
- npm install
- bower install
- add git pre-commit hook


```bash
sh init-repo.sh
```

### start building the framework

```bash
grunt dev
```

### running a sample application

```bash
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
```bash
grunt test
```

### browser
```bash
open test/index.html
```

## Setup for framework developer (Windows)

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

```bash
npm install -g grunt-cli
```

```bash
npm install -g bower
```

Add the node-modules to your PATH variable like it is described in the next section

Install the ruby-module


```bash
gem install compass
```



### Add all the Modules to your PATH Variable
#### Windows Vista & Windows 7
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
```bash
git clone https://github.com/mwaylabs/The-M-Project.git
cd The-M-Project
git fetch --all
git checkout master
git pull origin master
```

### Init the project
An easy way to run the shell script in Windows is to have [msysgit](https://code.google.com/p/msysgit/downloads/list) installed. You can find the sh.exe in C:\Program Files (x86)\Git\bin.
If you add ";C:\Program Files (x86)\Git\bin" to the end of your PATH variable you can execute the following shell command.
```bash
sh init-repo.sh
```
The script runs the following commands/checks:

- check dependencies
- npm install
- bower install
- add git pre-commit hook

If the shell-script isn't working well you can also execute the important commands by hand. (Be sure to have Node and Bower installed)
```bash
npm install
```
```bash
bower install
```


### Start building the framework

```bash
grunt dev
```

### Running a sample application


//navigate to a sample app
```bash
cd sample/addressbook/
```
//run the setup script
```bash
sh setup-dev.sh
```
//answer every question with y (4xy)
//start the app server
```bash
grunt server
```
//open your browser
```bash
open localhost:9000
```

## commit hook
- run jshint
- run tests

## test

### node
```bash
grunt test
```

### browser
```bash
open test/index.html
```
