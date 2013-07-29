require.config({

    "packages": [
        {
            "name": "moment",
            "location": "modules/libs",
            "main": "moment.js"
        },
        {
            "name": "date",
            "location": "modules/utility",
            "main": "date"
        },
        {
            "name": "i18n",
            "location": "modules/utility",
            "main": "i18n"
        },
        {
            "name": "objectid",
            "location": "modules/utility",
            "main": "o"
        },
        {
            "name": "date",
            "location": "modules/utility",
            "main": "date"
        },
        {
            "name": "underscore",
            "location": "modules/libs",
            "main": "underscore-1.4.4.min.js"
        },
        {
            "name": "quo",
            "location": "modules/libs",
            "main": "quo-2.3.1.js"
        },
        {
            "name": "m",
            "location": "modules/core",
            "main": "m"
        },
        {
            "name": "const",
            "location": "modules/core",
            "main": "const"
        },
        {
            "name": "object",
            "location": "modules/core",
            "main": "object"
        },
        {
            "name": "logger",
            "location": "modules/core",
            "main": "logger"
        }

    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore", "jquery"
            ],
            "exports": "Backbone"
        },
        "backbone.layoutmanager": {
            "deps": [
                "backbone"
            ],
            "exports": "Backbone.Layout"
        },
        "backbone.stickit": {
            "deps": [
                "backbone"
            ],
            "exports": "Backbone.Stickit"
        },
        "backbone.sticktpl": {
            "deps": [
                "backbone"
            ],
            "exports": "_.tpl"
        },
        "quo": {
            "deps": [
                "jquery"
            ],
            "exports": "quo"
        },
        "const": {
            "deps": [
                "m"
            ],
            "exports": "M.CONST"
        },
        "object": {
            "deps": [
                "m",
                "const"
            ],
            "exports": "M.Object"
        },
        "logger": {
            "deps": [
                "object"
            ],
            "exports": "M.Logger"
        }
    }
});

define([
    'm',
    'backbone',
    'backbone.layoutmanager',
    'backbone.stickit',
    'backbone.sticktpl',
    'quo',
    'const',
    'object',
    'logger'
]);
