// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

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
        this._getsVisible();
    },

    _attachToDom: function() {
        return YES;
    },

    setTransition: function( name ) {
        M.PageTransitions.setTransition( name );
    },

    startTransition: function() {
        M.PageTransitions.startTransition();
        this._getsVisible();
    },

    isAnimating: function() {
        return M.PageTransitions.isAnimating();
    },

    destroy: function() {
        this.$el.remove();
        this.$el = null;
        this.childViews = null;
        M.PageTransitions.reset();
    }
});