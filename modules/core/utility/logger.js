// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/request.js');

/**
 * Logging levels as constants.
 */
M.DEBUG = 0;
M.ERROR = 1;
M.WARN = 2;
M.INFO = 3;

/**
 * @class
 *
 * Object for logging.
 *
 */
M.Logger = M.Object.extend(
/** @scope M.Logger.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Logger',

    /**
     * Possible values for the logging level:
     *
     * - debug:   M.DEBUG
     * - error:   M.ERROR
     * - warning: M.WARNING
     *
     * @param {String} msg The logging message.
     * @param {Number} level The logging level.
     */
    log: function(msg, level) {
        level = level || M.DEBUG;

        /* Prevent a console.log from blowing things up if we are on a browser that doesn't support this. */
        if (typeof console === 'undefined') {
            window.console = {} ;
            console.log = console.info = console.warn = console.error = function(){};
        }
        
        switch (level) {
            case M.DEBUG:
                this.debug(msg);
                break;
            case M.ERROR:
                this.error(msg);
                break;
            case M.WARN:
                this.warn(msg);
                break;
            case M.INFO:
                this.info(msg);
                break;
            default:
                this.debug(msg);
                break;
        }
    },

    /**
     * @private
     */
    debug: function(msg) {
        console.debug(msg);
    },

    /**
     * @private
     */
    error: function(msg) {
        console.error(msg);
    },

    /**
     * @private
     */
    warn: function(msg) {
        console.warn(msg);
    },

    /**
     * @private
     */
    info: function(msg) {
        console.info(msg);
    }

});