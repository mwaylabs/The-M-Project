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
            "name": "backbone.stickit",
            "location": "../vendor/libs",
            "main": "backbone.stickit-0.6.3.js"
        },
        {
            "name": "backbone.sticktpl",
            "location": "../vendor/libs",
            "main": "backbone.sticktpl-0.0.0.0.1.js"
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
        },
        {
            "name": "quo",
            "location": "../vendor/libs",
            "main": "quo-2.3.1.js"
        },
        {
            "name": "M",
            "location": "../vendor/core",
            "main": "m"
        },
        {
            "name": "M.Object",
            "location": "../vendor/core",
            "main": "object"
        },
        {
            "name": "M.EventDispatcher",
            "location": "../vendor/core",
            "main": "event_dispatcher"
        },
        {
            "name": "M.ViewManager",
            "location": "../vendor/core",
            "main": "view_manager"
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
        "backbone.stickit": {
            "deps": [
                "jquery", "backbone", "underscore"
            ],
            "exports": "Backbone.Stickit"
        },
        "backbone.sticktpl": {
            "deps": [
                "jquery", "backbone", "underscore"
            ],
            "exports": "_.tpl"
        },
        "underscore": {
            "exports": "_"
        },
        "quo": {
            "deps": [
                "jquery"
            ],
            "exports": "quo"
        },

        "M": {
            "exports": "M"
        },
        "M.Object": {
            "deps": [
                "M"
            ],
            "exports": "M.Object"
        },
        "M.EventDispatcher": {
            "deps": [
                "M.Object"
            ],
            "exports": "M.EventDispatcher"
        },
        "M.ViewManager": {
            "deps": [
                "M.Object"
            ],
            "exports": "M.ViewManager"
        }
    }
});