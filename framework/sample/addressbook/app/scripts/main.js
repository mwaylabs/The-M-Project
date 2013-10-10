/*global require*/
'use strict';

require.config({

    deps: ['app'],

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        stickIt: {
            deps: [
                'backbone'
            ],
            exports: 'StickIt'
        },
//        backboneLayoutManager: {
//            deps: [
//                'backbone'
//            ],
//            exports: 'BackboneLayoutManager'
//        },
        FastClick: {
            deps: [],
            exports: 'FastClick'
        },
        tmpl: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'tmpl'
        },
        themproject: {
            deps: [
                'backbone',
//                'backboneLayoutManager',
                'text',
                'FastClick',
                'stickIt',
                'tmpl'
            ],
            exports: 'M'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        stickIt: '../bower_components/backbone.stickit/backbone.stickit',
//        backboneLayoutManager: '../bower_components/layoutmanager/backbone.layoutmanager',
        text: '../bower_components/requirejs-text/text',
        themproject: '../bower_components/tmp2/tmp2',
        FastClick: '../bower_components/fastclick/lib/fastclick',
        socketio: '../bower_components/socket.io/lib/socket.io.js',
        tmpl: '../bower_components/tmpl/tmpl'
    }
});
