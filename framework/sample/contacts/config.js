require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore', 'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLayoutManager: {
            deps: [
                'underscore', 'jquery', 'backbone'
            ],
            exports: 'BackboneLayoutManager'
        },
        m: {
            deps: [
                'backbone', 'backboneLayoutManager', 'text', 'stickIt'
            ],
            exports: 'M'
        }
    },
    paths: {
        jquery: 'libs/jquery-2.0.0.min',
        backbone: 'libs/backbone-1.0.0',
        stickIt: 'libs/backbone.stickit-0.6.3',
        backboneLayoutManager: 'libs/backbone.layoutmanager',
        underscore: 'libs/underscore-1.4.4.min',
        m: 'libs/the-m-project',
        text: 'libs/require.text',
        templates: 'app/resources/templates',
        layouts: 'src/ui/layouts'
    }
});

define([
    "app/app"
],

    function( App ) {
        new App();
    });