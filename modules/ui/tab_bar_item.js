// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * Renders a tab bar item as a li-element inside of a parent tab bar view.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.html = '';
        if(this.id.lastIndexOf('_') == 1) {
            this.id = this.id + '_' + this.parentView.usageCounter;
        } else {
            this.id = this.id.substring(0, this.id.lastIndexOf('_')) + '_' + this.parentView.usageCounter;
        }
        M.ViewManager.register(this);

        this.html += '<li><a id="' + this.id + '"' + this.style() + ' href="#">' + this.value + '</a></li>';
        
        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for tab bar item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            tap: {
                target: this,
                action: 'switchPage'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * This method is automatically called if a tab bar item is clicked. It delegates the
     * page switching job to M.Controller's switchToTab().
     */
    switchPage: function() {
        if(this.page) {
        	M.ViewManager.setCurrentPage(M.ViewManager.getPage(this.page));
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