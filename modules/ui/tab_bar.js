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
 * The is the prototype of any tab bar view. A tab bar view is a special variant of a toolbar
 * at the top or bottom of a page, that consists of up to five horizontally aligned tabs. An
 * M.TabBarView can be used the top navigation level for an application since it is always
 * visible an indicates the currently selected tab.
 *
 */
M.TabBarView = M.View.extend(
/** @scope M.TabBarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.TabBarView',
    
     /**
     * Defines the position of the TabBar. Possible values are:
     *
     * - M.BOTTOM => is a footer tab bar
     * - M.TOP => is a header tab bar
     * - null / not set ==> a tab bar outside header / footer
     *
     * @type String
     */
    anchorLocation: null,

    /**
     * This property defines the tab bar's name. This is used internally to identify
     * the tab bar inside the DOM.
     *
     * @type String
     */
    name: 'tab_bar',

    /**
     * This property holds a reference to the currently active tab.
     *
     * @type M.TabBarItemView
     */
    activeTab: null,

    /**
     * This property is used internally to count the number of usages of a tab bar.
     */
    usageCounter: 0,

    /**
     * This property determines whether to toggle the tab bar on tap on the content area
     * or not. By default this is set to NO.
     *
     * @type Boolean
     */
    toggleOnTap: NO,

    /**
     * Renders a tab bar as an unordered list.
     *
     * @private
     * @returns {String} The tab bar view's html representation.
     */
    render: function() {
        this.html = '';
        this.usageCounter += 1;

        if(this.anchorLocation) {
            this.html += '<div id="' + this.id + '" data-id="' + this.name + '" data-role="' + this.anchorLocation + '" data-position="fixed" data-tap-toggle="' + this.toggleOnTap + '" data-transition="' + (M.Application.getConfig('useTransitions') ? M.TRANSITION.SLIDE : M.TRANSITION.NONE) + '"><div data-role="navbar"><ul>';
        } else {
            this.html += '<div data-role="navbar" id="' + this.id + '" data-id="' + this.name + '"><ul>';
        }

        this.renderChildViews();

        this.html += '</ul></div>';

        if(this.anchorLocation) {
            this.html += '</div>';
        }

        return this.html;
    },

    /**
     * Triggers render() on all children of type M.TabBarItemView.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();

            /* pre-process the child views to define which tab is selected */
            var hasActiveTab = NO;
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.TabBarItemView' && view.isActive) {
                    if(!hasActiveTab) {
                        hasActiveTab = YES;
                        this.activeTab = view;
                    } else {
                        view.isActive = NO;
                    }
                }
            }

            var numTabBarViews = 0;
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.TabBarItemView') {
                    numTabBarViews = numTabBarViews + 1;

                    /* set first tab to active tab if nothing else specified */
                    if(numTabBarViews === 1 && !hasActiveTab) {
                        view.isActive = YES;
                        this.activeTab = view;
                    }

                    view.parentView = this;
                    view._name = childViews[i];
                    this.html += view.render();
                } else {
                    M.Logger.log('Invalid child views specified for TabBarView. Only TabBarItemViews accepted.', M.WARN);
                }
            }
        } else {
            M.Logger.log('No TabBarItemViews specified.', M.WARN);
            return;
        }
    },

    /**
     * This method visually activates a tab bar item based on a given page.
     *
     * @param {M.TabBarItemView} tab The tab to set active.
     */
    setActiveTab: function(tab) {
        /* deactivate current active tav */
        this.activeTab.isActive = NO;
        var activeTabMainID = this.activeTab.id.substring(0, this.activeTab.id.lastIndexOf('_'));
        $('[id^=' + activeTabMainID + '_]').each(function() {
            $(this).removeClass('ui-btn-active');
        });

        /* activate new tab */
        tab.isActive = YES;
        this.activeTab = tab;
        var tabMainID = tab.id.substring(0, tab.id.lastIndexOf('_'));
        $('[id^=' + tabMainID + '_]').each(function() {
            $(this).addClass('ui-btn-active');
        });

    }

});