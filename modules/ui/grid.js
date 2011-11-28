// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for a two column layout of a grid view.
 *
 * @type String
 */
M.TWO_COLUMNS = {
    cssClass: 'ui-grid-a',
    columns: {
        0: 'ui-block-a',
        1: 'ui-block-b'
    }
};

/**
 * A constant value for a three column layout of a grid view.
 *
 * @type String
 */
M.THREE_COLUMNS = {
    cssClass: 'ui-grid-b',
    columns: {
        0: 'ui-block-a',
        1: 'ui-block-b',
        2: 'ui-block-c'
    }
};

/**
 * A constant value for a four column layout of a grid view.
 *
 * @type String
 */
M.FOUR_COLUMNS = {
    cssClass: 'ui-grid-c',
    columns: {
        0: 'ui-block-a',
        1: 'ui-block-b',
        2: 'ui-block-c',
        3: 'ui-block-d'
    }
};

/**
 * @class
 *
 * M.GridView defines a prototype of a grid view, that allows you to display several
 * views horizontally aligned. Therefore you can either use a predefined layout or you
 * can provide a custom layout.
 * 
 * @extends M.View
 */
M.GridView = M.View.extend(
/** @scope M.GridView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.GridView',

    /**
     * The layout for the grid view. There are two predefined layouts available:
     * 
     * - M.TWO_COLUMNS: a two column layout, width: 50% / 50%
     * - M.THREE_COLUMNS: a three column layout, width: 33% / 33% / 33%
     * - M.FOUR_COLUMNS: a four column layout, width: 25% / 25% / 25%
     *
     * To specify your own layout, you will have to implement some css classes and
     * then define your layout like:
     *
     *     cssClass: 'cssClassForWholeGrid',
     *     columns: {
     *         0: 'cssClassForColumn1',
     *         1: 'cssClassForColumn2',
     *         2: 'cssClassForColumn3',
     *         3: 'cssClassForColumn4',
     *         //........
     *     }
     *
     * @type Object
     */
    layout: null,

    /**
     * Renders a grid view based on the specified layout.
     *
     * @private
     * @returns {String} The grid view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '" ' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Triggers render() on all children and includes some special grid view logic
     * concerning the rendering of these child views.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            if(this.layout) {
                var arr = this.childViews.split(' ');
                for(var i in this.layout.columns) {
                    if(this[arr[i]]) {
                        this.html += '<div class="' + this.layout.columns[i] + '">';

                        this[arr[i]]._name = arr[i];
                        this.html += this[arr[i]].render();

                        this.html += '</div>';
                    }
                }
            } else {
                M.Logger.log('No layout specified for GridView (' + this.id + ')!', M.WARN);
            }
        }
    },

    /**
     * This method themes the grid view, respectively its child views.
     *
     * @private
     */
    theme: function() {
        this.themeChildViews();
    },

    /**
     * Applies some style-attributes to the grid view.
     *
     * @private
     * @returns {String} The grid view's styling as html representation.
     */
    style: function() {
        if(this.layout) {
            var html = 'class="' + this.layout.cssClass + '"';
            return html;
        }
    }

});