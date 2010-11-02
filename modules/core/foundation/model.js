// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   basti
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('data_provider.js');

/**
 * @class
 *
 * The root class for every model.
 *
 */
M.Model = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.Model',

    /**
     * Defines the model's primary key.
     *
     * default: globally unique identifier
     *
     * @property {String}
     */
    primaryKey: 'guid',

    /**
     * globally unique identifier
     *
     * @property {Number}
     */
    guid: null,

    /**
     * The model's data provider.
     *
     * @property {Object}
     */
    dataProvider: null,

    /**
     * Calls the corresponding data provider to fetch data based on the passed query.
     *
     * @param {String} query The query string.
     */
    find: function(query){
        this.dataProvider.find(query);
    },

    create: function(obj) {
        var user = M.Object.create({});
        for(obj_prop in obj) {
            var found = false;
            for(this_prop in this) {
                if(obj_prop == this_prop) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                M.Logger.log('Property ' + obj_prop + ' not found', M.WARN);
            } else {
                user[obj_prop] = obj[obj_prop];
            }
        }
        return user;
    }

});