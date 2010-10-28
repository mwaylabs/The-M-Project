// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('logger.js');

/**
 * @class
 *
 * The root class for every controller.
 *
 */
M.Controller = M.Object.extend({

    lookupTable: null,

    lookupTableLoaded: NO,

    switchToView: function(view) {
        if(!this.lookupTableLoaded) {
            M.Logger.log('lookupTableLoaded');
            this.lookupTable = M.Controller.lookupTable;
            this.lookupTableLoaded = YES;
        }
        if(this.lookupTable) {
            if(this.lookupTable[view]) {
                location.href = location.href.substr(0, location.href.lastIndexOf('#')) + '#' + this.lookupTable[view];                
            } else {
                M.Logger.log('"' + view + '" not found in lookupTable', M.ERROR);
            }
        } else {
            M.Logger.log('lookupTable undefined', M.ERROR);
        }
    }

});