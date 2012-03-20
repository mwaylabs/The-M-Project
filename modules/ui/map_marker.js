// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property can be used to store additional information about a marker.
     * Since this property is an object, you can store pretty much anything in
     * this property.
     *
     * This can be useful especially if you are using the click event for map
     * markers. So you can store any information with a marker and retrieve
     * this information on the click event.
     *
     * @type Object
     */
    data: null,

    /**
     * This property contains a reference to the marker's map view.
     *
     * @type M.MapView
     */
    map: null,

    /**
     * This property specifies the title of a map marker view. It can be used in
     * an annotation.
     *
     * @type String
     */
    title: null,

    /**
     * This property specifies the message of a map marker view respectively for
     * its annotation.
     *
     * @type String
     */
    message: null,

    /**
     * This property can be used to specify whether or not to show the annotation,
     * if title and / or message are defined, automatically on click event.
     *
     * @type Boolean
     */
    showAnnotationOnClick: NO,

    /**
     * This property contains a reference to a google maps info window that is
     * connected to this map marker. By calling either the showAnnotation() or
     * the hideAnnotation() method, this info window can be toggled.
     *
     * Additionally the info window will be automatically set to visible if the
     * showAnnotationOnClick property is set to YES.
     *
     * @type Object
     */
    annotation: null,

    /**
     * This property specifies whether the marker is draggable or not. If set
     * to NO, a user won't be able to move the marker. For further information
     * see the google maps API specification:
     *
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MarkerOptions
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
     *   http://code.google.com/intl/en-US/apis/maps/documentation/javascript/reference.html#MarkerOptions
     *
     * @type M.Location
     */
    location: M.Location.extend({
        latitude: 48.813338,
        longitude: 9.178463
    }),

    /**
     * This property can be used to specify the animation type for this map marker
     * view. If this property is set, the markerAnimationType property of the parent
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
     * This property can be used to specify a custom marker icon. Simply pass a valid
     * path to an image and it will be shown instead of google's default marker.
     *
     * @type String
     */
    icon: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * This method initializes an M.MapMarkerView. It connects a map marker directly with
     * the parent map view and returns the created M.MapMarkerView object.
     *
     * Note: By calling this method, the map marker won't be displayed on the map. It only gets
     * initialized and can no be displayed by using the map view's addMarker() method or via
     * content binding.
     *
     * @param {Object} options The options for the map marker view.
     */
    init: function(options) {
        var marker = this.extend(options);

        if(marker.annotation || marker.message) {
            var content = marker.title ? '<h1 class="ui-annotation-header">' + marker.title + '</h1>' : '';
            content += marker.message ? '<p class="ui-annotation-message">' + marker.message + '</p>' : '';
            
            marker.annotation = new google.maps.InfoWindow({
                content: content,
                maxWidth: 100
            });
        }

        return marker;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            tap: {
                target: this,
                action: 'showAnnotation'
            }
        }

        var that = this;
        google.maps.event.addListener(this.marker, 'click', function() {
            M.EventDispatcher.callHandler(that.internalEvents.tap, event, YES);
        });
    },

    /**
     * This method can be used to remove a map marker from a map view.
     */
    remove: function() {
        this.map.removeMarker(this);
    },

    /**
     * This method can be used to show a map markers annotation.
     */
    showAnnotation: function(id, event, nextEvent) {
        if(this.annotation) {
            this.annotation.open(this.map.map, this.marker);
        }

        /* delegate event to external handler, if specified */
        if(this.events || this.map.events) {
            var events = this.events ? this.events : this.map.events;
            for(var e in events) {
                if(e === ((event.type === 'click' || event.type === 'touchend') ? 'tap' : event.type)) {
                    M.EventDispatcher.callHandler(events[e], event, NO, [this]);
                }
            }
        }
    }

});