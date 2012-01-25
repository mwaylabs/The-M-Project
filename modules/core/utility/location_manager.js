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

m_require('core/utility/location.js');

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
 * A constant value for already receiving error.
 *
 * @type String
 */
M.LOCATION_ALREADY_RECEIVING = 'ALREADY_RECEIVING';

/**
 * A constant value for location type: approximate.
 *
 * @type Number
 */
M.LOCATION_TYPE_APPROXIMATE = 0;

/**
 * A constant value for location type: geometric center.
 *
 * @type Number
 */
M.LOCATION_TYPE_GEOMETRIC_CENTER = 1;

/**
 * A constant value for location type: range interpolated.
 *
 * @type Number
 */
M.LOCATION_TYPE_RANGE_INTERPOLATED = 2;

/**
 * A constant value for location type: rooftop.
 *
 * @type Number
 */
M.LOCATION_TYPE_ROOFTOP = 3;

/**
 * A constant value for connection error of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_ERROR = 'ERROR';

/**
 * A constant value for an invalid request of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_INVALID_REQUEST = 'INVALID_REQUEST';

/**
 * A constant value for an error due to too many requests to the google geocoder service.
 *
 * @type String
 */
M.LOCATION_GEOCODER_OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT';

/**
 * A constant value for a denied request of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_REQUEST_DENIED = 'REQUEST_DENIED';

/**
 * A constant value for an unknown error of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_UNKNOWN_ERROR = 'UNKNOWN_ERROR';

/**
 * A constant value for no results of the google geocoder.
 *
 * @type String
 */
