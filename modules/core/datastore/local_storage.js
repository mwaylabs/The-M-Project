// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
 * Encapsulates access to LocalStorage (in-browser key value store).
 * LocalStorage is an in-browser key-value store to persist data.
 * This data provider persists model records as JSON strings with their name and id as key.
 * When fetching these strings from storage, their automatically converted in their corresponding model records.
 *
 * Operates synchronous.
 *
 * @extends M.DataProvider
 */
M.DataProviderLocalStorage = M.DataProvider.extend(
    /** @scope M.DataProviderLocalStorage.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type:'M.DataProviderLocalStorage',

    /**
     * Saves a model record to the local storage
     * The key is the model record's name combined with id, value is stringified object
     * e.g.
     * Note_123 => '{ text: 'buy some food' }'
     *
     * @param {Object} that (is a model).
     * @returns {Boolean} Boolean indicating whether save was successful (YES|true) or not (NO|false).
     */
    save:function (obj) {
        try {
            //console.log(obj);
            /* add m_id to saved object */
            /*var a = JSON.stringify(obj.model.record).split('{', 2);
             a[2] = a[1];
             a[1] = '"m_id":' + obj.model.m_id + ',';
             a[0] = '{';
             var value = a.join('');*/
            var value = JSON.stringify(obj.model.record);
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id, value);
            return YES;
        } catch (e) {
            M.Logger.log('Error saving ' + obj.model.record + ' to localStorage with key: ' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + this.m_id, M.WARN);
            M.Logger.log('Error ' + e.code + ', ' + e.name + ': ' + e.message);
            return NO;
        }

    },

    /**
     * deletes a model from the local storage
     * key defines which one to delete
     * e.g. key: 'Note_123'
     *
     * @param {Object} obj The param obj, includes model
     * @returns {Boolean} Boolean indicating whether save was successful (YES|true) or not (NO|false).
     */
    del:function (obj) {
        try {
            if (localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id)) { // check if key-value pair exists
                localStorage.removeItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id);
                obj.model.recordManager.remove(obj.model.m_id);
                return YES;
            }
            return NO;
        } catch (e) {
            M.Logger.log('Error removing key: ' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.model.m_id + ' from localStorage', M.WARN);
            return NO;
        }
    },

    /**
     * Finds all models of type defined by modelName that match a key or a simple query.
     * A simple query example: 'price < 2.21'
     * Right now, no AND or OR joins possible, just one query constraint.
     *
     * If no query is passed, all models are returned by calling findAll()
     * @param {Object} The param object containing e.g. the query or the key.
     * @returns {Object|Boolean} Returns an object if find is done with a key, an array of objects when a query is given or no parameter passed.
     * @throws Exception when query tries to compare two different data types
     */
    find:function (obj) {
        if (obj.key) {
            var record = this.findByKey(obj);
            if (!record) {
                return NO;
            }
            /*construct new model record with the saved id*/
            var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_([0-9a-zA-Z]+)$').exec(obj.key);
            var m_id = reg && reg[1] ? reg[1] : null;
            if (!m_id) {
                M.Logger.log('retrieved model has no valid key: ' + obj.key, M.ERR);
                return NO;
            }
            var m = obj.model.createRecord($.extend(record, {m_id:m_id, state:M.STATE_VALID}));
            return m;
        }

        if (obj.query) {
            var q = obj.query;
            var missing = [];
            if (!q.identifier) {
                missing.push('identifier');
            }
            if (!q.operator) {
                missing.push('operator');
            }
            if (q.value === undefined || q.value === null) {
                missing.push('value');
            }

            if (missing.length > 0) {
                M.Logger.log('Wrong query format:', missing.join(', '), ' is/are missing.', M.WARN);
                return [];
            }

            var ident = q.identifier;
            var op = q.operator;
            var val = q.value;

            var res = this.findAll(obj);

            // check if query is correct in respect of data types
            if(res && res.length > 0) {
                var o = res[0];
                if (typeof(o.record[ident]) != o.__meta[ident].dataType.toLowerCase()) {
					if(!(o.__meta[ident].dataType.toLowerCase() == "reference" && typeof(o.record[ident]) == "string"))
						throw 'Query: "' + ident + op + val + '" tries to compare ' + typeof(o.record[ident]) + ' with ' + o.__meta[ident].dataType.toLowerCase() + '.';
                }
            }

            switch (op) {
                case '=':

                    res = _.select(res, function (o) {
                        return o.record[ident] === val;
                    });
                    break;

                case '~=': // => includes (works only on strings)

                    if(obj.model.__meta[ident].dataType.toLowerCase() !== 'string') {
                        throw 'Query: Operator "~=" only works on string properties. Property "' + ident + '" is of type ' + obj.model.__meta[ident].dataType.toLowerCase() + '.';
                    }
                    // escape all meta regex meta characters: \, *, +, ?, |, {, [, (,), ^, $,., # and space
                    var metaChars = ['\\\\', '\\*', '\\+', '\\?', '\\|', '\\{', '\\}', '\\[', '\\]', '\\(', '\\)', '\\^', '\\$', '\\.', '\\#'];

                    for(var i in metaChars) {
                        val = val.replace(new RegExp(metaChars[i], 'g'), '\\' + metaChars[i].substring(1,2));
                    }

                    // replace whitespaces with regex equivalent
                    val = val.replace(/\s/g, '\\s');

                    var regex = new RegExp(val);

                    res = _.select(res, function(o) {
                        return regex.test(o.record[ident]);
                    });

                    break;

                case '!=':
                    res = _.select(res, function (o) {
                        return o.record[ident] !== val;
                    });
                    break;
                case '<':
                    res = _.select(res, function (o) {
                        return o.record[ident] < val;
                    });
                    break;
                case '>':
                    res = _.select(res, function (o) {
                        return o.record[ident] > val;
                    });
                    break;
                case '<=':
                    res = _.select(res, function (o) {
                        return o.record[ident] <= val;
                    });
                    break;
                case '>=':
                    res = _.select(res, function (o) {
                        return o.record[ident] >= val;
                    });
                    break;
                default:
                    M.Logger.log('Query has unknown operator: ' + op, M.WARN);
                    res = [];
                    break;

            }

            return res;

        } else { /* if no query is passed, all models for modelName shall be returned */
            return this.findAll(obj);
        }
    },

    /**
     * Finds a record identified by the key.
     *
     * @param {Object} The param object containing e.g. the query or the key.
     * @returns {Object|Boolean} Returns an object identified by key, correctly built as a model record by calling
     * or a boolean (NO|false) if no key is given or the key does not exist in LocalStorage.
     * parameter passed.
     */
    findByKey:function (obj) {
        if (obj.key) {

            var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX);
            /* assume that if key starts with local storage prefix, correct key is given, other wise construct it and key might be m_id */
            obj.key = reg.test(obj.key) ? obj.key : M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_' + obj.key;

            if (localStorage.getItem(obj.key)) { // if key is available
                return this.buildRecord(obj.key, obj)
            } else {
                return NO;
            }
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
     * @returns {Object} The array of fetched objects/model records. If no records the array is empty.
     */
    findAll:function (obj) {
        var result = [];
        for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i);
            regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_').exec(k);
            if (regexResult) {
                var record = this.buildRecord(k, obj);//JSON.parse(localStorage.getItem(k));

                /*construct new model record with the saved m_id*/
                var reg = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_([0-9a-zA-Z]+)$').exec(k);
                var m_id = reg && reg[1] ? reg[1] : null;
                if (!m_id) {
                    M.Logger.log('Model Record m_id not correct: ' + m_id, M.ERR);
                    continue; // if m_id does not exist, continue with next record element
                }
                var m = obj.model.createRecord($.extend(record, {m_id:m_id, state:M.STATE_VALID}));

                result.push(m);
            }
        }
        return result;
    },

    /**
     * Fetches a record from LocalStorage and checks whether automatic parsing by JSON.parse set the elements right.
     * Means: check whether resulting object's properties have the data type define by their model attribute object.
     * E.g. String containing a date is automatically transfered into a M.Date object when the model attribute has the data type
     * 'Date' set for this property.
     *
     * @param {String} key The key to fetch the element from LocalStorage
     * @param {Object} obj The param object, includes model
     * @returns {Object} record The record object. Includes all model record properties with correctly set data types.
     */
    buildRecord:function (key, obj) {
        var record = JSON.parse(localStorage.getItem(key));
        for (var i in record) {
            if (obj.model.__meta[i] && typeof(record[i]) !== obj.model.__meta[i].dataType.toLowerCase()) {
                switch (obj.model.__meta[i].dataType) {
                    case 'Date':
                        record[i] = M.Date.create(record[i]);
                        break;
                }
            }
        }
        return record;
    },

    /**
     * Returns all keys for model defined by modelName.
     *
     * @param {Object} obj The param obj, includes model
     * @returns {Object} keys All keys for model records in LocalStorage for a certain model identified by the model's name.
     */
    allKeys:function (obj) {
        var keys = [];
        for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i)
            regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + obj.model.name + '_').exec(k);
            if (regexResult) {
                keys.push(k);
            }
        }
        return keys;
    }

});
