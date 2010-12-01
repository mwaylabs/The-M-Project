// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for Pages.
 *
 */
M.PageView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.PageView',

    /**
     * Is set to NO once the page was first loaded.
     *
     * @property {Boolean}
     */
    isFirstLoad: YES,

    /**
     * This property can be used to set the page's onLoad action.
     *
     * @property {Object}
     */
    onLoad: null,

    /**
     * Indicates whether the page has a tab bar or not.
     *
     * @property {Boolean}
     */
    hasTabBarView: NO,

    /**
     * The page's tab bar.
     *
     * @property {Object}
     */
    tabBarView: null,

    /**
     * Renders in three steps:
     * 1. Rendering Opening div tag with corresponding data-role
     * 2. Triggering render process of child views
     * 3. Rendering closing tag
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-role="page"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        this.writeToDOM();
        this.theme();
    },

    /**
     * This method is called if the page is loaded. It is then delegated to the view's
     * specified onLoad-method.
     */
    pageDidLoad: function() {
        if(this.onLoad) {
            this.onLoad.target[this.onLoad.action](this.isFirstLoad);            
        }

        /* if there is was a dialog on the previous page, call its cancel method */
        if(M.Application.viewManager.currentDialog) {
            M.Application.viewManager.currentDialog.destroy();
            M.Application.viewManager.currentDialog = null;
        }

        /* if there is a list on the page, reset it: deactivate possible active list items */
        $('#' + this.id).find('.ui-btn-active').each(function() {
            if(M.ViewManager.getViewById($(this).attr('id')) && M.ViewManager.getViewById($(this).attr('id')).type === 'M.ListItemView') {
                var listItem = M.ViewManager.getViewById($(this).attr('id'));
                listItem.removeCssClass('ui-btn-active');
            }
        });

        /* WORKAROUND for being able to use more than two tab items within a tab bar */
        /* TODO: Get rid of this workaround with a future version of jquery mobile */
        if(this.isFirstLoad && this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.TabBarView' && view.anchorLocation === M.BOTTOM) {
                    $('[data-id="' + view.name + '"]:not(:last-child)').each(function() {
                        if(!$(this).hasClass('ui-footer-duplicate')) {
                            /* first empty the tabbar and then hide it, since jQuery's remove() doesn't work */
                            $(this).empty();
                            $(this).hide();
                        }
                    });
                }
            }
        }

        this.isFirstLoad = NO;
    },


    /**
     * This method is called if the device's orientation changed.
     */
    orientationDidChange: function(orientation) {
        if(this.onOrientationChange) {
            this.onOrientationChange.target[this.onOrientationChange.action](orientation);
        }
    },

    /**
     * This method triggers the styling of the page and its subviews.
     */
    theme: function() {
        $('#' + this.id).page();
        this.themeChildViews();
    },

    /**
     * Applies some style-attributes to the page.
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