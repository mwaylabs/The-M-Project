define([
    "backbone.layoutmanager",
    "backbone.sticktpl",
    "quo",
    "M",
    "M.EventDispatcher",
    "M.ViewManager",
    "M.Collection",
    "M.SocketStore",
    "M.LayoutManager",
    "modenizer",
    "pagetransition"
    // Include additional libraries installed with JamJS or placed in the
    // `vendor/js` directory, here.
],

    function( LayoutManager ) {
        // Provide a global location to place configuration settings and module
        // creation.

        var app = {
            // The root path to run the application.
            root: requirejs.s.contexts._.config.approot
        };

        // Localize or create a new JavaScript Template object.
        var JST = window.JST = window.JST || {};

        // Configure LayoutManager with Backbone Boilerplate defaults.
        LayoutManager.configure({
            // Allow LayoutManager to augment Backbone.View.prototype.
            manage: true

//            prefix: "app/templates/",
//
//            fetch: function( path ) {
//                // Concatenate the file extension.
//                path = path + ".html";
//
//                // If cached, use the compiled template.
//                if( JST[path] ) {
//                    return JST[path];
//                }
//
//                // Put fetch into `async-mode`.
//                var done = this.async();
//
//                // Seek out the template asynchronously.
//                $.get(app.root + path, function( contents ) {
//                    done(_.template(contents));
//                }, "text");
//            }
        });


//        app.layout = new Backbone.Layout(_.extend({
//            el: "main"
//        }));

        // Mix Backbone.Events, src, and layout management into the app object.
        return _.extend(app, {
            // Create a custom object with a nested Views object.
            module: function( additionalProps ) {
                return _.extend({ Views: {} }, additionalProps);
            }
        }, Backbone.Events);

    });
