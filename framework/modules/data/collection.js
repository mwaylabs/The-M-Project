// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      02.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.Collection = M.Object.extend({

    _type: 'M.Collection',

    _model: null,
    
    _records: null,

    create: function(model) {

        var collection = this.extend({
            _model: model,
            _records: []            
        });
        return collection;
    },

    add: function(record) {
        var rec = this._asRecord(record);
        if (rec) {
            this._records.push(rec);
        }
        return this;
    },

    set: function(record) {
        var rec = this._asRecord(record);
        if (rec) {
            var index = this.indexOf(rec);
            if (index >= 0) {
                this._records[index] = rec;
            } else {
                this._records.push(rec);
            }
        }
        return this;
    },

    _asRecord: function(record) {
        if (M.Model.isPrototypeOf(record)) {
            return record;
        } else if ( _.isObject(record) && this._model) {
            return this._model.createRecord(record);
        }
    },

    indexOf: function(item) {
        var id = M.Model.isPrototypeOf(item) ? item.getId() : item;
        var index = -1;
        return _.find(this._records, function(record) {
            index++;
            return record.getId() == id;
        }) ? index : -1;
    },

    remove: function(item) {
        var id = M.Model.isPrototypeOf(item) ? item.getId() : item;
        this._records = _.reject(this._records, function(record) {
             return record.getId() == id;
        });

        return this;
    },

    changeKey: function(oldKey, newKey) {
        var record = this.get(oldKey);
        if (record) {
            record.setId(newKey);
        }
    },

    getAt: function(index) {
        return this._records[index];
    },

    get: function(item) {
        var id = M.Model.isPrototypeOf(item) ? item.getId() : item;
        return _.find(this._records, function(record) {
             return record.getId() == id;
        });
    },

    find: function(obj) {
        if (obj && (obj.id || obj.where)) {
            var selector = obj.where ? M.DataSelector.create(obj.where) : null;
            var collect = M.Collection.create(this._model);
            var records = records || this._records;
            _.each(records, function(record) {
                if (!obj.id || record.getId() === obj.id) {
                    if (!selector || selector.matches(record)) {
                        collect.add(record);
                    }
                }
            });
            if (obj.sort) {
                collect.sortBy(M.DataSelector.compileSort(obj.sort));
            }
            return collect;
        } else {
            return this;
        }
    },

    clear: function() {
        this._records = [];
        return this;
    },

    getCount: function() {
        return this._records.length;
    },

    getRecords: function() {
        return this._records;
    },

    getData: function() {
        var records = this._records || [];
        var data = [];
        _.each(records, function(record) {
            var rec = record.getData();
            if ( _.isObject(rec)) {
                data.push(rec);
            }
        });
        return data;
    },

    /**
     * Sorts records based on either
     * - a property name and a sorting order (ASC|DESC) passed in as object or
     * - a sort function that always receives two records that can
     *   compared. The function must return a value lower, equal or higher
     *   than 0. Based on this return value the sorting is applied.
     *
     * @param {Object|Function} param A function or an object defining the sort criterias
     * @param {Boolean} doNotModifyRecord Flag determing whether the sorting should modify the internal record
     * or just return it
     * @returns {M.Collection} The collection itself to allow chaining of methods
     */
    sortBy: function(param, doNotModifyRecord) {
        if( _.isObject(param) && !_.isFunction(param)) {
            this._records = this._sortByProperty(param);
        } else if( _.isFunction(param)) {
            this._records = this._sortByFunction(param);
        } else {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'No sorting applied. \'sortBy\' needs a sort function or a sort criteria object as parameters.');
        }

        return this;
    },

    _sortByProperty: function(obj) {
        var records = this._records;
        if(obj.property) {
            records = _.sortBy(records, function(el) {
                return el.get(obj.property);
            });
        }

        if(obj.order === M.CONST.ORDER.DESC) {
            records = records.reverse();
        }

        return records;
    },

    _sortByFunction: function(f) {
        var sorted = this._records.sort(f);
        return sorted;
    },

    /**
     *
     * @param func
     * @param options
     * @returns {*}
     */
    filter: function(func, options) {
        if(_.isFunction(func)) {
            var records = this._records;

            /**
             * Select by user defined filter criteria
             * => function that receives each record and
             * returns a boolean based on a condition
             *
             */
            records = _.select(this.getRecords(), function(rec) {
                return func(rec);
            });

            if(_.isObject(options)) {
                if(options.limit) {
                    var limit;
                    /**
                     * limit is either a
                     * - number defining the number of records for limit or
                     * - an array with two values: [number, offset]
                     *
                     * If bullshit is passed, limit returns all elements
                     */
                    limit = _.isNumber(options.limit) ? [options.limit, 0] : ((_.isArray(options.limit) && options.limit.length === 2) ? options.limit : [records.length, 0]);

                    /**
                     * slice params
                     * 1. param: index of first extracted element
                     * 2. param: index of the succedor of the last to extract element
                     */
                    records = records.slice(limit[1], limit[1] + limit[0]);

                } else {
                    M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'No limit applied because no value for limit passed in \'options\'.');
                }
            }

        } else {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'No filtering applied. You need to pass in a function that returns a boolean to filter records.');
        }

        this._records = records;

        return this;
    }

});