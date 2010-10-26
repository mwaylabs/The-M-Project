// ==========================================================================
// Project:   MProject - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

m_require('object.js');

/**
 * Logging levels as constants.
 */
M.DEBUG = 0;
M.ERROR = 1;
M.WARNING = 2;

/**
 * @class
 *
 * Object for logging.
 *
 */
M.Logger = M.Object.create({

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
        switch (level) {
            case M.DEBUG:
                this.debug(msg);
                break;
            case M.ERROR:
                this.error(msg);
                break;
            case M.WARNING:
                this.warn(msg);
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
        console.log(msg);
    },

    /**
     * @private
     */
    error: function(msg) {
        console.log('Error: ' + msg);
    },

    /**
     * @private
     */
    warn: function(msg) {
        console.log('Warning: ' + msg);
    }

});