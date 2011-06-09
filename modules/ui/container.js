// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      01.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * A container view renders a simple div container that can be used to display
 * any html valid content, e.g. by third party frameworks.
 *
 * @extends M.View
 */
M.ContainerView = M.View.extend(
/** @scope M.ContainerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ContainerView',

    /**
     * Renders a simple div container and applies css classes if specified.
     *
     * @private
     * @returns {String} The container view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Applies some style-attributes to the container view.
     *
     * @private
     * @returns {String} The container's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});