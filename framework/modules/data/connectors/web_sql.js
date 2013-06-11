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

M.DataConnectorWebSql = M.DataConnector.extend({

    _type: 'M.DataConnectorWebSql',

    _typeMapping: function(){
        var map = {};
        map [M.CONST.TYPE.STRING]  = 'varchar(255)';
        map [M.CONST.TYPE.TEXT]    = 'text';
        map [M.CONST.TYPE.OBJECT]  = 'text';
        map [M.CONST.TYPE.ARRAY]   = 'text';
        map [M.CONST.TYPE.FLOAT]   = 'float';
        map [M.CONST.TYPE.INTEGER] = 'integer';
        map [M.CONST.TYPE.DATE]    = 'varchar(255)';
        map [M.CONST.TYPE.BOOLEAN] = 'boolean';
        return map;
    }(),

    _transactionFailed: false,

    _initialized: false,

    _callback: null,

    _selector: null,

    /**
     * Default configuration
     */
    config: {
        name: 'The-M-Project',
        version: '1.0',
        size: 1024 * 1024 * 5,
        entities: []
    },

    /**
     * Opens a database and creates the appropriate table for the model record.
     *
     * @param {Object} obj The param obj, includes model. Not used here, just passed through.
     * @param {Function} callback The function that called init as callback bind to this.
     * @private
     */
    init: function( obj, callback ) {
        if( !this._callback ) {
            this._callback = callback;
        }
        var that = this;
        this._initialized = true;

        this.openDb({
            error: function( msg ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, msg);
            },
            success: function() {
                that._callback(obj, callback);
            }
        });
    },

    save: function( obj ) {
        if( !this._initialized ) {
            this.init(obj, this._insertOrReplace);
        } else {
            this._insertOrReplace(obj);
        }
    },

    update: function( obj ) {
        if( !this._initialized ) {
            this.init(obj, this._updateOrReplace);
        } else {
            this._updateOrReplace(obj);
        }
    },

    del: function( obj ) {
        if( !this._initialized ) {
            this.init(obj, this._delete);
        } else {
            this._delete(obj);
        }
    },

    dropTable: function( obj ) {

        if( !this._initialized ) {
            this.init(obj, this._dropTable);
        } else {
            this._dropTable(obj);
        }
    },

    createTable: function( obj ) {

        if( !this._initialized ) {
            this.init(obj, this._createTable);
        } else {
            this._createTable(obj);
        }
    },

    find: function( obj ) {
        if( !this._initialized ) {
            this.init(obj, this._select);
        } else {
            this._select(obj);
        }
    },

    execute: function(obj) {
        if( !this._initialized ) {
            this.init(obj, this._executeSql);
        } else {
            this._executeSql(obj);
        }
    },

    /**
     * @private
     */
    openDb: function( obj ) {
        var error, dbError;
        /* openDatabase(db_name, version, description, estimated_size, callback) */
        if( !this.db ) {
            try {
                if( !window.openDatabase ) {
                    error = M.Error.create(M.CONST.ERROR.WEBSQL_NOT_SUPPORTED, 'Your browser does not support WebSQL databases.');
                } else {
                    this.db = window.openDatabase(this.config.name, "", "", this.config.size);
                }
            } catch( e ) {
                dbError = e;
            }
        }
        if( this.db ) {
            if( this.config.version && this.db.version != this.config.version ) {
                this.updateDb(obj);
            } else {
                this.handleSuccess(obj, this.db);
            }
        } else if( dbError == 2 ) {
            // Version number mismatch.
            this.updateDb(obj);
        } else {
            if (!error && dbError) {
                error = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, dbError.message, dbError);
            }
            this.handleSuccess(obj, error);
        }
    },

    updateDb: function( obj ) {
        var error;
        var lastSql;
        var that = this;
        try {
            var db = window.openDatabase(this.config.name, "", "", this.config.size);
            try {
                var arSql = this._sqlUpdateDatabase(db.version, this.config.version);
                db.changeVersion(db.version, this.config.version, function( tx ) {
                        _.each(arSql, function( sql ) {
                            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, "SQL-Statement: " + sql);
                            lastSql = sql;
                            tx.executeSql(sql);
                        });
                    }, function( msg ) {
                        var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, msg, arSql);
                        that.handleError(obj, err, lastSql);
                    }, function() {
                        that.handleSuccess(obj);
                    });
            } catch( e ) {
                error = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'changeversion failed, DB-Version: '+db.version)
            }
        } catch( e ) {
            error = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
        }
        if( error ) {
            this.handleError(obj, error);
        }
    },

    createDb: function( obj ) {
        var error;
        var sql = [];
        if( !this.db ) {
            try {
                if( !window.openDatabase ) {
                    error = M.Error.create(M.CONST.ERROR.WEBSQL_NOT_SUPPORTED, 'Your browser does not support WebSQL databases.');
                } else {
                    this.db = window.openDatabase(this.config.name, "", "", this.config.size);
                }
            } catch( e ) {
                error = M.Error.create(M.CONST.ERROR.WEBSQL_UNKNOWN, e.message, e);
            }
        }
        if (!error && this._checkDb()) {
            var entities = this.getEntities();
            if( entities ) {
                for( var name in entities ) {
                    var entity = entities[name];
                    sql.push(this._sqlDropTable(name));
                    sql.push(this._sqlCreateTable(entity));
                }
            }
            this._executeTransaction( obj, sql);
        }
        if(error) {
            return this.handleError(obj, error);
        }
    },

    _dropTable: function( obj ) {

        var entity = this.getEntity(obj);

        if (this._checkDb(obj) && this._checkEntity(entity, obj)) {
            var sql = this._sqlDropTable(entity.name);
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(obj, [sql]);
        }
    },

    _createTable: function( obj ) {

        var entity = this.getEntity(obj);

        if (this._checkDb(obj) && this._checkEntity(entity, obj)) {
            var sql = this._sqlCreateTable(entity);
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(obj, [sql]);
        }
    },

    /**
     *
     * @param {obj} obj
     * @param {Array} data
     * @param {Number} transactionSize
     */
    _insertOrReplace: function( obj ) {

        // get data
        var data  = this.getData(obj);
        // get entity
        var entity = this.getEntity(obj);

        if (this._checkDb(obj) && this._checkEntity(obj, entity) && this._checkData(obj, data)) {

            data  = _.isArray(data) ? data : [ data ];
            var statements  = [];
            var sqlTemplate = "INSERT OR REPLACE INTO '" + entity.name + "' (";
            for( var i = 0; i < data.length; i++ ) {
                var statement = ''; // the actual sql insert string with values
                var value = entity.fromRecord(data[i]);
                var args  = _.values(value);
                var keys  = _.keys  (value);
                if (args.length > 0) {
                    var values  = new Array(args.length).join('?,')+'?';
                    var columns = "'" + keys.join("','") + "'";
                    statement += sqlTemplate + columns + ') VALUES (' + values + ');';
                    statements.push( { statement: statement, arguments: args } );
                }
            }
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(obj, statements);
        }
    },

    _updateOrReplace: function( obj ) {
        // get data
        var data  = this.getData(obj);
        // get entity
        var entity = this.getEntity(obj);

        if (this._checkDb(obj) && this._checkEntity(obj, entity) && this._checkData(obj, data)) {

            data  = _.isArray(data) ? data : [ data ];
            var where = this._sqlWhere(obj);
            var statements  = [];
            var sqlTemplate = "UPDATE OR REPLACE '" + entity.name + "' SET";
            for( var i = 0; i < data.length; i++ ) {
                var statement = ''; // the actual sql insert string with values
                var value = entity.fromRecord(data[i]);
                var args  = _.values(value);
                var keys  = _.keys  (value);
                if (args.length > 0) {
                    var columns = "'" + keys.join("'=?,'") + "'=?";
                    statement += sqlTemplate + columns + where + ';';
                    statements.push( { statement: statement, arguments: args } );
                }
            }
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(obj, statements);
        }
    },

    _select: function( obj ) {

        var entity = this.getEntity(obj);

        if (this._checkDb(obj) && this._checkEntity(obj, entity)) {
            var lastStatement;
            var stm = this._sqlSelect(obj, entity);

            var that   = this;
            var result = this.getCollection(entity);
            result.reset();
            this.db.readTransaction(function( t ) {
                var statement = stm.statement || stm;
                var arguments = stm.arguments;
                lastStatement = statement;
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, "SQL-Statement: " + statement);
                t.executeSql(statement, arguments, function( tx, res ) {
                    var len = res.rows.length;//, i;
                    for( var i = 0; i < len; i++ ) {
                        var item = res.rows.item(i);
                        var record = entity.toRecord(item);
                        if (!that._selector || that._selector.matches(record)) {
                            result.add(record);
                        }
                    }
                }, function() {
                    // M.Logger.log('Incorrect statement: ' + sql, M.ERR)
                }); // callbacks: SQLStatementErrorCallback
            }, function( sqlError ) { // errorCallback
                var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, sqlError);
                that.handleError(obj, err, lastStatement);
            }, function() { // voidCallback (success)
                that.handleSuccess(obj, result);
            });
        }
    },

    _delete: function( obj ) {

        var entity = this.getEntity(obj);

        if (this._checkDb(obj) && this._checkEntity(obj, entity)) {
            var sql = this._sqlDelete(obj, entity);
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(obj, [sql]);
        }
    },

    _executeSql: function(obj) {
        if (obj.sql) {
            this._executeTransaction(obj, [obj.sql]);
        }
    },

    _executeTransaction: function(obj, statements ) {
        var error;
        var lastStatement;
        if( this._checkDb(obj) ) {
            var that = this;
            try {
                /* transaction has 3 parameters: the transaction callback, the error callback and the success callback */
                this.db.transaction(function( t ) {
                    _.each(statements, function( stm ) {
                        var statement = stm.statement || stm;
                        var arguments = stm.arguments;
                        lastStatement = statement;
                        M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, "SQL-Statement: " + statement);
                        t.executeSql(statement, arguments);
                    });
                }, function( sqlError ) { // errorCallback
                    that._transactionFailed = YES;
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, sqlError);
                    that.handleError(obj, err, lastStatement);
                }, function() {
                    that.handleSuccess(obj);
                });
            } catch( e ) {
                error = M.Error.create(M.CONST.ERROR.WEBSQL_UNKNOWN, e.message, e);
            }
        }
        if( error ) {
            this.handleCallback(obj.error, error, lastSql);
        }
    },

    ///////////////////////////
    // Private helper functions

    _checkDb: function(obj) {
        // has to be initialized first
        if( !this.db ) {
            var error = M.Error.create(M.CONST.ERROR.WEBSQL_NO_DBHANDLER, "db handler not initialized.");
            this.handleError(obj, error);
            return false;
        }
        return true;
    },

    _checkEntity: function(obj, entity) {
        if( !entity ) {
            var error = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, "No valid entity passed.");
            this.handleError(obj, error);
            return false;
        }
        return true;
    },

    _checkData: function(obj, data) {
        /* if no data were passed execute error callback and pass it an error object */
        if( (!_.isArray(data) || data.length == 0) && !_.isObject(data) ) {
            var error = M.Error.create(M.CONST.ERROR.WEBSQL_BULK_NO_RECORDS, "No data passed.");
            this.handleError(obj, error);
            return false;
        }
        return true;
    },

    ///////////////////////////
    // Helpers, for building SQL syntax
    // SQL Builders

    _sqlValue: function( value, field ) {
        var type = field && field.type ? field.type : M.DataField.detectType(value);
        if( type === M.CONST.TYPE.INTEGER || type === M.CONST.TYPE.FLOAT) {
            return value;
        } else if (type === M.CONST.TYPE.BOOLEAN) {
            return value ? "1" : "0";
        } else if (type === M.CONST.TYPE.NULL) {
            return 'NULL'
        }
        value = M.DataField.transform(value, M.CONST.TYPE.STRING);
        value = value.replace(/"/g, '""'); // .replace(/;/g,',');
        return '"' + value + '"';
    },

    _sqlDelete: function(obj, entity) {

        var sql = "DELETE FROM '" + entity.name + "'";
        var where = this._sqlWhere(obj, entity) || this._sqlWhereFromData(obj, entity);
        if (where) {
            sql += ' WHERE ' + where;
        }

        sql += obj.and ? ' AND ' + obj.and : '';

        return sql;
    },

    _sqlWhere: function(obj, entity) {
        this._selector = null;
        var sql = '';
        if( _.isString(obj.where) ) {
            sql = obj.where;
        } else  if ( _.isObject(obj.where) ) {
            this._selector = M.SqlSelector.create(obj.where, entity);
            sql = this._selector.buildStatement();
        }
        return sql;
    },

    _sqlWhereFromData: function(obj, entity) {

        var where = '';
        var data  = this.getData(obj);

        // build where out of records
        if( _.isArray(data) || _.isObject(data) ) {
            var records = _.isArray(data) ? data : [data];
            var curRec  = null;
            var keys    = obj.key ? M.Model.splitKey(obj.key) : entity.getKeys();
            if( keys.length === 1 ) {
                var ids = '';
                for( var i = 1; i <= records.length; i++ ) {
                    curRec = records[i - 1];
                    var field = entity.getField(keys[0]);
                    if( field ) {
                        var value = curRec[keys[0]];
                        if( typeof value !== 'undefined' ) {
                            ids += (ids ? ', ' : '') + this._sqlValue(value, field);
                        }
                    }
                }
                if( ids ) {
                    where += keys[0] + ' IN (' + ids + ')';
                }
            } else {
                var ids = '';
                for( var i = 1; i <= records.length; i++ ) {
                    curRec = records[i - 1];
                    var id = '';
                    for( var k = 0; k < keys.length; k++ ) {
                        var field = entity.getField(keys[k]);
                        if( field ) {
                            var value = curRec[keys[k]];
                            value = (typeof value !== 'undefined') ? this._sqlValue(value, field) : "NULL";
                            id += (id ? ' AND ' : '') + keys[k] + '=' + value;
                        }
                    }
                    ids += (ids ? ' OR ' : '') + id;
                }
                if( ids ) {
                    where += ids;
                }
            }
        }
        return where;
    },

    _sqlSelect: function(obj, entity) {

        var sql = 'SELECT ';
        if( obj.fields ) {
            if( obj.fields.length > 1 ) {
                sql += obj.fields.join(', ');
            } else if( obj.fields.length == 1 ) {
                sql += obj.fields[0];
            }
        } else {
            sql += '*';
        }
        sql += " FROM '" + entity.name + "'";

        if( obj.join ) {
            sql += ' JOIN ' + obj.join;
        }

        if( obj.leftJoin ) {
            sql += ' LEFT JOIN ' + obj.leftJoin;
        }

        var where = this._sqlWhere(obj, entity) || this._sqlWhereFromData(obj, entity);
        if (where) {
            sql += ' WHERE ' + where;
        }

        if( obj.order ) {
            sql += ' ORDER BY ' + obj.order;
        }

        if( obj.limit ) {
            sql += ' LIMIT ' + obj.limit;
        }

        if( obj.offset ) {
            sql += ' OFFSET ' + obj.offset;
        }
/*
        // now process constraint
        if( obj.constraint ) {

            var n = obj.constraint.statement.split("?").length - 1;
            //console.log('n: ' + n);
            // if parameters are passed we assign them to stmtParameters, the array that is passed for prepared statement substitution
            if( obj.constraint.parameters ) {

                if( n === obj.constraint.parameters.length ) { // length of parameters list must match number of ? in statement
                    sql += obj.constraint.statement;
                    stmtParameters = obj.constraint.parameters;
                } else {
                    M.Logger.log('Not enough parameters provided for statement: given: ' + obj.constraint.parameters.length + ' needed: ' + n, M.ERR);
                    return NO;
                }
//                * if no ? are in statement, we handle it as a non-prepared statement
//                * => developer needs to take care of it by himself regarding
//                * sql injection
            } else if( n === 0 ) {
                sql += obj.constraint.statement;
            }
        }

*/
        return sql;
    },

    _sqlDropTable: function( name ) {
        var sql = "DROP TABLE IF EXISTS '" + name +"'";
        return sql;
    },

    _sqlPrimaryKey: function( entity, keys ) {
        if( keys && keys.length == 1 ) {
            var column = entity.getField(keys[0]);
            if( column && column.type === M.CONST.TYPE.INTEGER ) {
                return keys[0] + ' INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE';
            } else {
                return keys[0] + ' PRIMARY KEY ASC UNIQUE';
            }
        }
        return '';
    },

    _sqlConstraint: function( entity, keys ) {
        if( keys && keys.length > 1 ) {
            return 'PRIMARY KEY (' + keys.join(',') + ') ON CONFLICT REPLACE';
        }
        return '';
    },

    _sqlCreateTable: function( entity ) {
        var that = this;
        var keys = entity.getKeys();
        var primaryKey = keys.length === 1 ? this._sqlPrimaryKey(entity, keys) : '';
        var constraint = keys.length > 1 ? this._sqlConstraint(entity, keys) : (entity.constraint || '');

        var columns = '';
        var fields  = entity.getFields();
        _.each(fields, function(field) {
            // skip ID, it is defined manually above
            if(!primaryKey || field.name !== keys[0] ) {
            // only add valid types
                var attr = that._dbAttribute(field);
                if( attr ) {
                    columns += (columns ? ', ' : '') + attr;
                }
            }
        });

        var sql = "CREATE TABLE IF NOT EXISTS '" + entity.name + "' (";
        sql += primaryKey ? primaryKey + ', ' : '';
        sql += columns;
        sql += constraint ? ', ' + constraint : '';
        sql += ');';
        return sql;
    },

    _sqlUpdateDatabase: function( oldVersion, newVersion ) {
        // create sql array, simply drop and create the database
        var sql = [];
        var entities = this.getEntities();
        if( entities ) {
            for( var name in entities ) {
                var entity = entities[name];
                sql.push(this._sqlDropTable(name));
                sql.push(this._sqlCreateTable(entity));
            }
        }
        return sql;
        // ToDo: check DB Metadata, and use alter table if possible
        // SELECT name, sql FROM sqlite_master where type = 'table'
        /*
         tx.executeSql('SELECT name, sql FROM sqlite_master WHERE type="table" AND name = "your_table_name";', [], function (tx, results) {
         var columnParts = results.rows.item(0).sql.replace(/^[^\(]+\(([^\)]+)\)/g, '$1').split(',');
         var columnNames = [];
         for(i in columnParts) {
         if(typeof columnParts[i] === 'string')
         columnNames.push(columnParts[i].split(" ")[0]);
         }
         console.log(columnNames);
         ///// Your code which uses the columnNames;
         });
         */
    },

    /**
     * @private
     * Creates the column definitions from the meta data of the table
     * @param {Object}
     * @returns {String} The string used for db create to represent this property.
     */
    _dbAttribute: function( field ) {
        if (field && field.name) {
            var type = this._typeMapping[field.type];
            var isReqStr = field.required ? ' NOT NULL' : '';
            if( type ) {
                return field.name + ' ' + type.toUpperCase() + isReqStr;
            }
        }
    }

});