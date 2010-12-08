// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.ToggleView defines the prototype of any toggle view. A toggle view accepts exactly
 * two child views and provides an easy mechanism to toggle between these two views. An
 * easy example would be to define two different button views that can be toggled, a more
 * complex scenario would be to define two content views (M.ScrollView) with own child views
 * and toggle between them.
 *
 * @extends M.View
 */
M.ToggleView = M.View.extend(
/** @scope M.ToggleView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ToggleView',

    /**
     * States whether the toggle view currently displays its first child view or its second
     * child view.
     *
     * @type Boolean
     */
    isInFirstState: YES,

    /**
     * Determines whether to toggle the view on click. This might be useful if the child views
     * are e.g. buttons.
     *
     * @type Boolean
     */
    toggleOnClick: NO,

    /**
     * Renders a ToggleView and its child views.
     *
     * @private
     * @returns {String} The toggle view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '">';

        this.renderChildViews();

        this.html += '</div>';
        
        return this.html;
    },

    /**
     * This method renders one child view of the toggle view, based on the isInFirstState
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
     * This method is called out of the toggleView method. It basically empties the html
     * representation of the toggle view and then renders the proper child view based on
     * the isInFirstState property: YES = first child view, NO = second child view.
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
        this.isInFirstState = !this.isInFirstState;
        $('#' + this.id).empty();
        $('#' + this.id).html(this.renderUpdateChildViews());
        this.theme();
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the toggle view respectively
     * its child views.
     *
     * @private
     */
    theme: function() {
        this.themeChildViews();
    }

});