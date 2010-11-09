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
 * Controllers, respectively their properties, are observables. Views can observe them.
 *
 */
M.Controller = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.Controller',

    /**
     * Makes the controller's properties observable.
     */
    observable: M.Observable.extend({}),

    /**
     * Helper function to build the location href for the view to be displayed.
     *
     * @param {String} id The id of the new target.
     */
    buildLocationHref: function(id) {
        return location.pathname + '#' + id;
    },

    /**
     * Returns the class property behind the given key and informs its observers.
     *
     * @param {Object} view The view to be displayed.
     */
    switchToView: function(view) {
        var id = M.ViewManager.getIdByView(view);
        if(id) {
            location.href = this.buildLocationHref(id);
        } else {
            M.Logger.log('"' + view + '" not found', M.WARN);
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

        _.each(this.observable.bindingList, function(entry){
            if(key === entry.observable){
                entry.observer.contentDidChange();
            }
        });
    }

});