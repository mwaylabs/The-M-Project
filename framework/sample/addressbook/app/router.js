define([
    "themproject",
    "controllers/index"
],

    function( M, indexController ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({

            visitedRoutes: {},

            routes: {
                '': 'index'
            },

            index: indexController,

            initialize: function() {

                FastClick.attach(document.body);

                Addressbook.layoutManager = new (Backbone.Layout.extend());

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

                if( !_.isFunction(callback) ) {
                    var doAfterViewIinit = null;
                    if(Object.keys(this.visitedRoutes).length === 0){
                        callback = callback.applicationStart;
                        doAfterViewIinit = function(){
                            Addressbook.layoutManager.initialRenderProcess();
                        }
                    } else{
                        callback = callback.show;
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
            }

        });

        return Router;

    });
