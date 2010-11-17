// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

/**
 * @class
 *
 * The root object for ButtonViews.
 *
 */
M.ButtonView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ButtonView',

    useOnClick: NO,

    /**
     * Mapping to value attribute.
     * text property is mixed in when extended.
     */
    //value: this.text,

    /**
     * Renders a button as an input tag. Input is automatically converted by jQuery mobile.
     */
    render: function() {
        this.html += '<a href="#" id="' + this.id + '"' + this.style() + '>' + this.value + '</a>';
        return this.html;
    },

    /**
     * Updates the value of the button with DOM access by jQuery.
     */
    renderUpdate: function() {
        $('#' + this.id).attr('value', this.value);
        this.applyTheme();
    },

    /**
     * Triggers rendering engine, e.g. jQuery mobile, to style the button.
     */
    theme: function() {
        $('#' + this.id).button();
    },

    /**
     * Applies some style-attributes to the label.
     */
    style: function() {
        var html = '';
        if(this.isInline) {
            html += 'data-inline="true"';
        }
        if(this.icon) {
            html += 'data-icon="' + this.icon + '"';
        }
        if(this.cssClass) {
            html += 'data-theme="' + this.cssClass + '"';
        }
        return html;
    }

});

