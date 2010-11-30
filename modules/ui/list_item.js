// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/button.js');

/**
 * @class
 *
 * The root object for ListItemViews.
 *
 */
M.ListItemView = M.View.extend({

    type: 'M.ListItemView',

    inEditMode: NO,

    /**
     * This property determines whether a list item has one single action that is triggered
     * once there is a click anywhere inside the list item or if there are specific actions
     * defined for single ui elements within one list item.
     *
     * property {Boolean}
     */
    hasSingleAction: YES,

    deleteButton: M.ButtonView.design({
        icon: 'delete',
        renderToDOM: NO,
        useOnClick: YES,
        target: null,
        action: '',
        value: ''
    }),

    internalTarget: null,

    internalAction: 'setActiveListItem',

    listView: null,

    isDivider: NO,

    render: function() {
        this.html = '<li id="' + this.id + '"' + this.style();

        this.html += ' onclick="M.EventDispatcher.onClickEventDidHappen(\'click\', \'' + this.id + '\');"';
        this.internalTarget = this.listView;

        if(this.isDivider) {
            this.html += ' data-role="list-divider"';
        }

        this.html += '>';

        if(this.childViews) {
            if(this.inEditMode) {
                this.html += '<a href="#">';
                this.renderChildViews();
                this.html += '</a>';

                this.html += this.deleteButton.render();
            } else {
                this.html += '<a href="#">';
                this.renderChildViews();
                this.html += '</a>';
            }
        } else if(this.value) {
            this.html += this.value;
        }

        this.html += '</li>';
        
        return this.html;
    },

    renderUpdate: function() {

    },

    /**
     * Triggers render() on all children and returns their render result.
     */
    renderChildViews: function() {
        var childViews = $.trim(this.childViews).split(' ');
        for(var i in childViews) {
            this.html += this[childViews[i]].render();
        }
        return this.html;
    },

    /**
     * Applies some style-attributes to the list item.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});