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

    selectedItem: null,

    orientation: null,

    headerheight: null,

    footerheight: null,

    itemheight: null,

    contentLoaded: NO,

    scrollviewsInitialized: NO,

    hasMenuScrollview: NO,

    shouldHaveScrollview: YES,

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
        if (this.childViews || this.contentBinding) {
            var childViews = this.getChildViewsAsArray();
            if (childViews.length > 0 || this.contentBinding) {
                this.menu = M.ScrollView.design({
                    childViews: 'menu',
                    menu: M.ListView.design({})
                });
                this.menu.parentView = this;
                this.menu.menu.parentView = this.menu;
                this.menu.cssClass = this.menu.cssClass ? this.menu.cssClass + ' tmp-splitview-menu' : 'tmp-splitview-menu';
                this.html += this.menu.render();

                this.content = M.ScrollView.design({});
                this.content.parentView = this;
                this.content.cssClass = this.content.cssClass ? this.content.cssClass + ' tmp-splitview-content' : 'tmp-splitview-content';
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

        if (this.contentBinding) {
            content = this.value;
        } else if (this.childViews) {
            var childViews = this.getChildViewsAsArray();
            content = [];
            for (var i = 0; i < childViews.length; i++) {
                content.push(this[childViews[i]]);
            }
        }

        if (content) {
            if (content.length > 0) {

                /* reset menu list before filling it up again */
                this.menu.menu.removeAllItems();

                var entryItem = null;
                var currentItem = 0;
                for (var i in content) {
                    if (content[i] && content[i].type === 'M.SplitItemView') {
                        /* add item to list */
                        var item = M.ListItemView.design({
                            childViews: 'label',
                            parentView: this.menu.menu,
                            splitViewItem: content[i],
                            label: M.LabelView.design({
                                value: content[i].value
                            }),
                            events: {
                                tap: {
                                    target: this,
                                    action: 'listItemSelected'
                                }
                            }
                        });
                        this.menu.menu.addItem(item.render());

                        /* register events for item */
                        item.registerEvents();

                        /* save id of the current item if it is either the first item or isActive is set */
                        if (currentItem === 0 || content[i].isActive) {
                            entryItem = item.id;
                        }

                        /* increase item counter */
                        currentItem++;
                    } else {
                        M.Logger.log('Invalid child view passed! The child views of M.SplitView need to be of type M.ListView.', M.ERROR);
                    }
                }

                /* theme the list */
                this.menu.menu.themeUpdate();

                /* now set the active list item */
                this.menu.menu.setActiveListItem(entryItem);

                /* finally show the active list item's content */
                this.listItemSelected(entryItem);
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

        /* register for DOMContentLoaded event to initialize the split view once its in DOM */
        if (!this.contentLoaded) {
            var that = this;
            $(document).bind('DOMContentLoaded', function() {
                that.initializeVar();
            });
        }
    },

    themeUpdate: function() {
        var size = M.Environment.getSize();
        var width = size[0];
        var height = size[1];

        /* landscape mode */
        if (M.Environment.getWidth() > M.Environment.getHeight()) {
            this.orientation = 'landscape';
            $('html').addClass(this.orientation);

            $('#' + this.menu.id).css('width', Math.ceil(width * 0.3) - 2 * (parseInt($('#' + this.menu.id).css('border-right-width'))) + 'px');
            $('#' + this.content.id).css('width', Math.floor(width * 0.7) - 2 * (parseInt($('#' + this.content.id).css('padding-right')) + parseInt($('#' + this.content.id).css('padding-left'))) + 'px');
            $('#' + this.content.id).css('left', Math.ceil(width * 0.3) + (parseInt($('#' + this.content.id).css('padding-right')) + parseInt($('#' + this.content.id).css('padding-left'))) - parseInt($('#' + this.menu.id).css('border-right-width')) + 'px');

            $('.tmp-splitview-menu-toolbar').css('width', Math.ceil(width * 0.3) + (parseInt($('#' + this.content.id).css('padding-right')) + parseInt($('#' + this.content.id).css('padding-left'))) - parseInt($('.tmp-splitview-menu-toolbar').css('border-right-width')) + 'px');
            $('.tmp-splitview-content-toolbar').css('width', Math.floor(width * 0.7) - (parseInt($('#' + this.content.id).css('padding-right')) + parseInt($('#' + this.content.id).css('padding-left'))) + 'px');
        /* portrait mode */
        } else {
            this.orientation = 'portrait';
            $('html').addClass(this.orientation);

            $('#' + this.content.id).css('width', width - (parseInt($('#' + this.content.id).css('padding-right')) + parseInt($('#' + this.content.id).css('padding-left'))) + 'px');
            $('#' + this.content.id).css('left', '0px');

            $('.tmp-splitview-content-toolbar').css('width', width + 'px');
        }

        var page = M.ViewManager.getCurrentPage() || M.ViewManager.getPage(M.Application.entryPage);

        /* set the min height of the page based on if there's a footer or not */
        if ($('#' + page.id).hasClass('tmp-splitview-no-footer')) {
            $('#' + page.id).css('min-height', height + 'px');
        } else {
            $('#' + page.id).css('min-height', height - this.footerheight + 'px !important');
        }

        /* set the height of the menu based on header/footer */
        if ($('#' + page.id + ' .ui-footer').length === 0) {
            $('#' + this.menu.menu.id).css('height', M.Environment.getHeight() - this.headerheight);
        } else {
            $('#' + this.menu.menu.id).css('height', M.Environment.getHeight() - this.headerheight - this.footerheight);
        }

        /* initialize the scrolling stuff (if not done yet) */
        if (!this.scrollviewsInitialized) {
            $('#' + this.content.id).scrollview({
                direction: 'y'
            });

            /* check whether scrolling is required or not for the menu */
            if (this.orientation === 'landscape') {
                this.itemheight = $('#' + this.menu.menu.id).find('li:first').outerHeight();
                var itemCount = $('#' + this.menu.menu.id).find('li').length;

                if (this.itemheight !== 0) {
                    var menuHeight = M.Environment.getHeight();
                    var itemListHeight = itemCount * this.itemheight;
                    if (menuHeight < itemListHeight) {
                        $('#' + this.menu.menu.id).scrollview({
                            direction: 'y'
                        });
                        this.hasMenuScrollview = YES;
                    } else {
                        this.shouldHaveScrollview = NO;
                    }
                }
                this.scrollviewsInitialized = YES;
            }

        }
    },

    /**
     * Called when Dom Content Loaded event arrived, to calculate height of header and footer
     * and set the contentLoaded, call theme update, in order to check out if a scrollview for menu is needed
     */
    initializeVar: function() {
        this.headerheight = $('#' + M.ViewManager.getCurrentPage().id + ' .ui-header').height();
        this.footerheight = $('#' + M.ViewManager.getCurrentPage().id + ' .ui-footer').height();
        this.contentLoaded = YES;
        this.themeUpdate();
    },

    registerEvents: function() {
        /* register for orientation change events of the current page */
        var page = M.ViewManager.getCurrentPage() || M.ViewManager.getPage(M.Application.entryPage);
        M.EventDispatcher.registerEvent(
            'orientationdidchange',
            page.id,
            {
                target: this,
                action:  function() {
                    /* trigger re-theming with a little delay to make sure, the orientation change did finish */
                    var that = this;
                    window.setTimeout(function() {
                        that.orientationDidChange();
                    }, 100);
                }
            },
            ['orientationdidchange'],
            null,
            NO,
            YES
        );
    },

    listItemSelected: function(id) {
        var contentView = M.ViewManager.getViewById(id) && M.ViewManager.getViewById(id).splitViewItem ? M.ViewManager.getViewById(id).splitViewItem.view : null;

        if (!contentView) {
            return;
        }

        this.selectedItem = M.ViewManager.getViewById(id).splitViewItem;

        if (!this.isInitialized) {
            if (contentView.html) {
                $('#' + this.content.id).html(contentView.html);
            } else {
                $('#' + this.content.id).html(contentView.render());
                contentView.theme();
                contentView.registerEvents();
            }
            this.isInitialized = YES;
        } else {
            if (contentView.html) {
                $('#' + this.content.id + ' div:first').html(contentView.html);
            } else {
                $('#' + this.content.id + ' div:first').html(contentView.render());
                contentView.theme();
                contentView.registerEvents();
            }
            $('#' + this.content.id).scrollview('scrollTo', 0, 0);
        }

        /* check if there is a split toolbar view on the page and update its label to show the value of the selected item */
        var page = M.ViewManager.getCurrentPage() || M.ViewManager.getPage(M.Application.entryPage);
        var that = this;
        if (page) {
            $('#' + page.id + ' .tmp-splitview-content-toolbar').each(function() {
                var toolbar = M.ViewManager.getViewById($(this).attr('id'));
                if (toolbar.parentView && toolbar.parentView.showSelectedItemInMainHeader) {
                    toolbar.value = M.ViewManager.getViewById(id).splitViewItem.value;
                    $('#' + toolbar.id + ' h1').html(toolbar.value);

                    /* now link the menu with the toolbar if not yet done */
                    if (!toolbar.parentView.splitview) {
                        toolbar.parentView.splitview = that;
                    }
                }
            });

            /* add special css class if there is no footer */
            if ($('#' + page.id + ' .ui-footer').length === 0) {
                page.addCssClass('tmp-splitview-no-footer');
            }

            /* add special css class if there is no header */
            if ($('#' + page.id + ' .tmp-splitview-content-toolbar').length === 0) {
                page.addCssClass('tmp-splitview-no-header');
            }
        }
    },

    orientationDidChange: function() {
        var orientation = M.Environment.getOrientation();
        var that = this;
        var page = M.ViewManager.getCurrentPage() || M.ViewManager.getPage(M.Application.entryPage);

        /* portrait */
        if (M.Environment.getHeight() > M.Environment.getWidth()) {
            $('html').removeClass('landscape');
            $('html').addClass('portrait');
        /* landscape */
        } else {
            $('html').removeClass('portrait');
            $('html').addClass('landscape');

            /* hide the popover */
            var toolbar;
            if (page) {
                $('#' + page.id + ' .tmp-splitview-menu-toolbar').each(function() {
                    toolbar = M.ViewManager.getViewById($(this).attr('id'));
                    if (toolbar && toolbar.parentView && toolbar.parentView.popover) {
                        toolbar.parentView.popover.hide();
                    }
                });
            }

            /* update the menu */
            var id;
            $('#' + this.menu.id).find('li').each(function() {
                if (M.ViewManager.getViewById($(this).attr('id')).splitViewItem.id === that.selectedItem.id) {
                    id = $(this).attr('id');
                }
            });

            /* activate the current item */
            if (id) {
                this.menu.menu.setActiveListItem(id);
            }

            /* set the selected item */
            this.selectedItem = M.ViewManager.getViewById(id).splitViewItem;

            /* scroll the menu so we def. see the selected item */
            this.scrollListToRightPosition(id);
        }

        /* scroll content to top */
        $('#' + this.content.id).scrollview('scrollTo', 0, 0);

        /* call theme update */
        this.themeUpdate();
    },

    scrollListToRightPosition: function(id) {
        var itemHeight = $('#' + this.menu.menu.id + ' li:first-child').outerHeight();
        var y = ($('#' + id).index() + 1) * itemHeight;
        var menuHeight = M.Environment.getHeight() - this.headerheight - this.footerheight;
        var middle = menuHeight / 2;
        var distanceToListEnd = $('#' + this.menu.menu.id).find('li').length * itemHeight - y;
        var yScroll = 0;

        /* if y coordinate of item is greater than menu height, we need to scroll down */
        if (y > menuHeight) {
            if (distanceToListEnd < middle) {
                yScroll = -(y - menuHeight + distanceToListEnd);
            } else {
                yScroll = -(y - middle);
            }
            /* if y coordinate of item is less than menu height, we need to scroll up */
        } else if (y < menuHeight) {
            if (y < middle) {
                yScroll = 0;
            } else {
                yScroll = -(y - middle);
            }
        }

        /* if there already is a scroll view, just scroll */
        if (!this.hasMenuScrollview && this.shouldHaveScrollview) {
            $('#' + this.menu.menu.id).scrollview({
                direction: 'y'
            });
        }
        $('#' + this.menu.menu.id).scrollview('scrollTo', 0, yScroll);
    }

});
