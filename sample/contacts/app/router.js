define([
    "themproject", // Application.
    "app", // Modules.
    "text!templates/main-layout.html", "views/list", "views/menu", "views/contacts", "views/add", "views/detail", "data/contacts", "views/main"
],

    function( M, app, mainTemplate, ListView, MenuView, ContactsView, AddView, DetailView, Contacts, Main ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({

            initialize: function() {

                FastClick.attach(document.body);

                app.layoutManager = new (Backbone.Layout.extend());

                var collections = {
                    contacts: new ContactCollection({
                        store: RemoteStore
                    })
                };

//
//                _.extend(this, collections);

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

                if( !_.isFunction(callback) && callback.isView() ) {
                    var doAfterViewIinit = null;
                    if(Object.keys(this.visitedRoutes).length === 0){
                        callback = callback.options.initialLoad || callback.initialLoad;
                        doAfterViewIinit = function(){
                            app.layoutManager.initialRenderProcess();
                        }
                    } else{
                        callback = callback.options.onPageSwitch || callback.onPageSwitch;
                    }

                }

                var router = this;
                Backbone.history.route(route, function( fragment ) {
                    var res = null;
                    _.each(router.routes, function( val, key ) {
                        var string = route.toString().slice(1,-1);
                        var reg = new RegExp(string.replace(/\(\[\^/g, ':([^'));
                        var exec = reg.exec(key);
                        if( exec && exec.length ) {
                            res = exec.slice(1);
                        }
                    });
                    var args = router._extractParameters(route, fragment);
                    res = _.object(res, args);
                    args.unshift(!router.visitedRoutes[name]);
                    callback && callback.apply(router, [res]);

                    if( _.isFunction(doAfterViewIinit)){
                        doAfterViewIinit();
                    }

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
                'add': 'add',
                'contacts': 'contacts'
            },

            contacts: function( isFirstLoad ) {
                if( isFirstLoad ) {

                    this.contacts.fetch();
                    var listOptions = { contacts: this.contacts };
                    var list = new ListView(listOptions);
                    var menu = new ContactsView();

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

            index: Main,

            details: function( isFirstLoad, id ) {
                var model = this.contacts.get(id);
                var that = this;

                if( !model ) {
                    model = new ContactModel({_id: id });
                    model.collection = this.contacts;
                    model.fetch({ success: function( model ) {
                        that.contacts.add(model);
                    }});
                }

                view = new DetailView({model: model});
                var menu = MenuView;

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
                var menu = MenuView;

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
