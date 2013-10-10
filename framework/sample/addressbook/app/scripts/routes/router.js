/*global define*/

define([
    'jquery',
    'backbone',
    'themproject',
    'controllers/index',
    'controllers/kitchensink'
], function ($, Backbone, M, indexController, kitchensink) {
    'use strict';

    // Defining the application router, you can attach sub routers here.
    var Router = M.Router.extend({

        routes: {
            '': 'index',
            'edit': 'edit',
            'kitchensink/:ui': 'kitchensink',
            'edit/:firstname/:lastname': 'edit'
        },

        index: indexController,

        kitchensink: kitchensink,

        edit: 'controllers/edit',

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
            Addressbook.IndexController = indexController;
        }

    });

    return Router;
});