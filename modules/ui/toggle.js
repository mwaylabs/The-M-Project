// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root of all toggle views.
 *
 */
M.ToggleView = M.View.extend({

    type: 'M.ToggleView',

    isInFirstState: YES,

    toggleOnClick: NO,

    /**
     * Renders a ToggleView and its child views.
     */
    render: function() {
        this.html += '<div id="' + this.id + '">';

        this.renderChildViews();

        this.html += '</div>';

        this.isInFirstState = !this.isInFirstState;
        
        return this.html;
    },

    /**
     * This method renders the first child view of the toggle view, based on the isInFirstState
     * property: YES = first child view, NO = second child view.
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            var childViewIndex = this.isInFirstState ? 0 : 1;

            if(this[childViews[childViewIndex]]) {
                if(this.toggleOnClick) {
                    this[childViews[childViewIndex]].internalTarget = this;
                    this[childViews[childViewIndex]].internalAction = 'toggleView';
                }
                this.html += this[childViews[childViewIndex]].render();
            } else {
                M.Logger.log('Please make sure that there are two child views defined for the toggle view!', M.WARN);
            }
        }
    },

    /**
     * This method toggles the child views.
     */
    renderUpdateChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            var childViewIndex = this.isInFirstState ? 0 : 1;

            if(this[childViews[childViewIndex]]) {
                if(this.toggleOnClick) {
                    this[childViews[childViewIndex]].internalTarget = this;
                    this[childViews[childViewIndex]].internalAction = 'toggleView';
                }
                this[childViews[childViewIndex]].clearHtml();
                return this[childViews[childViewIndex]].render();
            } else {
                M.Logger.log('Please make sure that there are two child views defined for the toggle view!', M.WARN);
            }
        }
    },

    /**
     * This method toggles the child views by first emptying the toggle view's content
     * and then rendering the next child view by calling renderUpdateChildViews().
     */
    toggleView: function() {
        $('#' + this.id).empty();
        $('#' + this.id).html(this.renderUpdateChildViews());
        this.theme();
        this.isInFirstState = !this.isInFirstState;
    },

    theme: function() {
        this.themeChildViews();
    }

});