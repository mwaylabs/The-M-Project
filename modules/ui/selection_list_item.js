// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      30.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.SelectionListItemView defines the prototype of any selection list item. It can only be used
 * as a child view for a selection list view.
 *
 * @extends M.View
 */
M.SelectionListItemView = M.View.extend(
/** @scope M.SelectionListItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SelectionListItemView',

    /**
     * This property can be used to specify a label for a selection list item. If
     * set, the label will be displayed instead of the value, so you can use the
     * item's value as an internal value.
     *
     * E.g. if you use a selection list to select a color, you could set an item's
     * value to '#FF0000' but its label to 'Red'. If there is no label specified,
     * the value is displayed instead.
     *
     * @type String
     */
    label: null,

    /**
     * This property states whether a selection list item is selected or not.
     *
     * @type Boolean
     */
    isSelected: NO,

    /**
     * Renders a selection list item.
     * 
     * @private
     * @returns {String} The selection list item view's html representation.
     */
    render: function() {
        if(this.parentView && (this.parentView.selectionMode === M.SINGLE_SELECTION_DIALOG || this.parentView.selectionMode === M.MULTIPLE_SELECTION_DIALOG)) {
            this.html += '<option id="' + this.id + '" value="' + this.value + '"';

            if((this.isSelected && typeof(this.isSelected) === 'boolean') || (this.isSelected === String(YES))) {
                if(!this.parentView.selection) {
                    this.html += ' selected="selected"';
                    this.parentView.selection = this;
                }
            }

            this.html += '>';
            
            this.html += this.label ? this.label : this.value;

            this.html += '</option>';
        } else {
            this.html += '<input type="' + this.parentView.selectionMode + '" data-native-menu="false" id="' + this.id + '"';

            if(this.parentView.selectionMode === M.SINGLE_SELECTION) {
                this.html += ' name="' + (this.parentView.name ? this.parentView.name : this.parentView.id) + '"';
            } else if(this.parentView.selectionMode === M.MULTIPLE_SELECTION) {
                this.html += ' name="' + (this.name ? this.name : this.id) + '"';
            }

            if((this.isSelected && typeof(this.isSelected) === 'boolean') || (this.isSelected === String(YES))) {
                if(this.parentView.selectionMode === M.SINGLE_SELECTION) {
                    if(!this.parentView.selection) {
                        this.html += ' checked="checked"';
                        this.parentView.selection = this;
                    }
                } else {
                    this.html += ' checked="checked"';

                    if(!this.parentView.selection) {
                        this.parentView.selection = [];
                    }
                    this.parentView.selection.push(this);
                }
            }

            this.html += '/>';
            this.html += '<label for="' + this.id + '">' + (this.label ? this.label : this.value) + '</label>';
        }

        return this.html;
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list item.
     *
     * @private
     */
    theme: function() {
        if(this.parentView) {
            if(this.parentView.selectionMode !== M.SINGLE_SELECTION_DIALOG && this.parentView.selectionMode !== M.MULTIPLE_SELECTION_DIALOG) {
                $('#' + this.id).checkboxradio();
            }
        }
    }

});