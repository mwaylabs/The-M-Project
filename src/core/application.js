M.Application = M.Controller.extend({

    _type: 'M.Application',

    Models: null,

    Collections: null,

    Views: null,

    Controllers: null,

    Routers: null,

    _isReady: NO,

    _debugView: null,

    _layout: null,

    _debugViewIsHidden: YES,

    initialize: function() {
        this.Models = {};
        this.Collections = {};
        this.Views = {};
        this.Controllers = {};
        this.Routers = {};
        return this;
    },

    start: function( options ) {

        this.router = M.Router.design(options.routing);

        this._initLocale(options).then(function() {
            Backbone.history.start();
        });

        return this;
    },

    setLayout: function(layout) {
        if(this._layout) {
            this._layout.destroy();
            this._layout = null;
        }

        this._layout = layout;
        $('#main').html(layout.render().$el);
    },

    getLayout: function() {
        return this._layout;
    },

    navigate: function( settings ) {

        var url = settings.route;
        var path = '';
        if( settings.params ) {
            path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
            url += '/';
        }

        this._layout.setTransition(settings.transition);

        var options = settings.options || true;
        Backbone.history.navigate(url + path, options);
    },

    _initLocale: function( options ) {
        var defer = $.Deferred();

        M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function() {
            defer.resolve();
        });

        if( options && options.locales ) {
            M.I18N.setLocales(options.locales);
            M.I18N.setLocale(moment.lang());
        } else {
            defer.resolve();
        }

        return defer.promise();
    },

    _initReady: function() {
        if( this._isReady ) {
            return;
        }

        this._debugView = M.DebugView.design();
        this._addShakeEvent();

        this._isReady = YES;
    },

    showDebug: function() {
        if( this._debugView._firstRender ) {
            $('body').append(this._debugView.render().$el);
        }

        this._debugViewIsHidden = NO;
        this._debugView.$el.show();
    },

    hideDebug: function() {
        this._debugViewIsHidden = YES;
        this._debugView.$el.hide();
    },

    toggleDebugView: function() {
        if( this._debugViewIsHidden ) {
            this.showDebug();
        } else {
            this.hideDebug();
        }
    },

    _addShakeEvent: function() {
        var that = this;
        window.addEventListener('shake', function() {
            that.toggleDebugView();
        }, false);
    }

});
