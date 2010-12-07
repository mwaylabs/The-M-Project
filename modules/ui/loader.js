// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for LoaderViews.
 *
 */
M.LoaderView = M.View.extend(
/** @scope M.LoaderView.prototype */ {

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.LoaderView',

    /**
     * This method shows the loader.
     */
    show: function() {
        $.mobile.pageLoading();
    },

    /**
     * This method hides the loader.
     */
    hide: function() {
        $.mobile.pageLoading(YES);
    }
    
});