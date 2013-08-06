// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',

  'app/app',
  'app/data/contact_collection'
], function( $, _, Backbone, app, ContactCollection ) {
debugger;
    var AppRouter = Backbone.Router.extend({

        visitedRoutes: {},

        routes: {
            '': 'index',
            'detail/:id': 'detail',
            'add': 'add'
        },

        initialize: function() {

            // app.layoutManager = new (Backbone.Layout.extend());

            var collections = {
                contacts: new ContactCollection()
            };

            _.extend(this, collections);

            _.each(this.routes, function( route ) {
                this.visitedRoutes[route] = false;
            }, this);
        },

        route: function( route, name, callback ) {
            if( !_.isRegExp(route) ) {
                route = this._routeToRegExp(route);
            }
            if( _.isFunction(name) ) {
                callback = name;
                name = '';
            }
            if( !callback ) {
                callback = this[name];
            }
            var router = this;
            Backbone.history.route(route, function( fragment ) {
                var args = router._extractParameters(route, fragment);
                args.unshift(!router.visitedRoutes[name]);
                callback && callback.apply(router, args);
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                Backbone.history.trigger('route', router, name, args);
                if( !router.visitedRoutes[name] ) {
                    router.visitedRoutes[name] = true;
                }
            });
            return this;
        },

        index: function( isFirstLoad ) {
            if( isFirstLoad ) {

                this.contacts.fetch();
                var listOptions = { contacts: this.contacts };
                //var list = new ListView(listOptions);
                //var menu = new MenuView();

                app.layoutManager.setLayout(layout);

                app.layoutManager.applyViews({
                    //content: list,
                    //footer: menu
                    content: '<h1>CONTENT</h1>'
                });
            }

            if( !app.layoutManager.isFirstLoad ) {
                PageTransitions.next();
            } else {
                app.layoutManager.initialRenderProcess();
            }
        },

        add: function() {

        }
    });

    return AppRouter;
});


/*
define([
    // Application.
    'backbone',

    "app/app", // Modules.
    "swipe-layout/swipe-layout",
    "text!templates/main-layout.html",
    "app/views/list",
    "app/views/menu",
    "app/views/add",
    "app/views/detail",
    "app/data/contact_collection",
    "app/data/contact_model"
],

    function( Backbone, app, layout, mainTemplate, ListView, MenuView, AddView, DetailView, ContactCollection, ContactModel  ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({



            detail: function( isFirstLoad, id ) {
                var model = this.contacts.get(id);
                var that = this;

                if( !model ) {
                    model = new ContactModel({_id: id });
                    model.collection = this.contacts;
                    model.fetch({ success: function( model ) {
                        that.contacts.add(model);
                    }});
                }

                var view = new DetailView({model: model});
                var menu = new MenuView();

                app.layoutManager.setLayout(layout);

                app.layoutManager.applyViews({
                    content: view,
                    footer: menu
                });

                if( !app.layoutManager.isFirstLoad ) {
                    PageTransitions.next();
                } else {
                    app.layoutManager.initialRenderProcess();
                }


            },

            add: function(  ) {

                var view = new AddView({collection: this.contacts});
                var menu = new MenuView();
                app.layoutManager.setLayout(layout);

                app.layoutManager.applyViews({
                    content: view,
                    footer: menu
                });

                if( !app.layoutManager.isFirstLoad ) {
                    PageTransitions.next();
                } else {
                    app.layoutManager.initialRenderProcess();
                }
            }
        });

        return Router;

    });
*/