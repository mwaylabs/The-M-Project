# TMPv2.0

hint: run this presentation via `reveal-md README.md`


---

# Install TMPv2.0

```
git clone git@git.mwaysolutions.com:systeminfo-ios/bikini.git
cd bikini/framework

sh init.sh

```

---

#Code the framework

## Watch file changes on the framework

```
cd bikini/framework
grunt watch
```

## Start an application

```
cd bikini/framework/sample/kitchensink
//install dependencies
./setup-dev.sh
y
y
y
y
grunt server
open http://localhost:9000/
```

---


## App stucture

```
kitchensink/app/scripts

├── favicon.ico
├── index.html
├── scripts
│   ├── collections
│   │   └── Contacts.js
│   ├── controllers
│   │   └── MainController.js
│   ├── main.js
│   ├── models
│   │   └── Contacts.js
│   ├── routes
│   │   └── Main.js
│   ├── templates
│   │   └── xxx.ejs
│   └── views
│       └── Detail.js
└── styles
    └── main.css


```

---



### index.html

in the future this file will be generated automaticly


---


### collections

Implement all you app collections inside this folder


---



### models

Implement all you app models inside this folder


---



### routes

The navigation is done by routes. Entrypoint to every application is the route `http://localhost:9000/`.

A 'pageswitch' is done by redirecting to another route. For example `http://localhost:9000/#page2`.


---



### controllers

Every route has to be handled by a Controller. Define all your Controllers inside this directory


---



### templates

at the momen: *Teapot*


---



### views

Here you write all your Views. Be sure to extend them. There is `design`, `extend` and `create`.


---



### styles

CSS stuff


---



### main.js

Here we go! Startpoint of the Application


---

# Code a View

## general setup

- You find views inside: `framework/src/ui/views/`
- The file is named like the View itself, without the beginning `M.` and the ending `View`
    - example: `M.SliderView` -> `slider.js`
- create the file
- add `(function(){})()`
- inside this generate the JavaScript Object

```
(function( scope ) {

    M.SliderView = M.View.extend({});

})(this);
```
- A View should always inherit from M.View - or another that is also a inheritance from M.View

- use `M.View.extend` to build this inheritance
- properties starting with an underscore are private
- A view must overwrite the `_type` property
    - The `_type` is a string named after the view
    - `M.SliderView._type = 'M.SliderView'` 

- The `_template` property defines the markup of a view - overwrite it like that:


```
(function( scope ) {

    M.SliderView = M.View.extend({

        _type: 'M.SliderView',
        _template: _.tmpl(M.TemplateManager.get('M.SliderView'))

    });

})(this);

```

## Template Manager

The template Manager is an object that stores every template. Every Application can be run with a different template. The template that is used is defined in `M.TemplateManager._currentUI`.

At the moment the available options are `defaultTemplate`, `topcoat`, `bootstrap` and `jqm`.

Profide a markup for every template engine.


```
"M.SliderView": {
        defaultTemplate: '<input type="range">',
        bootstrap: '<input type="range">',
        topcoat: '<input type="range">',
        jqm: '<div class="ui-slider"><input type="number" data-type="range" name="slider-1" id="slider-1" min="0" max="100" value="50" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-slider-input"><div role="application" class="ui-slider-track ui-btn-down-c ui-btn-corner-all"><a href="#" class="ui-slider-handle ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="74" aria-valuetext="74" title="74" aria-labelledby="slider-1-label" style="left: 74%;"><span class="ui-btn-inner"><span class="ui-btn-text"></span></span></a></div></div>'
    }
```

### Add the file to the build process

open `framework/src/build.js` and add your file:

```
// @include ./ui/views/slider.js

```

** The ** `//` ** comments are absolutely essential **

Get the markup:

- default: create your own one
- jQuery mobile: http://view.jquerymobile.com/1.3.2/dist/demos/
- topcoat: http://topcoat.io/topcoat/
- bootstrap: http://getbootstrap.com/components/


### Add the View to your application







# Install Generator

**Install yeoman**

```
npm install -g yo
```

**UI Installer**

```
yo
- Install a generator 
    Search NPM for generators: tmp2
    ❯ generator-tmp2         
```

** or via the Commandline Installer **

```
npm install -g generator-tmp2
```


---



# Setup a new Project


## create the file

```
src/ui/views/viewname.js
```

If the View is Called `M.AwesomeView` the file would be `awesome.js`. Lowercase, without view.


---


 