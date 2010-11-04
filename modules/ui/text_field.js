// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

/**
 * @class
 *
 * The root object for TextFieldViews.
 *
 */
M.TextFieldView = M.View.extend({


   /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.TextFieldView',

    name: '',

    initialText: '',

    /**
     * Renders a TextFieldView
     */
    render: function() {
        var html = '<div ' + this.style() + ' data-role="fieldcontain">';
        html += '<input type="text" name="' + this.name + '" id="' + this.id + '" value="' + this.initialText + '" />';
        html += '</div>';
        document.write(html);

        
    },

    /**
     *
     */
    style: function() {
        var html = 'style="';
        if(this.isInline) {
            html += 'display:inline;';
        }
        html += '"';
        return html;
    }

});
