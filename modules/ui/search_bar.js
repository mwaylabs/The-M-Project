// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.SearchBarView defines a prototype of a search bar that can be used inside of a list
 * view or independently as a plain input field with a search styling.
 *
 * @extends M.View
 */
M.SearchBarView = M.View.extend(
/** @scope M.SearchBarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SearchBarView',

    /**
     * Determines whether the search bar is part of a list view.
     *
     * @type Boolean
     */
    isListViewSearchBar: NO,

    /**
     * If the search bar belongs to a list view, this property contains this
     * list view.
     *
     * @type M.ListView
     */
    listView: null,

    /**
     * Renders a search bar.
     *
     * @private
     * @returns {String} The search bar view's html representation.
     */
    render: function() {
        this.html += '<form role="search"' + this.style() + '>';

        this.html += '<input id="' + this.id + '" data-type="search" />';

        this.html += '</form>';

        return this.html;
    },

    /**
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     *
     * Additionally call target / action if set.
     *
     * @param {Object} evt The event triggered this method.
     */
    setValueFromDOM: function(evt) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();
        
        if((evt === 'change' && this.triggerActionOnChange || evt === 'keyup' && this.triggerActionOnKeyUp) && this.target && this.action) {
            this.target[this.action](this.value);
        }
    },

    /**
     * Applies some style-attributes to the button.
     *
     * @private
     * @returns {String} The search bar's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isListViewSearchBar) {
            html += ' class="ui-listview-filter"';
        }
        return html;
    }

});