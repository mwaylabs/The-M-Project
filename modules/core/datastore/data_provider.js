// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * Wraps access to any defined data source and is the only interface for a model to
 * access this data.
 *
 * @extends M.Object
 */
M.DataProvider = M.Object.extend(
/** @scope M.DataProvider.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DataProvider',

    /**
     * Indicates whether data provider operates asynchronously or not.
     *
     * @type Boolean
     */
    isAsync: NO,

    /**
     * Interface method.
     * Implemented by specific data provider.
     */
    find: function(query) {
        
    },

    /**
     * Interface method.
     * Implemented by specific data provider.
     */
    save: function() {
        
    },

    /**
     * Interface method.
     * Implemented by specific data provider.
     */
    del: function() {

    },

    /**
     * Checks if object has certain property.
     *
     * @param {obj} obj The object to check.
     * @param {String} prop The property to check for.
     * @returns {Booleans} Returns YES (true) if object has property and NO (false) if not.
     */
    check: function(obj, prop) {
       return obj[prop] ? YES : NO;
    }

});