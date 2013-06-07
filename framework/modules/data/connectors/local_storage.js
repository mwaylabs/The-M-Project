// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      17.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.DataConnectorLocalStorage = M.DataConnector.extend({

    _type: 'M.DataConnectorLocalStorage',

    /**
     * Builds a key based on the two parameters:
     *
     * <name>_<id>
     *
     * @param name The name of the model
     * @param id The id of the record to save. Needs to be saved in key to be able to overwrite records in LS
     * @private
     * @returns String key The key to identify a model in LS
     */
    _buildKey: function(name, id) {
        return name + '_' + id;
    },

    create: function(obj) {
        var connector = this.extend(obj);
        connector.configure(obj.config);
        return connector;
    },

    /**
     * Finds record(s) from local storage.
     *
     * Search can be circumscribed by a M.DataSelector.
     *
     * @param obj Parameter object that holds
     *      - a record that shall be searched for in LS
     *      - optionally a M.DataSelector (in 'where' property)
     *
     * @returns {M.Collection} collection
     */
    find: function( obj ) {
        var entity      = this.getEntity(obj);
        var collection = this.getCollection(entity);

        var model = obj.model;

        if (this._checkData(obj, data)) {
            var length = localStorage.length;
            var regexResult; // regex to filter by model name
            var data; // record data stored in LS and parsed to an object
            var key; // key of an item
            var regExId; // regex to extract ID from key
            var id; // id of the record
            var record; // holds the newly created record

            /**
             * We need to iterate over all keys and filter by model name
             */
            for(var i = 0; i < length; i++) {
                key = localStorage.key(i);

                regexResult = new RegExp('^' + model.getName() + '_').exec(key);

                if(regexResult) {
                    try {
                        data = JSON.parse(localStorage.getItem(key));
                    } catch(e) {
                        M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while parsing record data from local storage: ' , e);
                    }

                    /* extract original ID from key */
                    regExId= new RegExp('^' + obj.data.getName() + '_(.+)$').exec(k);
                    id = reg && reg[1] ? reg[1] : null;

                    record = model.createRecord(data);
                    if(id) {
                        record.setId(id);
                        collection.add(record);
                    }
                }
            }
        }

        if(obj.where) {
            collection = collection.find({
                where: obj.where
            });
        }

        return collection;
    },

    /**
     * Saves record(s) to local storage by stringifying them
     *
     * @param {Object|Array|M.Collection} obj A record or a M.Collection (array) of records
     */
    save: function(obj) {
        var that = this;

        var data = this.getData(obj);

        if (this._checkData(obj, data)) {

            var serializedData;

            var records = this._getRecordsAsArray(obj);

            _.each(records, function(rec) {
                try {
                    serializedData = JSON.stringify(rec.getData());
                    localStorage.setItem(that._buildKey(rec.getName(), rec.getId()), serializedData);
                } catch(e) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while saving record to local storage: ' , e);
                }
            });
        }
    },

    /**
     * Deletes record(s) from local storage
     *
     * @param {Object|Array|M.Collection} obj
     */
    del: function(obj) {
        var that = this;

        var data = this.getData(obj);

        if(this._checkData(obj, data)) {
            var records = this._getRecordsAsArray(obj);

            _.each(records, function(rec) {
                try {
                    localStorage.removeItem(that._buildKey(rec.getName(), rec.getId()));
                } catch(e) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while removing record from local storage: ' , e);
                }
            });
        }
    },

    _getRecordsAsArray: function(obj) {
        var records = [];

        if(_.isObject(obj.data) && !_.isArray(obj.data) && !_.isFunction(obj.data.getRecords)) { /* case: one record passed */
            records = [ obj.data ]
        } else if ( _.isArray(obj.data)) { /* case: plain array of records passed */
            records = obj.data;
        } else if( _.isFunction(obj.getRecords)) { /* case: M.Collection passed */
            records = obj.getRecords();
        } else if( _.isFunction(obj.data.getRecords)) { /* case: M.Collection passed */
            records = obj.data.getRecords();
        }

        return records;
    }


});