M.LOCATION_GEOCODER_ZERO_RESULTS = 'ZERO_RESULTS';

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
     * This property contains the date, as an M.Date object, of the last geolocation
     * call. It is needed internally to interpret the timeout.
     *
     * @type M.Date
     */
    lastLocationUpdate: null,

    /**
     * This property contains a reference to google maps geocoder class. It is used
     * in combination with the getLocationByAddress() method. 
     *
     * @type Object
     */
    geoCoder: null,

    /**
     * This property specifies whether the M.LocationManager is currently trying to
     * get a position or not.
     *
     * @type Boolean
     */
    isGettingLocation: NO,

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
     * retrieving the location. These are based on the HTML5 Geolocation API but
     * extend it:
     *
     *   http://dev.w3.org/geo/api/spec-source.html#position_options_interface
     *
     * A valid options parameter could look like:
     * 
     *   {
     *     enableHighAccuracy: YES,
     *     maximumAge: 600000,
     *     timeout: 0,
     *     accuracy: 100
     *   }
     *
     * If you do not specify any options, the following default values are taken:
     *
     *   enableHighAccuracy = NO --> turned off, due to better performance
     *   maximumAge = 0 --> always retrieve a new location
     *   timeout = 5000 --> 5 seconds until timeout error
     *   accuracy = 50 --> 50 meters accuracy
     *
     * @param {Object} caller The object, calling this function. 
     * @param {Object} onSuccess The success callback.
     * @param {Object} onError The error callback.
     * @param {Object} options The options for retrieving a location.
     */
    getLocation: function(caller, onSuccess, onError, options) {
        if(this.isGettingLocation) {
            M.Logger.log('M.LocationManager is currently already trying to retrieve a location.', M.WARN);
            this.bindToCaller(caller, onError, M.LOCATION_ALREADY_RECEIVING)();
        } else {
            this.isGettingLocation = YES; 
        }

        var that = this;

        this.lastLocationUpdate = M.Date.now();

        options = options ? options : {};
        options.enableHighAccuracy = options.enableHighAccuracy ? options.enableHighAccuracy : NO;
        options.maximumAge = options.maximumAge ? options.maximumAge : 0;
        options.timeout = options.timeout ? options.timeout : 3000;

        if(navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    that.isGettingLocation = NO;
                    if(!options.accuracy || (options.accuracy && position.coords.accuracy <= options.accuracy)) {
                        var location = M.Location.extend({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            date: M.Date.now()
                        });
                        that.bindToCaller(caller, onSuccess, location)();
                    } else {
                        M.Logger.log('Location retrieved, but accuracy too low: ' + position.coords.accuracy, M.INFO);
                        
                        var now = M.Date.now();
                        options.timeout = options.timeout - that.lastLocationUpdate.timeBetween(now);
                        that.getLocation(caller, onSuccess, onError, options);
                    }
                },
                function(error) {
                    that.isGettingLocation = NO;
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
    },

    /**
     * This method tries to transform a given address into an M.Location object.
     * This method is based on the google maps api, respectively on its geocoder
     * class.
     *
     * If a valid location could be found matching the given address parameter,
     * the success callback is called with a valid M.Location object as its
     * only parameter, containing the information about this location.
     *
     * If no location could be retrieved, the error callback is called, with the
     * error message as its only parameter. Possible values for this error message
     * are the following:
     *
     *   - M.LOCATION_GEOCODER_ERROR
     *
     *   - M.LOCATION_GEOCODER_INVALID_REQUEST
     *
     *   - M.LOCATION_GEOCODER_OVER_QUERY_LIMIT
     *
     *   - M.LOCATION_GEOCODER_REQUEST_DENIED
     *
     *   - M.LOCATION_GEOCODER_UNKNOWN_ERROR
     *
     *   - M.LOCATION_GEOCODER_ZERO_RESULTS
     *
     * @param {Object} caller The object, calling this function.
     * @param {Function} onSuccess The method to be called after retrieving the location.
     * @param {Function} onError The method to be called if retrieving the location went wrong.
     * @param {String} address The address to be transformed into an M.Location object.
     */
    getLocationByAddress: function(caller, onSuccess, onError, address) {
        if(address && typeof(address) === 'string') {
            if(!this.geoCoder) {
                this.geoCoder = new google.maps.Geocoder();
            }

            var that = this;

            this.geoCoder.geocode({
                address: address,
                language: M.I18N.getLanguage().substr(0, 2),
                region: M.I18N.getLanguage().substr(3, 2)
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var bestResult = null;
                    _.each(results, function(result) {
                        if(!bestResult || M['LOCATION_TYPE_' + bestResult.geometry.location_type] < M['LOCATION_TYPE_' + result.geometry.location_type]) {
                            bestResult = result;
                        }
                    })
                    if(bestResult) {
                        that.bindToCaller(caller, onSuccess, M.Location.init(bestResult.geometry.location.lat(), bestResult.geometry.location.lng()))();
                    }
                } else {
                    switch (status) {
                        case 'ERROR':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ERROR)();
                            break;
                        case 'INVALID_REQUEST':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_INVALID_REQUEST)();
                            break;
                        case 'OVER_QUERY_LIMIT':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_OVER_QUERY_LIMIT)();
                            break;
                        case 'REQUEST_DENIED':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_REQUEST_DENIED)();
                            break;
                        case 'ZERO_RESULTS':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ZERO_RESULTS)();
                            break;
                        default:
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_UNKNOWN_ERROR)();
                            break;
                    }
                }
            });
        }
    },

    /**
     * This method tries to transform a given location as an M.Location object into
     * a valid address. This method is based on the google maps api, respectively
     * on its geocoder class.
     *
     * If a valid address could be found matching the given location parameter,
     * the success callback is called with a valid address string as its only
     * parameter.
     *
     * Note: If you set the getAddressAsComponents parameter to YES, the address
     * will be passed to the success callback as an object containing the address'
     * components. Use this option if you want to put the address together manually.
     *
     * If no address could be retrieved, the error callback is called, with the
     * error message as its only parameter. Possible values for this error message
     * are the following:
     *
     *   - M.LOCATION_GEOCODER_ERROR
     *
     *   - M.LOCATION_GEOCODER_INVALID_REQUEST
     *
     *   - M.LOCATION_GEOCODER_OVER_QUERY_LIMIT
     *
     *   - M.LOCATION_GEOCODER_REQUEST_DENIED
     *
     *   - M.LOCATION_GEOCODER_UNKNOWN_ERROR
     *
     *   - M.LOCATION_GEOCODER_ZERO_RESULTS
     *
     * @param {Object} caller The object, calling this function.
     * @param {Function} onSuccess The method to be called after retrieving the address.
     * @param {Function} onError The method to be called if retrieving the address went wrong.
     * @param {M.Location} location The location to be transformed into an address.
     * @param {Boolean} getAddressAsComponents Return the address as an object containing the components.
     */
    getAddressByLocation: function(caller, onSuccess, onError, location, getAddressAsComponents) {
        if(location && typeof(location) === 'object' && location.type === 'M.Location') {
            if(!this.geoCoder) {
                this.geoCoder = new google.maps.Geocoder();
            }

            var that = this;

            this.geoCoder.geocode({
                location: new google.maps.LatLng(location.latitude, location.longitude),
                language: M.I18N.getLanguage().substr(0, 2),
                region: M.I18N.getLanguage().substr(3, 2)
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if(results[0] && getAddressAsComponents) {
                        var components = {};
                        _.each(results[0].address_components, function(component) {
                            _.each(component.types, function(type) {
                                components[type] = component['long_name'] ? component['long_name'] : component['short_name']
                            });
                        });
                        that.bindToCaller(caller, onSuccess, components)();
                    } else if(results[0]) {
                        that.bindToCaller(caller, onSuccess, results[0].formatted_address)();
                    } else {
                        that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ZERO_RESULTS)();
                    }
                } else {
                    switch (status) {
                        case 'ERROR':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ERROR)();
                            break;
                        case 'INVALID_REQUEST':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_INVALID_REQUEST)();
                            break;
                        case 'OVER_QUERY_LIMIT':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_OVER_QUERY_LIMIT)();
                            break;
                        case 'REQUEST_DENIED':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_REQUEST_DENIED)();
                            break;
                        case 'ZERO_RESULTS':
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_ZERO_RESULTS)();
                            break;
                        default:
                            that.bindToCaller(caller, onError, M.LOCATION_GEOCODER_UNKNOWN_ERROR)();
                            break;
                    }
                }
            });
        }
    }

});