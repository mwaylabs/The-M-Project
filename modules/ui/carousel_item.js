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
 * A carousel item view is the one and only valid sub view of a carousel view. It basically
 * serves as a container that allows you to put anything into such an element. Simply
 * apply as much child views as you like and let this view (in combination with the carousel)
 * take care of the rest.
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
     * This property can be used to specify a tag, that is independent from the carousel
     * item's content. This allows you to identify a carousel item e.g. within the callback
     * of the carousel's change event.
     *
     * @type String
     */
    tag: null,

    /**
     * This method renders a carousel item and its content with an li element as the
     * surrounding element.
     *
     * @private
     * @returns {String} The carousel item view's html representation.
     */
    render: function() {
        this.html = '<li id="' + this.id + '" class="tmp-carousel-item">';

        this.renderChildViews();

        this.html += '</li>';

        return this.html;
    }

});