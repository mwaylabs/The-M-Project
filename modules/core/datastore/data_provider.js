// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
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
     * Interface method.
     * Implemented by specific data provider.
     *
     * @param {String} query The query string.
     */
    find: function(query) {
    },

    /**
     * 
     */
    save: function() {
    },

    /**
     *
     */
    del: function() {

    },

    /**
     * Checks if object has certain property.
     *
     * @param {obj} obj The object to check.
     * @param {String} prop The property to check for.
     */
    check: function(obj, prop) {
       return obj[prop] ? YES : NO;
    }

});