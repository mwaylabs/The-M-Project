// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2012 M-Way Solutions GmbH. All rights reserved.
//            (c) 2012 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      07.02.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for the display type: overlay.
 *
 * @type String
 */
M.OVERLAY = 'OVERLAY';

/**
 * A constant value for the display type: reveal.
 *
 * @type String
 */
M.REVEAL  = 'REVEAL';

/**
 * A constant value for the display type: push.
 *
 * @type String
 */
M.PUSH    = 'PUSH';

/**
 * @class
 *
 * The defines the prototype of a panel view.
 *
 * @extends M.View
 */
M.PanelView = M.View.extend(
/** @scope M.PanelView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PanelView',

    /**
    * Defines the position of the Panel. Possible values are:
    *
    * - M.LEFT  => appears on the left
    * - M.RIGHT => appears on the right
    *
    * @type String
    */
    position: M.LEFT,

    /**
    * Defines the display mode of the Panel. Possible values are:
    *
    * - M.OVERLAY  => the panel will appear on top of the page contents
    * - M.REVEAL   => the panel will sit under the page and reveal as the page slides away
    * - M.PUSH     => animates both the panel and page at the same time
    *
    * @type String
    */
    display:  M.REVEAL,

    /**
    * Defines the jqm theme to use.
    *
    * @type String
    */
    dataTheme: 'a',

    /**
     * Renders in three steps:
     * 1. Rendering Opening div tag with corresponding data-role
     * 2. Triggering render process of child views
     * 3. Rendering closing tag
     *
     * @private
     * @returns {String} The scroll view's html representation.
     */
    render: function() {
        this.html = '<div id="' + this.id + '" data-role="panel" ' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Applies some style-attributes to the scroll view.
     *
     * @private
     * @returns {String} The button's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        html += this.dataTheme ? ' data-theme="' + this.dataTheme + '"' : '';
        html += ' data-position="' + (this.position || M.LEFT).  toLowerCase() + '"';
        html += ' data-display="'  + (this.display  || M.REVEAL).toLowerCase() + '"';
        return html;
    },

    /**
     * shows the panel
     *
     * @public
     */
    open: function() {
        $("#"+this.id).panel("open");
    },

    /**
     * hides the panel
     *
     * @public
     */
    close: function() {
        $("#"+this.id).panel("close");
    }

});