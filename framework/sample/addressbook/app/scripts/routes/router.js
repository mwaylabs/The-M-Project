/*global define*/

define([
    'jquery',
    'backbone',
    'themproject',
    'controllers/index',
    'controllers/edit'
], function ($, Backbone, M, indexController, editController) {
    'use strict';

    // Defining the application router, you can attach sub routers here.
    var Router = M.Router.extend({

        routes: {
            '': 'index',
            'edit': 'edit',
            'edit/:firstname/:lastname': 'edit'
        },

        index: indexController,

        edit: editController,

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
            Addressbook.IndexController = indexController;
        }

    });

    return Router;
});