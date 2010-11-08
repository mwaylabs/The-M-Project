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
M.LEFT = 0;
M.CENTER = 1;
M.RIGHT = 2;

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
        /*
        data-nobackbtn="true"
         */
        var html = '<div id="' + this.id + '" data-role="' + this.anchorLocation + '" data-position="fixed">';        
        document.write(html);
        //<h1>' + this.value + '</h1><a href="#" data-icon="gear" class="ui-btn-right">Edit</a>

        this.renderChildViews();

        html = '</div>';
        document.write(html);
    },

    renderUpdate: function() {
        $('#' + this.id + ' h1').html(this.value);
    },

    /**
     * Triggers render() on all children.
     */
    renderChildViews: function() {
        if(this.childViews) {
            var arr = this.childViews[0].split(' ');

            /* A ToolbarView accepts only 3 childViews, one for each location: left, center, right */
            if(arr.length > 3) {
                M.Logger.log('To many childViews defined for toolbarView.', M.WARN);
                return;
            }

            for(var i in arr) {
                var view = this[arr[i]];
                switch (view.anchorLocation) {
                    case M.LEFT:
                        var html = '<div class="ui-btn-left">';
                        document.write(html);
                        view.render();
                        html = '</div>';
                        document.write(html);
                        break;
                    case M.CENTER:
                        var html = '<h1>';
                        document.write(html);                            
                        view.render();
                        html = '</h1>';
                        document.write(html);
                        break;
                    case M.RIGHT:
                        var html = '<div class="ui-btn-right">';
                        document.write(html);
                        view.render();
                        html = '</div>';
                        document.write(html);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    
});