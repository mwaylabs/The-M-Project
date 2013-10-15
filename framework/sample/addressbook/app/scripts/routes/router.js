/*global define*/

define([
    'jquery',
    'backbone',
    'themproject'
], function ($, Backbone, M) {
    'use strict';
    // Defining the application router, you can attach sub routers here.

    var Router = M.Router.extend({

        routes: {
            '': 'IndexController',
            'edit': 'EditController',
            'kitchensink/:ui': 'KitchensinkController',
            'kitchensink': 'KitchensinkController',
            'edit/:firstname/:lastname': 'EditController'
        },

        IndexController: 'controllers/index',

        KitchensinkController: 'controllers/kitchensink',

        EditController: 'controllers/edit',

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
        }

    });

    return Router;
});