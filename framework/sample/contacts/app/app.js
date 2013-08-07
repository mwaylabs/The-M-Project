define( function() {
        // Provide a global location to place configuration settings and module
        // creation.
        var app = {
            // The root path to run the application.
            root: requirejs.s.contexts._.config.approot
        };

        // Localize or create a new JavaScript Template object.
        var JST = window.JST = window.JST || {};

        // Configure LayoutManager with Backbone Boilerplate defaults.
        Backbone.Layout.configure({
            // Allow LayoutManager to augment Backbone.View.prototype.
            manage: true
        });


    return _.extend(app, {
        // Create a custom object with a nested Views object.
        module: function( additionalProps ) {
            return _.extend({ Views: {} }, additionalProps);
        }
    }, Backbone.Events);

    });
