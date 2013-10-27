M.WebSqlStore = M.Store.extend({

    _type: 'M.WebSqlStore',

    _transactionFailed: false,

    _selector: null,

    name: 'bikini',

    size: 1024 * 1024 * 5,

    version: '1.2',

    db: null,

    dataField: { name: 'data', type: 'text', required: true },

    idField:   { name: 'id', type: 'string', required: true },

    typeMapping: function() {
        var map = {};
        map [M.CONST.TYPE.OBJECTID] = M.CONST.TYPE.STRING;
        map [M.CONST.TYPE.DATE]     = M.CONST.TYPE.STRING;
        map [M.CONST.TYPE.OBJECT]   = M.CONST.TYPE.TEXT;
        map [M.CONST.TYPE.ARRAY]    = M.CONST.TYPE.TEXT;
        map [M.CONST.TYPE.BINARY]   = M.CONST.TYPE.TEXT;
        return map;
    }(),

    sqlTypeMapping: function() {
        var map = {};
        map [M.CONST.TYPE.STRING] = 'varchar(255)';
        map [M.CONST.TYPE.TEXT] = 'text';
        map [M.CONST.TYPE.OBJECT] = 'text';
        map [M.CONST.TYPE.ARRAY] = 'text';
        map [M.CONST.TYPE.FLOAT] = 'float';
        map [M.CONST.TYPE.INTEGER] = 'integer';
        map [M.CONST.TYPE.DATE] = 'varchar(255)';
        map [M.CONST.TYPE.BOOLEAN] = 'boolean';
        return map;
    }(),

    initialize: function( options ) {
        M.Store.prototype.initialize.apply(this, arguments);

        this.version = options.version || this.version;
        this._openDb({
            error: function( msg ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, msg);
            }
        });
    },

    _options: function(model, options, entity) {
        var opts = _.extend({}, options);
        opts.entity = this.getEntity(options.entity || model.entity || this.entity);
        opts.data   = this.getArray(model);
        return opts;
    },

    sync: function( method, model, options ) {
        var that    = options.store || this.store;
        var options = that._options(model, options, this.entity);
        switch( method ) {
            case 'create':
                that._insertOrReplace(options);
                break;

            case 'update':
            case 'patch':
                that._insertOrReplace(options);
                // that._updateOrReplace(options);
                break;

            case 'delete':
                that._delete(options);
                break;

            case 'read':
                if ( M.isCollection(this)) {
                    options.data = null;
                }
                that._select(model, options);
                break;

            default:
                break;
        }
    },

    select: function( options ) {
        this._select(options);
    },

    dropTable: function( options ) {
        this._dropTable(options);
    },

    createTable: function( options ) {
        this._createTable(options);
    },

    execute: function( options ) {
        this._executeSql(options);
    },


    /**
     * @private
     */
    _openDb: function( options ) {
        var error, dbError;
        /* openDatabase(db_name, version, description, estimated_size, callback) */
        if( !this.db ) {
            try {
                if( !window.openDatabase ) {
                    error = 'Your browser does not support WebSQL databases.';
                } else {
                    this.db = window.openDatabase(this.name, "", "", this.size);
                    if (this.entities) {
                        for (var key in this.entities) {
                            this._createTable({ entity: this.entities[key] });
                        }
                    }
                }
            } catch( e ) {
                dbError = e;
            }
        }
        if( this.db ) {
            if( this.version && this.db.version != this.version ) {
                this._updateDb(options);
            } else {
                this.handleSuccess(options, this.db);
            }
        } else if( dbError == 2 ) {
            // Version number mismatch.
            this._updateDb(options);
        } else {
            if( !error && dbError ) {
                error = dbError.message;
            }
            this.handleSuccess(options, error);
        }
    },

    _updateDb: function( options ) {
        var error;
        var lastSql;
        var that = this;
        try {
            var db = window.openDatabase(this.name, "", "", this.size);
            try {
                var arSql = this._sqlUpdateDatabase(db.version, this.version);
                db.changeVersion(db.version, this.version, function( tx ) {
                    _.each(arSql, function( sql ) {
                        M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, "SQL-Statement: " + sql);
                        lastSql = sql;
                        tx.executeSql(sql);
                    });
                }, function( msg ) {
                    var err =  msg;
                    that.handleError(options, err, lastSql);
                }, function() {
                    that.handleSuccess(options);
                });
            } catch( e ) {
                error =  e.message;
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'changeversion failed, DB-Version: ' + db.version)
            }
        } catch( e ) {
            error = e.message;
        }
        if( error ) {
            this.handleError(options, error);
        }
    },

    _sqlUpdateDatabase: function( oldVersion, newVersion ) {
        // create sql array, simply drop and create the database
        var sql = [];
        if( this.entities ) {
            for( var name in this.entities ) {
                var entity = this.entities[name];
                sql.push(this._sqlDropTable(entity.name));
                sql.push(this._sqlCreateTable(entity));
            }
        }
        return sql;
    },

    _sqlDropTable: function( name ) {
        var sql = "DROP TABLE IF EXISTS '" + name + "'";
        return sql;
    },

    _sqlPrimaryKey: function( entity, keys ) {
        if( keys && keys.length == 1 ) {
            var column = this.getField(entity, keys[0]);
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
        var fields = this.getFields(entity);
        _.each(fields, function( field ) {
            // skip ID, it is defined manually above
            if( !primaryKey || field.name !== keys[0] ) {
                // only add valid types
                var attr = that._dbAttribute(field);
                if( attr ) {
                    columns += (columns ? ', ' : '') + attr;
                }
            }
        });
        if (!columns) {
            columns = this._dbAttribute( this.dataField );
        }

        var sql = "CREATE TABLE IF NOT EXISTS '" + entity.name + "' (";
        sql += primaryKey ? primaryKey + ', ' : '';
        sql += columns;
        sql += constraint ? ', ' + constraint : '';
        sql += ');';
        return sql;
    },

    _sqlDelete: function(options, entity) {

        var sql = "DELETE FROM '" + entity.name + "'";
        var where = this._sqlWhere(options, entity) || this._sqlWhereFromData(options, entity);
        if (where) {
            sql += ' WHERE ' + where;
        }

        sql += options.and ? ' AND ' + options.and : '';

        return sql;
    },

    _sqlWhere: function(options) {
        var entity  = options.entity
        this._selector = null;
        var sql = '';
        if( _.isString(options.where) ) {
            sql = options.where;
        } else  if ( _.isObject(options.where) ) {
            this._selector = M.SqlSelector.create(options.where, entity);
            sql = this._selector.buildStatement();
        }
        return sql;
    },

    _sqlWhereFromData: function(options) {
        var that    = this;
        var data    = options.data;
        var entity  = options.entity
        var ids     = [];
        if (data && entity && entity.idAttribute) {
            var id, key = entity.idAttribute;
            var field   = this.getField(entity, key);
            _.each(data, function(model) {
                id = (_.isFunction(model.get) ? model.get(key) : model[key]) || model.id;
                if (!_.isUndefined(id)) {
                    ids.push(that._sqlValue(id, field));
                }
            });
            if (ids.length > 0) {
                return key + ' IN (' + ids.join(',') + ')';
            }
        }
        return '';
    },

    _sqlSelect: function(options) {

        var entity = options.entity;

        var sql = 'SELECT ';
        if( options.fields ) {
            if( options.fields.length > 1 ) {
                sql += options.fields.join(', ');
            } else if( options.fields.length == 1 ) {
                sql += options.fields[0];
            }
        } else {
            sql += '*';
        }
        sql += " FROM '" + entity.name + "'";

        if( options.join ) {
            sql += ' JOIN ' + options.join;
        }

        if( options.leftJoin ) {
            sql += ' LEFT JOIN ' + options.leftJoin;
        }

        var where = this._sqlWhere(options) || this._sqlWhereFromData(options);
        if (where) {
            sql += ' WHERE ' + where;
        }

        if( options.order ) {
            sql += ' ORDER BY ' + options.order;
        }

        if( options.limit ) {
            sql += ' LIMIT ' + options.limit;
        }

        if( options.offset ) {
            sql += ' OFFSET ' + options.offset;
        }

        return sql;
    },

    _sqlValue: function( value, field ) {
        var type = field && field.type ? field.type : M.Field.prototype.detectType(value);
        if( type === M.CONST.TYPE.INTEGER || type === M.CONST.TYPE.FLOAT) {
            return value;
        } else if (type === M.CONST.TYPE.BOOLEAN) {
            return value ? "1" : "0";
        } else if (type === M.CONST.TYPE.NULL) {
            return 'NULL'
        }
        value = M.Field.prototype.transform(value, M.CONST.TYPE.STRING);
        value = value.replace(/"/g, '""'); // .replace(/;/g,',');
        return '"' + value + '"';
    },

    /**
     * @private
     * Creates the column definitions from the meta data of the table
     * @param {Object}
     * @returns {String} The string used for db create to represent this property.
     */
    _dbAttribute: function( field ) {
        if( field && field.name ) {
            var type = this.sqlTypeMapping[field.type];
            var isReqStr = field.required ? ' NOT NULL' : '';
            if( type ) {
                return field.name + ' ' + type.toUpperCase() + isReqStr;
            }
        }
    },

    _dropTable: function( options ) {

        var entity = this.getEntity(options);

        if( this._checkDb(options) && this._checkEntity(options, entity) ) {
            var sql = this._sqlDropTable(entity.name);
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(options, [sql]);
        }
    },

    _createTable: function( options ) {

        var entity = this.getEntity(options);

        if( this._checkDb(options) && this._checkEntity(options, entity) ) {
            var sql = this._sqlCreateTable(entity);
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(options, [sql]);
        }
    },

    /**
     *
     * @param {options} options
     * @param {Array} of models or a collection, or a single model
     * @param {Number} transactionSize
     */
    _insertOrReplace: function( options ) {

        var entity = this.getEntity(options);
        var data   = options.data;

        if( this._checkDb(options) && this._checkEntity(options, entity) && this._checkData(options, data) ) {

            var statements = [];
            var sqlTemplate = "INSERT OR REPLACE INTO '" + entity.name + "' (";
            for( var i = 0; i < data.length; i++ ) {
                var statement = ''; // the actual sql insert string with values
                var value = entity.fromAttributes(data[i]);
                var args, keys;
                if ( !_.isEmpty(entity.fields)) {
                    args = _.values(value);
                    keys = _.keys(value);
                } else {
                    args = [ data[i].id,  JSON.stringify(value) ];
                    keys = [ 'id', 'data'];
                }
                if( args.length > 0 ) {
                    var values = new Array(args.length).join('?,') + '?';
                    var columns = "'" + keys.join("','") + "'";
                    statement += sqlTemplate + columns + ') VALUES (' + values + ');';
                    statements.push({ statement: statement, arguments: args });
                }
            }
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(options, statements);
        }
    },

    _updateOrReplace: function(options ) {

        var entity = this.getEntity(options);
        var data   = options.data;

        if (this._checkDb(options) && this._checkEntity(options, entity) && this._checkData(options, data)) {

            data  = _.isArray(data) ? data : [ data ];
            var where = this._sqlWhere(options);
            var statements  = [];
            var sqlTemplate = "UPDATE OR REPLACE '" + entity.name + "' SET ";
            for( var i = 0; i < data.length; i++ ) {
                var statement = ''; // the actual sql insert string with values
                var value, args, keys;
                if ( !_.isEmpty(entity.fields) ) {
                    value = entity.fromAttributes(data[i]);
                    args = _.values(value);
                    keys = _.keys(value);
                } else {
                    value = data[i];
                    args = [ entity.getId(data[i]),  JSON.stringify(value) ];
                    keys = [ 'id', 'data'];
                }
                if (args.length > 0) {
                    var columns = "'" + keys.join("'=?,'") + "'=?";
                    statement += sqlTemplate + columns + where + ';';
                    statements.push( { statement: statement, arguments: args } );
                }
            }
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(options, statements);
        }
    },

    _select: function(result, options) {

        var entity = this.getEntity(options);

        if( this._checkDb(options) && this._checkEntity(options, entity)  ) {
            var lastStatement;
            var stm  = this._sqlSelect(options);
            var that = this;
            var isCollection = M.isCollection(result);
            if (isCollection) {
                result = [];
            }
            this.db.readTransaction(function( t ) {
                var statement = stm.statement || stm;
                var arguments = stm.arguments;
                lastStatement = statement;
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, "SQL-Statement: " + statement);
                t.executeSql(statement, arguments, function( tx, res ) {
                    var len = res.rows.length;//, i;
                    for( var i = 0; i < len; i++ ) {
                        var item  = res.rows.item(i);
                        var attrs;
                        if ( !_.isEmpty(entity.fields) ) {
                            attrs = entity.toAttributes(item);
                        } else {
                            try { attrs = JSON.parse(item['data']); } catch(e) {}
                        }
                        if( attrs && !that._selector || that._selector.matches(attrs) ) {
                            if (isCollection) {
                                result.push(attrs);
                            } else {
                                result.set(attrs);
                                break;
                            }
                        }
                    }
                }, function() {
                    // M.Logger.log('Incorrect statement: ' + sql, M.ERR)
                }); // callbacks: SQLStatementErrorCallback
            }, function( sqlError ) { // errorCallback
                M.Logger.error(M.CONST.ERROR.WEBSQL_SYNTAX, "WebSql Syntax Error: " +sqlError);
                that.handleError(options, sqlError, lastStatement);
            }, function() { // voidCallback (success)
                that.handleSuccess(options, result);
            });
        }
    },

    _delete: function(options) {

        var entity = this.getEntity(options);

        if( this._checkDb(options) && this._checkEntity(options, entity) ) {
            var sql = this._sqlDelete(options, entity);
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(options, [sql]);
        }
    },

    _executeSql: function( options ) {
        if( options.sql ) {
            this._executeTransaction(options, [options.sql]);
        }
    },

    _executeTransaction: function( options, statements ) {
        var error;
        var lastStatement;
        if( this._checkDb(options) ) {
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
                    M.Logger.error(M.CONST.ERROR.WEBSQL_SYNTAX, sqlError);
                    that.handleError(options, sqlError, lastStatement);
                }, function() {
                    that.handleSuccess(options);
                });
            } catch( e ) {
                M.Logger.error(M.CONST.ERROR.WEBSQL_UNKNOWN, e.message);
            }
        }
        if( error ) {
            this.handleCallback(options.error, error, lastSql);
        }
    },

    _checkDb: function(options) {
        // has to be initialized first
        if( !this.db ) {
            var error = "db handler not initialized.";
            M.Logger.error(M.CONST.ERROR.WEBSQL_NO_DBHANDLER, error);
            this.handleError(options, error);
            return false;
        }
        return true;
    },

    getFields: function(entity) {
        if (!_.isEmpty(entity.fields)) {
            return entity.fields;
        } else {
            var fields = {};
            fields['data'] = this.dataField;
            var idAttribute = entity.idAttribute || 'id';
            fields[idAttribute] = this.idField;
            return fields;
        }
    },

    getField: function(entity, key) {
        return this.getFields(entity)[key];
    }
});