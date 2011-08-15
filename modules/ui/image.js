// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The is the prototype of any image view. It basically renders a simple image and
 * can be styled using a css class.
 *
 * @extends M.View
 */
M.ImageView = M.View.extend(
/** @scope M.ImageView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ImageView',

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap', 'error', 'load'],

    /**
     * Renders an image view based on the specified layout.
     *
     * @private
     * @returns {String} The image view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<img id="' + this.id + '" src="' + (this.value && typeof(this.value) === 'string' ? this.value : '') + '"' + this.style() + '>';
        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for image views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            error: {
                target: this,
                action: 'sourceIsInvalid'
            },
            load: {
                target: this,
                action: 'sourceIsValid'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },


    /**
     * Updates the value of the label with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        $('#' + this.id).attr('src', this.value);
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the image.
     *
     * @private
     */
    theme: function() {
    },
    
    /**
     * Applies some style-attributes to the image view.
     *
     * @private
     * @returns {String} The image view's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    },

    sourceIsInvalid: function(id, event, nextEvent) {
        M.Logger.log('The source \'' + this.value + '\' is invalid, so we hide the image!', M.WARN);
        $('#' + this.id).hide();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    sourceIsValid: function(id, event, nextEvent) {
        $('#' + this.id).show();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    }

});