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
 * The root object for LabelViews.
 *
 */
M.LabelView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.LabelView',

    /**
     * Mapping to value attribute.
     * text property is mixed in when extended.
     */
    //value: this.text,

    /**
     * Renders a LabelView as a div tag with corresponding data-role attribute and inner text defined by value
     */
    render: function() {
        html = '<div id="' + this.id + '">' + this.value + '</div>';
        document.write(html);
    },

    /**
     * Updates the value of the label with DOM access by jQuery. 
     */
    renderUpdate: function() {
        $('#' + this.id).html(this.value);
    }

});