// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/search_bar.js');

/**
 * @class
 *
 * M.ListView is the prototype of any list view. It is used to display static or dynamic
 * content as vertically aligned list items (M.ListItemView). A list view provides some
 * easy to use helper method, e.g. an out-of-the-box delete view for items.
 *
 * @extends M.View
 */
M.ListView = M.View.extend(
/** @scope M.ListView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ListView',

    /**
     * Determines whether to remove all item if the list is updated or not.
     *
     * @type Boolean
     */
    removeItemsOnUpdate: YES,

    /**
     * Determines whether to display the list as a divided list or not.
     *
     * @type Boolean
     */
    isDividedList: NO,

    /**
     * If the list view is a divided list, this property can be used to customize the style
     * of the list's dividers.
     *
     * @type String
     */
    cssClassForDivider: null,

    /**
     * Determines whether to display the the number of child items for each list item view.
     *
     * @type Boolean
     */
    isCountedList: NO,

    /**
     * If the list view is a counted list, this property can be used to customize the style
     * of the list item's counter.
     *
     * @type String
     */
    cssClassForCounter: null,

    /**
     * This property can be used to customize the style of the list view's split view. For example
     * the toggleRemove() of a list view uses the built-in split view functionality.
     *
     * @type String
     */
    cssClassForSplitView: null,

    /**
     * The list view's items, respectively its child views.
     *
     * @type Array
     */
    items: null,

    /**
     * States whether the list view is currently in edit mode or not. This is mainly used by the
     * built-in toggleRemove() functionality. 
     *
     * @type Boolean
     */
    inEditMode: NO,

    /**
     * This property contains all available options for the edit mode. For example the target and action
     * of the automatically rendered delete button can be specified using this property.
     *
     * @type Object
     */
    editOptions: null,

    /**
     * Defines if the ListView is rendered with prefixed numbering for each item.
     *
     * @type Boolean
     */
    isNumberedList: NO,

    /**
     * This property contains the list view's template view, the blueprint for every child view.
     *
     * @type M.ListItemView
     */
    listItemTemplateView: null,

    /**
     * Determines whether to display the list view 'inset' or at full width.
     *
     * @type Boolean
     */
    isInset: NO,

    /**
     * Determines whether to add margin at the top of the list or not. This is useful whenever
     * the list is not the first element within a page's content area to make sure the list does
     * not overlap preceding elements.
     *
     * @type Boolean
     */
    doNotOverlapAtTop: NO,


    /**
     * Determines whether to add margin at the bottom of the list or not. This is useful whenever
     * the list is not the last element within a page's content area to make sure the list does
     * not overlap following elements.
     *
     * @type Boolean
     */
    doNotOverlapAtBottom: NO,

    /**
     * The list view's search bar.
     *
     * @type Object
      */
    searchBar: M.SearchBarView,

    /**
     * Determines whether or not to display a search bar at the top of the list view. 
     *
     * @type Boolean
     */
    hasSearchBar: NO,

    /**
     * If the hasSearchBar property is set to YES, this property determines whether to use the built-in
     * simple search filters or not. If set to YES, the list is simply filtered on the fly according
     * to the entered search string. Only list items matching the entered search string will be visible.
     *
     * If a custom search behaviour is needed, this property must be set to NO.
     *
     * @type Boolean
     */
    usesDefaultSearchBehaviour: YES,

    /**
     * If the hasSearchBar property is set to YES and the usesDefaultSearchBehaviour is set to YES, this
     * property can be used to specify the inital text for the search bar. This text will be shown as long
     * as nothing else is entered into the search bar text field.
     *
     * @type String
     */
    searchBarInitialText: 'Search...',

    /**
     * An object containing target and action to be triggered if the search string changes.
     *
     * @type Object
     */
    onSearchStringDidChange: null,

    /**
     * An optional String defining the id property that is passed in view as record id
     *
     * @type String
     */
    idName: null,

    /**
     * Contains a reference to the currently selected list item.
     *
     * @type Object
     */
    selectedItem: null,

    /**
     * Contains a reference to the currently visible swipe delete button (if one exists).
     *
     * @type M.ButtonView
     * @private
     */
    swipeButton: null,

    /**
     * This method renders the empty list view either as an ordered or as an unordered list. It also applies
     * some styling, if the corresponding properties where set.
     *
     * @private
     * @returns {String} The list view's styling as html representation.
     */
    render: function() {
        /* add the list view to its surrounding page */
        if(!M.ViewManager.currentlyRenderedPage.listList) {
            M.ViewManager.currentlyRenderedPage.listList = [];
        }
        M.ViewManager.currentlyRenderedPage.listList.push(this);

        if(this.hasSearchBar && !this.usesDefaultSearchBehaviour) {
            this.searchBar.isListViewSearchBar = YES;
            this.searchBar.listView = this;
            this.searchBar = M.SearchBarView.design(this.searchBar);
            this.html += this.searchBar.render();
        }

        var listTagName = this.isNumberedList ? 'ol' : 'ul';
        this.html += '<' + listTagName + ' id="' + this.id + '" data-role="listview"' + this.style() + '></' + listTagName + '>';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list views and their
     * internal events.
     */
    registerEvents: function() {
        /*this.internalEvents = {
            focus: {
                target: this,
                action: 'gotFocus'
            },
            blur: {
                target: this,
                action: 'lostFocus'
            },
            keyup: {
                target: this,
                action: 'setValueFromDOM'
            }
        }*/
        this.bindToCaller(this, M.View.registerEvents)();
        if(this.hasSearchBar && !this.usesDefaultSearchBehaviour) {
            this.searchBar.registerEvents();
        }
    },

    /**
     * This method adds a new list item to the list view by simply appending its html representation
     * to the list view inside the DOM. This method is based on jQuery's append().
     *
     * @param {String} item The html representation of a list item to be added.
     */
    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    /**
     * This method removes all of the list view's items by removing all of its content in the DOM. This
     * method is based on jQuery's empty().
     */
    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    /**
     * Updates the the list view by re-rendering all of its child views, respectively its item views. There
     * is no rendering done inside this method itself. It is more like the manager of the rendering process
     * and delegates the responsibility to renderListItemDivider() and renderListItemView() based on the
     * given list view configuration.
     *
     * @private
     */
    renderUpdate: function() {

        /* Remove all list items if the removeItemsOnUpdate property is set to YES */
        if(this.removeItemsOnUpdate) {
            this.removeAllItems();
        }

        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        var that = this;

        /* Get the list view's content as an object from the assigned content binding */
        if(this.contentBinding && typeof(this.contentBinding.target) === 'object' && typeof(this.contentBinding.property) === 'string' && this.value) {
            var content = this.value;
        } else {
            M.Logger.log('The specified content binding for the list view (' + this.id + ') is invalid!', M.WARN);
            return;
        }

        /* Get the list view's template view for each list item */
        var templateView = this.listItemTemplateView;

        /* if there is no template, log error and stop */
        if(!templateView) {
            M.Logger.log('The template view could not be loaded! Maybe you forgot to use m_require to set up the correct load order?', M.ERR);
            return;
        }

        /* check if there is an events propety specified for the template or if we should use the list's events */
        templateView.events = templateView.events ? templateView.events : this.events;

        /* If there is an items property, re-assign this to content, otherwise iterate through content itself */
        if(this.items) {
            content = content[this.items];
        }

        if(this.isDividedList) {
            /* @deprecated implementation for old-fashioned data structure */
            if(!_.isArray(content)) {
                _.each(content, function(items, divider) {
                    that.renderListItemDivider(divider);
                    that.renderListItemView(items, templateView);
                });
            /* new implementation with more intelligent data structures */
            } else {
                _.each(content, function(item) {
                    that.renderListItemDivider(item.label);
                    that.renderListItemView(item.items, templateView);
                });
            }
        } else {
            this.renderListItemView(content, templateView);
        }

        /* Finally let the whole list look nice */
        this.themeUpdate();
    },

    /**
     * Renders a list item divider based on a string given by its only parameter.
     *
     * @param {String} name The name of the list divider to be rendered.
     * @private
     */
    renderListItemDivider: function(name) {
        var obj = M.ListItemView.design({});
        obj.value = name;
        obj.isDivider = YES,
        this.addItem(obj.render());
        obj.theme();
    },

    /**
     * This method renders list items based on the passed parameters.
     *
     * @param {Array} content The list items to be rendered.
     * @param {M.ListItemView} templateView The template for for each list item.
     * @private
     */
    renderListItemView: function(content, templateView) {
        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        var that = this;

        _.each(content, function(item, index) {

            /* Create a new object for the current template view */
            var obj = templateView.design({});
            /* If item is a model, assign the model's id to the view's modelId property */
            if(item.type === 'M.Model') {
                obj.modelId = item.m_id;
            /* Otherwise, if there is an id property, save this automatically to have a reference */
            } else if(item.id || !isNaN(item.id)) {
                obj.modelId = item.id;
            } else if(item[that.idName] || item[that.idName] === "") {
                obj.modelId = item[that.idName];
            } else { // if nothing is set, use the index of the passed array (if available)
                if(index !== undefined && index !== null) {
                    obj.modelId = index;
                }
            }

            obj = that.cloneObject(obj, item);

            /* If edit mode is on, render a delete button */
            if(that.inEditMode) {
                obj.inEditMode = that.inEditMode;
                obj.deleteButton = obj.deleteButton.design({
                    modelId: obj.modelId,
                    events: {
                        tap: {
                            target: that.editOptions.target,
                            action: that.editOptions.action
                        }
                    },
                    internalEvents: {
                        tap: {
                            target: that,
                            action: 'removeListItem'
                        }
                    }
                });
            }

            /* set the list view as 'parent' for the current list item view */
            obj.parentView = that;

            /* Add the current list view item to the list view ... */
            that.addItem(obj.render());

            /* register events */
            obj.registerEvents();
            if(obj.deleteButton) {
                obj.deleteButton.registerEvents();
            }

            /* ... once it is in the DOM, make it look nice */
            var childViewsArray = obj.getChildViewsAsArray();
            for(var i in obj.getChildViewsAsArray()) {
                obj[childViewsArray[i]].theme();
            }
        });
    },

    /**
     * This method clones an object of the template including its sub views (recursively).
     *
     * @param {Object} obj The object to be cloned.
     * @param {Object} item The current item (record/data).
     * @private
     */
    cloneObject: function(obj, item) {
        /* Get the child views as an array of strings */
        var childViewsArray = obj.childViews ? obj.getChildViewsAsArray() : [];

        /* If the item is a model, read the values from the 'record' property instead */
        var record = item.type === 'M.Model' ? item.record : item;

        /* Iterate through all views defined in the template view */
        for(var i in childViewsArray) {
            /* Create a new object for the current view */
            obj[childViewsArray[i]] = obj[childViewsArray[i]].design({});

            /* create childViews of the current object */
            obj[childViewsArray[i]] = this.cloneObject(obj[childViewsArray[i]], item);

            /* This regex looks for a variable inside the template view (<%= ... %>) ... */
            var pattern = obj[childViewsArray[i]].computedValue ? obj[childViewsArray[i]].computedValue.valuePattern : obj[childViewsArray[i]].valuePattern;
            var regexResult = /<%=\s+([.|_|-|$|§|@|a-zA-Z0-9]+)\s*%>/.exec(pattern);

            /* ... if a match was found, the variable is replaced by the corresponding value inside the record */
            if(regexResult) {
                switch (obj[childViewsArray[i]].type) {
                    case 'M.LabelView':
                    case 'M.ButtonView':
                    case 'M.ImageView':
                    case 'M.TextFieldView':
                        while(regexResult !== null) {
                            if(typeof(record[regexResult[1]]) === 'object') {
                                pattern = record[regexResult[1]];
                                regexResult = null;
                            } else {
                                pattern = pattern.replace(regexResult[0], record[regexResult[1]]);
                                regexResult = /<%=\s+([.|_|-|$|§|@|a-zA-Z0-9]+)\s*%>/.exec(pattern);
                            }
                        }
                        obj[childViewsArray[i]].value = pattern;
                        break;
                }
            }
        }
        obj.item = item;
        
        return obj;
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the list view.
     *
     * @private
     */
    theme: function() {
        if(this.searchBar) {
            /* JQM-hack: remove multiple search bars */
            if($('#' + this.id) && $('#' + this.id).parent()) {
                var searchBarsFound = 0;
                $('#' + this.id).parent().find('form.ui-listview-filter').each(function() {
                    searchBarsFound += 1;
                    if(searchBarsFound == 1) {
                        return;
                    }
                    $(this).remove();
                });
            }
            this.searchBar.theme();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to re-style the list view.
     *
     * @private
     */
    themeUpdate: function() {
        $('#' + this.id).listview('refresh');
    },

    /**
     * This method activates the edit mode and forces the list view to re-render itself
     * and to display a remove button for every list view item.
     *
     * @param {Object} options The options for the remove button.
     */
    toggleRemove: function(options) {
        if(this.contentBinding && typeof(this.contentBinding.target) === 'object' && typeof(this.contentBinding.property) === 'string' && this.contentBinding.target[this.contentBinding.property]) {
            this.inEditMode = !this.inEditMode;
            this.editOptions = options;
            this.renderUpdate();
        }
    },

    /**
     * This method activates a list item by applying the default 'isActive' css style to its
     * DOM representation.
     *
     * @param {String} listItemId The id of the list item to be set active.
     */
    setActiveListItem: function(listItemId, event, nextEvent) {
        /* if there is a swipe button visible, do nothing but hide that button */
        if(this.swipeButton) {
            this.hideSwipeButton();
            return;
        }

        if(this.selectedItem) {
            this.selectedItem.removeCssClass('ui-btn-active');
        }
        this.selectedItem = M.ViewManager.getViewById(listItemId);

        /* is the selection list items are selectable, activate the right one */
        if(!this.listItemTemplateView || (this.listItemTemplateView && this.listItemTemplateView.isSelectable)) {
            this.selectedItem.addCssClass('ui-btn-active');
        }

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [listItemId, this.selectedItem.modelId]);
        }
    },

    /**
     * This method resets the list by applying the default css style to its currently activated
     * list item.
     */
    resetActiveListItem: function() {
        if(this.selectedItem) {
            this.selectedItem.removeCssClass('ui-btn-active');
        }
    },

    /**
     * Applies some style-attributes to the list view.
     *
     * @private
     * @returns {String} The list's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass || this.doNotOverlapAtTop || this.doNotOverlapAtBottom) {
            html += ' class="'
                + (this.cssClass ? this.cssClass : '')
                + (!this.isInset && this.doNotOverlapAtTop ? ' listview-do-not-overlap-at-top' : '')
                + (!this.isInset && this.doNotOverlapAtBottom ? ' listview-do-not-overlap-at-bottom' : '')
                + '"';
        }
        if(this.isDividedList && this.cssClassForDivider) {
            html += ' data-dividertheme="' + this.cssClassForDivider + '"';
        }
        if(this.isInset) {
            html += ' data-inset="true"';
        }
        if(this.isCountedList && this.cssClassForCounter) {
            html += ' data-counttheme="' + this.cssClassForCounter + '"';
        }
        if(this.cssClassForSplitView) {
            html += ' data-splittheme="' + this.cssClassForSplitView + '"';
        }
        if(this.hasSearchBar && this.usesDefaultSearchBehaviour) {
            html += ' data-filter="true" data-filter-placeholder="' + this.searchBarInitialText + '"';
        }
        return html;
    },

    removeListItem: function(id, event, nextEvent) {
        var modelId = M.ViewManager.getViewById(id).modelId;

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [id, modelId]);
        }
    },

    showSwipeButton: function(id, event, nextEvent) {
        var listItem = M.ViewManager.getViewById(id);

        /* reset the selection for better visual effect */
        this.resetActiveListItem();

        if(!listItem.swipeButton) {
            M.Logger.log('You need to specify a valid button with the \'swipeButton\' property of your list template!', M.WARN);
        } else {
            var previouslistItem = this.swipeButton ? this.swipeButton.parentView : null;

            if(previouslistItem) {
                this.hideSwipeButton();
            }

            if(!previouslistItem) {
                this.swipeButton = M.ButtonView.design(
                    listItem.swipeButton
                );
                this.swipeButton.value = this.swipeButton.value ? this.swipeButton.value : 'delete';
                this.swipeButton.parentView = M.ViewManager.getViewById(id);
                this.swipeButton.cssClass = this.swipeButton.cssClass ? this.swipeButton.cssClass + ' tmp-swipe-button' : 'a tmp-actionsheet-destructive-button tmp-swipe-button';
                this.swipeButton.value = this.swipeButton.value ? this.swipeButton.value : 'delete';
                this.swipeButton.internalEvents = {
                    tap: {
                        target: listItem,
                        action: 'swipeButtonClicked'
                    }
                };

                $('#' + id).append(this.swipeButton.render());
                this.swipeButton.theme();
                this.swipeButton.registerEvents();
                $('#' + this.swipeButton.id).css('height', 0.7 * $('#' + id).outerHeight());
                $('#' + this.swipeButton.id).css('top', Math.floor(0.15 * $('#' + id).outerHeight()));
                $('#' + id + '>div.ui-btn-inner').css('margin-right', parseInt($('#' + this.swipeButton.id).css('width')) + parseInt($('#' + this.swipeButton.id).css('right')));

                /* register tap/click for the page so we can hide the button again */
                var that = this;
                $('#' + M.ViewManager.getCurrentPage().id).bind('click tap', function() {
                    that.hideSwipeButton();
                });
            }
        }
    },

    hideSwipeButton: function() {
        $('#' + this.swipeButton.id).hide();
        $('#' + this.swipeButton.id).parent('li').find('div.ui-btn-inner').css('margin-right', 0);
        this.swipeButton = null;

        /* un-register tap/click for the page */
        $('#' + M.ViewManager.getCurrentPage().id).unbind('click tap');
    }

});