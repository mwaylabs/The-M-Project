// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c)2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for TabBarItemViews.
 *
 */
M.TabBarItemView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.TabBarItemView',

    /**
     * Determines whether this TabBarItem is active or not.
     *
     * @property {Boolean}
     */
    isActive: NO,

    internalTarget: null,

    internalAction: 'switchPage',

    parentView: null,

    render: function() {
        this.html += '<li><a id="' + this.id + '"' + this.style() + ' href="#">' + this.value + '</a></li>';

        this.internalTarget = this;
        
        return this.html;
    },

    switchPage: function() {
        M.Controller.switchToPage(eval(this['page']));
    },

    /**
     * Applies some style-attributes to the label.
     */
    style: function() {
        var html = '';
        if(this.isActive) {
            html += ' class="';
            html += 'ui-btn-active';
            html += '"';
        }
        if(this.icon) {
            html += ' data-icon="';
            html += this.icon;
            html += '" data-iconpos="top"';
        }
        return html;
    }
    
});