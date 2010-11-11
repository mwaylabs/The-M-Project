// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../foundation/object.js');

/**
 * @class
 * 
 * Object for simpler handling of dates
 *
 */
M.Date = M.Object.extend({


    /**
     * Returns the current date, e.g.
     * Thu Nov 11 2010 14:20:55 GMT+0100 (CET)
     */
    now: function() {
        return new Date();
    }

    /*tomorrow: function() {
        
    },*/

    /*yesterday: function() {
        
    },

    daysFromNow: function(days) {
        return new Date() + 2;
    }*/

});