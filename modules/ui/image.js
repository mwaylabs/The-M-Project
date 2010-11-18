// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for ImageViews.
 *
 */
M.ImageView = M.View.extend({

    type: 'M.ImageView',

    render: function() {
        this.html += '<img id="' + this.id + '" src="' + this.value + '" />';
        return this.html;
    }

});