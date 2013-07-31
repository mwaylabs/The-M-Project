require.config({

    "packages": [
        {
            "name": "backbone.layoutmanager",
            "location": "modules/libs",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "backbone.stickit",
            "location": "modules/libs",
            "main": "backbone.stickit-0.6.3.js"
        },
        {
            "name": "backbone.sticktpl",
            "location": "modules/libs",
            "main": "backbone.sticktpl-0.0.0.0.1.js"
        },
        {
            "name": "quo",
            "location": "modules/libs",
            "main": "quo-2.3.1.js"
        },
        {
            "name": "layout",
            "location": "modules/ui/layouts",
            "main": "layout"
        },
        {
            "name": "view",
            "location": "modules/ui/views",
            "main": "view"
        },
        {
            "name": "view_manager",
            "location": "modules/core",
            "main": "view_manager"
        },
        {
            "name": "layout_manager",
            "location": "modules/ui",
            "main": "layout_manager"
        },
        {
            "name": "layout_manager",
            "location": "modules/ui",
            "main": "layout_manager"
        },
        {
            "name": "Modernizr",
            "location": "modules/libs",
            "main": "modenizer.custom.js"
        },
        {
            "name": "pagetransitions",
            "location": "modules/libs",
            "main": "pagetransitions.js"
        },
        {
            "name": "switch-layout",
            "location": "modules/ui/layouts/switch-layout",
            "main": "switch-layout.js"
        }
    ],
    "shim": {
        "backbone.layoutmanager": {
            "deps": ["modules/core"],
            "exports": "Backbone.Layout"
        },
        "pagetransitions": {
            "deps": ["modules/core"],
            "exports": "pagetransitions"
        },
        "layout_manager": {
            "deps": [ "modules/core", "backbone.layoutmanager", "Modernizr", "pagetransitions" ],
            "exports": "M.LayoutManager"
        },
        "backbone.stickit": {
            "deps": ["modules/core"],
            "exports": "Backbone.Stickit"
        },
        "backbone.sticktpl": {
            "deps": ["modules/core"],
            "exports": "_.tpl"
        },
        "quo": {
            "deps": [ "modules/core" ],
            "exports": "quo"
        },
        "view": {
            "deps": [ "modules/core", "quo", "backbone.layoutmanager", "layout_manager", "backbone.stickit", "backbone.sticktpl" ],
            "exports": "M.View"
        },
        "view_manager": {
            "deps": [ "modules/core", "view" ],
            "exports": "M.View"
        }
    }
});

define(['view', 'view_manager']);
