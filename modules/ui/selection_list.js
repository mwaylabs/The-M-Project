// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      30.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for single selection mode.
 *
 * @type String
 */
M.SINGLE_SELECTION = 'radio';

/**
 * A constant value for multiple selection mode.
 *
 * @type String
 */
M.MULTIPLE_SELECTION = 'checkbox';

m_require('ui/selection_list_item.js');

/**
 * @class
 *
 * This defines the prototype of any selection list view. A selection list view displays
 * a list with several items of which either only one single item (M.SINGLE_SELECTION) or
 * many items (M.MULTIPLE_SELECTION) can be selected.
 *
 * @extends M.View
 */
M.SelectionListView = M.View.extend(
/** @scope M.SelectionListView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SelectionListView',

    /**
     * Determines whether to remove all item if the list is updated or not.
     *
     * @type Boolean
     */
    removeItemsOnUpdate: YES,

    /**
     * The selection mode for this selection list. This can either be single or
     * multiple selection. To set this value use one of the two constants:
     * 
     * - M.SINGLE_SELECTION
     * - M.MULTIPLE_SELECTION
     *
     * @type String
     */
    selectionMode: M.SINGLE_SELECTION,

    /**
     * This property is used to define a method that is executed onSelect of an
     * item of this selection list.
     *
     * @type Object
     */
    onSelect: null,

    /**
     * The selected item(s) of this list.
     *
     * @type String, Array
     */
    selection: null,

    /**
     * Renders a selection list.
     *
     * @private
     * @returns {String} The selection list view's html representation.
     */
    render: function() {
        this.html += '<fieldset data-role="controlgroup" id="' + this.id + '">';

        if(this.label) {
            this.html += '<legend>' + this.label + '</legend>';
        }

        this.renderChildViews();

        this.html += '</fieldset>';
        
        return this.html;
    },

    /**
     * Triggers render() on all children of type M.ButtonView based on the specified
     * selection mode (single or multiple selection).
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.SelectionListItemView') {
                    view.parentView = this;
                    view.internalTarget = this;
                    view.internalAction = 'itemSelected';
                    this.html += view.render();
                } else {
                    M.Logger.log('Invalid child views specified for SelectionListView. Only SelectionListItemViews accepted.', M.WARN);
                }
            }
        } else if(!this.contentBinding) {
            M.Logger.log('No SelectionListItemViews specified.', M.WARN);
        }
    },

    /**
     * This method adds a new selection list item to the selection list view by simply appending
     * its html representation to the selection list view inside the DOM. This method is based
     * on jQuery's append().
     *
     * @param {String} item The html representation of a selection list item to be added.
     */
    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    /**
     * This method removes all of the selection list view's items by removing all of its content in
     * the DOM. This method is based on jQuery's empty().
     */
    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    /**
     * Updates the the selection list view by re-rendering all of its child views, respectively its
     * item views.
     *
     * @private
     */
    renderUpdate: function() {
        if(this.removeItemsOnUpdate) {
            this.removeAllItems();

            if(this.label) {
                this.addItem('<legend>' + this.label + '</legend>');
            }
        }

        if(this.contentBinding) {
            var items = eval(this.contentBinding);
            for(var i in items) {
                var item  = items[i];
                var obj = M.SelectionListItemView.design({
                    value: item.value,
                    label: item.label,
                    name: item.name,
                    isSelected: item.isSelected,
                    parentView: this,
                    internalTarget: this,
                    internalAction: 'itemSelected'
                });
                this.addItem(obj.render());
                obj.theme()
            }
            this.theme();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).controlgroup();
    },

    /**
     * This method is called everytime a item is selected / clicked. If the selected item
     * changed, the defined onSelect action is triggered.
     *
     * @param {String} id The id of the selected item.
     */
    itemSelected: function(id) {
        var item = M.ViewManager.getViewById(id);
        
        if(this.selectionMode === M.SINGLE_SELECTION) {
            if(!_.isEqual(item, this.selection)) {
                this.selection = item;
                if(this.onSelect && this.onSelect.target && this.onSelect.action) {
                    this.onSelect.target[this.onSelect.action]();
                }
            }
        } else {
            if(!this.selection) {
                this.selection = [];
            }

            if($('#' + id + ':checked').length > 0) {
                this.selection.push(item);
            } else {
                this.selection = _.select(this.selection,  function(i) {
                    return i !== item;
                });
            }

            if(this.onSelect && this.onSelect.target && this.onSelect.action) {
                this.onSelect.target[this.onSelect.action]();
            }
        }
    },

    /**
     * This method returns the selected item's value(s) either as a String (M.SINGLE_SELECTION)
     * or as an Array (M.MULTIPLE_SELECTION).
     *
     * @returns {String, Array} The selected item's value(s).
     */
    getSelection: function() {
        if(this.selectionMode === M.SINGLE_SELECTION) {
            if(this.selection) {
                return this.selection.value;
            }
        } else {
            if(this.selection) {
                var selection = [];
                _.each(this.selection, function(item) {
                    selection.push(item.value);
                });
                return selection;
            }
        }
    },

    /**
     * This method can be used to select items programmatically. The given parameter can either
     * be a String (M.SINGLE_SELECTION) or an Array (M.MULTIPLE_SELECTION).
     *
     * @param {String, Array} selection The selection that should be applied to the selection list.
     */
    setSelection: function(selection) {
        this.removeSelection();
        var that = this;
        if(this.selectionMode === M.SINGLE_SELECTION && typeof(selection) === 'string') {
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                if(item.value === selection) {
                    item.isSelected = YES;
                    that.selection = item;
                    $(this).attr('checked', 'checked');
                    $(this).siblings('label:first').addClass('ui-btn-active');
                    $(this).siblings('label:first').find('span .ui-icon-radio-off').addClass('ui-icon-radio-on');
                    $(this).siblings('label:first').find('span .ui-icon-radio-off').removeClass('ui-icon-radio-off');
                }
            });
        } else if(typeof(selection) === 'object') {
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                for(var i in selection) {
                    var selectionItem = selection[i];
                    if(item.value === selectionItem) {
                        item.isSelected = YES;
                        that.selection.push(item);
                        $(this).attr('checked', 'checked');
                        $(this).siblings('label:first').addClass('ui-btn-active');
                        $(this).siblings('label:first').find('span .ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
                        $(this).siblings('label:first').find('span .ui-icon-checkbox-off').removeClass('ui-icon-checkbox-off');
                    }
                }
            });
        }
        that.theme();
    },

    /**
     * This method de-selects all of the selection list's items.
     */
    removeSelection: function() {
        var that = this;
        var type = '';
        if(this.selectionMode === M.SINGLE_SELECTION) {
            this.selection = null;
            type = 'radio';
        } else {
            this.selection = [];
            type = 'checkbox';
        }
        $('#' + this.id).find('input').each(function() {
            var item = M.ViewManager.getViewById($(this).attr('id'));
            item.isSelected = NO;
            $(this).removeAttr('checked');
            $(this).siblings('label:first').removeClass('ui-btn-active');
            $(this).siblings('label:first').find('span .ui-icon-radio-on').addClass('ui-icon-' + type + '-off');
            $(this).siblings('label:first').find('span .ui-icon-radio-on').removeClass('ui-icon-' + type + '-on');
        });
    }

});