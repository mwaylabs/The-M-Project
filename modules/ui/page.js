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
     * This property can be used to set the page's beforeLoad action.
     *
     * @type Object
     */
    beforeLoad: null,

    /**
     * This property can be used to set the page's onLoad action.
     *
     * @type Object
     */
    onLoad: null,

    /**
     * This property can be used to set the page's beforeHide action.
     *
     * @type Object
     */
    beforeHide: null,

    /**
     * This property can be used to set the page's onHide action.
     *
     * @type Object
     */
    onHide: null,

    /**
     * This property can be used to set the page's onOrientationChange action.
     *
     * @type Object
     */
    onOrientationChange: null,

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

    lastPageWillLoad: null,

    lastPageDidLoad: null,

    lastPageWillHide: null,

    lastPageDidHide: null,

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
        this.html += '<div id="' + this.id + '" data-role="page"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        this.writeToDOM();
        this.theme();
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
     */
    pageWillLoad: function() {
        if(this.lastPageWillLoad && this.lastPageWillLoad.timeBetween(M.Date.now()) < 1000) {
            return;
        }
        this.lastPageWillLoad = M.Date.now();
        /* if this is the first page to be loaded, check if there is a tab bar and an active tab
           specified and switch to this tab. also reload this page to have a stable location hash. */
        if(M.Application.isFirstLoad) {
            M.Application.isFirstLoad = NO;
            var currentPage = M.ViewManager.getCurrentPage();
            if(currentPage && currentPage.hasTabBarView) {
                var tabBarView = currentPage.tabBarView;
                var activePage = M.ViewManager.getPage(tabBarView.activeTab.page);
                if(activePage !== currentPage) {
                    M.Controller.switchToPage(tabBarView.activeTab.page, M.TRANSITION.NONE, NO, YES);
                }
            }
        }

        /* initialize the loader for later use (if not already done) */
        if(M.LoaderView) {
            M.LoaderView.initialize();
        }

        if(this.beforeLoad) {
            this.beforeLoad.target[this.beforeLoad.action](this.isFirstLoad);
        }
    },

    /**
     * This method is called right after the page was loaded. If a onLoad-action is defined
     * for the page, it is now called.
     */
    pageDidLoad: function() {
        if(this.lastPageDidLoad && this.lastPageDidLoad.timeBetween(M.Date.now()) < 1000) {
            return;
        }
        this.lastPageDidLoad = M.Date.now();
        if(this.onLoad) {
            this.onLoad.target[this.onLoad.action](this.isFirstLoad);            
        }

        /* if there is a list on the page, reset it: deactivate possible active list items */
        $('#' + this.id).find('.ui-btn-active').each(function() {
            if(M.ViewManager.getViewById($(this).attr('id')) && M.ViewManager.getViewById($(this).attr('id')).type === 'M.ListItemView') {
                var listItem = M.ViewManager.getViewById($(this).attr('id'));
                listItem.removeCssClass('ui-btn-active');
            }
        });

        this.isFirstLoad = NO;
    },

    /**
     * This method is called right before the page is hidden. If a beforeHide-action is defined
     * for the page, it is now called.
     */
    pageWillHide: function() {
        if(this.lastPageWillHide && this.lastPageWillHide.timeBetween(M.Date.now()) < 1000) {
            return;
        }
        this.lastPageWillHide = M.Date.now();
        if(this.beforeHide) {
            this.beforeHide.target[this.beforeHide.action]();
        }
    },

    /**
     * This method is called right after the page was hidden. If a onHide-action is defined
     * for the page, it is now called.
     */
    pageDidHide: function() {
        if(this.lastPageDidHide && this.lastPageDidHide.timeBetween(M.Date.now()) < 1000) {
            return;
        }
        this.lastPageDidHide = M.Date.now();
        if(this.onHide) {
            this.onHide.target[this.onHide.action]();
        }
    },

    /**
     * This method is called if the device's orientation changed.
     */
    orientationDidChange: function() {
        if(this.onOrientationChange) {
            this.onOrientationChange.target[this.onOrientationChange.action](M.Environment.getOrientation());
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