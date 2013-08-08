require.config({

    deps: ['main'],

    paths: {
        jquery: '../libs/jquery-2.0.0.min',
        backbone: '../libs/backbone-1.0.0',
        stickIt: '../libs/backbone.stickit-0.6.3',
        stickItTemplate: '../libs/backbone.sticktpl-0.0.0.0.1',
        backboneLayoutManager: '../libs/backbone.layoutmanager',
        underscore: '../libs/underscore-1.4.4.min',
        themproject: '../libs/themproject',
        text: '../libs/require.text',
        templates: 'resources/templates',
        modenizer: '../libs/modenizer.custom'
    },

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
        stickIt: {
            deps: [
                'backbone'
            ],
            exports: 'StickIt'
        },
        stickItTemplate: {
            deps: [
                'stickIt'
            ],
            exports: 'StickItTemplate'
        },
        backboneLayoutManager: {
            deps: [
                'backbone'
            ],
            exports: 'BackboneLayoutManager'
        },
        themproject: {
            deps: [
                'backbone', 'backboneLayoutManager', 'text', 'stickItTemplate', 'modenizer'
            ],
            exports: 'M'
        }
    }
});
