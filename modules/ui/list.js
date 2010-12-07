// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
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
 * The root object for ListViews.
 *
 */
M.ListView = M.View.extend(
/** @scope M.ListView.prototype */ {

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ListView',

    /**
     * Determines whether to remove all item if the list is updated or not.
     *
     * @property {Boolean}
     */
    removeItemsOnUpdate: YES,

    /**
     * Determines whether to display the list as a divided list or not.
     *
     * @property {Boolean}
     */
    isDividedList: NO,

    /**
     * If the list view is a divided list, this property can be used to customize the style
     * of the list's dividers.
     *
     * @property {String}
     */
    cssClassForDivider: null,

    /**
     * Determines whether to display the the number of child items for each list item view.
     *
     * @property {Boolean}
     */
    isCountedList: NO,

    /**
     * If the list view is a counted list, this property can be used to customize the style
     * of the list item's counter.
     *
     * @property {String}
     */
    cssClassForCounter: null,

    /**
     * This property can be used to customize the style of the list view's split view. For example
     * the toggleRemove() of a list view uses the built-in split view functionality.
     *
     * @property {String}
     */
    cssClassForSplitView: null,

    /**
     * The list view's items, respectively its child views.
     *
     * @property {Object}
     */
    items: null,

    /**
     * Determines whether the list view is currently in edit mode or not. This is mainly used by the
     * built-in toggleRemove() functionality. 
     *
     * @property {Boolean}
     */
    inEditMode: NO,

    /**
     * This property contains all available options for the edit mode. For example the target and action
     * of the automatically rendered delete button can be specified using this property.
     *
     * @property {Object}
     */
    editOptions: null,

    /**
     * Defines if the ListView is rendered with prefixed numbering for each item.
     *
     * @property {Boolean}
     */
    isNumberedList: NO,

    /**
     * This property contains the list view's template view, the blueprint for every child view.
     *
     * @property {Object}
     */
    listItemTemplateView: null,

    /**
     * Determines whether to display the list view 'inset' or at full width.
     *
     * @property {Boolean}
     */
    isInsetList: NO,

    /**
     * The list view's search bar.
     *
     * @property {Object}
      */
    searchBar: null,

    /**
     * Determines whether or not to display a search bar at the top of the list view. 
     *
     * @property {Boolean}
     */
    hasSearchBar: NO,

    /**
     * If the hasSearchBar property is set to YES, this property determines whether to use the built-in
     * simple search filters or not. If set to YES, the list is simply filtered on the fly according
     * to the entered search string. Only list items matching the entered search string will be visible.
     *
     * If a custom search behaviour is needed, this property must be set to NO.
     *
     * @property {Boolean}
     */
    usesDefaultSearchBehaviour: YES,

    /**
     * An object containing target and action to be triggered if the search string changes.
     *
     * @property {Object}
     */
    onSearchStringDidChange: null,

    /**
     * This method renders the empty list view either as an ordered or as an unordered list. It also applies
     * some styling, if the corresponding properties where set.
     */
    render: function() {
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

    renderChildViews: function() {

    },

    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    removeItem: function(id) {

    },

    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    renderUpdate: function() {

        /* Remove all list items if the removeItemsOnUpdate property is set to YES */
        if(this.removeItemsOnUpdate) {
            this.removeAllItems();
        }

        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        var that = this;

        /* Get the list view's content as an object from the assigned content binding */
        var content = eval(this.contentBinding);

        /* Get the list view's template view for each list item */
        var templateView = this.listItemTemplateView;

        /* If there is an items property, re-assign this to content, otherwise iterate through content itself */
        if(this.items) {
            content = content[this.items];
        }

        if(this.isDividedList) {
            _.each(content, function(items, divider) {
                that.renderListItemDivider(divider);
                that.renderListItemView(items, templateView);
            });
        } else {
            this.renderListItemView(content, templateView);
        }

        /* Finally let the whole list look nice */
        this.themeUpdate();
    },

    renderListItemDivider: function(name) {
        var obj = M.ListItemView.design({});
        obj.value = name;
        obj.isDivider = YES,
        this.addItem(obj.render());
        obj.theme();
    },

    renderListItemView: function(content, templateView) {
        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        var that = this;

        _.each(content, function(item) {

            /* Create a new object for the current template view */
            var obj = templateView.design({});

            /* If item is a model, assign the model's id to the view's modelId property */
            if(item.type === 'M.Model') {
                obj.modelId = item.id;
            }

            /* Get the child views as an array of strings */
            var childViewsArray = obj.childViews.split(' ');

            /* If the item is a model, read the values from the 'record' property instead */
            var record = item.type === 'M.Model' ? item.record : item;

            /* Iterate through all views defined in the template view */
            for(var i in childViewsArray) {
                /* Create a new object for the current view */
                obj[childViewsArray[i]] = obj[childViewsArray[i]].design({});

                var regexResult = null;
                if(obj[childViewsArray[i]].computedValue) {
                    /* This regex looks for a variable inside the template view (<%= ... %>) ... */
                    regexResult = /^<%=\s+([.|_|-|$|¤|a-zA-Z]+[0-9]*[.|_|-|$|¤|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].computedValue.valuePattern);
                } else {
                    regexResult = /^<%=\s+([.|_|-|$|¤|a-zA-Z]+[0-9]*[.|_|-|$|¤|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].valuePattern);
                }

                /* ... if a match was found, the variable is replaced by the corresponding value inside the record */
                if(regexResult) {
                    switch (obj[childViewsArray[i]].type) {
                        case 'M.LabelView':
                        case 'M.ButtonView':
                        case 'M.ImageView':
                            obj[childViewsArray[i]].value = record[regexResult[1]];
                            break;
                    }
                }
            }

            /* If edit mode is on, render a delete button */
            if(that.inEditMode) {
                obj.inEditMode = that.inEditMode;
                obj.deleteButton = obj.deleteButton.design({
                    modelId: item.id,
                    target: that.editOptions.target,
                    action: that.editOptions.action
                });
            }

            /* set the list view as 'parent' for the current list item view */
            obj.listView = that;

            /* Add the current list view item to the list view ... */
            that.addItem(obj.render());

            /* ... once it is in the DOM, make it look nice */
            for(var i in childViewsArray) {
                obj[childViewsArray[i]].theme();
            }
        });
    },

    /**
     * Triggers rendering engine, e.g. jQuery mobile, to style the list view.
     */
    theme: function() {
        $('#' + this.id).listview();
        if(this.searchBar) {
            this.searchBar.theme();
        }
    },

    /**
     * Triggers rendering engine, e.g. jQuery mobile, to style the button.
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
        if(eval(this.contentBinding)) {
            this.inEditMode = !this.inEditMode;
            this.editOptions = options;
            this.renderUpdate();
        }
    },

    setActiveListItem: function(listItemId) {
        $('#' + this.id).find('li').each(function() {
            var listItem = M.ViewManager.getViewById($(this).attr('id'));
            listItem.removeCssClass('ui-btn-active');
        });
        M.ViewManager.getViewById(listItemId).addCssClass('ui-btn-active')
    },

    /**
     * Applies some style-attributes to the list view.
     */
    style: function() {
        var html = '';
        if(this.isDividedList && this.cssClassForDivider) {
            html += ' data-dividertheme="' + this.cssClassForDivider + '"';
        }
        if(this.isInsetList) {
            html += ' data-inset="true"';
        }
        if(this.isCountedList && this.cssClassForCounter) {
            html += ' data-counttheme="' + this.cssClassForCounter + '"';
        }
        if(this.cssClassForSplitView) {
            html += ' data-splittheme="' + this.cssClassForSplitView + '"';
        }
        if(this.hasSearchBar && this.usesDefaultSearchBehaviour) {
            html += ' data-filter="true"';
        }
        return html;
    }

});