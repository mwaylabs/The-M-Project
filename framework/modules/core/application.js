// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      07.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.Application = M.Object.extend(/** @scope M.Application.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Application',

    /**
     * This property contains the application-specific configurations. It is automatically set by Espresso
     * during the init process of an application. To access these properties within the application, use the
     * getConfig() method of M.Application.
     */
    config: null,

    /**
     * This property is used internally to store content binding definitions that can not
     * be evaluated due to undefined targets. So the need to be delayed until the whole
     * application is ready and all objects are initialized.
     *
     * @type {Array}
     */
    _undefinedContentBindings: null,

    runtime: '',

    /**
     * M.Application's _init method.
     *
     * @private
     */
    _init: function() {
        /* only init the config and _undefinedContentBindings properties for M.Application, so the app can access them, too. */
        if( Object.getPrototypeOf(this) === M.Object ) {
            this.config = this.config || {};
            this._undefinedContentBindings = [];
        }
        this.setRuntime();
    },

    /**
     * This method is called automatically once the application is launched. This
     * basic implementation throws an exception to indicate, that it has to be
     * implemented within an application.
     */
    start: function() {
        if( Object.getPrototypeOf(this) === M.Object ) {
            throw M.Exception.APPLICATION_START_NOT_DEFINED.getException();
        }

        this._attachUndefinedContentBindings();
    },

    /**
     * This method returns the value of a config parameter specified in the config.json
     * of an application.
     *
     * @param key
     * @returns {*}
     */
    getConfig: function( key ) {
        if( key && this.config.hasOwnProperty(key) ) {
            return this.config[key];
        }
        return null;
    },

    /**
     * Loads the java script from the url given in src
     *
     * @param {String} src - url of the javascript to load
     * @param {Object} callbacks - the callbacks (success/error)
     * @return {*}
     */
    loadScript: function(src, callbacks) {
        var that = this;
        callbacks = callbacks || {};

        if (src) {
            var id = src.replace(/[\/:?&]/g, '');
            var newJs, js = document.getElementById(id);
            if (!js) {
                newJs = js = document.createElement("script");
            } else if (js.readyState === 'complete') {
                return that.handleCallback(callbacks.success);
            }
            js.addEventListener('load', function() {
                return that.handleCallback(callbacks.success);
            });
            js.addEventListener('error', function() {
                return that.handleCallback(callbacks.error);
            });
            if (newJs) {
                newJs.src = src;
                newJs.id  = id;
                document.head.appendChild(newJs);
            }
        } else {
            return that.handleCallback(callbacks.error);
        }
    },

    /**
     * This method is responsible for adding an observer that contains an undefined
     * content binding target to a list that will later be post processed once all
     * objects are initialized properly.
     *
     * @param object
     */
    addUndefinedContentBinding: function( object ) {
        if( object && object.hasInterfaceImplementation && object.hasInterfaceImplementation(M.ContentBinding) ) {
            this._undefinedContentBindings.push(object);
        }
    },

    /**
     * This method is automatically called on the startup of any application. It
     * tries to attach all undefined observers that might have appeared during
     * the start up phase of the application.
     *
     * @private
     */
    _attachUndefinedContentBindings: function() {
        _.each(this._undefinedContentBindings, function( observer ) {
            observer.attachToObservable()
        });
    },

    setRuntime: function(){
        this.runtime = 'browser';
        if(typeof window !== 'object'){
            this.runtime = 'node';
        }
    }

});