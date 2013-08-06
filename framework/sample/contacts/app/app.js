// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'app/router',
    'backboneLayoutManager'
], function( $, _, Backbone, Router ) {
debugger;
    var App = function() {

        Backbone.Layout.configure({
            // Allow LayoutManager to augment Backbone.View.prototype.
            manage: true
        });

        // Pass in our Router module and call it's initialize function
        this.router = new Router();
        Backbone.history.start();
    };

    return _.extend(App, {
        // Create a custom object with a nested Views object.
        module: function( additionalProps ) {
            return _.extend({ Views: {} }, additionalProps);
        }
    }, Backbone.Events);
});