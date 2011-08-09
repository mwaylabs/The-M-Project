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
 * A dashboard view displays images and a corresponding text in a grid-like view
 * and serves as the homescreen of an application. By tapping on of the icons, a
 * user can access certain features of an app. By default, there are three icons
 * in a row and three rows per page possible. But you can easily adjust this to
 * your custom needs.
 *
 * @extends M.View
 */
M.DashboardView = M.View.extend(
/** @scope M.DashboardView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DashboardView',

    /**
     * This property can be used to customize the number of items a dashboard
     * shows per line. By default this is set to three.
     * 
     * @type Number
     */
    itemsPerLine: 3,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * This property is used internally for storing the items of a dashboard, when using
     * the content binding feature.
     *
     * @private
     */
    items: [],

    /**
     * Renders a dashboard.
     *
     * @private
     * @returns {String} The dashboard view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" class="tmp-dashboard">';
        this.renderChildViews();
        this.html += '</div>';

        return this.html;
    },

    renderChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();

            /* lets gather the html together */
            for(var i in childViews) {
                /* set the dashboard item's _name and parentView property */
                this[childViews[i]].parentView = this;
                this[childViews[i]]._name = childViews[i];

                this.html += this.renderDashboardItemView(this[childViews[i]], i);
            }
        }
    },

    renderUpdate: function() {
        if(this.contentBinding) {
            this.items = [];
            var items = this.value;
            var html = '';

            /* lets gather the html together */
            for(var i in items) {
                html += this.renderDashboardItemView(items[i], i);
            }

            /* add the items to the DOM */
            this.addItems(html);

            /* now the items are in DOM, finally register events */
            for(var i in this.items) {
                this.items[i].registerEvents();
            }
        }
    },

    /**
     * This method adds a given html string, contain the dasboard's items, to the DOM.
     *
     * @param {String} item The html representation of the dashboard items to be added.
     */
    addItems: function(items) {
        $('#' + this.id).append(items);
    },

    renderDashboardItemView: function(item, itemIndex) {
        if(item && item.value && item.icon) {
            var obj = item.type === 'M.DashboardItemView' ? item : M.DashboardItemView.design({
                value: item.value ? item.value : '',
                icon: item.icon ? item.icon : '',
                label: item.label ? item.label : (item.value ? item.value : ''),
                parentView: this,
                events: item.events
            });
            var html = '';

            /* add item to array for later use */
            this.items.push(obj);

            /* is new line starting? */
            if(itemIndex % this.itemsPerLine === 0) {
                html += '<div class="tmp-dashboard-line">';
            }

            /* assign the desired width */
            obj.cssStyle = 'width: ' + 100/this.itemsPerLine + '%';

            /* finally render the dashboard item and add it to the dashboard's html */
            html += obj.render();

            /* is a line finished? */
            if(itemIndex % this.itemsPerLine === this.itemsPerLine - 1) {
                html += '</div><div class="tmp-dashboard-line-clear"></div>';
            }

            /* return the html */
            return html;
        } else {
            M.Logger.log('Childview of dashboard is no valid dashboard item.', M.WARN);
        }
    }

});