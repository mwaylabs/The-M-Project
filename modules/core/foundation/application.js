// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('view_manager.js');

/**
 * @class
 *
 * The root class for an application.
 *
 */
M.Application = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.Application',

    viewManager: M.ViewManager,

    init: function() {
        for(i in this.viewManager.viewList) {
            if(this.viewManager.viewList[i])
            $('#m_7').bind('pageshow', function() {
                alert('bla');
            });
        }
    }

});