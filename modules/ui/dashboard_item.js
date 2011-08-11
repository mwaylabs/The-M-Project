// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.08.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * A dashboard itm view contains an icon and a label and can be used as the only
 * kind of childviews for a dashboard view.
 *
 * @extends M.View
 */
M.DashboardItemView = M.View.extend(
/** @scope M.DashboardItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DashboardItemView',

    /**
     * The path/url to the dashboard item's icon.
     *
     * @type String
     */
    icon: null,

    /**
     * The label for the dashboard item. If no label is specified, the value will be
     * displayed instead.
     *
     * @type String
     */
    label: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap', 'taphold', 'touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup'],

    /**
     * Renders a dashboard item.
     *
     * @private
     * @returns {String} The dashboard item view's html representation.
     */
    render: function() {
        //this.computeValue();

        /* reset html property */
        this.html = '';

        if(!this.icon) {
            M.Logger.log('Please provide an icon for a dashboard item view!', M.WARN);
            return this.html;
        }

        this.html += '<div id="' + this.id + '" class="tmp-dashboard-item" ' + this.style() + '>';

        /* add image */
        var image = M.ImageView.design({
            value: this.icon
        });
        this.html += image.render();

        /* add label */
        this.html += '<div class="tmp-dashboard-item-label">' + (this.label ? this.label : this.value) + '</div>';

        this.html += '</div>';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            taphold: {
                target: this.parentView,
                action: 'editDashboard'
            },
            tap: {
                target: this.parentView,
                action: 'dispatchTapEvent'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * Applies some style-attributes to the dashboard item.
     *
     * @private
     * @returns {String} The button's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssStyle) {
            html += 'style="' + this.cssStyle + '"';
        }
        return html;
    }

});