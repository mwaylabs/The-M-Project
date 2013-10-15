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
            'edit': 'edit',
            'kitchensink/:ui': 'kitchensink',
            'kitchensink': 'kitchensink',
            'edit/:firstname/:lastname': 'edit'
        },

        index: indexController,

        kitchensink: 'controllers/kitchensink',

        edit: 'controllers/edit',

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
            Addressbook.IndexController = indexController;
        }

    });

    return Router;
});