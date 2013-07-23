require.config({

    "packages": [
        {
            "name": "backbone",
            "location": "modules/libs",
            "main": "backbone-1.0.0.js"
        },
        {
            "name": "jquery",
            "location": "modules/libs",
            "main": "jquery-2.0.0.min.js"
        },
        {
            "name": "underscore",
            "location": "modules/libs",
            "main": "underscore-1.4.4.min.js"
        },
        {
            "name": "moment",
            "location": "modules/libs",
            "main": "moment-2.0.0.min.js"
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
        },
        {
            "name": "i18n",
            "location": "modules/utility",
            "main": "i18n"
        },
        {
            "name": "date",
            "location": "modules/utility",
            "main": "date"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [ "underscore", "jquery"],
            "exports": "Backbone"
        },
        "const": {
            "deps": ["m"],
            "exports": "M.CONST"
        },
        "object": {
            "deps": ["m", "const" ],
            "exports": "M.Object"
        },
        "logger": {
            "deps": ["object" ],
            "exports": "M.Logger"
        },
        "i18n": {
            "deps": ["object"],
            "exports": "M.I18N"
        },
        "date": {
            "deps": ["object", "moment"],
            "exports": "M.Date"
        }
    }
});

define([
    'm',
    'backbone',
    'const',
    'object',
    'logger',
    'i18n',
    'date'
]);
