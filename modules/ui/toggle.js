// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('view.js');

/**
 * @class
 *
 * The root of all toggle views.
 *
 */
M.ToggleView = M.View.extend({

    type: 'M.ToggleView',

    isInFirstState: YES,

    /**
     * Renders a ToggleView and its child views.
     */
    render: function() {
        var html = '<div id="' + this.id + '"></div>';
        document.write(html);
        
        $('#' + this.id).html(this.renderChildViews());
        this.applyTheme();
        this.isInFirstState = !this.isInFirstState;
    },

    /**
     * This method renders the child views of the toggle view but toggles
     * between the first two defined child views.
     */
    renderChildViews: function() {
        if(this.childViews) {
            var arr = this.childViews.split(' ');
            var childViewIndex = this.isInFirstState ? 0 : 1;
            var html = '';
            
            if(this[arr[childViewIndex]]) {
                this[arr[childViewIndex]].internalTarget = this;
                this[arr[childViewIndex]].internalAction = 'toggleView';
                this[arr[childViewIndex]].renderToDOM = NO;
                html += this[arr[childViewIndex]].render();
            } else {
                M.Logger.log('Please make sure that there are two child views defined for the toggle view!', M.WARN);
            }
        }
        return html;
    },

    toggleView: function() {        
        $('#' + this.id).empty();
        
        $('#' + this.id).html(this.renderChildViews());
        this.applyTheme();
        this.isInFirstState = !this.isInFirstState;
    },

    applyTheme: function() {
        if(this.childViews) {
            var arr = this.childViews.split(' ');
            var childViewIndex = this.isInFirstState ? 0 : 1;
            var html = '';

            if(this[arr[childViewIndex]]) {
                this[arr[childViewIndex]].applyTheme();
            } else {
                M.Logger.log('Please make sure that there are two child views defined for the toggle view!', M.WARN);
            }
        }
    }

});