// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for the map's marker animation type: none
 *
 * @type String
 */
M.MAP_MARKER_ANIMATION_NONE = 'NONE';

/**
 * A constant value for the map's marker animation type: drop
 *
 * @type String
 */
M.MAP_MARKER_ANIMATION_DROP = 'DROP';

/**
 * A constant value for the map's marker animation type: bounce
 *
 * @type String
 */
M.MAP_MARKER_ANIMATION_BOUNCE = 'BOUNCE';

/**
 * @class
 *
 * M.MapMarkerView is the prototype of a map marker view. It defines a set
 * of methods for adding, removing and managing the markers of a M.MapView.
 *
 * The M.MapMarkerView is based on google maps markers.
 *
 * @extends M.View
 */
M.MapMarkerView = M.View.extend(
/** @scope M.MapMarkerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.MapMarkerView',

    /**
     * This property is used to save a reference to the actual google map marker.
     * It is set automatically when the map marker is firstly initialized.
     *
     * @type Object
     */
    marker: null,

    /**
     * This property contains a reference to the marker's map view.
     *
     * @type M.MapView
     */
    map: null,

    /**
     * This property specifies whether the marker is draggable or not. If set
     * to NO, a user won't be able to move the marker. For further information
     * see the google maps API specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MarkerOptions
     *
     * @type Boolean
     */
    isDraggable: NO,

    /**
     * This property specifies the location for this map marker view, as an M.Location
     * object. Its latitude and longitude properties are directly mapped to the position
     * property of a google maps marker. For further information see the google maps API
     * specification:
     *
     *   http://code.google.com/intl/de-DE/apis/maps/documentation/javascript/reference.html#MarkerOptions
     *
     * @type M.Location
     */
    location: M.Location.extend({
        latitude: 48.813338,
        longitude: 9.178463
    }),

    /**
     * This property can be used to specify the animation type for this map marker
     * view. if this property is set, the markerAnimationType property of the parent
     * map view is ignored. The following three values are possible:
     *
     *   M.MAP_MARKER_ANIMATION_NONE --> no animation
     *   M.MAP_MARKER_ANIMATION_DROP --> the marker drops onto the map
     *   M.MAP_MARKER_ANIMATION_BOUNCE --> the marker constantly bounces
     *
     * @type String
     */
    markerAnimationType: null,

    /**
     * This method initializes an M.MapMarkerView. It pushes a map marker directly onto
     * the parent map view and returns the created M.MapMarkerView object.
     */
    init: function(options) {
        return this.extend(options);
    }

});