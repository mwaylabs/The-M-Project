// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @namespace
 * The The-M-Project namespace.
 *
 * All The-M-Project methods and functions are defined inside of this namespace.
 */
var M = M || {};

/**
 * The version of The-M-Project
 */
M.Version = '1.2';

/**
 * These command is used by the build tool to control the load order.
 * It does nothing on the client side.
 */ 
var m_require = m_require || function require() {};

/**
 * global constant to write YES instead of true
 */
var YES = true;
/**
 * global constant to write NO instead of false
 */
var NO = false;

M.LOCAL_STORAGE_PREFIX = '#m#';
M.LOCAL_STORAGE_SUFFIX = '_';

/* TODO: evaluate if the timestamp constants could be included in config file, for user's customization */
/**
 * constant that defines name of createdAt property and column name
 */
M.META_CREATED_AT = '_createdAt';
/**
 * constant that defines name of updatedAt property and column name
 */
M.META_UPDATED_AT = '_updatedAt';
/**
 * constant that defines name of m_id column name
 */
M.META_M_ID = '_m_id';

/**
 * Overwrites clear() of LocalStorage to clear only key-value pairs belonging to the application. If the previously existing,
 * delivered clear shall be used, users have to pass 'f' as param to clear to force it.
 * @param {String} param One character string. If it is 'f' (means 'force'), the existing clear() is used to clear the whole storage
 * if param is undefined or another letter, the custom clear is used.
 */
Object.getPrototypeOf(localStorage).clear = function(param) {
    /* Call localStorage.clear() with parameter 'f' to use system wide localStorage.clear() */
    var l = this.length;
    if(param === 'f') {
        var l = this.length;
        for (var i = l - 1; i >= 0; i--){
            this.removeItem(this.key(i));
        }
    } else {
        for (var i = l - 1; i >= 0; i--){
            var k = this.key(i);
            var regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX).exec(k);
            if(regexResult) {
                this.removeItem(k);
            }
        }
    }
}
