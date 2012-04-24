// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.PageView is the prototype of any page. It is the seconds 'highest' view, right after
 * M.Application. A page is the container view for all other views.
 *
 * @extends M.View
 */
M.PageView = M.View.extend(
/** @scope M.PageView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PageView',

    /**
     * States whether a page is loaded the first time or not. It is automatically set to NO
     * once the page was first loaded.
     *
     * @type Boolean
     */
    isFirstLoad: YES,

    /**
     * Indicates whether the page has a tab bar or not.
     *
     * @type Boolean
     */
    hasTabBarView: NO,

    /**
     * The page's tab bar.
     *
     * @type M.TabBarView
     */
    tabBarView: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['pagebeforeshow', 'pageshow', 'pagebeforehide', 'pagehide', 'orientationdidchange'],

    /**
     * This property is used to specify a view's internal events and their corresponding actions. If
     * there are external handlers specified for the same event, the internal handler is called first.
     *
     * @type Object
     */
    internalEvents: null,

    /**
     * An associative array containing all list views used in this page. The key for a list view is
     * its id. We do this to have direct access to a list view, so we can reset its selected item
     * once the page was hidden.
     *
     * @type Object
     */
    listList: null,

    /**
     * This property contains the page's current orientation. This property is only used internally!
     *
     * @private
     * @type Number
     */
    orientation: null,

    /**
     * Renders in three steps:
     * 1. Rendering Opening div tag with corresponding data-role
     * 2. Triggering render process of child views
     * 3. Rendering closing tag
     *
     * @private
     * @returns {String} The page view's html representation.
     */
    render: function() {
        /* store the currently rendered page as a reference for use in child views */
        M.ViewManager.currentlyRenderedPage = this;
        
        this.html += '<div id="' + this.id + '" data-role="page"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        this.writeToDOM();
        this.theme();
        this.registerEvents();
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for page views and its
     * internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            pagebeforeshow: {
                target: this,
                action: 'pageWillLoad'
            },
            pageshow: {
                target: this,
                action: 'pageDidLoad'
            },
            pagebeforehide: {
                target: this,
                action: 'pageWillHide'
            },
            pagehide: {
                target: this,
                action: 'pageDidHide'
            },
            orientationdidchange: {
                target: this,
                action: 'orientationDidChange'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * This method writes the view's html string into the DOM. M.Page is the only view that does
     * that. All other views just deliver their html representation to a page view.
     */
    writeToDOM: function() {
        document.write(this.html);
    },

    /**
     * This method is called right before the page is loaded. If a beforeLoad-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageWillLoad: function(id, event, nextEvent) {
        /* initialize the tabbar */
        if(M.Application.isFirstLoad) {
            M.Application.isFirstLoad = NO;
            var currentPage = M.ViewManager.getCurrentPage();
            if(currentPage && currentPage.hasTabBarView) {
                var tabBarView = currentPage.tabBarView;

                if(tabBarView.childViews) {
                    var childViews = tabBarView.getChildViewsAsArray();
                    for(var i in childViews) {
                        if(M.ViewManager.getPage(tabBarView[childViews[i]].page).id === currentPage.id) {
                            tabBarView.setActiveTab(tabBarView[childViews[i]]);
                        }
                    }
                }
            }
        }

        /* initialize the loader for later use (if not already done) */
        if(M.LoaderView) {
            M.LoaderView.initialize();
        }

        /* call controlgroup plugin on any such element on the page */
        $('#' + id).find('[data-role="controlgroup"]').each(function() {
            var that = this;
            window.setTimeout(function() {
                $(that).controlgroup();
            }, 1);
        });

        /* reset the page's title */
        document.title = M.Application.name;

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }
    },

    /**
     * This method is called right after the page was loaded. If a onLoad-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageDidLoad: function(id, event, nextEvent) {
        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }

        /* call controlgroup plugin on any such element on the page */
//        $('#' + id).find('[data-role="controlgroup"]').each(function() {
//            $(this).controlgroup();
//        });

        this.isFirstLoad = NO;
    },

    /**
     * This method is called right before the page is hidden. If a beforeHide-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageWillHide: function(id, event, nextEvent) {
        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }
    },

    /**
     * This method is called right after the page was hidden. If a onHide-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    pageDidHide: function(id, event, nextEvent) {
        /* if there is a list on the page, reset it: deactivate possible active list items */
        if(this.listList) {
            _.each(this.listList, function(list) {
                list.resetActiveListItem();
            });
        }

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.isFirstLoad]);
        }
    },

    /**
     * This method is called right after the device's orientation did change. If a action for
     * orientationdidchange is defined for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    orientationDidChange: function(id, event, nextEvent) {
        /* get the orientation */
        var orientation = M.Environment.getOrientation();
        
        /* filter event duplicates (can happen due to event delegation in bootstraping.js) */
        if(orientation === this.orientation) {
            return;
        }

        /* auto-reposition opened dialogs */
        $('.tmp-dialog').each(function() {
            var id = $(this).attr('id');
            var dialog = M.ViewManager.getViewById(id);
            var dialogDOM = $(this);
            window.setTimeout(function() {
                dialog.positionDialog(dialogDOM);
                dialog.positionBackground($('.tmp-dialog-background'));
            }, 500);
        });

        /* auto-reposition carousels */
        $('#' + this.id + ' .tmp-carousel-wrapper').each(function() {
            var carousel = M.ViewManager.getViewById($(this).attr('id'));
            carousel.orientationDidChange();
        });

        /* set the current orientation */
        this.orientation = orientation;

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [M.Environment.getOrientation()]);
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the page and call the theme() of
     * its child views.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).page();
        this.themeChildViews();
    },

    /**
     * Applies some style-attributes to the page.
     *
     * @private
     * @returns {String} The page's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            if(!html) {
                html += ' class="';
            }
            html += this.cssClass;
        }
        if(html) {
            html += '"';
        }
        return html;
    }
    
});