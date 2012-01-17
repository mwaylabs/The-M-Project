// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/model.js');

/**
 * @class
 *
 * The root object for RecordManager.
 *
 * A RecordManager is used by a controllers and is an interface that makes it easy for him to
 * handle his model records.
 *
 * @extends M.Object
 */
M.RecordManager = M.Object.extend(
/** @scope M.RecordManager.prototype */ { 
    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.RecordManager',

    /**
     * Array containing all currently loaded records.
     *
     * @type Object
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

    /**
     * Concats an array if records to the records array.
     *
     * @param {Object} record
     */
    addMany: function(arrOfRecords) {

        if(_.isArray(arrOfRecords)){
            this.records = this.records.concat(arrOfRecords);

        } else if(arrOfRecords.type === 'M.Model') {
            this.add(arrOfRecords);
        }

    },

    /**
     * Resets record list 
     */
    removeAll: function() {
        this.records.length = 0;
    },

    /**
     * Deletes a model record from the record array
     * @param {Number} m_id The internal model id of the model record.
     */
    remove: function(m_id) {

        if(!m_id) {
            M.Logger.log('No id given.', M.WARN);
            return;
        }

        var rec = this.getRecordById(m_id);

        if(rec) {
            this.records = _.select(this.records, function(r){
                return r.m_id !== rec.m_id;
            });
        }

        delete rec;
    },

    /**
    * Returns a record from the record array identified by the interal model id.
    * @param {Number} m_id The internal model id of the model record.
    * @deprecated
    */
    getRecordForId: function(m_id) {
        return this.getRecordById(m_id);
    },

    /**
     * Returns a record from the record array identified by the interal model id.
     * @param {Number} m_id The internal model id of the model record.
     */
    getRecordById: function(m_id) {
        var record = _.detect(this.records, function(r){
            return r.m_id === m_id;
        });
        return record;
    },

    /**
     * Debug method to print out all content from the records array to the console.
     */
    dumpRecords: function() {
        _.each(this.records, function(rec){
            //console.log(rec.m_id);
            console.log(rec);
        });
    }
    
});