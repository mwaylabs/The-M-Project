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
     * This property is used internally to indicate whether the dashboard is currently in
     * edit mode or not.
     *
     * @private
     */
    isInEditMode: NO,

    /**
     * This property is used internally to capture the tap event following the taphold event
     * that initializes the edit mode. Once the 'ghosttap' is done, we set this to YES. The
     * next tap will now end the edit mode.
     *
     * @private
     */
    captureNextTap: NO,

    /**
     * This property defines the dashboard's name. This is used internally to identify
     * the dashboard inside the DOM.
     *
     * Note: If you are using more than one dashboard inside your application, make sure
     * you provide different names.
     *
     * @type String
     */
    name: 'dashboard',

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
            this.removeAllItems();

            /* do we have something in locale storage? */
            var values = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'dashboard');
            values = values ? JSON.parse(values) : null;

            this.items = [];
            var items = values ? this.sortItemsByValues(this.value, values) : this.value;
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

    /**
     * This method removes all of the dashboard view's items by removing all of its content in the DOM. This
     * method is based on jQuery's empty().
     */
    removeAllItems: function() {
        $('#' + this.id).empty();
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
    },

    /**
     * This method is used internally for dispatching the tap event for a dashboard view. If the
     * dashboard view is in edit mode, we do not dispatch the event to the application.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     *
     * @private
     */
    dispatchTapEvent: function(id, event, nextEvent) {
        /* delegate event to external handler, if specified */
        if(!this.isInEditMode && !this.captureNextTap) {
            /* now first call special handler for this item */
            if(nextEvent) {
                M.EventDispatcher.callHandler(nextEvent, event, YES);
            }

            /* now call global tap-event handler (if set) */
            if(this.events && this.events.tap) {
                M.EventDispatcher.callHandler(this.events.tap, event, YES);
            }
        } else if(!this.isInEditMode && this.captureNextTap) {
            this.captureNextTap = NO;
            this.registerEvents();
            _.each(this.items, function(item) {
                item.registerEvents();
            });
        } else if(this.isInEditMode && this.captureNextTap) {
            this.captureNextTap = NO;
        }
    },

    /**
     * This method is automatically called when a taphold event is triggered for one
     * of the dashboard's
     */
    editDashboard: function(id, event, nextEvent) {
        if(this.isInEditMode && event) {
            this.stopEditMode();
        } else if((!this.isInEditMode && event) || (this.isInEditMode && !event)) {
            M.EventDispatcher.unregisterEvents(this.id);
            this.isInEditMode = YES;
            this.captureNextTap = YES;
            _.each(this.items, function(item) {
                item.addCssClass('rotating');
                M.EventDispatcher.unregisterEvents(item.id);
                M.EventDispatcher.registerEvent(
                    'taphold',
                    item.id,
                    {
                        target: item.parentView,
                        action: 'stopEditMode'
                    }
                );
                $('#' + item.id).touch({
                    animate: true,
                    sticky: true,
                    dragx: true,
                    dragy: true,
                    rotate: false,
                    resort: true,
                    scale: false
                });
            });
        }
    },

    stopEditMode: function() {
        this.isInEditMode = NO;
        _.each(this.items, function(item) {
            item.removeCssClass('rotating');
            $('#' + item.id).touch({
                animate: false,
                sticky: false,
                dragx: false,
                dragy: false,
                rotate: false,
                resort: false,
                scale: false
            });
        });
        this.captureNextTap = NO;
    },

    setValue: function(items) {
        this.value = items;
        var values = [];
        _.each(items, function(item) {
            values.push(item.value);
        });
        if(localStorage) {
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'dashboard', JSON.stringify(values));
        }
    },

    sortItemsByValues: function(items, values) {
        var itemsSorted = [];
        _.each(values, function(value) {
            _.each(items, function(item) {
                if(item.value === value) {
                    itemsSorted.push(item);
                }
            });
        });
        return itemsSorted;
    }

});