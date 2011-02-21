// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for any button view. A button is a view element that is
 * typically.........
 *
 * @extends M.View
 */
M.SplitView = M.View.extend(
/** @scope M.SplitView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SplitView',

    menu: null,

    content: null,

    isInitialized: NO,

    /**
     * Renders a split view.
     *
     * @private
     * @returns {String} The split view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '">';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Render child views.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews || this.contentBinding) {
            var childViews = $.trim(this.childViews).split(' ');
            if(childViews.length > 0 || this.contentBinding) {
                this.menu = M.ScrollView.design({
                    childViews: 'menu',
                    menu: M.ListView.design({})
                });
                this.menu.parentView = this;
                this.menu.menu.parentView = this.menu;
                this.menu.cssClass = this.menu.cssClass ? this.menu.cssClass + ' ui-splitview-menu' : 'ui-splitview-menu';
                this.html += this.menu.render();

                this.content = M.ScrollView.design({});
                this.content.parentView = this;
                this.content.cssClass = this.content.cssClass ? this.content.cssClass + ' ui-splitview-content' : 'ui-splitview-content';
                this.html += this.content.render();

                return this.html;
            } else {
                M.Logger.log('You need to provide at least one child view for M.SplitView of the type M.SplitItemView.', M.ERROR);
            }
        }
    },

    /**
     * Render update.
     *
     * @private
     */
    renderUpdate: function() {
        var content = null;
        
        if(this.contentBinding) {
            content = eval(this.contentBinding);
        } else if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            content = [];
            for(var i = 0; i < childViews.length; i++) {
                content.push(this[childViews[i]]);
            }
        }
        
        if(content) {
            if(content.length > 0) {

                /* reset menu list before filling it up again */
                this.menu.menu.removeAllItems();

                var entryItem = null;
                var currentItem = 0;
                for(var i in content) {
                    if(content[i] && content[i].type === 'M.SplitItemView') {
                        /* add item to list */
                        var item = M.ListItemView.design({
                            childViews: 'label',
                            listView: this.menu.menu,
                            splitViewItem: content[i],
                            label: M.LabelView.design({
                                value: content[i].value
                            })
                        });
                        this.menu.menu.addItem(item.render());

                        /* save id of the current item if it is either the first item or isActive is set */
                        if(currentItem === 0 || content[i].isActive) {
                            entryItem = item.id;
                        }

                        currentItem++;
                    } else {
                        M.Logger.log('Invalid child view passed! The child views of M.SplitView need to be of type M.ListView.', M.ERROR);
                    }
                }

                /* theme the list */
                this.menu.menu.themeUpdate();

                /* now set the active list item / content */
                this.menu.menu.setActiveListItem(entryItem);
            } else {
                M.Logger.log('You need to provide at least one child view for M.SplitView of the type M.SplitItemView.', M.ERROR);
            }
        }
    },

    /**
     * Theme.
     *
     * @private
     */
    theme: function() {
        this.renderUpdate();
    },

    listItemSelected: function(id) {
        if(!this.isInitialized) {
            var contentView = M.ViewManager.getViewById(id).splitViewItem.view;
            $('#' + this.content.id).html(contentView.html ? contentView.html : contentView.render());
            contentView.theme();
            this.isInitialized = YES;
        } else {
            var contentView = M.ViewManager.getViewById(id).splitViewItem.view;
            $('#' + this.content.id + ' div:first').html(contentView.html ? contentView.html : contentView.render());
            contentView.theme();
            $('#' + this.content.id).scrollview('scrollTo', 0, 0);
        }

        /* check if there is a split toolbar view on the page and update its label to show the value of the selected item */
        var page = null;
        if(M.ViewManager.getCurrentPage()) {
            page = M.ViewManager.getCurrentPage();
        } else if(true) {
            page = M.ViewManager.getPage(M.Application.entryPage);
        }

        if(page) {
            $('#' + page.id + ' .ui-splitview-content-toolbar').each(function() {
                var toolbar = M.ViewManager.getViewById($(this).attr('id'));
                if(toolbar.parentView && toolbar.parentView.showSelectedItemInMainHeader) {
                    toolbar.value = M.ViewManager.getViewById(id).splitViewItem.value;
                    toolbar.renderUpdate();
                }
            });
            if($('#' + page.id + ' .ui-footer').length === 0) {
                page.addCssClass('ui-splitview-no-footer');
            }
        }
    }

});