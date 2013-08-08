define([
    "themproject", // Application.
    "app", // Modules.
    "text!templates/main-layout.html", "views/list", "views/menu", "views/add", "views/detail", "data/contact_collection", "data/contact_model"
],

    function( M, app, mainTemplate, ListView, MenuView, AddView, DetailView, ContactCollection, ContactModel ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({

            initialize: function() {

                app.layoutManager = new (Backbone.Layout.extend());

                var collections = {
                    contacts: new ContactCollection()
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
                    var list = new ListView(listOptions);
                    var menu = new MenuView();

                    app.layoutManager.setLayout(new M.SwipeLayout());

                    app.layoutManager.applyViews({
                        content: list,
                        footer: menu

                    });
                }

                if( !app.layoutManager.isFirstLoad ) {
                    PageTransitions.next();
                } else {
                    app.layoutManager.initialRenderProcess();
                }


            },

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

                app.layoutManager.setLayout(new M.SwitchLayout());

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

            add: function() {

                var view = new AddView({collection: this.contacts});
                var menu = new MenuView();

                app.layoutManager.setLayout(new M.SwipeLayout());

                app.layoutManager.applyViews({
                    content: view,
                    footer: menu,
                    header: app.header
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
