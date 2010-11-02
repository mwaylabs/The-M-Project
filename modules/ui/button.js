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
     * Mapping to value attribute.
     * text property is mixed in when extended.
     */
    //value: this.text,

    /**
     * Renders a button as an input tag. Input is automatically converted by jQuery mobile.
     */
    render: function() {        
        html = '<input type="button" id="' + this.id + '" value="' + this.value + '"/>';
        document.write(html);
    }

});