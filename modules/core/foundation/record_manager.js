// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/model.js');

/**
 * @memberOf M
 * @class
 *
 * The root object for RecordManager.
 *
 * A RecordManager is used by a controllers and is an interface that makes it easy for him to
 * handle his model records.
 */
M.RecordManager = M.Object.extend(
/** @scope M.RecordManager.prototype */ { 
    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.RecordManager',

    /**
     * Array containing all currently loaded records.
     *
     * @property {Object}
     */
    records: [],

    /**
     * Add the given model to the modelList.
     *
     * @param {Object} record
     */
    add: function(record) {
        this.records.push(record);
    },

    addMany: function(arrOfRecords) {

        if(_.isArray(arrOfRecords)){
            this.records = this.records.concat(arrOfRecords);

        } else if(arrOfRecords.type === 'M.Model') {
            this.add(arrOfRecords);
        }

    },

    removeAll: function() {
        this.records.length = 0;
    },

    remove: function(id) {
        if(!id) {
            M.Logger.log('No id given.', M.WARN);
            return;
        }
        if(typeof(id) === 'string') {
            id = parseInt(id);
        }
        rec = this.getRecordForId(id);
        if(rec) {
            this.records = _.select(this.records, function(r){
                return r.id !== rec.id;
            });
        }
    },

    getRecordForId: function(id) {
        var record = _.detect(this.records, function(r){
            return r.id === id;
        });
        return record;
    },

    /**
     * Debug method to print out all content from the records array to the console.
     */
    dumpRecords: function() {
        _.each(this.records, function(rec){
            console.log(rec.id);
        });
    }
    
});