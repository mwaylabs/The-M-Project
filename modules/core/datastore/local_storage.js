// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      15.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('logger.js');

M.LocalStorageProvider = M.DataProvider.extend({

    /**
     * saves a model to the local storage
     * key is name combined with id, value is stringified object
     * e.g.
     * Note_123 => '{ text: 'buy some food' }'
     *
     * @param {Object} that (is a model).
     */
    save: function(that) {
        try {
            localStorage.setItem(that.name + '_' + that.id, JSON.stringify(that.record));
        } catch(e) {
            M.Logger.log(M.WARN, 'Error saving ' + that.record + ' to localStorage with ID: ' + that.name + '_' + that.id);
        }

    },

    /**
     * deletes a model from the local storage
     * key defines which one to delete
     * e.g. key: 'Note_123'
     *
     * @param {Object} that (is a model).
     */
    del: function(that) {
        try {
            localStorage.removeItem(that.name + '_' + that.id);
        } catch(e) {
            M.Logger.log(M.WARN, 'Error removing ID: ' + that.name + '_' + that.id + ' from localStorage');
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
     */
    find: function(modelName, query) {
        if(query){
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
        var regexec = query_regex.exec(query);
        if(regexec) {
            var ident = regexec[1];
            var op = regexec[2];
            var val = regexec[3].replace(/['"]/g, "");/* delete quotes from captured string, needs to be done in regex*/
            var res = this.findAll(modelName);
            switch(op) {
                case '=':
                    res = _.select(res, function(obj){
                        return obj[ident] === val;
                    });
                    break;
                case '!=':
                    res = _.select(res, function(obj){
                        return obj[ident] !== val;
                    });
                    break;
                case '<':
                    res = _.select(res, function(obj){
                        return obj[ident] < val;
                    });
                    break;
                case '>':
                    res = _.select(res, function(obj){
                        return obj[ident] > val;
                    });
                    break;
                case '<=':
                    res = _.select(res, function(obj){
                        return obj[ident] <= val;
                    });
                    break;
                case '>=':
                    res = _.select(res, function(obj){
                        return obj[ident] >= val;
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
        }else { /* if no query is passed, all models for modelName shall be returned */
            return this.findAll(modelName);
        }

    },

    /**
     * Returns all models defined by modelName.
     *
     * @param {String} modelName
     */
    findAll: function(modelName) {
        var result = [];
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i);
            regexResult = new RegExp('^' + modelName + '_').exec(k);
            if(regexResult) {
                var obj = JSON.parse(localStorage.getItem(k));
                result.push(obj);
            }var obj = JSON.stringify(localStorage.getItem(k));
        }
        return result;
    },

    /**
     * Returns all keys for model defined by modelName.
     *
     * @param {String} modelName
     */
    allKeys: function(modelName) {
        var result = [];
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i)
            regexResult = new RegExp('^' + modelName + '_').exec(k);
            if(regexResult) {
                result.push(k);
            }
        }
        return result;    
    }

});