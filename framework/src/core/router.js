(function(scope){

    M.Router = Backbone.Router.extend({

        visitedRoutes: {},

        initialize: function() {

            this.bootstrap();

        },

        bootstrap: function() {
            FastClick.attach(document.body);

            //            $(document).on('click', 'a[href^="#"]', function( e ) {
            //                debugger;
            //                e.preventDefault();
            //                e.stopPropagation();
            //                return void 0;
            //            });

            //window[window.TMP_APPLICATION_NAME].layoutManager = new (Backbone.View.extend());
        },

        controllerDidLoad: function( name, controller, res, callback ) {
            var _callback = this.getCallBack(controller);
            _callback && _callback.apply(controller, [res]);
            callback();
        },

        callCallback: function( route, name, controller, res, callback ) {


            var that = this;
            if( _.isString(controller) ) {
                require([controller], function( ctrl ) {
                    that.controllerDidLoad(name, ctrl, res, callback);
                });
            } else if( M.Controller.prototype.isPrototypeOf(controller) ) {
                setTimeout(function() {
                    that.controllerDidLoad(name, controller, res, callback);
                }, 0);
            } else if(typeof controller === 'function'){
                that.controllerDidLoad(name, controller(), res, callback);
            }

            return this;
        },

        getCallBack: function( controller ) {
            var _callback = null;
            if( Object.keys(this.visitedRoutes).length === 0 ) {
                _callback = controller.applicationStart;
            } else {
                _callback = controller.show;
            }
            return _callback;
        },

        route: function( route, name, controller ) {
            if( !_.isRegExp(route) ) {
                route = this._routeToRegExp(route);
            }
            if( _.isFunction(name) ) {
                controller = name;
                name = '';
            }
            if( !controller ) {
                controller = this[name];
            }

            var router = this;
            Backbone.history.route(route, function( fragment ) {
                var res = null;
                _.each(router.routes, function( val, key ) {
                    var string = route.toString().slice(1, -1);
                    var reg = new RegExp(string.replace(/\(\[\^/g, ':([^'));
                    var exec = reg.exec(key);
                    if( exec && exec.length ) {
                        res = exec.slice(1);
                    }
                });
                var args = router._extractParameters(route, fragment);
                res = _.object(res, args);
                args.unshift(!router.visitedRoutes[name]);
                router.callCallback(route, name, controller, res, function() {
                    router.trigger.apply(router, ['route:' + name].concat(args));
                    router.trigger('route', name, args);
                    Backbone.history.trigger('route', router, name, args);
                    if( !router.visitedRoutes[name] ) {
                        router.visitedRoutes[name] = true;
                    }
                });
            });
            return this;
        }

    });

    M.Router.create = M.create;


})(this)