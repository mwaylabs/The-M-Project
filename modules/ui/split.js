// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for any button view. A button is a view element that is
 * typically.........
 *
 * @extends M.View
 */
M.SplitView = M.View.extend(
/** @scope M.SplitView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SplitView',

    menu: null,

    content: null,

    /**
     * Renders a split view.
     *
     * @private
     * @returns {String} The split view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '">';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Render child views.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            if(childViews.length === 2) {
                for(var i in childViews) {
                    if(this[childViews[i]] && this[childViews[i]].type === 'M.ScrollView') {
                        if(parseInt(i) === 0) {
                            this.menu = this[childViews[i]];
                            this[childViews[i]].cssClass = this[childViews[i]].cssClass ? this[childViews[i]].cssClass + ' ui-splitview-menu' : 'ui-splitview-menu'
                        } else {
                            this.content = this[childViews[i]];
                            this[childViews[i]].cssClass = this[childViews[i]].cssClass ? this[childViews[i]].cssClass + ' ui-splitview-content' : 'ui-splitview-content'
                        }
                        this.html += this[childViews[i]].render();
                    } else if(this[childViews[i]] && this[childViews[i]].type) {
                        M.Logger.log('The child view \'' + childViews[i] + '\' of M.SplitView is of type ' + this[childViews[i]].type + ' but needs to be of type M.ScrollView.', M.ERROR);
                    } else {
                        M.Logger.log('The child view \'' + childViews[i] + '\' of M.SplitView needs to be of type M.ScrollView.', M.ERROR);
                    }
                }
                return this.html;
            } else {
                M.Logger.log('You need to provide two child views for M.SplitView.', M.ERROR);
            }
        }
    },

    /**
     * Render update.
     *
     * @private
     */
    renderUpdate: function() {
        // ...
    },

    /**
     * Theme.
     *
     * @private
     */
    theme: function() {
        // ...
    }

});