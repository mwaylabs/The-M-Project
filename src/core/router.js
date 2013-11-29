/**
 *
 * @module M.Router
 *
 * @type {*}
 * @extends Backbone.Router
 */
M.Router = Backbone.Router.extend();
M.Router.create = M.create;
M.Router.design = M.design;

_.extend(M.Router.prototype, M.Object, {

    _type: 'M.Router',

    _visitedRoutes: {},

    initialize: function() {

    },

    controllerDidLoad: function( name, controller, res, callback ) {
        var _callback = this.getCallBack(controller);
        if(_.isFunction(_callback)){
            _callback.apply(controller, [res]);
        }
        callback();
        global[M.APPLICATION_NAME]._initReady();
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
        }

        return this;
    },

    getCallBack: function( controller ) {

        var _callback = null;
        if( Object.keys(this._visitedRoutes).length === 0 ) {
            _callback = controller.applicationStart;
        } else {
            // prevent a show, if an transition is animating
            if(!M.PageTransitions._isAnimating){
                _callback = controller.show;
            }

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
            var res = {};
            _.each(router.routes, function( val, key ) {
                if(name === val){
                    var reg = /\(?(\/:[^)]+)\)?$/;
                    ///^page4\(?(/:[^)]+)\)?$/
                    var exec = reg.exec(key);
                    if( exec && exec.length ) {
                        var s = exec.slice(1);
                        res = s[0].replace('/:', '');
                    }
                }
            }, this);
            var args = router._extractParameters(route, fragment);
            res = _.object([res], args);
            args.unshift(!router._visitedRoutes[name]);
            router.callCallback(route, name, controller, res, function() {
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                Backbone.history.trigger('route', router, name, args);
                if( !router._visitedRoutes[name] ) {
                    router._visitedRoutes[name] = true;
                }
            });
        });
        return this;
    }

});