// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for the anchor location: top.
 *
 * @type String
 */
M.TOP = 'header';

/**
 * A constant value for the anchor location: bottom.
 *
 * @type String
 */
M.BOTTOM = 'footer';

/**
 * A constant value for the anchor location: left.
 *
 * @type Number
 */
M.LEFT = 0;

/**
 * A constant value for the anchor location: center.
 *
 * @type Number
 */
M.CENTER = 1;

/**
 * A constant value for the anchor location: right.
 *
 * @type Number
 */
M.RIGHT = 2;

/**
 * @class
 *
 * The root object for ToolbarViews.
 *
 * @extends M.View
 */
M.ToolbarView = M.View.extend(
/** @scope M.ToolbarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ToolbarView',

     /**
     * Defines the position of the TabBar. Possible values are:
     *
     * - M.BOTTOM => is a footer bar
     * - M.TOP => is a header bar
     *
     * @type String
     */
    anchorLocation: M.TOP,

    /**
     * Determines whether to display an auto-generated back-button on the left side
     * of the toolbar view or not.
     *
     * @type Boolean
     */
    showBackButton: NO,

    /**
     * Renders a toolbar as a div tag with corresponding data-role attribute and inner
     * h1 child tag (representing the title of the header)
     *
     * @private
     * @returns {String} The toolbar view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-nobackbtn="' + !this.showBackButton + '" data-role="' + this.anchorLocation + '" data-position="fixed">';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Triggers render() on all children or simply display the value as a label,
     * if it is set.
     */
    renderChildViews: function() {
        if(this.value) {
            this.html += '<h1>' + this.value + '</h1>';
        } else if (this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');

            /* A ToolbarView accepts only 3 childViews, one for each location: left, center, right */
            if(childViews.length > 3) {
                M.Logger.log('To many childViews defined for toolbarView.', M.WARN);
                return;
            }

            for(var i in childViews) {
                var view = this[childViews[i]];
                switch (view.anchorLocation) {
                    case M.LEFT:
                        this.html += '<div class="ui-btn-left">';
                        this.html += view.render();
                        this.html += '</div>';
                        break;
                    case M.CENTER:
                        this.html += '<h1>';
                        this.html += view.render();
                        this.html += '</h1>';
                        break;
                    case M.RIGHT:
                        this.html += '<div class="ui-btn-right">';
                        this.html += view.render();
                        this.html += '</div>';
                        break;
                }
            }
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the button.
     *
     * @private
     */
    theme: function() {
        this.themeChildViews();
    }
    
});