// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('m.js');

/**
 * @class
 *
 * Base class of all objects.
 */
M.Object = {

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.Object',

    /**
     * Creates an object.
     * 
     * @param obj
     */
    create: function(obj) {
        var f = function(){};
        f.prototype = obj;
        return new f();
    },

    /**
     * Creates a new class and extends it with all functions of the defined super class
     * The function takes multiple input arguments. Each argument Servers as additional
     * super classes - see mixins.
     */
    extend: function(){
        var f = function(){};
        for(prop in this) {
            f.prototype[prop] = this[prop];
        }
        for(var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for(prop in obj) {
                f.prototype[prop] = obj[prop];
            }
            f.prototype['super'] = this;
        }
        return new f();
    },

    /**
     * Binds a method to its caller, so it is always executed within the right scope.
     *
     * @param {Object} caller The scope of the method that should be bound.
     * @param {Object} method The method to be bound.
     */
    bindToCaller: function(caller, method) {
        return function() {
            return method.apply(caller, arguments);
        }
    },

    /**
     * Returns the class property behind the given key.
     *
     * @param {String} key The key of the property to be returned.
     */
    get: function(key) {
        return this[key];
    },

    /**
     * Returns the class property behind the given key.
     *
     * @param {String} key The key of the property to be changed.
     * @param {Object, String} value The value to be set.
     */
    set: function(key, value) {
        this[key] = value;
    }

};