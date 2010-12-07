// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for ScrollViews.
 *
 */
M.ScrollView = M.View.extend(
/** @scope M.ScrollView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ScrollView',

    /**
     * Renders in three steps:
     * 1. Rendering Opening div tag with corresponding data-role
     * 2. Triggering render process of child views
     * 3. Rendering closing tag
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-role="content">';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * This method triggers the styling of the scrollview and its subviews.
     */
    theme: function() {
        $('#' + this.id).page();
        this.themeChildViews();
    }

});