// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

/**
 * @class
 *
 * The root object for ListViews.
 *
 */
M.ListView = M.View.extend({

    type: 'M.ListView',

    render: function() {
        var html = '<ul id="' + this.id + '" data-role="listview">';
        document.write(html);

        this.renderChildViews();

        html = '</ul>';
        document.write(html);
    },

    renderChildViews: function() {
        
    },

    renderUpdate: function() {
        
    }

});