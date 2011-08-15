// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      24.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * M.Location defines a prototype for a location object. It is mainly used by
 * the M.LocationManager and contains properties like latitude and longitude,
 * that specify the retrieved location.
 *
 * @extends M.Object
 */
M.Location = M.Object.extend(
/** @scope M.Location.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Location',

    /**
     * The latitude of this location.
     *
     * @type Number
     */
    latitude: null,

    /**
     * The longitude of this location.
     *
     * @type Number
     */
    longitude: null,

    /**
     * The date this location was retrieved.
     *
     * @type M.Date
     */
    date: null,

    /**
     * This property specifies the location's accuracy in meters.
     *
     * @type Number
     */
    accuracy: null,

    /**
     * This property contains a reference to the object, that called the
     * update() of this location. This reference is needed for calling back
     * to the defined success and error callbacks.
     *
     * @private
     * @type Object
     */
    caller: null,

    /**
     * This method contains a reference to the specified success callback
     * method.
     *
     * @type Function
     */
    onUpdateSuccess: null,

    /**
     * This method contains a reference to the specified error callback
     * method.
     *
     * @type Function
     */
    onUpdateError: null,

    /**
     * This method initializes an M.Location object with the passed latitude
     * and longitude parameters. This method can be used to manually create
     * an M.Location object if the position is already known.
     *
     * To create an M.Location object with the user's current position, you
     * will have to use the M.LocationManager, respectively its getLocation()
     * method.
     *
     * Nevertheless you can use this method to initialiy create an M.Location
     * object with a specified location and then later use its update() method
     * to retrieve the real and current location of the user / device.
     *
     * @param {Number} latitude The latitude of the location.
     * @param {Number} longitude The longitude of the location.
     */
    init: function(latitude, longitude) {
        return this.extend({
            latitude: latitude,
            longitude: longitude
        });
    },

    /**
     * This method is used to automatically update the location. Since this
     * is an asyncrhonous process, you have to specify two callback methods
     * in case of success or error. additionally you can pass along options
     * to configure the retrieving process.
     *
     * For further information about the parameters, check out getLocation()
     * in M.LocationManager since this method is called out of update().
     *
     * If the update was successful, the properties of the location object
     * are updated and your specified callback is called (without parameter).
     *
     * If the update goes wrong, your specified error callback is called with
     * the error message as its only parameter. The error message will be one
     * of the following constant string values:
     *   - PERMISSION_DENIED
     *   - POSITION_UNAVAILABLE
     *   - TIMEOUT
     *   - UNKNOWN_ERROR
     *   - NOT_SUPPORTED
     *
     * @param {Object} caller The object, calling this function.
     * @param {Object} onSuccess The success callback.
     * @param {Object} onError The error callback.
     * @param {Object} options The options for retrieving a location.
     */
    update: function(caller, onSuccess, onError, options) {
        this.caller = caller;
        this.onUpdateSuccess = onSuccess;
        this.onUpdateError = onError;
        
        M.LocationManager.getLocation(this, this.onUpdateSuccessInternal, this.onUpdateErrorInternal, options);
    },

    /**
     * This method is called automatically as the success callback of the
     * update(). After updating this location object, the external success
     * callback is called.
     *
     * @param {Object} position The position object of the Geolocation API.
     */
    onUpdateSuccessInternal: function(position) {
        if(position && position.coords) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.date = M.Date.now();

            if(this.caller) {
                if(this.onUpdateSuccess) {
                    this.bindToCaller(this.caller, this.onUpdateSuccess)();
                } else {
                    M.Logger.log('No success callback specified for update() of M.Location.', M.INFO);
                }
            } else {
                M.Logger.log('No caller specified for update() of M.Location.', M.WARN);
            }
        } else {
            M.Logger.log('An internal error occured while retrieving the position.', M.ERR);
        }
    },

    /**
     * This method is called automatically as the error callback of the
     * update(). After updating this location object, the external error
     * callback is called.
     *
     * @param {Object} position The error that occurred.
     */
    onUpdateErrorInternal: function(error) {
        if(this.caller) {
            if(this.onUpdateError) {
                this.bindToCaller(this.caller, this.onUpdateError, error)();
            } else {
                M.Logger.log('No error callback specified for update() of M.Location.', M.INFO);
            }
        } else {
            M.Logger.log('No caller specified for update() of M.Location.', M.WARN);
        }
    }

});