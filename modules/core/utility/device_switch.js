// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.05.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * M.DeviceSwitch defines a prototype for using device specific objects within
 * an application developed with The M-Project.
 *
 * @extends M.Object
 */
M.DeviceSwitch = M.Object.extend(
/** @scope M.DeviceSwitch.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DeviceSwitch',

    /**
     * The name of the current device.
     *
     * @type String
     */
    device: null,

    /**
     * This method returns the specialized string for the given key based on
     * the current device/environment.
     *
     * @param {String} key The key to the specialized string.
     * @returns {String} The specialized string based on the current device/environment.
     */
    s: function(key) {
        return this.specialize(key);
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language. It is internally used as a wrapper for l() for
     * a better readability.
     *
     * @private
     * @param {String} key The key to the localized string.
     * @returns {String} The localizes string based on the current application language.
     */
    specialize: function(key) {
        if(!this.device) {
            M.Logger.log('No device specified!', M.ERR);
            return null;
        }

        if(this[this.device] && this[this.device][key]) {
            return this[this.device][key];
        } else {
            M.Logger.log('Key \'' + key + '\' not defined for device \'' + this.device + '\'.', M.WARN);
            return null;
        }
    }

});

M.DS = M.DeviceSwitch;