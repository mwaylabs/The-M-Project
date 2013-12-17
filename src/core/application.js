// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Application
 *
 * @type {*}
 * @extends M.Controller
 */
M.Application = M.Controller.extend({

    _type: 'M.Application',

    Models: null,

    Collections: null,

    Views: null,

    Controllers: null,

    Routers: null,

    _isReady: NO,

    _debugView: null,

    /**
     * This property is an indicator for the initial load of an app
     * @type {boolean}
     */
    isInitialLoad: true,

    /**
     * This property contains an instance of the debug view.
     *
     * @private
     */
    _layout: null,

    /**
     * This property contains the application-specific configurations.
     *
     * @private
     */
    _config: null,


    initialize: function( config ) {
        this.Models = {};
        this.Collections = {};
        this.Views = {};
        this.Controllers = {};
        this.Routers = {};

        M.APPLICATION_NAME = config.name;
        this._config = M.Config.design(config);

        return this;
    },

    start: function( options ) {

        this.router = M.Router.design(options.routing);

        this._initLocale(options).then(function() {
            Backbone.history.start();
        });

        return this;
    },

    setLayout: function( layout ) {
        if( this._layout ) {
            this._layout.destroy();
            this._layout = null;
        }

        this._layout = layout;
        this._layout.render();
        $('#main').html(this._layout.$el);
    },

    getLayout: function() {
        return this._layout;
    },

    navigate: function( settings ) {

        // Prevent routing, if a transition is animating
        if(this._layout && this._layout.isAnimating && this._layout.isAnimating()) {
            return false;
        }

        var url = settings.route;
        var path = '';
        if( settings.params ) {
            path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
            url += '/';
        }

        if( this._layout ) {
            this._layout.setTransition(settings.transition);
        }


        var options = settings.options || true;
        Backbone.history.navigate(url + path, options);
    },

    _initLocale: function( options ) {
        var defer = $.Deferred();

        M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function() {
            defer.resolve();
        });

        if( this._config && this.getConfig('locales') ) {
            M.I18N.setLocales(this.getConfig('locales'));
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

        this._initDebugView();

        //Init fastclick
        FastClick.attach(document.body);

        _.each(Object.getPrototypeOf(this.router), function( controller, key ) {
            if(M.isController(controller)){
                controller.applicationReady();
            }
        }, this);

        this._isReady = YES;
    },

    /**
     * This method initialize the M.DebugView
     *
     * @private
     */
    _initDebugView: function() {
        if( this.getConfig('debugView') ) {
            this._debugView = M.DebugView.create();
        }
    },

    /**
     * Returns the value of a configuration as defined in the config.js of the given key.
     * To access these properties within the application, use the getConfig() method of
     * your M.Application instance like in the example below.
     *
     * @param {String} The key of the configuration value to want to retrieve.
     * @returns {String} The value in the application's config object with the key 'key'.
     *
     * @example
     *
     * var appname = Kitchensink.getConfig('name');
     * console.log(appname); // Kitchensink
     */
    getConfig: function( key ) {
        return this._config.get(key);
    }

});
