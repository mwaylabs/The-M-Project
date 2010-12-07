// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/detox/data_provider.js');

/**
 * @class
 *
 * Encapsulates access to WebSQL (in-browser sqlite storage)
 */
M.WebSqlProvider = M.DataProvider.extend(
/** @scope M.WebSqlProvider.prototype */ {

    type: 'M.WebSqlProvider',

    /**
     * Configuration object
     * @property {Object}
     */
    config: {},

    /**
     *
     * @property {Boolean}
     */
    isInitialized: NO,

    typeMapping: {
        'String': 'varchar(255)',
        'Text': 'text',
        'Float': 'float',
        'Integer': 'integer',
        'Date': 'date',
        'Boolean': 'boolean'
    },

    dbHandler: null,

    internalCallback: null,

    onSuccess: null,
    onError: null,

    init: function(obj, callback) {
        console.log('init() called.');
        this.openDb();
        this.createTable(obj, callback);
    },

    /*
    * CRUD methods
    */

    /**
     * TODO: fix callbacks! see find()
     * @param model
     */
     save: function(obj) {
        console.log('save() called.');

        this.onSuccess = obj.onSuccess;
        this.onError = obj.onError;

        /**
         * if not already done, initialize db/table first
         */
        if(!this.isInitialized) {
            this.internalCallback = this.save;
            this.init(obj.model);
            return;
        }


        if(obj.model.state === M.STATE_NEW) { // perform an INSERT

            var sql = 'INSERT INTO ' + obj.model.name + ' (';
            for(var prop in obj.model.record) {
                sql += prop + ', ';
            }

            sql = sql.substring(0, sql.lastIndexOf(',')) + ') ';
            sql += 'VALUES (';

            for(var prop in obj.model.record) {
                /* if property is string or text write value in quotes */
                var pre_suffix = obj.model.__meta[prop].type === 'String' || obj.model.__meta[prop].type === 'Text' ? '"' : '';
                sql += pre_suffix + obj.model.record[prop] + pre_suffix + ', ';
            }
            sql = sql.substring(0, sql.lastIndexOf(',')) + '); ';

            console.log(sql);

            this.performOp(sql, obj, 'INSERT');

        } else { // perform an UPDATE with id of model

            var sql = 'UPDATE ' + obj.model.name + ' SET ';

            for(var prop in obj.model.record) {
                var pre_suffix = obj.model.__meta[prop].type === 'String' || obj.model.__meta[prop].type === 'Text' ? '"' : '';
                sql += prop + ' = ' + pre_suffix + obj.model.record[prop] + pre_suffix + ', ';
            }
            sql = sql.substring(0, sql.lastIndexOf(','));
            sql += ' WHERE ' + 'ID = ' + obj.model.record.ID;

            console.log(sql);

            this.performOp(sql, obj, 'UPDATE');
        }
    },

    /**
     * performs operation on websql storage: INSERT, UPDATE or DELETE. is used by them (save() & del())
     *
     * @param {String} sql The query.
     * @param {Object} obj The param object. Contains e.g. callbacks (onError & onSuccess)
     */
    performOp: function(sql, obj, opType) {
        var that = this;
        this.dbHandler.transaction(function(t) {
            t.executeSql(sql, null, function() {
                if(opType === 'INSERT') {
                    that.queryDbForId(obj.model);
                }
            }, function() { // error callback for SQLStatementTransaction
                M.Logger.log('Incorrect statement: ' + sql, M.ERROR)
            });
        },
        function() { // errorCallback
            /* bind error callback */
            if (obj.onError && obj.onError.target && obj.onError.action) {
                obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action]);
                obj.onError();
            } else if (typeof(obj.onError) !== 'function') {
                M.Logger.log('Target and action in onError not defined.', M.INFO);
            }
        }, function() { // voidCallback (success)
            /* bind success callback */
            if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
                obj.onSuccess();
            } else if (typeof(obj.onError) !== 'function') {
                M.Logger.log('Target and action in onSuccess not defined.', M.INFO);
            }
        });        
    },

    /**
     * Deletes the passed model from the database
     * @param model
     */
    del: function(obj) {
        console.log('del() called.');
        if(!this.isInitialized) {
            this.internalCallback = this.del;
            this.init(obj, this.bindToCaller(this, this.del));
            return;
        }

        var sql = 'DELETE FROM ' + obj.model.name + ' WHERE ID=' + obj.model.record.ID + ';';

        console.log(sql);

        this.performOp(sql, obj, 'DELETE');
    },


    /**
     * @param {Object} obj The param object. Includes: model, query and callback(onSuccess, onError) as parameters.
     */
    find: function(obj) {
        console.log('find() called.');
        
        this.onSuccess = obj.onSuccess;
        this.onError = obj.onError;
        
        if(!this.isInitialized) {
            this.internalCallback = this.find;
            this.init(obj, this.bindToCaller(this, this.find));
            return;
        }

        var sql = 'SELECT ';

        if(obj.columns) {
            /* ID column always needs to be in de result relation */
            if(!(_.include(obj.columns, 'ID'))) {
                obj.columns.push('ID');
            }

            if(obj.columns.length > 1) {
                sql += obj.columns.join(', ');
            } else if(obj.columns.length == 1) {
                sql += obj.columns[0] + ' ';
            }
        } else {
            sql += '* ';
        }
        
        sql += ' FROM ' + obj.model.name;

        var stmtParameters = [];

        /* now process constraint */
        if(obj.constraint) {

            var n = obj.constraint.statement.split("?").length - 1;

            /* if parameters are passed we assign them to stmtParameters, the array that is passed for prepared statement substitution*/
            if(obj.constraint.parameters) {

                if(n === obj.constraint.parameters.length) { /* length of parameters list must match number of ? in statement */
                    sql += obj.constraint.statement;
                    stmtParameters = obj.constraint.parameters;
                } else {
                    M.Logger.log('Not enough parameters provided for statement.', M.ERROR);
                    return NO;
                }    
           /* if no ? are in statement, we handle it as a non-prepared statement
            * => developer needs to take care of it by himself regarding
            * sql injection => all statements that are constructed with dynamic
            * input should be done as prepared statements
            */
            } else if(n === 0) {
                sql += obj.constraint.statement;
            }
        }

        /* now attach order */
        if(obj.order) {
            sql += ' ORDER BY ' + obj.order
        }

        /* now attach limt */
        if(obj.limit) {
            sql += ' LIMIT ' + obj.limit
        }

        console.log(sql);

        var result = [];
        var that = this;
        this.dbHandler.readTransaction(function(t) {
            t.executeSql(sql, stmtParameters, function (tx, res) {
                var len = res.rows.length, i;
                for (i = 0; i < len; i++) {
                    /* create model record from result with state valid */
                    /* $.extend merges param1 object with param2 object*/
                    result.push(obj.model.createRecord($.extend(res.rows.item(i), {state: M.STATE_VALID}), this));
                }
            }, function(){M.Logger.log('Incorrect statement: ' + sql, M.ERROR)}) // callbacks: SQLStatementErrorCallback
        }, function(){ // errorCallback
            /* bind error callback */
            if(obj.onError && obj.onError.target && obj.onError.action) {
                obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action]);
                obj.onError();
            } else if (typeof(obj.onError) !== 'function') {
                M.Logger.log('Target and action in onError not defined.', M.ERROR);
            }
        }, function() { // voidCallback (success)
            /* bind success callback */
            if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                /* [result] is a workaround for bindToCaller: bindToCaller uses call() instead of apply() if an array is given.
                 * result is an array, but we what call is doing with it is wrong in this case. call maps each array element to one method
                 * parameter of the function called. Our callback only has one parameter so it would just pass the first value of our result set to the
                 * callback. therefor we now put result into an array (so we have an array inside an array) and result as a whole is now passed as the first
                 * value to the callback.
                 *  */
                obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [result]);
                obj.onSuccess();
            }
        });
    },


    /**
     * private methods
     */
    openDb: function() {
        console.log('openDb() called.');
        /* openDatabase(db_name, version, description, estimated_size, callback) */
        this.dbHandler = openDatabase(this.config.dbName, '2.0', 'Database for M app', this.config.size);
    },


    /**
     * creates the table corresponding to the model.
     */
    createTable: function(obj, callback) {
        console.log('createTable() called.');
        var sql = 'CREATE TABLE IF NOT EXISTS '  + obj.model.name
                    + ' (ID INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE';

        for(var r in obj.model.__meta) {
           sql += ', ' + this.buildDbAttrFromProp(obj.model, r);
        }

        sql += ');';

        console.log(sql);
        
        if(this.dbHandler) {
            var that = this;
            try {
                /* transaction has 3 parameters: the transaction callback, the error callback and the success callback */
                this.dbHandler.transaction(function(t) {
                    t.executeSql(sql);
                }, null, that.bindToCaller(that, that.handleDbReturn, [obj, callback]));
            } catch(e) {
                M.Logger.log('Error code: ' + e.code + ' msg: ' + e.message, M.ERROR);
                return;
            }
        } else {
            M.Logger.log('dbHandler does not exist.', M.ERROR);
        }
    },

    /**
     * creates a new data provider instance with the passed configuration parameters
     * @param obj
     */
    configure: function(obj) {
        console.log('configure() called.');
        // maybe some value checking
        return this.extend({
            config:obj
        });
    },

    /* Helper methods */

    /**
     * @param {Object} 
     * @return {String} The string used for db create to represent this property.
     */
    buildDbAttrFromProp: function(model, prop) {
        var type = this.typeMapping[model.__meta[prop].type].toUpperCase();

        var isReqStr = model.__meta[prop].isRequired ? ' NOT NULL' : '';

        return prop + ' ' + type + isReqStr;
    },


    /**
     * Queries the WebSql storage for the maximum id that was provided for a table defined by model.name.
     * @param {Object} model The table's model
     */
    queryDbForId: function(model) {
        var that = this;
        this.dbHandler.readTransaction(function(t) {
            var r = t.executeSql('SELECT seq as ID FROM sqlite_sequence WHERE name="' + model.name + '"', [], function (tx, res) {
                that.setDbIdOfModel(model, res.rows.item(0).ID);
            });
        });
    },

    handleDbReturn: function(obj, callback) {
        console.log('handleDbReturn() called.');
        this.isInitialized = YES;
        //console.log(model);
        //console.log(callback);
        this.internalCallback(obj, callback);
    },

    setDbIdOfModel: function(model, id) {
        model.record.ID = id;
    }

});