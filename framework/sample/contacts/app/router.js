define([
    // Application.
    "app/app", "swipe-layout", "app/models/contacts", "app/models/menu", "text!templates/main-layout.html", "text!templates/detail-layout.html", "text!templates/index-layout.html"
],

    function( app, swipeLayout, Contact, Menu, mainTemplate, detailTemplate, indexTemplate ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({

            initialize: function() {

                app.layoutManager = new (Backbone.Layout.extend());

                var collections = {
                    contacts: new Contact.Collection()
                };

                _.extend(this, collections);

                _.each(this.routes, function( route ) {
                    this.visitedRoutes[route] = false;
                }, this);
            },

            visitedRoutes: {},

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

            routes: {
                '': 'index',
                'detail/:id': 'detail',
                'add': 'add'
            },

            index: function( isFirstLoad ) {
                if( isFirstLoad ) {

                    this.contacts.fetch();
                    var listOptions = { contacts: this.contacts };

                    var list = new Contact.Views.List(listOptions);
                    var navigation = new Menu.Navigation();

                    app.layoutManager.setLayout(swipeLayout);

                    app.layoutManager.applyViews({
                        content: list,
                        footer: navigation

                    });
                }

                if( !app.layoutManager.isFirstLoad ) {
                    PageTransitions.next();
                } else {
                    app.layoutManager.initialRenderProcess();
                }


            },

            detail: function( isFirstLoad, id ) {

                console.log(isFirstLoad, id);
                var model = this.contacts.get(id);
                var that = this;

                if( !model ) {
                    model = new Contact.Model({_id: id });
                    model.collection = this.contacts;
                    model.fetch({ success: function( model ) {
                        that.contacts.add(model);
                    }});
                }

                var view = new Contact.Views.Detail({model: model});
                var navigation = new Menu.Navigation();

                app.layoutManager.setLayout(swipeLayout);

                app.layoutManager.applyViews({
                    content: view,
                    footer: navigation
                });

                if( !app.layoutManager.isFirstLoad ) {
                    PageTransitions.next();
                } else {
                    app.layoutManager.initialRenderProcess();
                }


            },

            add: function( id ) {

                view = new Contact.Views.Add({collection: this.contacts});

                //                app.setLayout(mainTemplate);
                app.layoutManager.setViews({
                    ".content": view
                });

                app.layoutManager.render();
                $('body').html(app.layoutManager.el);
            }
        });

        return Router;

    });
