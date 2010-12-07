// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c)2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for TabBarViews.
 *
 */
M.TabBarView = M.View.extend(
/** @scope M.TabBarView.prototype */ {

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.TabBarView',
    
     /**
     * Defines the position of the TabBar.
     *
     * default: M.BOTTOM => is a footer bar
     *
     * @property {String}
     */
    anchorLocation: M.BOTTOM,

    /**
     * Defines whether this TabBar is only rendered once for every view that uses
     * this TabBar.
     *
     * @property {Boolean}
     */
    isSingelton: YES,

    render: function() {
        if(this.isSingelton && !this.html) {
            this.html = '';

            this.html += '<div id="' + this.id + '" data-id="' + this.name + '" data-role="' + this.anchorLocation + '" data-position="fixed"><div data-role="navbar"><ul>';

            this.renderChildViews();

            this.html += '</ul></div></div>';
        }
        return this.html;
    },

    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.TabBarItemView') {
                    view.parentView = this;
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

    setActiveTab: function(page, tab) {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            var previousPage = M.Application.viewManager.getCurrentPage();
            var nextPage = page.type === 'M.PageView' ? page : M.ViewManager.getPage(page);
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.page === page) {
                    view.isActive = YES;
                    $('[data-id="' + this.name + '"]').each(function() {
                        $(this).find('#' + view.id).addClass('ui-btn-active');
                    });
                } else {
                    view.isActive = NO;
                    $('[data-id="' + this.name + '"]').each(function() {
                        $(this).find('#' + view.id).removeClass('ui-btn-active');
                    });
                }
            }
        }
    }

});