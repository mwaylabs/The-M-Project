// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for Pages.
 *
 */
M.PageView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.PageView',

    /**
     * Is set to NO once the page was first loaded.
     *
     * @property {Boolean}
     */
    isFirstLoad: YES,

    /**
     * Renders in three steps:
     * 1. Rendering Opening div tag with corresponding data-role
     * 2. Triggering render process of child views
     * 3. Rendering closing tag
     */
    render: function() {
        this.html += '<div id="' + this.id + '" data-role="page">';

        this.renderChildViews();

        this.html += '</div>';

        this.writeToDOM();
        this.theme();
    },

    /**
     * This method is called if the page is loaded. It is then delegated to the view's
     * specified onLoad-method.
     */
    pageDidLoad: function() {
        if(this.onLoad) {
            this.onLoad.target[this.onLoad.action](this.isFirstLoad);            
        }

        /* WORKAROUND for being able to use more than two tab items within a tab bar */
        /* TODO: Get rid of this workaround with a future version of jquery mobile */
        if(this.isFirstLoad && this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.TabBarView') {
                    $('[data-id="' + view.name + '"]:not(:last-child)').each(function() {
                        if(!$(this).hasClass('ui-footer-duplicate')) {
                            $(this).empty();
                            $(this).hide();
                        }
                    });
                }
            }
        }

        this.isFirstLoad = NO;
    },


    /**
     * This method is called if the device's orientation changed.
     */
    orientationDidChange: function(orientation) {
        if(this.onOrientationChange) {
            this.onOrientationChange.target[this.onOrientationChange.action](orientation);
        }
    },

    /**
     * This method triggers the styling of the page and its subviews.
     */
    theme: function() {
        $('#' + this.id).page();
        this.themeChildViews();
    }
    
});