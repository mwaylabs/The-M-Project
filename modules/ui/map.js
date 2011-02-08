// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for map type: roadmap
 *
 * @type String
 */
M.MAP_ROADMAP = 'ROADMAP';

/**
 * A constant value for map type: hybrid
 *
 * @type String
 */
M.MAP_HYBRID = 'HYBRID';

/**
 * A constant value for map type: satellite
 *
 * @type String
 */
M.MAP_SATELLITE = 'SATELLITE';

/**
 * A constant value for map type: terrain
 *
 * @type String
 */
M.MAP_TERRAIN = 'TERRAIN';

/**
 * @class
 *
 * M.MapView is the prototype of a map view. It defines a set of methods for
 * displaying a map, setting markers and showing the current location. This
 * map view is based on google maps, but other implementations are possible.
 *
 * @extends M.View
 */
M.MapView = M.View.extend(
/** @scope M.MapView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.MapView',

    /**
     * This property is used to save a reference to the actual google map. It
     * is set automatically when the map is firstly initialized.
     *
     * @type Object
     */
    map: null,

    /**
     * This property is used to store the map's M.MapMarkerViews. If a marker
     * is set within the init() method or by calling the addMarker() method,
     * it is automatically pushed into this array.
     *
     * @type Object
     */
    markers: null,

    /**
     * Determines whether to display the map view 'inset' or at full width.
     *
     * @type Boolean
     */
    isInset: YES,

    /**
     * This property specifies the zoom level for this map view. It is directly
     * mapped to the zoom property of a google map view. For further information
     * see the google maps API specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Number
     */
    zoomLevel: 15,

    /**
     * This property specifies the zoom level for this map view. It is directly
     * mapped to the zoom property of a google map view. For further information
     * see the google maps API specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Number
     */
    mapType: M.MAP_ROADMAP,

    /**
     * This property specifies whether or not to display the map type controls
     * inside of this map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    showMapTypeControl: NO,

    /**
     * This property specifies whether or not to display the navigation controls
     * inside of this map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    showNavigationControl: NO,

    /**
     * This property specifies whether or not to display the street view controls
     * inside of this map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    showStreetViewControl: NO,

    /**
     * This property specifies whether the map is draggable or not. If set to NO,
     * a user won't be able to move the map, respectively the visible sector. For
     * further information see the google maps API specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type Boolean
     */
    isDraggable: YES,

    /**
     * This property specifies the initial location for this map view, as an M.Location
     * object. Its latitude and longitude properties are directly mapped to the center
     * property of a google map view. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MapOptions
     *
     * @type M.Location
     */

    initialLocation: M.Location.extend({
        latitude: 48.813338,
        longitude: 9.178463
    }),

    /**
     * This property determines whether or not to show a marker at the map view's
     * initial location. This location can be specified by the initialLocation
     * property of this map view.
     *
     * @type Boolean
     */
    setMarkerAtInitialLocation: NO,

    /**
     * This property can be used to specify the animation type for this map view's
     * markers. The following three values are possible:
     *
     *   M.MAP_MARKER_ANIMATION_NONE --> no animation
     *   M.MAP_MARKER_ANIMATION_DROP --> the marker drops onto the map
     *   M.MAP_MARKER_ANIMATION_BOUNCE --> the marker constantly bounces
     *
     * @type String
     */
    markerAnimationType: M.MAP_MARKER_ANIMATION_NONE,

    /**
     * This property spacifies whether or not this map has already been initialized.
     *
     * @type Boolean
     */
    isInitialized: NO,

    /**
     * This property specifies whether or not to remove all existing markers on a
     * map update. A map update can either be an automatic update due to content
     * binding or a implicit call of the map view's updateMap() method.
     *
     * @type Boolean
     */
    removeMarkersOnUpdate: YES,

    /**
     * Renders a map view, respectively a map view container.
     *
     * @private
     * @returns {String} The map view's html representation.
     */
    render: function() {
        this.html += '<div data-fullscreen="true" id="' + this.id + '"';
        this.html += !this.isInset ? ' class="ui-listview"' : '';
        this.html += '><div id="' + this.id + '_map"' + this.style() + '></div></div>';

        return this.html;
    },

    /**
     * This method is called if the bound content changed. This content must be
     * an array of M.Location objects or M.MapMarkerView objects. This method
     * will take care of a re-rendering of the map view and all of its bound
     * markers.
     *
     * If M.Location objects are passed, the default settings for map markers
     * of this map view are assigned.
     *
     * Note that you can not use individual click events for your markers if
     * you pass M.Location objects.
     */
    renderUpdate: function() {
        /* get the marker / location objects from content binding */
        var content = eval(this.contentBinding);
        var markers = [];

        /* save a reference to the map */
        var that = this;

        /* if we got locations, transform to markers */
        if(content && content[0] && content[0].type === 'M.Location') {
            _.each(content, function(location) {
                if(location && typeof(location) === 'object' && location.type === 'M.Location') {
                    markers.push(M.MapMarkerView.init({
                        location: location,
                        map: that
                    }));
                }
            });
        /* otherwise check and filter for map markers */
        } else if(content && content[0] && content[0].type === 'M.MapMarkerView') {
            markers = _.select(content, function(marker) {
                return (marker && marker.type === 'M.MapMarkerView')
            })
        }

        /* remove current markers */
        if(this.removeMarkersOnUpdate) {
            this.removeAllMarkers();
        }

        /* add all new markers */
        _.each(markers, function(marker) {
            that.addMarker(marker);
        })
    },

    /**
     * Applies some style-attributes to the map view.
     *
     * @private
     * @returns {String} The maps view's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    },

    /**
     * This method is used to initialize a map view, typically out of a controller.
     * With its options parameter you can set or update almost every parameter of
     * a map view. This allows you to define a map view within your view, but then
     * update its parameters later when you want this view to display a map.
     *
     * The options parameter must be passed as a simple object, containing all of
     * the M.MapView's properties you want to be updated. Such an options object
     * could look like the following:
     *
     *   {
     *     zoomLevel: 12,
     *     mapType: M.MAP_HYBRID,
     *     initialLocation: location
     *   }
     *
     * While all properties of the options parameter can be given as Number, String
     * or a constant value, the location must be a valid M.Location object.
     *
     * @param {Object} options The options for the map view.
     */
    initMap: function(options, isUpdate) {
        if(!this.isInitialized || isUpdate) {
            if(!isUpdate) {
                this.markers = [];
            }
            for(var i in options) {
                 switch (i) {
                     case 'zoomLevel':
                        this[i] = (typeof(options[i]) === 'number' && options[i] > 0) ? (options[i] > 22 ? 22 : options[i]) : this[i];
                        break;
                     case 'mapType':
                        this[i] = (options[i] === M.MAP_ROADMAP || options[i] === M.MAP_HYBRID || options[i] === M.MAP_SATELLITE || options[i] === M.MAP_TERRAIN) ? options[i] : this[i];
                        break;
                     case 'markerAnimationType':
                        this[i] = (options[i] === M.MAP_MARKER_ANIMATION_BOUNCE || options[i] === M.MAP_MARKER_ANIMATION_DROP) ? options[i] : this[i];
                        break;
                     case 'showMapTypeControl':
                     case 'showNavigationControl':
                     case 'showStreetViewControl':
                     case 'isDraggable':
                     case 'setMarkerAtInitialLocation':
                     case 'removeMarkersOnUpdate':
                        this[i] = typeof(options[i]) === 'boolean' ? options[i] : this[i];
                        break;
                     case 'initialLocation':
                        this[i] = (typeof(options[i]) === 'object' && options[i].type === 'M.Location') ? options[i] : this[i];
                        break;
                     default:
                        break;
                 }
            };
            if(isUpdate) {
                if(this.removeMarkersOnUpdate) {
                    this.removeAllMarkers();
                }
                this.map.setOptions({
                    zoom: this.zoomLevel,
                    center: new google.maps.LatLng(this.initialLocation.latitude, this.initialLocation.longitude),
                    mapTypeId: google.maps.MapTypeId[this.mapType],
                    mapTypeControl: this.showMapTypeControl,
                    navigationControl: this.showNavigationControl,
                    streetViewControl: this.showStreetViewControl,
                    draggable: this.isDraggable
                });
            } else {
                this.map = new google.maps.Map($('#' + this.id + '_map')[0], {
                    zoom: this.zoomLevel,
                    center: new google.maps.LatLng(this.initialLocation.latitude, this.initialLocation.longitude),
                    mapTypeId: google.maps.MapTypeId[this.mapType],
                    mapTypeControl: this.showMapTypeControl,
                    navigationControl: this.showNavigationControl,
                    streetViewControl: this.showStreetViewControl,
                    draggable: this.isDraggable
                });
            }

            if(this.setMarkerAtInitialLocation) {
                this.addMarker(M.MapMarkerView.init({
                    location: this.initialLocation
                }));
            }
            
            this.isInitialized = YES;
        } else {
            M.Logger.log('The M.MapView has already been initialized', M.WARN);
        }
    },

    /**
     * This method is used to update a map view, typically out of a controller.
     * With its options parameter you can update or update almost every parameter
     * of a map view. This allows you to define a map view within your view, but
     * then update its parameters later when you want this view to display a map
     * and to update those options over and over again for this map. 
     *
     * The options parameter must be passed as a simple object, containing all of
     * the M.MapView's properties you want to be updated. Such an options object
     * could look like the following:
     *
     *   {
     *     zoomLevel: 12,
     *     mapType: M.MAP_HYBRID,
     *     initialLocation: location
     *   }
     *
     * While all properties of the options parameter can be given as Number, String
     * or a constant value, the location must be a valid M.Location object.
     *
     * @param {Object} options The options for the map view.
     */
    updateMap: function(options) {
        this.initMap(options, YES);
    },

    /**
     * This method can be used to add a marker to the map view. Simply pass a
     * valid M.MapMarkerView object and a map marker is created automatically,
     * displayed on the map and added to this map view's markers property.
     *
     * @param {M.MapMarkerView} marker The marker to be added.
     */
    addMarker: function(marker) {
        if(marker && typeof(marker) === 'object' && marker.type === 'M.MapMarkerView') {
            marker.marker = new google.maps.Marker({
                map: this.map,
                draggable: NO,
                animation: google.maps.Animation[marker.markerAnimationType ? marker.markerAnimationType : this.markerAnimationType],
                position: new google.maps.LatLng(marker.location.latitude, marker.location.longitude)
            });
            google.maps.event.addListener(marker.marker, 'click', function() {
                M.EventDispatcher.onClickEventDidHappen('click', null, null, marker);
            });
            this.markers.push(
                marker
            );
        } else {
            M.Logger.log('No valid M.MapMarkerView passed for addMarker().', M.WARN);
        }
    },

    /**
     * This method can be used to remove a certain marker from the map view. In
     * order to do this, you need to pass the M.MapMarkerView object that you
     * want to be removed from the map view.
     *
     * @param {M.MapMarkerView} marker The marker to be removed.
     */
    removeMarker: function(marker) {
        if(marker && typeof(marker) === 'object' && marker.type === 'M.MapMarkerView') {
            var didRemoveMarker = NO;
            this.markers = _.select(this.markers, function(m) {
                if(marker === m){
                    m.marker.setMap(null);
                    didRemoveMarker = YES;
                }
                return !(marker === m);
            });
            if(!didRemoveMarker) {
                M.Logger.log('No marker found matching the passed marker in removeMarker().', M.WARN);    
            }
        } else {
            M.Logger.log('No valid M.MapMarkerView passed for removeMarker().', M.WARN);
        }
    },

    /**
     * This method removes all markers from this map view. It both cleans up the
     * markers array and deletes the marker's visual representation from the map
     * view.
     */
    removeAllMarkers: function() {
        _.each(this.markers, function(marker) {
            marker.marker.setMap(null);
        });
        this.markers = [];
    }

});