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
grunt dev
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


 