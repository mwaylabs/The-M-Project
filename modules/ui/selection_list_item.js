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
 * @class
 *
 * The root object for SelectionListItemView.
 *
 */
M.SelectionListItemView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
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
     * @property {String}
     */
    label: null,

    /**
     * This property determines whether a selection list item is selected or not.
     *
     * @property {Boolean}
     */
    isSelected: NO,

    /**
     * Renders a selection list item.
     */
    render: function() {
        this.html += '<input type="' + this.parentView.selectionMode + '" name="';

        if(this.parentView.selectionMode === M.SINGLE_SELECTION) {
             this.html += this.parentView.name ? this.parentView.name : this.parentView.id;
        } else {
            this.html += this.name ? this.name : this.id;
        }

        this.html += '" id="' + this.id + '"';

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

        return this.html;
    },

    theme: function() {
        $('#' + this.id).checkboxradio();
    }

});