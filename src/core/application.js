M.Application = M.Controller.extend({

    _type: 'M.Application',

    Models: null,

    Collections: null,

    Views: null,

    Controllers: null,

    Routers: null,

    _transition: '',

    initialize: function() {
        this.Models = {};
        this.Collections = {};
        this.Views = {};
        this.Controllers = {};
        this.Routers = {};
        return this;
    },

    start: function( options ) {

        this.initLocale(options).then(function() {
             Backbone.history.start();
        });

        return this;
    },

    initLocale: function(options) {
        var defer = $.Deferred();

        M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function(e) {
            defer.resolve();
        });

        if( options && options.locales ) {
            M.I18N.setLocales(options.locales);
            M.I18N.setLocale(moment.lang());
        }else{
            defer.resolve();
        }

        return defer.promise();
    },

    initialRender: function() {
        this.layoutManager.initialRenderProcess();
    },

    navigate: function( settings ) {

        var url = settings.route;
        var path = '';
        if( settings.params ) {
            path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
            url += '/';
        }
        var options = settings.options || true;
        if(!settings.transition) {
            settings.transition = M.PageTransitions.MOVE_TO_LEFT_FROM_RIGHT;
        }

        this._setTransition(settings.transition);

        this.isFirstLoad = false;

        Backbone.history.navigate(url + path, options);
    },

    startTransition: function() {
        this.layout.startTransition({
            transition: this._getTransition()
        });
    },

    _setTransition: function(name) {
        this._transition = name;
    },

    _getTransition: function() {
        return this._transition;
    }
});
