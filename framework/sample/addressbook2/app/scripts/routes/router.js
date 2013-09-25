/*global define*/

define([
    'jquery',
    'backbone',
    'themproject',
    'controllers/index'
], function ($, Backbone, M, indexController) {
    'use strict';


    // Defining the application router, you can attach sub routers here.
    var Router = M.Router.extend({

        routes: {
            '': 'index',
            'detail': 'detail'
        },

        index: indexController,

        detail: function(){
            return require(['controllers/detail']);
        },

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
        }

    });

    return Router;
});