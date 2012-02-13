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
     * This property can be used to specify whether or not the dashboard can be re-arranged
     * by a user.
     *
     * @type Boolean
     */
    isEditable: NO,

    /**
     * This property is used internally to indicate whether the dashboard is currently in
     * edit mode or not.
     *
     * @private
     * @type Boolean
     */
    isInEditMode: NO,

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
     * This property is used internally to track the position of touch events.
     *
     * @private
     */
    touchPositions: null,

    /**
     * This property is used internally to know of what type the latest touch events was.
     *
     * @private
     */
    latestTouchEventType: null,

    /**
     * Renders a dashboard.
     *
     * @private
     * @returns {String} The dashboard view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '"' + this.style() + '>';
        this.renderChildViews();
        this.html += '</div>';

        /* clear floating */
        this.html += '<div class="tmp-dashboard-line-clear"></div>';

        /* init the touchPositions property */
        this.touchPositions = {};

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

            /* get the items (if there is something in the LS and it fits the content bound values, use them) */
            this.items = [];
            var items = (values && this.value && values.length == this.value.length) ? this.sortItemsByValues(this.value, values) : this.value;
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
                //html += '<div class="tmp-dashboard-line">';
            }

            /* assign the desired width */
            obj.cssStyle = 'width: ' + 100/this.itemsPerLine + '%';

            /* finally render the dashboard item and add it to the dashboard's html */
            html += obj.render();

            /* is a line finished? */
            if(itemIndex % this.itemsPerLine === this.itemsPerLine - 1) {
                //html += '</div><div class="tmp-dashboard-line-clear"></div>';
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
        /* now first call special handler for this item */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }

        /* now call global tap-event handler (if set) */
        if(this.events && this.events.tap) {
            M.EventDispatcher.callHandler(this.events.tap, event, YES);
        }

        /* now store timestamp for last tap event to kill a possible false taphold event */
        this.latestTapEventTimestamp = +new Date();
    },

    /**
     * This method is automatically called when a taphold event is triggered for one
     * of the dashboard's
     */
    editDashboard: function(id, event, nextEvent) {
        this.touchPositions.touchstart = {};
        if(!this.isEditable || this.latestTapEventTimestamp > +new Date() - 500) {
            return;
        }

        if(this.isInEditMode && event) {
            this.stopEditMode();
        } else if((!this.isInEditMode && event) || (this.isInEditMode && !event)) {
            M.EventDispatcher.unregisterEvents(this.id);
            this.isInEditMode = YES;
            _.each(this.items, function(item) {
                item.addCssClass('rotate' + M.Math.random(1, 2));
                M.EventDispatcher.unregisterEvents(item.id);
                if($.support.touch) {
                    M.EventDispatcher.registerEvent(
                        'touchstart',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editTouchStart'
                        },
                        item.recommendedEvents
                    );
                    M.EventDispatcher.registerEvent(
                        'touchend',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editTouchEnd'
                        },
                        item.recommendedEvents
                    );
                    M.EventDispatcher.registerEvent(
                        'touchmove',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editTouchMove'
                        },
                        item.recommendedEvents
                    );
                } else {
                    M.EventDispatcher.registerEvent(
                        'mousedown',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editMouseDown'
                        },
                        item.recommendedEvents
                    );
                    M.EventDispatcher.registerEvent(
                        'mouseup',
                        item.id,
                        {
                            target: item.parentView,
                            action: 'editMouseUp'
                        },
                        item.recommendedEvents
                    );
                }
            });
        }
    },

    stopEditMode: function() {
        this.isInEditMode = NO;
        _.each(this.items, function(item) {
            item.removeCssClass('rotate1');
            item.removeCssClass('rotate2');
            M.EventDispatcher.unregisterEvents(item.id);
            item.registerEvents();
        });
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
    },

    editTouchStart: function(id, event) {
        this.latestTouchEventType = 'touchstart';
        var latest = event.originalEvent ? (event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : null) : null;
        
        this.touchPositions.touchstart = {
            x: latest.clientX,
            y: latest.clientY,
            date: +new Date()
        };

        var that = this;
        window.setTimeout(function() {
            if(that.latestTouchEventType === 'touchstart') {
                that.stopEditMode();
            }
        }, 750);
    },

    editTouchMove: function(id, event) {
        this.latestTouchEventType = 'touchmove';
        var latest = event.originalEvent ? (event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : null) : null;

        if(latest) {
            var left = latest.pageX - parseInt($('#' + id).css('width')) / 2;
            var top = latest.pageY - parseInt($('#' + id).css('height')) / 2;
            $('#' + id).css('position', 'absolute');
            $('#' + id).css('left', left + 'px');
            $('#' + id).css('top', top + 'px');

            /* if end event is within certain radius of start event and it took a certain time, and editing */
            /*if(this.touchPositions.touchstart) {
                if(this.touchPositions.touchstart.date < +new Date() - 1500) {
                    if(Math.abs(this.touchPositions.touchstart.x - latest.clientX) < 30 && Math.abs(this.touchPositions.touchstart.y - latest.clientY) < 30) {
                        this.stopEditMode();
                        this.editTouchEnd(id, event);
                    }
                }
            }*/
        }
    },

    editTouchEnd: function(id, event) {
        this.latestTouchEventType = 'touchend';
        var latest = event.originalEvent ? (event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : null) : null;
        
        if(event.currentTarget.id) {
            var items = [];
            _.each(this.items, function(item) {
                items.push({
                    id: item.id,
                    x: $('#' + item.id).position().left,
                    y: $('#' + item.id).position().top,
                    item: item
                });
                items.sort(function(a, b) {
                    /* assume they are in one row */
                    if(Math.abs(a.y - b.y) < 30) {
                        if(a.x < b.x) {
                            return -1;
                        } else {
                            return 1;
                        }
                    /* otherwise */
                    } else {
                        if(a.y < b.y) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
            });
            var objs = [];
            _.each(items, function(item) {
                objs.push(item.item);
            });
            this.setValue(objs);
            this.renderUpdate();

            if(this.isInEditMode) {
                this.editDashboard();
            }
        }
    },

    editMouseDown: function(id, event) {
        this.latestTouchEventType = 'mousedown';

        this.touchPositions.touchstart = {
            x: event.clientX,
            y: event.clientY,
            date: +new Date()
        };

        /* enable mouse move for selected item */
        M.EventDispatcher.registerEvent(
            'mousemove',
            id,
            {
                target: this,
                action: 'editMouseMove'
            },
            M.ViewManager.getViewById(id).recommendedEvents
        );

        var that = this;
        window.setTimeout(function() {
            if(that.latestTouchEventType === 'mousedown') {
                that.stopEditMode();
            }
        }, 750);
    },

    editMouseMove: function(id, event) {
        this.latestTouchEventType = 'mousemove';

        var left = event.pageX - parseInt($('#' + id).css('width')) / 2;
        var top = event.pageY - parseInt($('#' + id).css('height')) / 2;
        $('#' + id).css('position', 'absolute');
        $('#' + id).css('left', left + 'px');
        $('#' + id).css('top', top + 'px');

        /* if end event is within certain radius of start event and it took a certain time, and editing */
        /*if(this.touchPositions.touchstart) {
            if(this.touchPositions.touchstart.date < +new Date() - 1500) {
                if(Math.abs(this.touchPositions.touchstart.x - latest.clientX) < 30 && Math.abs(this.touchPositions.touchstart.y - latest.clientY) < 30) {
                    this.stopEditMode();
                    this.editTouchEnd(id, event);
                }
            }
        }*/
    },

    editMouseUp: function(id, event) {
        this.latestTouchEventType = 'mouseup';

        if(event.currentTarget.id) {
            var items = [];
            _.each(this.items, function(item) {

                /* disable mouse move for all item */
                M.EventDispatcher.unregisterEvent('mousemove', item.id);

                items.push({
                    id: item.id,
                    x: $('#' + item.id).position().left,
                    y: $('#' + item.id).position().top,
                    item: item
                });
                items.sort(function(a, b) {
                    /* assume they are in one row */
                    if(Math.abs(a.y - b.y) < 30) {
                        if(a.x < b.x) {
                            return -1;
                        } else {
                            return 1;
                        }
                    /* otherwise */
                    } else {
                        if(a.y < b.y) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
            });
            var objs = [];
            _.each(items, function(item) {
                objs.push(item.item);
            });
            this.setValue(objs);
            this.renderUpdate();

            if(this.isInEditMode) {
                this.editDashboard();
            }
        }
    },

    /**
     * Applies some style-attributes to the dashboard view.
     *
     * @private
     * @returns {String} The dashboard's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="tmp-dashboard ' + this.cssClass + '"';
        }
        return html;
    }

});