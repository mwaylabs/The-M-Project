// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   dominik
// Date:      15.08.11
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This ...
 *
 * @extends M.View
 */
M.PopoverView = M.View.extend(
/** @scope M.PopoverView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PopoverView',

    menu: null,

    scrollview: null,

    hasPopScrollview: NO,

    selectedItemInPopover: null,

    render: function() {
        this.html += '<div data-role="page" id="' + this.id + '" class="tmp-popover">';

        /* render a toolbar as the popover's header */
        var toolbar = M.ToolbarView.design({
            value: 'Menu',
            cssClass: 'tmp-popover-header'
        });
        this.html += toolbar.render();

        this.menu = M.ListView.design({});

        /* render a scrollview as the content container */
        this.scrollview = M.ScrollView.design({
            cssClass: 'tmp-popover-content',
            childViews: 'list',
            list: this.menu
        });
        this.html += this.scrollview.render();

        /* add the border (with the arrow at the top) */
        this.html += '<div class="tmp-popover-arrow"></div>';

        this.html += '</div>';

        /* push to DOM */
        $('body').append(this.html);

        /* now render items */
        this.selectedItemInPopover = null;
        for (var i in this.items) {
            var item = M.ListItemView.design({
                childViews: 'label',
                parentView: this.splitview.menu.menu,
                splitViewItem: this.items[i],
                label: M.LabelView.design({
                    value: this.items[i].value
                }),
                events: {
                    tap: {
                        target: this,
                        action: 'itemSelected'
                    }
                }
            });
            this.scrollview.list.addItem(item.render());

            /* check if this item has to be selected afterwards */
            if (item.splitViewItem.id === this.splitview.selectedItem.id) {
                this.selectedItemInPopover = item.id;
            }

            /* register events for item */
            item.registerEvents();
        }

        /* now set the active list item */
        this.splitview.menu.menu.setActiveListItem(this.selectedItemInPopover);

        /* finally show the active list item's content */
        this.splitview.listItemSelected(this.selectedItemInPopover);
    },

    renderUpdate: function() {
        /* get id of selected item */
        var id;
        var that = this;
        $('#' + this.menu.id).find('li').each(function() {
            if (M.ViewManager.getViewById($(this).attr('id')).splitViewItem.id === that.splitview.selectedItem.id) {
                id = $(this).attr('id');
            }
        });
        /* activate item */
        if (id) {
            this.menu.setActiveListItem(id);
            this.selectedItemInPopover = id;
        }
    },

    show: function() {
        this.render();
        this.theme();
        this.toggle();
    },

    hide: function() {
        $('#' + this.id).hide();
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
        var size = M.Environment.getSize();
        var width = size[0];
        var height = size[1];
        $('#' + this.id).css('width', Math.floor(width * 0.4) + 'px');
    },


    /**
     * This method calculates the popup's height, checks if a scrollview is required and,
     * if neccessary, scrollt the list to make the selected item visible.
     */
    resizePopup: function() {
        var itemHeight = ($('#' + this.menu.id).find('li:first')).outerHeight();
        var itemCount = $('#' + this.menu.id).find('li').length;
        var popoverSize = M.Environment.getHeight() * 0.7;
        var itemListHeight = itemCount * itemHeight;
        if (popoverSize < itemListHeight) {
            $('#' + this.menu.id).css('height', popoverSize);
            // Add a scrollview to List
            $('#' + this.menu.id).scrollview({
                direction: 'y'
            });
            this.hasPopScrollview = YES;
        }
        else {
            $('#' + this.menu.id).css('height', itemListHeight);
        }
        //Scrolling to right position is only needed when the popover has a scrollview
        if (this.hasPopScrollview) {
            this.scrollListToRightPosition();
        }
    },

    toggle: function() {
        $('#' + this.id).toggle();
        this.resizePopup();
    },

    itemSelected: function(id, event, nextEvent) {
        this.toggle();
        this.splitview.listItemSelected(id);
    },

    scrollListToRightPosition: function() {
        var itemHeight = $('#' + this.menu.id + ' li:first-child').outerHeight();
        var y = ($('#' + this.selectedItemInPopover).index() + 1) * itemHeight;
        var menuHeight = M.Environment.getHeight() * 0.7;
        var completeItemListHeight = $('#' + this.menu.id).find('li').length * itemHeight;
        var center = menuHeight / 2;
        var distanceToListEnd = completeItemListHeight - y;
        var yScroll = 0;

        /* if y coordinate of item is greater than menu height, we need to scroll down */
        if (y > menuHeight) {
            if (distanceToListEnd < center) {
                yScroll = -(y - menuHeight + distanceToListEnd);
            } else {
                yScroll = -(y - center);
            }
            /* if y coordinate of item is less than menu height, we need to scroll up */
        } else if (y < menuHeight) {
            if (y < center) {
                yScroll = 0;
            } else {
                yScroll = -(y - center);
            }
        }
        $('#' + this.menu.id).scrollview('scrollTo', 0, yScroll);
    }
});
