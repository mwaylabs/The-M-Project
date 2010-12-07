// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      01.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for ContainerView.
 *
 */
M.ContainerView = M.View.extend(
/** @scope M.ContainerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ContainerView',

    /**
     * Renders a simple div container and applies css classes if specified.
     */
    render: function() {
        this.html += '<div id="' + this.id + '"' + this.style() + '></div>';      
        return this.html;
    },

    /**
     * Applies some style-attributes to the container view.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});