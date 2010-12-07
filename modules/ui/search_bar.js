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
 * The root object for SearchBarViews.
 *
 */
M.SearchBarView = M.View.extend(
/** @scope M.SearchBarView.prototype */ {

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.SearchBarView',

    /**
     * Determines whether the search bar is part of a list view.
     *
     * @property {Boolean}
     */
    isListViewSearchBar: NO,

    /**
     * If the search bar belongs to a list view, this property contains this
     * list view.
     *
     * @property {Object}
     */
    listView: null,

    /**
     * Renders a search bar.
     */
    render: function() {
        this.html += '<form role="search"' + this.style() + '>';

        this.html += '<input id="' + this.id + '" data-type="search" />';

        this.html += '</form>';

        return this.html;
    },

    /**
     * Triggers rendering engine, e.g. jQuery mobile, to style the search bar.
     */
    theme: function() {

    },

    renderUpdate: function() {
      console.log('update');  
    },

    /**
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     *
     * Additionally call target / action if set.
     */
    setValueFromDOM: function(evt) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();
        
        if((evt === 'change' && this.triggerActionOnChange || evt === 'keyup' && this.triggerActionOnKeyUp) && this.target && this.action) {
            this.target[this.action](this.value);
        }
    },

    /**
     * Applies some style-attributes to the search bar.
     */
    style: function() {
        var html = '';
        if(this.isListViewSearchBar) {
            html += ' class="ui-listview-filter"';
        }
        return html;
    }

});