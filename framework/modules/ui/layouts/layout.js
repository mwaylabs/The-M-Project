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
 * @extends M.View
 */
M.Layout = M.View.extend(/** @scope M.Layout.prototype */{

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

    /**
     * This method sets the layout's content.
     *
     * @param obj
     * @private
     */
    _setContent: function( obj ) {
        this.$el.empty().append(obj.view.render().el);
    },

    /**
     * This method returns the basic layout markup that provides the skeleton
     * for the views/content that will be displayed inside that layout.
     *
     * This basic implementation of M.Layout won't provide any markup. This is
     * the job of each concrete layout implementation.
     *
     * @returns {String}
     * @private
     */
    _generateMarkup: function() {
        return '';
    }

});