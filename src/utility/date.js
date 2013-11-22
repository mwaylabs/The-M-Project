// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      29.03.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================


/**
 *
 * @module M.Date
 *
 * @extends M.Object
 */
M.Date = {

    /**
     * This method is used to create a new instance of M.Date based on the data
     * library moment.js.
     *
     * @returns {Object}
     */
    create: function() {
        var m = moment.apply(this, arguments);
        return _.extend(m, this);
    }
};
