// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   dominik
// Date:      10.04.12
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * Lorem Ipsum Dolor Sit Amet...
 *
 * @extends M.View
 */
M.CarouselItemView = M.View.extend(
/** @scope M.CarouselItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.CarouselItemView',

    /**
     * Lorem Ipsum Dolor Sit Amet
     *
     * @private
     * @returns {String} The carousel view's html representation.
     */
    render: function() {
        this.html = '<li id="' + this.id + '" class="tmp-carousel-item">';

        this.renderChildViews();

        this.html += '</li>';

        return this.html;
    }

});