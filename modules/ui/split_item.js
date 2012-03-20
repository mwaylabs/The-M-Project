// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      17.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for any button view. A button is a view element that is
 * typically.........
 *
 * @extends M.View
 */
M.SplitItemView = M.View.extend(
/** @scope M.SplitItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SplitItemView',

    /**
     * Renders a split view.
     *
     * @private
     * @returns {String} The split view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '">';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Render update.
     *
     * @private
     */
    renderUpdate: function() {
        // ...
    },

    /**
     * Theme.
     *
     * @private
     */
    theme: function() {
        // ...
    }

});