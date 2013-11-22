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
 *
 * @module M.Layout
 * @type {*}
 * @extends M.View
 */
M.Layout = M.View.extend(/** @scope M.Layout.prototype */{

    //el: $(".m-perspective"),

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Layout',

    /**
     * This property is used to identify M.Layout and all of its derived object
     * as layouts.
     *
     * @type Boolean
     */
    isMLayout: YES,

    template: '<div></div>',

    childViews: {},

    applyViews: function() {

    },

    _attachToDom: function() {
        return YES;
    },

    setTransition: function( name ) {
        M.PageTransitions.setTransition( name );
    },

    startTransition: function() {
        M.PageTransitions.startTransition();
    },

    destroy: function() {
        this.$el.remove();
        this.$el = null;
    }
});