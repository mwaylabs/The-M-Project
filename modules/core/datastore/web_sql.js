// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * Encapsulates access to WebSQL (in-browser sqlite storage). All CRUD operations are asynchronous. That means that onSuccess
 * and onError callbacks have to be passed to the function calls to have the result returned when operation finished.
 *
 *
 * @extends M.DataProvider
 */
M.DataProviderWebSql = M.DataProvider.extend(
/** @scope M.DataProviderWebSql.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.DataProviderWebSql',

    /**
     * Configuration object
     * @type Object
     */
    config: {},

    /**
     * Indicates whether data provider operates asynchronously or not.
     *
     * @type Boolean
     */
    isAsync: YES,

    /**
     * Is set to YES when initialization ran successfully, means when {@link M.WebSqlProvider#init} was called, db and table created.
     * @type Boolean
     */
    isInitialized: NO,

    /**
     * Object containing all rules for mapping JavaScript data types to SQLite data types.
     * @type Object
     */
    typeMapping: {
        'String': 'varchar(255)',
        'Text': 'text',
        'Float': 'float',
        'Integer': 'integer',
        'Number': 'integer',
        'Reference': 'integer',
        'Date': 'varchar(255)',
        'Boolean': 'boolean'
    },

    /**
     * Is set when database "opened". Acts as handler for all db operations => transactions, queries, etc.
     * @type Object
     */
    dbHandler: null,

    /**
     * Saves the internal callback function. Is needed when provider/db is not initialized and init() must be executed first to have the return point again after
     * initialization.
     * @type Function
     */
    internalCallback: null,

    /**
     * Indicates whether one of multiple transactions failed
     * @type Boolean
     */
    bulkTransactionFailed: NO,

    /**
     * Used internally. External callback for success case.
     * @private
     */
    onSuccess: null,

    /**
     * Used internally. External callback for error case.
     * @private
     */
    onError: null,

    /**
     * Opens a database and creates the appropriate table for the model record.
     *
     * @param {Object} obj The param obj, includes model. Not used here, just passed through.
     * @param {Function} callback The function that called init as callback bind to this.
     * @private
     */
    init: function(obj, callback) {
        if(!this.internalCallback) {
            this.internalCallback = callback;
        }
        this.openDb();
        this.createTable(obj, callback);
    },

    /*
    * CRUD methods
    */

    /**
     * Saves a model in the database. Constructs the sql query from the model record. Prepares an INSERT or UPDATE depending on the state
     * of the model. If M.STATE_NEW then prepares an INSERT, if M.STATE_VALID then prepares an UPDATE. The operation itself
     * is done by {@link M.DataProviderWebSql#performOp} that is called
     *
     * @param {Object} obj The param obj, includes:
     * * onSuccess callback
     * * onError callback
     * * the model
     */
     save: function(obj) {
        //console.log('save() called.');

        this.onSuccess = obj.onSuccess;
        this.onError = obj.onError;

        /**
         * if not already done, initialize db/table first
         */
        if(!this.isInitialized) {
            this.internalCallback = this.save;
            this.init(obj);
            return;
        }

        var pre_suffix = '';
        var sif

        if(obj.model.state === M.STATE_NEW) { // perform an INSERT

            var sql = 'INSERT INTO ' + obj.model.name + ' (';
            for(var prop in obj.model.record) {
                sql += prop + ', ';
            }

            /* now name m_id column */
            sql += M.META_M_ID + ') ';

            /* VALUES(12, 'Test', ... ) */
            sql += 'VALUES (';

            for(var prop2 in obj.model.record) {
                //console.log(obj.model.record[prop2]);
                var propDataType = obj.model.__meta[prop2].dataType;
                /* if property is string or text write value in quotes */
                pre_suffix = propDataType === 'String' || propDataType === 'Text' || propDataType === 'Date' ? '"' : '';
                /* if property is date object, convert to string by calling toJSON */
                recordPropValue = (obj.model.record[prop2].type === 'M.Date') ? obj.model.record[prop2].toJSON() : obj.model.record[prop2];
                sql += pre_suffix + recordPropValue + pre_suffix + ', ';
            }

            sql += obj.model.m_id + ')';

            this.performOp(sql, obj, 'INSERT');

        } else { // perform an UPDATE with id of model

            var sql = 'UPDATE ' + obj.model.name + ' SET ';

            var nrOfUpdates = 0;

            for(var p in obj.model.record) {

                if(p === 'ID' || !obj.model.__meta[p].isUpdated) { /* if property has not been updated, then exclude from update call */
                    continue;
                }
                nrOfUpdates = nrOfUpdates + 1;

                pre_suffix = obj.model.__meta[p].dataType === 'String' || obj.model.__meta[p].dataType === 'Text' || obj.model.__meta[p].dataType === 'Date' ? '"' : '';

                /* if property is date object, convert to string by calling toJSON */
                recordPropValue = obj.model.__meta[p].dataType === 'Date' ? obj.model.record[p].toJSON() : obj.model.record[p];

                sql += p + '=' + pre_suffix + recordPropValue + pre_suffix + ', ';
            }
            sql = sql.substring(0, sql.lastIndexOf(','));
            sql += ' WHERE ' + 'ID=' + obj.model.record.ID + ';';

            /* if no properties updated, do nothing, just return by calling onSuccess callback */
            if(nrOfUpdates === 0) {
                if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                    obj.onSuccess = this.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], null, obj, this);
                    obj.onSuccess();
                }else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                    obj.onSuccess(result);
                }
            } else {
                this.performOp(sql, obj, 'UPDATE');
            }
        }
    },

    /**
     * Performs operation on WebSQL storage: INSERT, UPDATE or DELETE. Is used by {@link M.WebSqlProvider#save} and {@link M.WebSqlProvider#del}.
     * Calls is made asynchronously, means that result is just available in callback.
     * @param {String} sql The query.
     * @param {Object} obj The param object. Contains e.g. callbacks (onError & onSuccess)
     * @param {String} opType The String identifying the operation: 'INSERT', 'UPDATE' oder 'DELETE'
     * @private
     */
    performOp: function(sql, obj, opType) {

        var that = this;
        this.dbHandler.transaction(function(t) {
            t.executeSql(sql, null, function() {
                if(opType === 'INSERT') { /* after INSERT operation set the assigned DB ID to the model records id */
                    that.queryDbForId(obj.model);
                }
            }, function() { // error callback for SQLStatementTransaction
                M.Logger.log('Incorrect statement: ' + sql, M.ERR);
            });
        },
        function(sqlError) { // errorCallback

            var err = this.buildErrorObject(sqlError);
            this.handleErrorCallback(obj, err);
        },

        function() {    // voidCallback (success)
             /* delete  the model from the model record list */
            if(opType === 'DELETE') {
                obj.model.recordManager.remove(obj.model.m_id);
            }
            /* bind success callback */
            if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], null, obj, this);
                obj.onSuccess();
            }else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                obj.onSuccess(null, this);
            }
        });
    },

    /**
     * Prepares delete query for a model record. Operation itself is performed by {@link M.WebSqlProvider#performOp}.
     * Tuple is identified by ID (not the internal model id, but the ID provided by the DB in record).
     *
     * @param {Object} obj The param obj, includes:
     * * onSuccess callback
     * * onError callback
     * * the model
     */
    del: function(obj) {
        //console.log('del() called.');
        if(!this.isInitialized) {
            this.internalCallback = this.del;
            this.init(obj, this.bindToCaller(this, this.del));
            return;
        }

        var sql = 'DELETE FROM ' + obj.model.name + ' WHERE ID=' + obj.model.record.ID + ';';

        this.performOp(sql, obj, 'DELETE');
    },


    /**
     * Finds model records in the database. If a constraint is given, result is filtered.
     * @param {Object} obj The param object. Includes:
     * * model: the model blueprint
     * * onSuccess:
     * * onError:
     * * columns: Array of strings naming the properties to be selected: ['name', 'age'] => SELECT name, age FROM...
     * * constraint: Object containing itself two properties:
     *      * statement: a string with the statement, e.g. 'WHERE ID = ?'
     *      * parameters: array of strings with the parameters, length array must be the same as the number of ? in statement
     *          => ? are substituted with the parameters
     * * order: String with the ORDER expression: e.g. 'ORDER BY price ASC'
     * * limit: Number defining the number of max. result items
     */
    find: function(obj) {

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

        sql += ' FROM ' + obj.model.name + ' ';

        var stmtParameters = [];

        /* now process constraint */
        if(obj.constraint) {

            var n = obj.constraint.statement.split("?").length - 1;
            //console.log('n: ' + n);
            /* if parameters are passed we assign them to stmtParameters, the array that is passed for prepared statement substitution*/
            if(obj.constraint.parameters) {

                if(n === obj.constraint.parameters.length) { /* length of parameters list must match number of ? in statement */
                    sql += obj.constraint.statement;
                    stmtParameters = obj.constraint.parameters;
                } else {
                    M.Logger.log('Not enough parameters provided for statement: given: ' + obj.constraint.parameters.length + ' needed: ' + n, M.ERR);
                    return NO;
                }
           /* if no ? are in statement, we handle it as a non-prepared statement
            * => developer needs to take care of it by himself regarding
            * sql injection
            */
            } else if(n === 0) {
                sql += obj.constraint.statement;
            }
        }

        /* now attach order */
        if(obj.order) {
            sql += ' ORDER BY ' + obj.order
        }

        /* now attach limit */
        if(obj.limit) {
            sql += ' LIMIT ' + obj.limit
        }

        var result = [];
        var that = this;
        this.dbHandler.readTransaction(function(t) {
            t.executeSql(sql, stmtParameters, function (tx, res) {
                var len = res.rows.length;//, i;
                for (var i = 0; i < len; i++) {
                    var rec = JSON.parse(JSON.stringify(res.rows.item(i))); /* obj returned form WebSQL is non-writable, therefore needs to be converted */
                    /* set m_id property of record to m_id got from db, then delete m_id property named after db column (M.META_M_ID) */
                    rec['m_id'] = rec[M.META_M_ID];
                    delete rec[M.META_M_ID];
                    /* create model record from result with state valid */
                    /* $.extend merges param1 object with param2 object*/
                    var myRec = obj.model.createRecord($.extend(rec, {state: M.STATE_VALID}));

                    /* create M.Date objects for all date properties */
                    for(var j in myRec.__meta) {
                        /* here we can work with setter and getter because myRec already is a model record */
                        if(myRec.__meta[j].dataType === 'Date' && typeof(myRec.get(j)) === 'string') {
                            myRec.set(j, M.Date.create(myRec.get(j)));
                        }
                    }
                    /* add to result array */
                    result.push(myRec);
                }

            }, function(){M.Logger.log('Incorrect statement: ' + sql, M.ERR)}) // callbacks: SQLStatementErrorCallback
        }, function(sqlError){ // errorCallback
            var err = this.buildErrorObject(sqlError);
            this.handleErrorCallback(obj, err);
        }, function() { // voidCallback (success)
            /* bind success callback */
            if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                /* [result] is a workaround for bindToCaller: bindToCaller uses call() instead of apply() if an array is given.
                 * result is an array, but what call is doing with it is wrong in this case. call maps each array element to one method
                 * parameter of the function called. Our callback only has one parameter so it would just pass the first value of our result set to the
                 * callback. therefor we now put result into an array (so we have an array inside an array) and result as a whole is now passed as the first
                 * value to the callback.
                 *  */
                obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [result], obj, this);
                obj.onSuccess();
            }else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                obj.onSuccess(result, obj, this);
            }
        });
    },


    /**
     * @private
     */
    openDb: function() {
        /* openDatabase(db_name, version, description, estimated_size, callback) */
        try {
            if (!window.openDatabase) {
                M.DialogView.alert({
                    message: 'Your browser does not support WebSQL.',
                    title: 'WebSQL Not Supported.'
                });
            } else {
                //this.dbHandler = openDatabase(this.config.dbName, '1.0', 'Database for ' + M.Application.name, this.config.size);
                /* leave version empty to open database regardless of its version */
                if(!this.dbHandler) {
                    this.dbHandler = openDatabase(this.config.dbName, '', 'Database for ' + M.Application.name, this.config.size);
                }

            }
        } catch(e) {

            if (e == 2) {
                // Version number mismatch.
                //M.Logger.log('Invalid database version.', M.ERR);
                M.DialogView.alert({
                    message: 'Database version 1.0 not supported.',
                    title: 'Invalid database version.'
                });
            } else {
                //M.Logger.log('Unknown error ' + e + '.', M.ERR);
                M.DialogView.alert({
                    message: e,
                    title: 'Unknown error.'
                });
            }
            return;
        }

    },



    /**
     * Creates the table corresponding to the model record.
     * @private
     */
    createTable: function(obj, callback) {
        var sql = 'CREATE TABLE IF NOT EXISTS '  + obj.model.name
                    + ' (ID INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE';

        for(var r in obj.model.__meta) {
            if(r === 'ID') {/* skip ID, it is defined manually above */
                continue;
            }
           sql += ', ' + this.buildDbAttrFromProp(obj.model, r);
        }

        sql += ', ' + M.META_M_ID + ' INTEGER NOT NULL);';

        if(this.dbHandler) {
            var that = this;
            try {
                /* transaction has 3 parameters: the transaction callback, the error callback and the success callback */
                this.dbHandler.transaction(function(t) {
                    t.executeSql(sql);
                }, function(sqlError){ // errorCallback
                    var err = this.buildErrorObject(sqlError);
                    this.handleErrorCallback(obj, err);
                });
            } catch(e) {
                var err = this.buildErrorObject(e);
                this.handleErrorCallback(obj, err);
            }
        } else {
            var err = this.buildErrorObject({
                code: 8,
                message: 'dbHandler does not exist.'
            });
            this.handleErrorCallback(obj, err);
            M.Logger.log('dbHandler does not exist.', M.ERR);
        }
    },

    /**
     *
     * @param {obj} obj
     * @param {Array} records
     * @param {Number} transactionSize
     */
    bulkImport: function(obj) {

        if(!this.isInitialized) {
            this.internalCallback = this.bulkImport;
            this.init(obj);
            return;
        }

        /* reset flag */
        this.bulkTransactionFailed = NO;

        var records = obj.records;
        /* if no records were passed execute error callback and pass it an error object */
        if(!records || !_.isArray(records)) {
            var err = this.buildErrorObject({
                code: 10,
                message: 'No Records array passed.'
            });
            this.handleErrorCallback(obj, err);
        }
        /* if no transactionSize was passed, make one transaction for all */
        var transactionSize = !obj.transactionSize || typeof(transactionSize) !== 'number' ? records.length : obj.transactionSize;

        var transactions = [];

        var sqlTemplate = ' INSERT OR REPLACE INTO ' + obj.model.name + ' (';
        /* append columns */
        for(var prop in obj.model.record) {
            sqlTemplate += prop + ', ';
        }

        /* append m_id column */
        sqlTemplate += M.META_M_ID + ') ';
        /* now append values */
        sqlTemplate += 'VALUES (';

        var sql = ''; // the actual sql insert string with values
        var values = '';
        var curRec = null;
        for (var i = 1; i <= records.length; i++) {
            curRec = records[i - 1];
            for(var prop2 in curRec.record) {
                var propDataType = curRec.__meta[prop2].dataType;
                /* if property is string or text write value in quotes */
                var pre_suffix = propDataType === 'String' || propDataType === 'Text' || propDataType === 'Date' ? '"' : '';
                /* if property is date object, convert to string by calling toJSON */
                var recordPropValue = (curRec.record[prop2].type === 'M.Date') ? curRec.record[prop2].toJSON() : curRec.record[prop2];
                values += pre_suffix + recordPropValue + pre_suffix + ', ';
            }
            sql += sqlTemplate + values + curRec.m_id + ');';
            values = '';

            /* save sql string as one transaction pack */
            if (i % transactionSize === 0 || i === records.length) {
                transactions.push(sql);
                sql = '';
            }
        }

        for(var i = 0; i < transactions.length;i++) {
            this.makeBulkTransaction(obj, transactions[i], i, transactions.length);
        }

    },

    makeBulkTransaction: function(obj, transaction, transactionNr, numberOfTransactions) {
        var that = this;
        var sqlInsertSet = transaction.split(';');
        if(!this.bulkTransactionFailed) {
            if(this.dbHandler) {
                /* transaction has 3 parameters: the transaction callback, the error callback and the success callback */
                this.dbHandler.transaction(function(t) {
                    for(var j = 0; j < sqlInsertSet.length; j++) {
                        if(sqlInsertSet[j] !== '') {
                            console.log(sqlInsertSet[j]);
                            t.executeSql(sqlInsertSet[j]);
                        }
                    }
                }, function(sqlError) { // errorCallback
                    that.bulkTransactionFailed = YES;
                    var err = that.buildErrorObject(sqlError);
                    this.handleErrorCallback(obj, sqlError);
                },
                function() {
                    that.handleBulkSuccessCallback(obj, (transactionNr + 1), numberOfTransactions);
                });
            } else {
                M.Logger.log('dbHandler does not exist.', M.ERR);
            }
        } else {
            return NO;
        }
    },


    handleBulkSuccessCallback: function(obj, iteration, total) {
        if(iteration === total) {
             if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], null, obj, this);
                obj.onSuccess();
            }else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                obj.onSuccess(null, obj, this);
            }
        }
    },

    handleErrorCallback: function(obj, err) {
        if (obj.onError && obj.onError.target && obj.onError.action) {
                obj.onError = that.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], err, obj, this);
                obj.onError();
            } else if (typeof(obj.onError) === 'function') {
                obj.onError(err, obj, this);
            } else {
                M.Logger.log('Target and action in onError not defined.', M.ERR);
            }
    },


    /**
     * Creates a new data provider instance with the passed configuration parameters
     * @param {Object} obj Includes dbName
     */
    configure: function(obj) {
        //console.log('configure() called.');
        obj.size = obj.size ? obj.size : 1024*1024;
        // maybe some value checking
        return this.extend({
            config:obj
        });
    },

    /* Helper methods */

    /**
     * @private
     * Creates the column definitions from the properties of the model record with help of the meta information that
     * the {@link M.ModelAttribute} objects provide.
     * @param {Object}
     * @returns {String} The string used for db create to represent this property.
     */
    buildDbAttrFromProp: function(model, prop) {

        var type = this.typeMapping[model.__meta[prop].dataType].toUpperCase();

        var isReqStr = model.__meta[prop].isRequired ? ' NOT NULL' : '';

        return prop + ' ' + type + isReqStr;
    },


    /**
     * Queries the WebSQL storage for the maximum db ID that was provided for a table that is defined by model.name. Delegates to
     * {@link M.WebSqlProvider#setDbIdOfModel}.
     *
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

    /**
     * @private
     * Is called when creating table successfully returned and therefor sets the initialization flag of the provider to YES.
     * Then calls the internal callback => the function that called init().
     */
    handleDbReturn: function(obj, callback) {
        this.isInitialized = YES;
        this.internalCallback(obj, callback);
    },

    /**
     * @private
     * Is called from queryDbForId, sets the model record's ID to the latest value of ID in the database.
     */
    setDbIdOfModel: function(model, id) {
        model.record.ID = id;
    },

    /**
     * @private
     * Builds a M.Error object on basis of SQLError sqlErr. Maps error codes to M.Error error codes.
     * @param {Object} err err object returned by WebSQL or manually created error obj
     */
    buildErrorObject: function(err) {
        return M.Error.extend({
            code: err.code + 200,     // 200 is offset of WebSQL errors in M.Error
            msg: err.message
        });
    }

});