_.extend(Backbone.Layout.prototype, {

    transition: null,

    currentLayout: null,

    isFirstLoad: true,

    _views: null,

    __totalLayoutViews: null,

    setTransition: function( transition ) {

    },

    applyViews: function( settings, callback ) {
        var that = this;

        var _settings = settings;
        console.log('_settings', _settings);

        this._loadViews(settings, function( views ) {
           var duplicates = [];

            var viewsToRender = that.currentLayout.__applyViews(views);

            //that.children = viewsToRender;

//            if(that.views && that.views['.left'] === viewsToRender['.left']){
//                var view = that.setView('.right', viewsToRender['.right']);
//                view.render();
//
//            } else {
//                that.setViews(viewsToRender);
//                that.render();
//            }

            var doRender = true;
            _.each(viewsToRender, function(view, selector){
                if(that.views[selector] !== view){
                    console.log('adsf');
                    var view = that.setView(selector, view);
                    view.render();
                } else {
                    doRender = false;
                }
            });

            if(doRender){
                that.render();
            }




            callback();
        });
    },

    _viewDidLoad: function( domSelector, view, callback ) {

        this.totalLayoutViews -= 1;

        this._views[domSelector] = view;

        if( this.totalLayoutViews === 0 ) {
            callback(this._views);
        }

    },


    _loadViews: function( views, callback ) {

        var that = this;
        this.totalLayoutViews = Object.keys(views).length;
        this._views = {};

        _.each(views, function( view, domSelector ) {

            if( view && _.isFunction(view) ) {

                that._viewDidLoad(domSelector, view.create(), callback);

            } else if( view && typeof view === 'string' ) {

                require([view], function( loadedView ) {
                    if( loadedView.create ) {
                        that._viewDidLoad(domSelector, loadedView.create(), callback);
                    } else {

                        that._viewDidLoad(domSelector, new loadedView(), callback);
                    }

                });

            } else if( view && view.isView() ) {

                that._viewDidLoad(domSelector, view, callback);

            }

        });

        //        if( settings.left && _.isFunction(settings.left) ) {
        //            this.applyView('.left', settings.left.create(), callback);
        //        } else if( settings.left && typeof settings.left === 'string' ) {
        //            require([settings.left], function( left ) {
        //                that.applyView('.left', left.create(), callback);
        //            })
        //        } else if( settings.left && settings.left.isView() ) {
        //            this.applyView('.left', settings.left, callback);
        //        }
        //
        //        if( settings.right && _.isFunction(settings.right) ) {
        //            this.applyView('.right', settings.right.create(), callback);
        //        } else if( settings.right && typeof settings.right === 'string' ) {
        //            require([settings.right], function( right ) {
        //                that.applyView('.right', right.create(), callback);
        //            })
        //        } else if( settings.right && settings.right.isView() ) {
        //            this.applyView('.right', settings.right, callback);
        //        }

        return this;
    },

    initialRenderProcess: function() {
        //        this.render();
        $('body').html(this.el);
        PageTransitions.init();
    },

    updateViewport: function() {

    },

    navigate: function( settings ) {

        var url = settings.route;
        var path = '';
        if( settings.params ) {
            path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
            url += '/';
        }
        var options = settings.options || true;

        this.setTransition(settings.transition);

        this.isFirstLoad = false;

        Backbone.history.navigate(url + path, options);
    },

    setLayout: function( layout ) {
        if( this.currentLayout && this.currentLayout._type === layout._type ) {
            return this;
        } else {
            this.currentLayout = layout;
            this.el = this.currentLayout.template;
            this.constructor(this);
            this.currentLayout.initialize();
            this.isFirstLoad = true;
        }
        return this;

    },

    getLayout: function() {
        return this.currentLayout;
    }


});
