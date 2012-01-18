// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   dominik
// Date:      28.10.11
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This is the prototype of any canvas view. It basically renders a simple canvas
 * tag into the DOM. Additionally it offers some wrappers for canvas-based methods,
 * but mostly you will just use this view for the first rendering of the canvas
 * element and then work on the dom element itself.
 *
 * @extends M.View
 */
M.CanvasView = M.View.extend(
/** @scope M.CanvasView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.CanvasView',

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['tap'],

    /**
     * This method simply renders a canvas view as a html canvas element.
     *
     * @private
     * @returns {String} The image view's styling as html representation.
     */
    render: function() {
        this.html += '<canvas id="' + this.id + '" ></canvas>';

        return this.html;
    },

    /**
     * Updates the canvas (e.g. with content binding).
     *
     * @private
     */
    renderUpdate: function() {
        // nothing so far...
    },

    /**
     * This method returns the canvas' DOM representation.
     *
     * @returns {Object} The canvas' DOM representation.
     */
    getCanvas: function() {
        return $('#' + this.id).get(0);
    },

    /**
     * This method returns the canvas' context.
     *
     * @param {String} type The context tyoe to return.
     * @returns {Object} The canvas' context.
     */
    getContext: function(type) {
        return $('#' + this.id).get(0).getContext(type);
    },

    /**
     * This method sets the canvas' size.
     *
     * @param {Number} width The width to be applied to the canvas view.
     * @param {Number} height The height to be applied to the canvas view.
     */
    setSize: function(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    },

    /**
     * This method sets the canvas' width.
     *
     * @param {Number} width The width to be applied to the canvas view.
     */
    setWidth: function(width) {
        $('#' + this.id).get(0).width = width;
    },

    /**
     * This method returns the canvas' width.
     *
     * @returns {Number} The canvas' width.
     */
    getWidth: function() {
        return $('#' + this.id).get(0).width;
    },

    /**
     * This method sets the canvas' height.
     *
     * @param {Number} height The height to be applied to the canvas view.
     */
    setHeight: function(height) {
        $('#' + this.id).get(0).height = height;
    },

    /**
     * This method returns the canvas' height.
     *
     * @returns {Number} The canvas' height.
     */
    getHeight: function() {
        return $('#' + this.id).get(0).height;
    }

});