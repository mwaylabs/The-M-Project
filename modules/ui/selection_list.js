// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      30.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.SINGLE_SELECTION = 'radio';
M.MULTIPLE_SELECTION = 'checkbox';
M.RAW = 'raw';

m_require('ui/selection_list_item.js');

/**
 * @class
 *
 * The root object for SelectionListViews.
 *
 */
M.SelectionListView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.SelectionListView',

    /**
     * Determines whether to remove all item if the list is updated or not.
     *
     * @property {Boolean}
     */
    removeItemsOnUpdate: YES,

    /**
     * The selection mode for this selection list. This can either be single or
     * multiple selection. To set this value use one of the two constants:
     * 
     * - M.SINGLE_SELECTION
     * - M.MULTIPLE_SELECTION
     *
     * @property {String}
     */
    selectionMode: M.SINGLE_SELECTION,

    /**
     * This property is used to define a method that is executed onSelect of an
     * item of this selection list.
     *
     * @property {Object}
     */
    onSelect: null,

    /**
     * The selected item(s) of this list.
     *
     * @property {Object}
     */
    selection: null,

    /**
     * Renders a selection list.
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
            return;
        }
    },

    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    removeAllItems: function() {
        $('#' + this.id).empty();
    },

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

    theme: function() {
        $('#' + this.id).controlgroup();
    },

    /**
     * This method is called everytime a item is selected / clicked. If the selected item
     * changed, the defined onSelect action is triggered.
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
     * This method returns the selected item's value(s).
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
    }

});