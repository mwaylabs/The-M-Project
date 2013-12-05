// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.Config
 *
 * @param options This property contains the application-specific configurations.
 * @constructor
 */
M.Config = function (options) {
    this.options = options || {};
    if (_.isFunction(this.initialize)) {
        this.initialize(this.options);
    }
};

M.Config.extend = M.extend;
M.Config.create = M.create;
M.Config.design = M.design;

_.extend(M.Config.prototype, {

    /**
     * The type of this object.
     *
     * @private
     */
    _type: 'M.Config',

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
    get: function (name) {
        return this[name];
    }
});