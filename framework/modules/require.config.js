require.config({
    "packages": [
        {
            "name": "backbone",
            "location": "../vendor/libs",
            "main": "backbone-1.0.0.js"
        },
        {
            "name": "backbone.layoutmanager",
            "location": "../vendor/libs",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "jquery",
            "location": "../vendor/libs",
            "main": "jquery-2.0.0.min.js"
        },
        {
            "name": "underscore",
            "location": "../vendor/libs",
            "main": "underscore-1.4.4.min.js"
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
                "jquery", "backbone", "underscore"
            ],
            "exports": "Backbone.Layout"
        },
        "underscore": {
            "exports": "_"
        }
    }
});