// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

M.TWO_COLUMNS = {
    cssClass: 'ui-grid-a',
    columns: {
        0: 'ui-block-a',
        1: 'ui-block-b'
    }
};
M.THREE_COLUMNS = {
    cssClass: 'ui-grid-b',
    columns: {
        0: 'ui-block-a',
        1: 'ui-block-b',
        2: 'ui-block-c'
    }
};

/**
 * @class
 *
 * The root object for GridViews.
 *
 */
M.GridView = M.View.extend({

    type: 'M.GridView',

    layout: null,

    /**
     * Renders a GridView based on the specified layout.
     */
    render: function() {
        var html = '<div id="' + this.id + '" ' + this.style() + '>';
        document.write(html);

        this.renderChildViews();
        
        html = '</div>';
        document.write(html);
    },

    /**
     * Triggers render() on all children and includes some special GridView logic
     * concerning the rendering of these child views.
     */
    renderChildViews: function() {
        if(this.childViews) {
            if(this.layout) {
                var arr = this.childViews[0].split(' ');
                for(var i in this.layout.columns) {
                    if(this[arr[i]]) {
                        var html = '<div class="' + this.layout.columns[i] + '">';
                        document.write(html);

                        this[arr[i]].render();

                        html = '</div>';
                        document.write(html);
                    }
                }
            } else {
                M.Logger.log('No layout specified for GridView', M.ERROR);
            }
        }
    },

    /**
     * Applies some style-attributes to the grid.
     */
    style: function() {
        if(this.layout) {
            var html = 'class="' + this.layout.cssClass + '"';
            return html;
        }
    }

});