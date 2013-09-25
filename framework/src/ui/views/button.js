//TODO DO THIS NICE
(function() {

    _.mixin({isNodeList: function( el ) {
        if( typeof el.length === 'number' && typeof el[0] === 'object' && el[0].hasOwnProperty('innerHTML') ) {
            return true;
        }
        return false;
    }});

    M.TemplateManager = M.Object.extend({

        containerTemplates: {
            defaultTemplate: '<div><div data-binding="value" contenteditable="true"><%= value %></div><div data-child-view="main"></div>'
        },

        buttonTemplates: {
            defaultTemplate: '<div>Button: <div data-binding="value"<% if(value) {  } %>><%= value %></div></div>',
            topcoat: '<button class="topcoat-button--large" data-binding="value"><%= value %></button>',
            bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star" data-binding="value"></span><%= value %></button>',
            jqm: '<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="value"><%= value %></span></span></a>'
        },

        toolbarTemplates: {
            defaultTemplate: '<div>AAA<div data-child-view="left"></div> <div class="center" data-binding="value"><%= value %></div> <div data-child-view="right"></div></div>',
            bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= value %></h1><div data-child-view="right"></div></div>',
            jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= value %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
        },

        currentTemplate: 'jqm',

        get: function( template ) {
            if( this[template] ) {
                var tpl = this[template][M.TemplateManager.currentTemplate];
                if( !tpl ) {
                    return this[template]['defaultTemplate'];
                } else {
                    return tpl;
                }
            }
        }
    });


    M.Button = M.View.extend({

        _type: 'M.Button',

        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
        },

        afterRender: function() {
            this.el
            M.View.prototype.afterRender.apply(this, arguments);
        },

        contenteditable: true,

        template: _.template(M.TemplateManager.get('buttonTemplates'))

    });

    M.Toolbar = M.View.extend({

        _type: 'M.Toolbar',

        template: _.template(M.TemplateManager.get('toolbarTemplates')),

        getTemplateIdentifier: function() {

            return 'toolbarTemplates'
        },

        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
        }

    });

    M.ContainerView = M.View.extend({

        _type: 'M.ContainerView',

        template: _.template(M.TemplateManager.get('containerTemplates'))

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


    M.ListView = M.View.extend({

        template: _.template('<div></div>'),

        //            events: {
        //                "click .add": "addEntry"
        //            },

        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
            this.listenTo(this.model, 'add', this.addOne);
            this.listenTo(this.model, 'fetch', function() {
                this.addAll();
            });

            this.listenToOnce(this.model, 'sync', function() {
                this.render();
            });

            this.addAll.apply(this);
        },

        serialize: function() {
            return this;
        },

        addEntry: function() {
            app.layoutManager.navigate({
                route: 'add'
            });
        },

        addChildViews: function() {

        },

        addAll: function() {
            this.model.each(function( model ) {
                this.addOne.apply(this, [model, false]);
            }, this);
        },

        addOne: function( model, render ) {
            var item = this.listItemView.create({
                template: this.listItemView.template,
                value: model
            });
            //'tbody', new M.View({ template: _.template(), value: model })
            var view = this.insertView(item);

            // Only trigger render if it not inserted inside `beforeRender`.
            if( render !== false ) {
                view.render();
            }
        }
    });


    M.Router = Backbone.Router.extend({

        visitedRoutes: {},

        initialize: function() {

            FastClick.attach(document.body);

            window[window.TMP_APPLICATION_NAME].layoutManager = new (Backbone.Layout.extend());

        },

        callCallback: function( route, name, callback, res ) {

            var controller = callback;
            var _callback = void 0;

            if( !M.Controller.prototype.isPrototypeOf(callback) ) {

            }

            if( Object.keys(this.visitedRoutes).length === 0 ) {
                _callback = controller.applicationStart;
                //                doAfterViewIinit = function(){
                //                    Addressbook.layoutManager.initialRenderProcess();
                //                }
            } else {
                _callback = controller.show;
            }


            _callback && _callback.apply(this, [res]);
            return this;
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
            //            if( _.isFunction(callback) ) {
            //
            //                //callback = callback();
            //            } else {
            //                var doAfterViewIinit = null;
            //                if(Object.keys(this.visitedRoutes).length === 0){
            //                    callback = callback.applicationStart;
            //                    doAfterViewIinit = function(){
            //                        Addressbook.layoutManager.initialRenderProcess();
            //                    }
            //                } else{
            //                    callback = callback.show;
            //                }
            //            }

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
                router.callCallback(route, name, callback, res);

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

    M.Router.create = M.create;

})();