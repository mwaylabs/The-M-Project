// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      15.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * Encapsulates access to LocalStorage (in-browser key value store)
 */
M.LocalStorageProvider = M.DataProvider.extend({

    type: 'M.LocalStorageProvider',

    /**
     * saves a model to the local storage
     * key is name combined with id, value is stringified object
     * e.g.
     * Note_123 => '{ text: 'buy some food' }'
     *
     * @param {Object} that (is a model).
     */
    save: function(obj) {
        try {
            console.log(obj);
            localStorage.setItem(obj.model.name + '_' + obj.model.id, JSON.stringify(obj.model.record));
            return YES;
        } catch(e) {
            M.Logger.log(M.WARN, 'Error saving ' + obj.model.record + ' to localStorage with ID: ' + obj.model.name + '_' + that.id);
        }

    },              

    /**
     * deletes a model from the local storage
     * key defines which one to delete
     * e.g. key: 'Note_123'
     *
     * @param {Object} obj The param obj, includes model
     */
    del: function(obj) {
        try {
            localStorage.removeItem(obj.model.name + '_' + obj.model.id);
        } catch(e) {
            M.Logger.log(M.WARN, 'Error removing ID: ' + obj.model.name + '_' + obj.model.id + ' from localStorage');
        }
    },

    /**
     * Finds all models of type defined by modelName that match a simple query.
     * A simple query example: 'price < 2.21'
     * Right now, no AND or OR joins possible, just one query constraint.
     *
     * If no query is passed, all models are returned by calling findAll()
     * @param {String} modelName
     * @param {String} query
     * TODO: change to work with param obj that includes a model 
     */
    find: function(obj) {
        if(obj.query){
            /**
             * RegEx to match simple queries. E.g.:
             * username = 'paul'
             * price < 12.23
             * result >= -23
             * Captures:
             * 1:   identifier      ( e.g. price )      => (\w*)
             * 2:   operator        ( e.g. < )          => ([<>!=]{1,2}) (actually !! is also allowed but will result in an error
             * 3:   value           ( e.g. 12.23 )      => String or Number: (['"]\w*['"]|(-)?\d+(\.\d+)?)
             */
            var query_regex = /^\s*(\w*)\s*([<>!=]{1,2})\s*(['"]?\w*['"]?|(-)?\d+(\.\d+)?)\s*$/;
            var regexec = query_regex.exec(obj.query);
            if(regexec) {
                var ident = regexec[1];
                var op = regexec[2];
                var val = regexec[3].replace(/['"]/g, "");/* delete quotes from captured string, needs to be done in regex*/
                var res = this.findAll(obj);
                switch(op) {
                    case '=':
                        res = _.select(res, function(o){
                            return o.record[ident] === val;
                        });
                        break;
                    case '!=':
                        res = _.select(res, function(o){
                            return o.record[ident] !== val;
                        });
                        break;
                    case '<':
                        res = _.select(res, function(o){
                            return o.record[ident] < val;
                        });
                        break;
                    case '>':
                        res = _.select(res, function(o){
                            return o.record[ident] > val;
                        });
                        break;
                    case '<=':
                        res = _.select(res, function(o){
                            return o.record[ident] <= val;
                        });
                        break;
                    case '>=':
                        res = _.select(res, function(o){
                            return o.record[ident] >= val;
                        });
                        break;
                    default:
                        M.Logger.log('Unknown operator in query: ' + op, M.WARN);
                        res = [];
                        break;
                }
            } else{
                M.Logger.log('Query does not satisfy query grammar.', M.WARN);
                res = [];
            }

            return res;
            
        } else { /* if no query is passed, all models for modelName shall be returned */
            return this.findAll(obj);
        }

    },

    findByKey: function(key) {
        if(key) {
            return JSON.parse(localStorage.getItem(k));
        }
        M.Logger.log("Please provide a key.", M.WARN);
        return NO;
    },

    /**
     * Returns all models defined by modelName.
     *
     * Models are saved with key: Modelname_ID, e.g. Note_123
     *
     * @param {Object} obj The param obj, includes model
     */
    findAll: function(obj) {
        var result = [];
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i);
            regexResult = new RegExp('^' + obj.model.name + '_').exec(k);
            if(regexResult) {
                var record = JSON.parse(localStorage.getItem(k));

                /*construct new model record with the saved id*/
                var reg = new RegExp('^' + obj.model.name + '_([0-9]+)').exec(k);
                var m_id = reg && reg[1] ? reg[1] : null;
                if (!m_id) {
                    M.Logger.log('retrieved model has no valid key: ' + k, M.ERROR);
                    return;
                }
                var m = obj.model.createRecord($.extend(record, {id: m_id, state: M.STATE_VALID}));
                
                result.push(m);
            }
        }
        return result;
    },

    /**
     * Returns all keys for model defined by modelName.
     *
     * @param {Object} obj The param obj, includes model
     */
    allKeys: function(obj) {
        var result = [];
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i)
            regexResult = new RegExp('^' + obj.model.name + '_').exec(k);
            if(regexResult) {
                result.push(k);
            }
        }
        return result;    
    }

});