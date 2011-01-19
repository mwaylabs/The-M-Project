// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
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
     * Renders an image view based on the specified layout.
     *
     * @private
     * @returns {String} The image view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<img id="' + this.id + '" src="' + this.value + '"' + this.style() + '>';
        return this.html;
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
    }

});