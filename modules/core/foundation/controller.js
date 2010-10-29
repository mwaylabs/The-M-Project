// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('observable.js');

/**
 * @class
 *
 * The root class for every controller.
 *
 */
M.Controller = M.Object.extend({

    lookupTable: null,

    lookupTableLoaded: NO,

    observable: M.Observable.extend({}),

    switchToView: function(view) {
        if(!this.lookupTableLoaded) {
            //M.Logger.log('lookupTableLoaded');
            this.lookupTable = M.Controller.lookupTable;
            this.lookupTableLoaded = YES;
        }
        if(this.lookupTable) {
            if(this.lookupTable[view]) {
                location.href = location.href.substr(0, location.href.lastIndexOf('#')) + '#' + this.lookupTable[view];                
            } else {
                //M.Logger.log('"' + view + '" not found in lookupTable', M.ERROR);
            }
        } else {
            //M.Logger.log('lookupTable undefined', M.ERROR);
        }
    },

    /**
     * Returns the class property behind the given key and informs its observers.
     *
     * @param {String} key The key of the property to be changed.
     * @param {Object, String} value The value to be set.
     */
    set: function(key, value) {
        this[key] = value;
        for(entry in this.observable.bindingList) {
            alert(this.observable.bindingList[entry].observable);
            if(key == this.observable.bindingList[entry].observable) {
                //this.observable.bindingList[entry].observer.update();
                /* DO SOME UPDATE-SHIT */
            }
        }
    }

});