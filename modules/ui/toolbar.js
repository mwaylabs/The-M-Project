// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

M.TOP = 'header';
M.BOTTOM = 'footer';

/**
 * @class
 *
 * The root object for ToolbarViews.
 *
 */
M.ToolbarView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ToolbarView',

    /**
     * Mapping to value attribute.
     * text property is mixed in when extended.
     */
    //value: this.text,

     /**
     * Defines the position of the Toolbar.
     *
     * default: M.TOP => is a header bar
     *
     * @property {String}
     */
    anchorLocation: M.TOP,

    /**
     * Renders a toolbar as a div tag with corresponding data-role attribute and inner h1 child tag
     * (representing the title of the header)
     */
    render: function() {
        var html = '<div id="' + this.id + '" data-role="' + this.anchorLocation + '" data-position="fixed"><h1>' + this.value + '</h1></div>';
        document.write(html);
    },

    renderUpdate: function() {
        
    }
    
});