// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype of any tab bar item view. An M.TabBarItemView can only be
 * used as a child view of a tab bar view.
 *
 * @extends M.View
 */
M.TabBarItemView = M.View.extend(
/** @scope M.TabBarItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.TabBarItemView',

    /**
     * Determines whether this TabBarItem is active or not.
     *
     * @type Boolean
     */
    isActive: NO,

    /**
     * This property is used to specify an internal target for an automatically called action. This
     * is used to trigger the switchPage() by clicking on a tab bar item.
     *
     * @type Object
     */
    internalTarget: null,

    /**
     * This property is used to specify an internal action for an automatically called action. This
     * is used to trigger the switchPage() by clicking on a tab bar item.
     *
     * @type Object
     */
    internalAction: 'switchPage',

    /**
     * Renders a tab bar item as a li-element inside of a parent tab bar view.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.html += '<li><a id="' + this.id + '"' + this.style() + ' href="#">' + this.value + '</a></li>';

        this.internalTarget = this;
        
        return this.html;
    },

    /**
     * This method is automatically called if a tab bar item is clicked. It delegates the
     * page switching job to M.Controller's switchToTab().
     */
    switchPage: function() {
        if(this.page) {
            M.Controller.switchToTab(this);
        } else {
            this.parentView.setActiveTab(this);
        }
    },

    /**
     * Applies some style-attributes to the tab bar item.
     *
     * @private
     * @returns {String} The tab bar item's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        if(this.isActive) {
            html += html != '' ? '' : ' class="';
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