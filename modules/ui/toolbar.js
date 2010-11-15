// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

M.TOP = 'header';
M.BOTTOM = 'footer';
M.LEFT = 0;
M.CENTER = 1;
M.RIGHT = 2;

/**
 * @class
 *
 * The root object for ToolbarViews.
 *
 */
M.ToolbarView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ToolbarView',

    /**
     * Mapping to value attribute.
     * text property is mixed in when extended.
     */
    //value: this.text,

     /**
     * Defines the position of the Toolbar.
     *
     * default: M.TOP => is a header bar
     *
     * @property {String}
     */
    anchorLocation: M.TOP,

    /**
     * Renders a toolbar as a div tag with corresponding data-role attribute and inner h1 child tag
     * (representing the title of the header)
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-role="' + this.anchorLocation + '" data-position="fixed">';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    renderUpdate: function() {
        $('#' + this.id + ' h1').html(this.value);
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
     * This method triggers the styling of the toolbar and its subviews.
     */
    theme: function() {
        this.themeChildViews();
    }
    
});