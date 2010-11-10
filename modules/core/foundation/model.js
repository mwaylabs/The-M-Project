// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
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
     * The name of the model.
     *
     * @property {String}
     */
    name: '',

    /**
     * Unique identifier for the model record.
     *
     * Note: Unique doesn't mean that this id is a global unique ID, it is just unique
     * for records of this type of model.
     *
     * @property {Number}
     */
    id: null,

    /**
     * The model's record defines the properties that are semantically bound to this model:
     * e.g. a person's record is in simple case: firstname, lastname, age.
     *
     * @property {Object} record
     */
    record: null,

    /**
     * The model's data provider.
     *
     * Needs a refactoring, also in connection with storageEngine.
     *
     * @property {Object}
     */
    dataProvider: null,

    /**
     * Defines the storage engine to use.
     *
     * Needs a refactoring, also in connection with dataProvider.
     *
     * @property {String}
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
        var modelRecord = this.extend({
            id: M.Application.modelRegistry.getNextId(this.name),
            record: obj
        });
        return modelRecord;
    },

    create: function(obj) {
        var model = this.extend({
            name: obj.__name__
        });
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
     * Create or update a record in storage.
     */
    save: function() {
        if(!this.id) {
            return;
        }

        localStorage.setItem(this.name + '_' + this.id, JSON.stringify(this.record));
    },

    /**
     * Delete a record in storage.
     */
    del: function() {
        if(!this.id) {
            return;
        }
    }

});