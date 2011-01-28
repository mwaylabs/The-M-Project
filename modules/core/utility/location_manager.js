// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      24.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/utility/location.js');

/**
 * A constant value for permisson denied error.
 *
 * @type String
 */
M.LOCATION_PERMISSION_DENIED = 'PERMISSION_DENIED';

/**
 * A constant value for position unavailable error.
 *
 * @type String
 */
M.LOCATION_POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE';

/**
 * A constant value for timeout error.
 *
 * @type String
 */
M.LOCATION_TIMEOUT = 'TIMEOUT';

/**
 * A constant value for unknown error.
 *
 * @type String
 */
M.LOCATION_UNKNOWN_ERROR = 'UNKNOWN_ERROR';

/**
 * A constant value for not supported error.
 *
 * @type String
 */
M.LOCATION_NOT_SUPPORTED = 'NOT_SUPPORTED';

/**
 * @class
 *
 * M.LocationManager defines a prototype for managing the user's respectively the
 * device's location, based on the HTML 5 Geolocation API. The M.LocationManager
 * provides machanism to retrieve, manage and update a location.
  *
 * @extends M.Object
 */
M.LocationManager = M.Object.extend(
/** @scope M.LocationManager.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.LocationManager',

    /**
     * This method is used for retrieving the current location.
     *
     * The first two parameters define the success and error callbacks. They are
     * called once the location was retrieved successfully (success callback) or
     * if it failed (error callback).
     *
     * The success callback will be called with an M.Location object containing
     * all the information about the location that was retrieved.
     *
     * The error callback will be called with one of the following constant
     * string values:
     *   - PERMISSION_DENIED
     *   - POSITION_UNAVAILABLE
     *   - TIMEOUT
     *   - UNKNOWN_ERROR
     *   - NOT_SUPPORTED
     *
     * The third parameter, options, can be used to define some parameters for
     * retrieving the location. These are based on the HTML5 Geolocation API:
     *
     *   http://dev.w3.org/geo/api/spec-source.html#position_options_interface
     *
     * A valid options parameter could look like:
     * 
     *   {
     *     enableHighAccuracy: YES,
     *     maximumAge:600000,
     *     timeout:0
     *   }
     *
     * If you do not specify any options, the following default values are taken:
     *
     *   enableHighAccuracy = NO --> turned off, due to better performance
     *   maximumAge = 0 --> always retrieve a new location
     *   timeout = 5000 --> 5 seconds until timeout error
     *
     * @param {Object} caller The object, calling this function. 
     * @param {Object} onSuccess The success callback.
     * @param {Object} onError The error callback.
     * @param {Object} options The options for retrieving a location.
     */
    getLocation: function(caller, onSuccess, onError, options) {
        var that = this;

        options = options ? options : {};
        options.enableHighAccuracy = options.enableHighAccuracy ? options.enableHighAccuracy : NO;
        options.maximumAge = options.maximumAge ? options.maximumAge : 0;
        options.timeout = options.timeout ? options.timeout : 3000;

        if(navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var location = M.Location.extend({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        date: M.Date.now()
                    });
                    that.bindToCaller(caller, onSuccess, location)();
                },
                function(error) {
                    switch (error.code) {
                        case 1:
                            that.bindToCaller(caller, onError, M.LOCATION_PERMISSION_DENIED)();
                            break;
                        case 2:
                            that.bindToCaller(caller, onError, M.LOCATION_POSITION_UNAVAILABLE)();
                            break;
                        case 3:
                            that.bindToCaller(caller, onError, M.LOCATION_TIMEOUT)();
                            break;
                        default:
                            that.bindToCaller(caller, onError, M.LOCATION_UNKNOWN_ERROR)();
                            break;
                    }
                },
                options
            );
        } else {
            that.bindToCaller(that, onError, M.LOCATION_NOT_SUPPORTED)();
        }
    }

});