// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   basti
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

//m_require('data_provider.js');
m_require('model_registry.js');

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
     * the name of the model.
     */
    name: '',

    /**
     * Unique identifier
     *
     * @property {Number}
     */
    id: null,

    /**
     * The model's data provider.
     *
     * @property {Object}
     */
    dataProvider: null,

    /**
     * Defines the storage engine to use.
     *
     * Needs a refactoring, also in connection with dataProvider.
     */
    storageEngine: M.WebStorage,

    /**
     * Calls the corresponding data provider to fetch data based on the passed query.
     *
     * @param {String} query The query string.
     */
    find: function(query){
        this.dataProvider.find(query);
    },

    newRecord: function(obj) {
        var modelRecord = M.Object.create({});
        for(obj_prop in obj) {
            var found = false;
            for(this_prop in this.record) {
                if(obj_prop === this_prop) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                M.Logger.log('Property ' + obj_prop + ' not found', M.WARN);
            } else {
                modelRecord[obj_prop] = obj[obj_prop];
            }
        }
        return modelRecord;
    },

    create: function(obj) {
        var model = this.extend({name: obj.__name__});
        delete obj.__name__;

        /**
         * the model's record defines the properties that are semantically bound to this model:
         * e.g. a person's record is in simple case: firstname, lastname, age.
         */
        model.record = obj;
        M.Application.modelRegistry.register(model.name);
        return model;
    },

    /**
     * Persist model to storage.
     */
    save: function() {
        
    }

});