// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      07.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */

(function() {
    M.LayoutManager = M.Object.extend(/** @scope M.LayoutManager.prototype */{

        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.LayoutManager',

        /**
         * This method sets the layout of an application. It triggers the rendering
         * process on the desired layout and appends it to the live DOM.
         *
         * @param layout
         */
        setLayout: function( layout ) {

            this._first = YES;

            if( !(layout && layout.isMLayout) ) {
                layout = new M.Layout();
            }

            this.layout = layout;

            /* empty the body and append the given layout */
            //$('body').empty().append(this.layout.render().el);

            /* return reference to layout manager to enable chaining calls */
            return this;
        },

        /**
         * This method sets the content of the currently active layout. It requires
         * an object as its only parameter.
         *
         * @param obj
         */
        setContent: function( obj ) {
            this.layout._setContent(obj);

            /* return reference to layout manager to enable chaining calls */
            return this;
        },

        next: function() {
            this.layout._next(1);
        }

    });

})(M);