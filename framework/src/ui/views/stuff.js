//TODO DO THIS NICE
(function() {

    _.mixin({isNodeList: function( el ) {
        if( typeof el.length === 'number' && typeof el[0] === 'object' && el[0].hasOwnProperty('innerHTML') ) {
            return true;
        }
        return false;
    }});






    M.Toolbar = M.View.extend({

        _type: 'M.Toolbar',

        template: _.tmpl(M.TemplateManager.get('toolbarTemplates')),

        getTemplateIdentifier: function() {

            return 'toolbarTemplates'
        },

        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
        }

    });

    M.ContainerView = M.View.extend({

        _type: 'M.ContainerView',

        template: _.tmpl(M.TemplateManager.get('containerTemplates'))

    });

    //    M.Controller = function(){};
    //
    //    M.Controller.prototype._type = 'M.Controller';
    //
    //    M.Controller.prototype..onPageSwitch = function() {
    //
    //    };
    //
    //    M.Controller.prototype..initialLoad = function() {
    //
    //    };
    //
    //    M.Controller = M.Object.extend(M.Controller);
    //    M.Controller.create = M.create;


    M.Controller = function() {
        _.extend(this, arguments[0]);
        this.initialize(arguments[0]);
    };

    M.Controller.create = M.create;


    _.extend(M.Controller.prototype, Backbone.Events, {

        _type: 'M.Controller',

        initialize: function( options ) {
            return this;
        },

        set: function( name, value ) {
            this[name] = value;
            this.trigger(name, value);
        }
    });


    M.Router = Backbone.Router.extend({

        visitedRoutes: {},

        initialize: function() {

            this.bootstrap();

        },

        bootstrap: function() {

            FastClick.attach(document.body);

            $(document).on('click', 'a[href^="#"]', function( e ) {
                debugger;
                e.preventDefault();
                e.stopPropagation();
                return void 0;
            });

            window[window.TMP_APPLICATION_NAME].layoutManager = new (Backbone.View.extend());
        },

        controllerDidLoad: function( controller, res, callback ) {

            var _callback = this.getCallBack(controller);
            _callback && _callback.apply(controller, [res]);
            callback();
        },

        callCallback: function( route, name, controller, res, callback ) {


            var that = this;
            if( _.isString(controller) ) {
                require([controller], function( ctrl ) {
                    that.controllerDidLoad(ctrl, res, callback);
                });
            } else if( M.Controller.prototype.isPrototypeOf(controller) ) {
                setTimeout(function() {
                    that.controllerDidLoad(controller, res, callback);
                }, 0);
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


})();


//var P = {};
//
//Object.defineProperty(window, "Person", {
//    get: function() {
//        console.log('getter of person');
//        return P;
//    },
//    set: function( newValue ) {
//        console.log('setter of person');
//        debugger;
//        Object.keys(newValue).forEach(function(key){
//            P[key] = Object.defineProperty(P, key, {
//                get: function() {
//                    if(P[key] !== newValue){
//                        P[key] = newValue;
//                        console.log('getter of ' + key);
//                        return P[key];
//                    }
//                },
//                set: function( newValue ) {
//                    if(P[key] !== newValue)
//                        P[key] = newValue;
//
//                },
//                enumerable: true,
//                configurable: true
//            });
//        })
//    },
//    enumerable: true,
//    configurable: true
//});
//
//Person = {a:'a1', b: 'b1'}