// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Controller
 *
 */

/**
 * @param options
 * @constructor
 */
M.Controller = function (options) {
    this.options = options || {};
    if (_.isFunction(this.initialize)) {
        this.initialize(this.options);
    }
};

M.Controller.extend = M.extend;
M.Controller.create = M.create;
M.Controller.design = M.design;

_.extend(M.Controller.prototype, Backbone.Events, {

    _type: 'M.Controller',

    /**
     *
     * @param {Object} options
     * @returns {Controller}
     */
    initialize: function () {
        return this;
    },

    applicationStart: function () {

    },

    show: function () {

    },

    set: function (name, value) {
        this[name] = value;
        this.trigger(name, value);
    },

    get: function (name) {
        return this[name];
    },

    /**
     * Gets called if the application was initialized
     *
     */
    applicationReady: function(){

    },

    apply: function( router, args ) {
        var appInstance = global[M.APPLICATION_NAME];

        if( appInstance.isInitialLoad ) {
            this.applicationStart.apply(this, args);
            appInstance.isInitialLoad = false;
            appInstance._initReady();
        } else {
            this.show.apply(this, args);
        }
    }
});