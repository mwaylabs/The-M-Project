// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
     * Contains a reference to the currently displayed view.
     *
     * @type M.View
     */
    currentView: null,

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
            var childViews = this.getChildViewsAsArray();

            if(childViews.length !== 2) {
                M.Logger.log('M.ToggleView requires exactly 2 child views, but ' + childViews.length + ' are given (' + (this.name ? this.name + ', ' : '') + this.id + ')!', M.WARN);
            } else {
                for(var i in childViews) {
                    if(this[childViews[i]]) {
                        if(this.toggleOnClick) {
                            this[childViews[i]].internalEvents = {
                                tap: {
                                    target: this,
                                    action: 'toggleView'
                                }
                            }
                        }
                        this[childViews[i]]._name = childViews[i];
                        this[childViews[i]].parentView = this;
                        
                        this.html += '<div id="' + this.id + '_' + i + '">';
                        this.html += this[childViews[i]].render();
                        this.html += '</div>';
                    }
                }
                this.currentView = this[childViews[0]];
            }
        }
    },

    /**
     * This method toggles the child views by first emptying the toggle view's content
     * and then rendering the next child view by calling renderUpdateChildViews().
     */
    toggleView: function(id, event, nextEvent) {
        this.isInFirstState = !this.isInFirstState;
        var currentViewIndex = this.isInFirstState ? 0 : 1;
        $('#' + this.id + '_' + currentViewIndex).show();
        $('#' + this.id + '_' + (currentViewIndex > 0 ? 0 : 1)).hide();

        /* set current view */
        var childViews = this.getChildViewsAsArray();
        if(this[childViews[currentViewIndex]]) {
            this.currentView = this[childViews[currentViewIndex]];
        }

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * This method can be used to set on of the toggle view's child views as the active one. Simply pass
     * the view, its id or its name.
     *
     * If a view or id is passed, that does not match on of the toggle view's child views, nothing will be
     * done.
     *
     * @param {Object|String} view The corresponding view.
     */
    setView: function(view) {
        if(typeof(view) === 'string') {
            /* assume a name was given */
            var childViews = this.getChildViewsAsArray();
            if(_.indexOf(childViews, view) >= 0) {
                view = this[view];
            /* assume an id was given */
            } else {
                view = M.ViewManager.getViewById(view) ? M.ViewManager.getViewById(view) : view;
            }
        }

        if(view && typeof(view) === 'object' && view.parentView === this) {
            if(this.currentView !== view) {
                this.toggleView();
            }
        } else {
            M.Logger.log('No valid view passed for toggle view \'' + this._name + '\'.', M.WARN);
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the toggle view respectively
     * its child views.
     *
     * @private
     */
    theme: function() {
        if(this.currentView) {
            this.themeChildViews();
            var currentViewIndex = this.isInFirstState ? 0 : 1;

            $('#' + this.id + '_' + (currentViewIndex > 0 ? 0 : 1)).hide();
        }
    }

});