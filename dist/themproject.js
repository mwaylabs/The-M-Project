/*!
* Project:   The M-Project - Mobile HTML5 Application Framework
* Copyright: (c) 2014 M-Way Solutions GmbH.
* Version:   2.0.0-beta3
* Date:      Wed Jan 15 2014 11:34:12
* License:   http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
*/

(function (global, Backbone, _, $) {

    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * Defines the general namespace
     *
     * @type {Object}
     */
    var M = null;
    if( typeof exports !== 'undefined' ) {
        M = exports;
    } else {
        M = global.M = {};
    }
    
    /**
     * Version number of current release
     * @type {String}
     */
    M.Version = M.version = '2.0.0-beta3';
    
    /**
     * Empty function to be used when
     * no functionality is needed
     *
     * @type {Function}
     */
    M.f = function() {
    };
    
    M.create = function( args ) {
        return new this(args);
    };
    
    M.design = function( obj ) {
        var O = this.extend(obj || {});
        return new O();
    };
    
    M.extend = Backbone.Model.extend;
    
    M.isCollection = function( collection ) {
        return Backbone.Collection.prototype.isPrototypeOf(collection);
    };
    
    M.isModel = function( model ) {
        return Backbone.Model.prototype.isPrototypeOf(model);
    };
    
    M.isEntity = function( entity ) {
        return M.Entity.prototype.isPrototypeOf(entity);
    };
    
    M.isI18NItem = function( entity ) {
        return (entity && entity._type && entity._type === 'M.I18NItem') ? true : false;
    };
    
    M.isController = function( entity ) {
        return M.Controller.prototype.isPrototypeOf(entity);
    };
    
    /**
     *
     * Check if the given object is a M.View
     * @param {Object} Check this property if it inherits from M.View
     * @returns {boolean}
     */
    M.isView = function( view ) {
        return M.View.prototype.isPrototypeOf(view);
    };
    
    /**
     * Extend a function with the given interfaces
     * @param interfaces
     * @returns {M}
     */
    M.implements = function( interfaces ) {
        this.prototype._implementedInterfaces = interfaces;
        return this;
    };
    
    
    /**
     * Readable alias for true
     *
     * @type {Boolean}
     */
    YES = true;
    
    /**
     * Readable alias for false
     *
     * @type {Boolean}
     */
    NO = false;
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.CONST defines constants used all over the framework.
     * @module M.CONST
     *
     */
    
    M.CONST = {
    
        LOGGER: {
            /**
             * Tag for all core framework related log messages
             * @type String
             */
            TAG_FRAMEWORK_CORE: 'framework-core',
    
            /**
             * Tag for all data related log messages
             * @type String
             */
            TAG_FRAMEWORK_DATA: 'framework-data',
    
            /**
             * Tag for all UI related log messages
             * @type String
             */
            TAG_FRAMEWORK_UI: 'framework-ui',
    
            /**
             * Tag for all utility related log messages
             * @type String
             */
            TAG_FRAMEWORK_UTILITY: 'framework-utility',
    
            /**
             * Tag for messages that should be shown always
             * @type String
             */
            TAG_ALL: ''
        },
    
        I18N: {
            LOCALE_CHANGED: 'locale-changed'
        },
    
        /***
         * Data type Constants.
         */
        TYPE: {
            INTEGER:    'integer',
    
            STRING:     'string',
    
            TEXT:       'text',
    
            DATE:       'date',
    
            BOOLEAN:    'boolean',
    
            FLOAT:      'float',
    
            OBJECT:     'object',
    
            ARRAY:      'array',
    
            BINARY:     'binary',
    
            OBJECTID:   'objectid',
    
            NULL:       'null'
        },
    
        /***
         * Sorting orders:
         * ASC: Ascending
         * DESC: Descending
         */
        ORDER: {
            ASC: 'ASC',
            DESC: 'DESC'
        },
    
        /***
         * Error Constants.
         *
         * 0-99:    general errors
         *
         * 100-199: Model and Validation errors
         *
         * 200-299:   WebSQL errors
         *
         * 300-400:   CouchDB errors
         *
         * M.CONST.ERROR.UNDEFINED                      0       The reason for the error could not be clarified.
         * M.CONST.ERROR.CONNECTION                     1       A connection to an external service could not be established
         *
         * M.CONST.ERROR.VALIDATION_PRESENCE            100     A model record failed validation due to a property is not set but required to be.
         * M.CONST.ERROR.VALIDATION_URL                 101     A model record failed validation due to a property does not represent a valid URL but is required to do so.
         * M.CONST.ERROR.VALIDATION_PHONE               102     A model record failed validation due to a property does not represent a phone number but is required to do so.
         * M.CONST.ERROR.VALIDATION_NUMBER              103     A model record failed validation due to a property is not of type number or represents a number but is required to do so.
         * M.CONST.ERROR.VALIDATION_NOTMINUS            104     A model record failed validation due to a property contains a minus value but it is required to do not.
         * M.CONST.ERROR.VALIDATION_EMAIL               105     A model record failed validation due to a property does not represent a valid eMail but is required to do so.
         * M.CONST.ERROR.VALIDATION_DATE                106     A model record failed validation due to a property does not represent a valid date but is required to do so.
         *
         * M.CONST.ERROR.MODEL_PROVIDER_NOT_SET         120     A data provider has not been set.
         *
         * M.CONST.ERROR.WEBSQL_UNKNOWN                200     The transaction failed for reasons unrelated to the database itself and not covered by any other error code.
         * M.CONST.ERROR.WEBSQL_DATABASE                201     The statement failed for database reasons not covered by any other error code.
         * M.CONST.ERROR.WEBSQL_VERSION                 202     The operation failed because the actual database version was not what it should be. For example, a statement found that the actual database version no longer matched the expected version of the Database or DatabaseSync object, or the Database.changeVersion() or DatabaseSync.changeVersion() methods were passed a version that doesn't match the actual database version.
         * M.CONST.ERROR.WEBSQL_TOO_LARGE               203     The statement failed because the data returned from the database was too large. The SQL 'LIMIT' modifier might be useful to reduce the size of the result set.
         * M.CONST.ERROR.WEBSQL_QUOTA                   204     The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.
         * M.CONST.ERROR.WEBSQL_SYNTAX                  205     The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only.
         * M.CONST.ERROR.WEBSQL_CONSTRAINT              206     An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row.
         * M.CONST.ERROR.WEBSQL_TIMEOUT                 207     A lock for the transaction could not be obtained in a reasonable time.
         * M.CONST.ERROR.WEBSQL_PROVIDER_NO_DBHANDLER   208     No DBHandler, initialization did not take place or failed.
         * M.CONST.ERROR.WEBSQL_BULK_NO_RECORDS         210     No Records given for bulk transaction
         *
         * M.CONST.ERROR.COUCHDB_CONFLICT               300     A conflict occured while saving a document in CouchDB, propably caused by duplicate IDs
         * M.CONST.ERROR.COUCHDB_DBNOTFOUND             301     The provided database could not be found.
         * M.CONST.ERROR.COUCHDB_DBEXISTS               302     The db already exists and therefor cannot be created again.
         * M.CONST.ERROR.COUCHDB_DOCNOTFOUND            303     No document was found for the provided ID in the database.
         *
         */
        ERROR: {
            /**
             * A constant value for an undefined error.
             *
             * @type Number
             */
            UNDEFINED: 0,
    
            /**
             * A constant value for an error occuring when a connection to an external service could not be established.
             *
             * @type Number
             */
            CONNECTION: 1,
    
            /**
             * A model record failed validation due to a property is not set but required to be.
             *
             * @type Number
             */
            VALIDATION_PRESENCE: 100,
    
            /**
             * A model record failed validation due to a property does not represent a valid URL but is required to do so.
             *
             * @type Number
             */
            VALIDATION_URL: 101,
    
            /**
             * A model record failed validation due to a property does not represent a phone number but is required to do so.
             *
             * @type Number
             */
            VALIDATION_PHONE: 102,
    
            /**
             * A model record failed validation due to a property is not of type number or represents a number but is required to do so.
             *
             * @type Number
             */
            VALIDATION_NUMBER: 103,
    
            /**
             * A model record failed validation due to a property contains a minus value but it is required to do not.
             *
             * @type Number
             */
            VALIDATION_NOTMINUS: 104,
    
            /**
             * A model record failed validation due to a property does not represent a valid eMail but is required to do so.
             *
             * @type Number
             */
            VALIDATION_EMAIL: 105,
    
            /**
             * A model record failed validation due to a property does not represent a valid eMail but is required to do so.
             *
             * @type Number
             */
            VALIDATION_DATE: 106,
    
            /**
             * A Data Provider was not set for a model.
             *
             * @type Number
             */
            MODEL_PROVIDER_NOT_SET: 120,
    
    
            /* WebSQL Error Codes (see e.g. http://www.w3.org/TR/webdatabase/) */
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The transaction failed for reasons unrelated to the database itself and not covered by any other error code.'
             * Error code in WebSQL specification: 0
             *
             * @type Number
             */
            WEBSQL_UNKNOWN: 200,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed for database reasons not covered by any other error code.'
             * Error code in WebSQL specification: 1
             *
             * @type Number
             */
            WEBSQL_DATABASE: 201,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The transaction failed for reasons unrelated to the database itself and not covered by any other error code.'
             * Error code in WebSQL specification: 2
             *
             * @type Number
             */
            WEBSQL_VERSION: 202,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed because the data returned from the database was too large. The SQL 'LIMIT' modifier might be useful to reduce the size of the result set.'
             * Error code in WebSQL specification: 3
             *
             * @type Number
             */
            WEBSQL_TOO_LARGE: 203,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.'
             * Error code in WebSQL specification: 4
             *
             * @type Number
             */
            WEBSQL_QUOTA: 204,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only.'
             * Error code in WebSQL specification: 5
             *
             * @type Number
             */
            WEBSQL_SYNTAX: 205,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row.'
             * Error code in WebSQL specification: 6
             *
             * @type Number
             */
            WEBSQL_CONSTRAINT: 206,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'A lock for the transaction could not be obtained in a reasonable time.'
             * Error code in WebSQL specification: 7
             *
             * @type Number
             */
            WEBSQL_TIMEOUT: 207,
    
            /* following errors are WebSQL Data Provider errors. */
    
            /**
             * A constant value for an error occuring when dbHandler does not exist in
             * data provider. Reason: Initialization did not take place or failed.
             *
             * @type Number
             */
            WEBSQL_NO_DBHANDLER: 208,
    
            /**
             * A constant value for an error occuring with bulkSave operation in dataprovider.
             * The browser doe not support web sql databases.
             *
             * @type Number
             */
            WEBSQL_NOT_SUPPORTED: 209,
    
            /**
             * A constant value for an error occuring with bulkSave operation in dataprovider.
             * No Record array was passed to the method via the param obj.
             *
             * @type Number
             */
            WEBSQL_BULK_NO_RECORDS: 210,
    
    
            /**
             * A constant value for an error occuring when a conflict appears when saving a document in CouchDB. This is propably caused by duplicate IDs
             *
             * @type Number
             */
            COUCHDB_CONFLICT: 300,
    
            /**
             * A constant value for an error occuring if the provided database could not be found
             *
             * @type Number
             */
            COUCHDB_DBNOTFOUND: 301,
    
            /**
             * A constant value for an error occuring if a database that shall be created already exists
             *
             * @type Number
             */
            COUCHDB_DBEXISTS: 302,
    
            /**
             * A constant value for an error occuring if a document could not be found
             *
             * @type Number
             */
            COUCHDB_DOCNOTFOUND: 303
        },
    
        /**
         * input type constants
         */
        INPUT: {
            /**
             * A constant value for input type text
             *
             * @type {String}
             */
            TEXT: 'text',
    
            /**
             * A constant value for input type password
             *
             * @type {String}
             */
            PASSWORD: 'password',
    
            /**
             * A constant value for input type number
             *
             * @type {String}
             */
            NUMBER: 'number',
    
            /**
             * A constant value for input type telephone
             *
             * @type {String}
             */
            TELEPHONE: 'tel',
    
            /**
             * A constant value for input type url
             *
             * @type {String}
             */
            URL: 'url',
    
            /**
             * A constant value for input type email
             *
             * @type {String}
             */
            EMAIL: 'email',
    
            /**
             * A constant value for input type time
             *
             * @type {String}
             */
            TIME: 'time',
    
            /**
             * A constant value for input type date
             *
             * @type {String}
             */
            DATE: 'date',
    
            /**
             * A constant value for input type datetime
             *
             * @type {String}
             */
            DATETIME: 'datetime',
    
            /**
             * A constant value for input type month
             *
             * @type {String}
             */
            MONTH: 'month',
    
            /**
             * A constant value for input type week
             *
             * @type {String}
             */
            WEEK: 'week'
        },
    
        GRID: {
            COLUMNS: 12
        }
    };
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Object
     *
     * @type {{_type: string, _implementedInterfaces: null, _create: Function, include: Function, design: Function, implement: Function, hasInterfaceImplementation: Function, bindToCaller: Function, _init: Function, _normalize: Function, handleCallback: Function, getObjectType: Function, _addInterfaces: Function}}
     */
    M.Object = {
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Object',
    
        /**
         * This property contains an array of interfaces the object implements. This
         * is used internally for initializing the object properly.
         *
         * @type {Array}
         */
        _implementedInterfaces: null,
    
        /**
         * Creates an object based on a passed prototype.
         *
         * @param {Object} proto The prototype of the new object.
         */
        _create: function( proto ) {
            var F = function() {
            };
            F.prototype = proto;
            return new F();
        },
    
        /**
         * Includes passed properties into a given object.
         *
         * @param {Object} properties The properties to be included into the given object.
         */
        include: function( properties ) {
            for( var prop in properties ) {
                if( this.hasOwnProperty(prop) ) {
                    throw M.Exception.RESERVED_WORD.getException();
                }
                this[prop] = properties[prop];
            }
    
            return this;
        },
    
        /**
         * Creates a new class and extends it with all functions of the defined super class
         * The function takes multiple input arguments. Each argument serves as additional
         * super classes - see mixins.
         *
         * @param {Object} properties The properties to be included into the given object.
         */
        design: function( properties ) {
            /* create the new object */
            // var obj = M.Object._create(this);
            var obj = this._create(this);
    
            /* assign the properties passed with the arguments array */
            obj.include(this._normalize(properties));
    
            /* call the new object's _init method to initialize it */
            obj._init();
    
            /* check if the object implements an interface and init it properly */
            _.each(obj._implementedInterfaces, function( i ) {
                obj.bindToCaller(obj, i._init)();
            }, obj);
    
            /* return the new object */
            return obj;
        },
    
        /**
         * This method is used for adding a certain interface to an existing object. It
         * therefore calls the getInterface() method of the given object and attaches the
         * returned interface to the object. If there already is an implementation of a
         * certain property or method, that one is skipped. So it is possible to overwrite
         * interface suff within the object itself.
         *
         * @param {M.Interface} obj The interface to be implemented.
         * @returns {Object}
         */
        implement: function( obj ) {
            if( obj && obj.isMInterface ) {
                var i = obj.getInterface(this);
    
                _.each(i, function( value, key ) {
                    if( this[key] ) {
                        i[key] = null;
                        delete i[key];
                    }
                }, this);
    
                this.include(i);
    
                this._implementedInterfaces = this._implementedInterfaces || [];
            }
    
            return this;
        },
    
        /**
         * This method checks whether an object implements a certain interface or not.
         *
         * @param {Object} obj The interface to check for.
         * @returns {Boolean}
         */
        hasInterfaceImplementation: function( obj ) {
            var hasInterfaceImplementation = NO;
            _.each(this._implementedInterfaces, function( i ) {
                if( obj === i ) {
                    hasInterfaceImplementation = YES;
                }
            }, this);
    
            return hasInterfaceImplementation;
        },
    
        /**
         * Binds a method to its caller, so it is always executed within the right scope.
         *
         * @param {Object} caller The scope of the method that should be bound.
         * @param {Function} method The method to be bound.
         * @param {Object} arg One or more arguments. If more, then apply is used instead of call.
         */
        bindToCaller: function( caller, method, arg ) {
            return function() {
                if( typeof method !== 'function' || typeof caller !== 'object' ) {
                    throw M.Exception.INVALID_INPUT_PARAMETER.getException();
                }
                if( Array.isArray(arg) ) {
                    return method.apply(caller, arg);
                }
                return method.call(caller, arg);
            };
        },
    
        /**
         * This method is called right after the creation of a new object and can be used to
         * initialize some internal properties.
         *
         * This implementation in M.Object only serves as some kind of 'interface' declaration.
         */
        _init: function() {
    
        },
    
        /**
         * This method is used internally to normalize the properties object that is used
         * for extending a given object.
         *
         * @param obj
         * @returns {Object}
         * @private
         */
        _normalize: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
    
            return obj;
        },
    
        /**
         * Calls a method defined by a handler
         *
         * @param {Object} handler A function, or an object including target and action to use with bindToCaller.
         */
        handleCallback: function( handler ) {
            var args = Array.prototype.slice.call(arguments, 1);
            if( handler ) {
                var target = typeof handler.target === 'object' ? handler.target : this;
                var action = handler;
                if( typeof handler.action === 'function' ) {
                    action = handler.action;
                } else if( typeof handler.action === 'string' ) {
                    action = target[handler.action];
                }
                if( typeof action === 'function' ) {
                    return this.bindToCaller(target, action, args)();
                }
            }
        },
    
        /**
         * Returns the type of the object.
         *
         * @return {String}
         */
        getObjectType: function() {
            return this._type;
        },
    
        /**
         * Loops over the registered interfaces and bind them to itself
         * @private
         */
    
        _addInterfaces: function() {
            _.each(this._implementedInterfaces, function( value ) {
                this.implement(value);
            }, this);
        },
    
        deepCopy: function( value ) {
            return JSON.parse(JSON.stringify(value));
        }
    
    };
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.Config
     *
     * @param options This property contains the application-specific configurations.
     * @constructor
     */
    M.Config = function (options) {
        this.options = options || {};
        if (_.isFunction(this.initialize)) {
            this.initialize(this.options);
        }
    };
    
    M.Config.extend = M.extend;
    M.Config.create = M.create;
    M.Config.design = M.design;
    
    _.extend(M.Config.prototype, {
    
        /**
         * The type of this object.
         *
         * @private
         */
        _type: 'M.Config',
    
        /**
         * Returns the value of a configuration as defined in the config.js of the given key.
         * To access these properties within the application, use the getConfig() method of
         * your M.Application instance like in the example below.
         *
         * @param {String} The key of the configuration value to want to retrieve.
         * @returns {String} The value in the application's config object with the key 'key'.
         *
         * @example
         *
         * var appname = Kitchensink.getConfig('name');
         * console.log(appname); // Kitchensink
         */
        get: function (name) {
            return this[name];
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.Logger defines the prototype for any logging object.
     * It is used to log messages out of the application.
     * @module M.Logger
     *
     * @extends M.Object
     */
    M.Logger = M.Object.design(/** @scope M.Logger.prototype */ {
    
        /**
         * Specifies which tags are displayed in the console.
         * Leave this properties empty to display all logs.
         *
         * M.Logger.filter('tag1');
         *
         * M.Logger.log('Init Module', 'tag1');               // will displayed
         * M.Logger.log('Get environment', 'tag2');           // will not displayed
         * M.Logger.log('Loading data', ['tag1', 'tag2']);    // will displayed
         * M.Logger.log('Loading images', ['tag2', 'tag3']);  // will not displayed
         *
         * @type Array
         */
        filter: [],
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Logger',
    
        /**
         * A constant value for logging output: log.
         *
         * @type Number
         * @private
         */
        _OUTPUT_LOG: 0,
    
        /**
         * A constant value for logging output: warning.
         *
         * @type Number
         * @private
         */
        _OUTPUT_DEBUG: 1,
    
        /**
         * A constant value for logging output: warning.
         *
         * @type Number
         * @private
         */
        _OUTPUT_WARN: 2,
    
        /**
         * A constant value for logging output: error.
         *
         * @type Number
         * @private
         */
        _OUTPUT_ERROR: 3,
    
        /**
         * A constant value for logging level: timeEnd.
         *
         * @type Number
         * @private
         */
        _LEVEL_TIME_END: 4,
    
        /**
         * This property holds the fallback entries for _time() / _timeEnd()
         *
         * @type Array
         */
        _times: [],
    
        /**
         * This property holds the fallback entries for _count()
         *
         * @type Array
         */
        _counts: [],
    
        /**
         * This property holds the debugMode from the config
         *
         * @type Boolean
         */
        _appRunsInNotDebugMode: NO,
    
        /**
         * Constructor method for M.Logger
         */
        _init: function() {
    
            // Prevent a console.log from blowing things up if we are on a browser that doesn't support this.
            if( _.isUndefined(console) ) {
                window.console = {};
                console.log = console.debug = console.warn = console.error = function() {
                };
            }
    
            // Check if app runs in debug mode
            // TODO: Get debugMode form config
            this._appRunsInNotDebugMode = NO;
        },
    
        /**
         * This method is used to log a message on logging level debug.
         *
         * @param {String/Array} tag
         * @param {...*} message The logging message.
         */
        log: function( ) {
            this._print(this._OUTPUT_LOG, arguments);
        },
    
        /**
         * This method is used to log a message on logging level warning.
         *
         * @param {String/Array} tag
         * @param {...*} message The logging message.
         */
        warn: function( ) {
            this._print(this._OUTPUT_WARN, arguments);
        },
    
        /**
         * This method is used to log a message on logging level error.
         *
         * @param {String/Array} tag
         * @param {...*} message The logging message.
         */
        error: function( tag, message ) {
            this._print(this._OUTPUT_ERROR, message, tag);
        },
    
        /**
         * Starts a new timer with an associated label.
         *
         * @param {String}
         */
        time: function( label ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Fallback if the browser doesn't support time
            if( _.isUndefined(console.time2) ) {
                this._time(label);
                return;
            }
            console.time(label);
        },
    
        /**
         * Stops the timer with the specified label and prints the elapsed time.
         *
         * @param {String}
         */
        timeEnd: function( label ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Fallback if the browser doesn't support timeEnd
            if( _.isUndefined(console.timeEnd2) ) {
                this._timeEnd(label);
                return;
            }
            console.timeEnd(label);
        },
    
        /**
         *  Writes the number of times that count() has been invoked with the same label.
         *
         * @param {String}
         */
        count: function( label ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Fallback if the browser doesn't support count
            if( _.isUndefined(console.count2) ) {
                this._count(label);
                return;
            }
            console.count(label);
        },
    
        /**
         * This method is used to log anything out of an application based on the given logging level.
         *
         * @param {String} message The logging message.
         * @param {Number} output The logging level.
         * @param {String/Array} tag
         * @private
         */
        _print: function( output, args ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Assign default level if level is undefined
            output = output || this._OUTPUT_LOG;
    
            args = Array.prototype.slice.call(args);
    
            // Assign default tag if tag is undefined
            if( args.length === 1 ) {
                args.splice(0, 0, M.CONST.LOGGER.TAG_ALL);
            }
    
            var tags = args[0];
    
            if( this._preventOutputByTag(tags) ) {
                return;
            }
    
            var prettyTagName = '';
            if( output < this._OUTPUT_ERROR ) {
                if( _.isArray(tags) && this.filter.length > 0 ) {
                    var tagString = _.without(this.filter, tags);
                    prettyTagName = '[' + tagString + ']';
                } else if( tags.length > 0 ) {
                    prettyTagName = '[' + tags + ']';
                }
            }
    
            if( args.length > 1 ) {
                if( prettyTagName === M.CONST.LOGGER.TAG_ALL ) {
                    args.splice(0, 1);
                } else {
                    args[0] = prettyTagName;
                }
            }
    
            switch( output ) {
                case this._OUTPUT_LOG:
                    console.log.apply(console, args);
                    break;
                case this._OUTPUT_WARN:
                    args.splice(0, 0, 'WARNING:');
                    console.warn.apply(console, args);
                    break;
                case this._OUTPUT_ERROR:
                    args.splice(0, 0, 'ERROR:');
                    console.error.apply(console, args);
                    break;
                case this._OUTPUT_DEBUG:
                    console.debug.apply(console, args);
                    break;
                default:
                    console.log.apply(console, args);
                    break;
            }
        },
    
        /**
         * Fallback if the browser doesn't support time
         *
         * @private
         */
        _time: function( label ) {
            var item = _.find(this._times, function( item ) {
                return item.label === label;
            });
            if( !item ) {
                this._times.push({
                    label: label,
                    time: new Date().getTime()
                });
            }
        },
    
        /**
         * Fallback if the browser doesn't support timeEnd
         *
         * @private
         */
        _timeEnd: function( label ) {
            var item = _.find(this._times, function( item ) {
                return item.label === label;
            });
            if( item ) {
                var now = new Date().getTime();
                var diff = (now - item.time) / 1000;
                var index = this._times.indexOf(item);
                this._print(this._OUTPUT_DEBUG, [item.label + ': ' + diff + 'ms']);
                this._times.splice(index, 1);
            }
        },
    
        /**
         * Fallback if the browser doesn't support count
         *
         * @private
         */
        _count: function( label ) {
            var item = _.find(this._counts, function( item ) {
                return item.label === label;
            });
            if( item === undefined ) {
                this._counts.push({
                    label: label,
                    count: 1
                });
                item = _.last(this._counts);
            } else {
                item.count++;
            }
    
            this._print(this._OUTPUT_DEBUG, [item.label + ': ' + item.count]);
        },
    
        /**
         * Prevent a print() call if the tag is not defined in filter.
         *
         * @param tag {String/Array}
         * @returns {boolean}
         * @private
         */
        _preventOutputByTag: function( tag ) {
            if( this.filter.length > 0 && this.filter.indexOf(M.CONST.TAG_ALL) === -1 ) {
                if( _.isString(tag) ) {
                    if( this.filter.indexOf(tag) === -1 ) {
                        return YES;
                    }
                } else if( _.isArray(tag) ) {
                    if( _.difference(tag, this.filter).length === tag.length ) {
                        return YES;
                    }
                }
            }
            return NO;
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Controller
     *
     */
    
    /**
     * @param options
     * @constructor
     */
    M.Controller = function (options) {
        this.options = options || {};
        if (_.isFunction(this.initialize)) {
            this.initialize(this.options);
        }
    };
    
    M.Controller.extend = M.extend;
    M.Controller.create = M.create;
    M.Controller.design = M.design;
    
    _.extend(M.Controller.prototype, Backbone.Events, {
    
        _type: 'M.Controller',
    
        /**
         *
         * @param {Object} options
         * @returns {Controller}
         */
        initialize: function () {
            return this;
        },
    
        applicationStart: function () {
    
        },
    
        show: function () {
    
        },
    
        set: function (name, value) {
            this[name] = value;
            this.trigger(name, value);
        },
    
        get: function (name) {
            return this[name];
        },
    
        /**
         * Gets called if the application was initialized
         *
         */
        applicationReady: function(){
    
        },
    
        apply: function( router, args ) {
            var appInstance = global[M.APPLICATION_NAME];
    
            if( appInstance.isInitialLoad ) {
                this.applicationStart.apply(this, args);
                appInstance.isInitialLoad = false;
                appInstance._initReady();
            } else {
                this.show.apply(this, args);
            }
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Application
     *
     * @type {*}
     * @extends M.Controller
     */
    M.Application = M.Controller.extend({
    
        _type: 'M.Application',
    
        Models: null,
    
        Collections: null,
    
        Views: null,
    
        Controllers: null,
    
        Routers: null,
    
        _isReady: NO,
    
        _debugView: null,
    
        /**
         * This property is an indicator for the initial load of an app
         * @type {boolean}
         */
        isInitialLoad: true,
    
        /**
         * This property contains an instance of the debug view.
         *
         * @private
         */
        _layout: null,
    
        /**
         * This property contains the application-specific configurations.
         *
         * @private
         */
        _config: null,
    
    
        initialize: function( config ) {
            this.Models = {};
            this.Collections = {};
            this.Views = {};
            this.Controllers = {};
            this.Routers = {};
    
            M.APPLICATION_NAME = config.name;
            this._config = M.Config.design(config);
    
            return this;
        },
    
        start: function( options ) {
    
            this.router = M.Router.design(options.routing);
    
            this._initLocale(options).then(function() {
                Backbone.history.start();
            });
    
            return this;
        },
    
        setLayout: function( layout ) {
            if( this._layout ) {
                this._layout.destroy();
                this._layout = null;
            }
    
            this._layout = layout;
            this._layout.render();
            $('#main').html(this._layout.$el);
        },
    
        getLayout: function() {
            return this._layout;
        },
    
        navigate: function( settings ) {
    
            // Prevent routing, if a transition is animating
            if(this._layout && this._layout.isAnimating && this._layout.isAnimating()) {
                return false;
            }
    
            var url = settings.route;
            var path = '';
            if( settings.params ) {
                path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
                url += '/';
            }
    
            if( this._layout ) {
                this._layout.setTransition(settings.transition);
            }
    
    
            var options = settings.options || true;
            Backbone.history.navigate(url + path, options);
        },
    
        _initLocale: function( options ) {
            var defer = $.Deferred();
    
            M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function() {
                defer.resolve();
            });
    
            if( this._config && this.getConfig('locales') ) {
                M.I18N.setLocales(this.getConfig('locales'));
                M.I18N.setLocale(moment.lang());
            } else {
                defer.resolve();
            }
    
            return defer.promise();
        },
    
        _initReady: function() {
            if( this._isReady ) {
                return;
            }
    
            this._initDebugView();
    
            //Init fastclick
            FastClick.attach(document.body);
    
            _.each(Object.getPrototypeOf(this.router), function( controller, key ) {
                if(M.isController(controller)){
                    controller.applicationReady();
                }
            }, this);
    
            this._isReady = YES;
        },
    
        /**
         * This method initialize the M.DebugView
         *
         * @private
         */
        _initDebugView: function() {
            if( this.getConfig('debugView') ) {
                this._debugView = M.DebugView.create();
            }
        },
    
        /**
         * Returns the value of a configuration as defined in the config.js of the given key.
         * To access these properties within the application, use the getConfig() method of
         * your M.Application instance like in the example below.
         *
         * @param {String} The key of the configuration value to want to retrieve.
         * @returns {String} The value in the application's config object with the key 'key'.
         *
         * @example
         *
         * var appname = Kitchensink.getConfig('name');
         * console.log(appname); // Kitchensink
         */
        getConfig: function( key ) {
            return this._config.get(key);
        }
    
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Router
     *
     * @type {*}
     * @extends Backbone.Router
     */
    M.Router = Backbone.Router.extend();
    M.Router.create = M.create;
    M.Router.design = M.design;
    
    _.extend(M.Router.prototype, M.Object, {
    
        _type: 'M.Router'
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * Use the ViewManager to quick access views
     * @module M.ViewManager
     *
     * @type {*}
     * @extends M.Object
     */
    M.ViewManager = M.Object.design({
    
    
        /**
         * Object of all registered views
         */
        _allViews: null,
    
    
        /**
         * all views register themself inside the initialize function to the ViewManager.
         * @param view
         */
        registerView: function( view ) {
            if( !_.isObject(this._allViews) ) {
                this._allViews = {};
            }
    
            if( !view.cid ) {
                console.warn('view has no cid');
                return;
            }
    
            if( this._allViews[view.cid] ) {
                console.warn('view already registered');
            } else {
                this._allViews[view.cid] = view;
            }
        },
    
        /**
         *
         * Returns the view to the given parameter. Returns an array with the all found views. If none is found an empty array gets returned
         * @example M.ViewManager.getView($0) // $0 is a selected DOM element
         * @param searchterm
         * @returns {Array}
         * var testView = M.View.extend({
                value: 0
            }, {
                child: M.View.extend({
                    value: 1
                }, {
                    child: M.TextView.extend({
                        value: 2
                    }, {
                        child: M.ButtonView.extend({
                            value: 3
                        })
                    })
                })
            }).create().render();
    
         var children = M.ViewManager.getView('child'); // [child, child, child]
         children[0].getValue(); //1
         children[1].getValue(); //2
         children[2].getValue(); //3
    
         var children = M.ViewManager.getView('child', testView.childViews.child); // [child, child]
         children[0].getValue(); //2
         children[1].getValue(); //3
    
         var children = M.ViewManager.getView(testView.el); // [child]
         children[0].getValue(); //0
    
         var children = M.ViewManager.getView('child', M.ButtonView.prototype._type); // [child]
         children[0].getValue(); //3
         *
         */
        getView: function( searchterm, specifier ) {
    
            var foundViews = [];
            // if no search term is given return false
            if( !searchterm ) {
                return foundViews;
            }
    
            if( this._allViews[searchterm] ) {
                // if the search term is a cid return that one
                foundViews.push(this._allViews[searchterm]);
                return foundViews;
            } else if( searchterm.DOCUMENT_NODE ) {
                // if the search term is a DOM element search for it
                foundViews.push(this._getViewByDom(searchterm));
                return foundViews;
            } else if( typeof searchterm === 'string' ) {
                if( M.isView(specifier) ) {
                    // if the searchterm is a string and the specifier is a M.View
                    // use the specifier as root element and find every childview with the given searchterm
                    this._getViewInScope(searchterm, specifier, foundViews);
                    return foundViews;
                } else if( typeof searchterm === 'string' ) {
                    // if the searchterm is a string and the specifier is a string
                    // use the specifier as type
                    _.each(this._allViews, function( view ) {
                        // loop over all views
                        if( view.childViews && view.childViews.hasOwnProperty(searchterm) ) {
                            // if the child view contains the child view
                            if( typeof specifier === 'string' ) {
                                // use the specifier as type
                                if( view.childViews[searchterm] && view.childViews[searchterm]._type === specifier ) {
                                    foundViews.push(view.childViews[searchterm]);
                                }
                            } else {
                                foundViews.push(view.childViews[searchterm]);
                            }
    
                        }
                    }, this);
                }
    
                return foundViews;
            }
            return foundViews;
        },
    
        /**
         * Compares all views with the given dom
         * @param searchterm
         * @returns {M.View}
         * @private
         */
        _getViewByDom: function( dom ) {
            return _.find(this._allViews, function( view ) {
                return (view.el === dom);
            });
        },
    
        _getViewInScope: function( searchTerm, scope, foundElements ) {
            if( scope.childViews !== {} ) {
                if( scope.childViews.hasOwnProperty(searchTerm) ) {
                    foundElements.push(scope.childViews[searchTerm]);
                }
                for( var childView in scope.childViews ) {
                    this._getViewInScope(searchTerm, scope.childViews[childView], foundElements);
                }
            }
        }
    
    
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.Environment wraps the Modernizr plugin Detectizr.
     * Thanks to https://github.com/barisaydinoglu/Detectizr which is Licensed under MIT license.
     * @module M.Environment
     *
     */
    
    Modernizr.Detectizr.detect({detectScreen:false});
    
    M.Environment = Modernizr.Detectizr;
    
    // Shorthand to detect android version.
    M.Environment.isLowerThanAndroid4 = (Modernizr.Detectizr.device.model === 'android' && parseInt(Modernizr.Detectizr.device.osVersion, 10) < 4 );
    M.Environment.isLowerThaniPhone4S = (Modernizr.Detectizr.device.os === 'ios' && (document.width <= 320 || document.width <= 480 ));
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.I18NItem
     *
     * @type {*}
     * @extends M.Object
     */
    M.I18NItem = M.Object.design({
    
        /**
         * The type of this object.
         *
         * @type {String}
         * @private
         */
        _type: 'M.I18NItem',
    
        /**
         * The translation key. Used to identify the locale item.
         *
         * @type {String}
         */
        key: null,
    
        /**
         * The translation placeholder as a key-value pair.
         * Used to replace all {{placeholderName}} in the locale string
         * with the appropriate value.
         *
         * Example:
         * {
         *    username: 'Tom',
         *    status: 'offline'
         * }
         *
         * @type {Object}
         */
        placeholder: null,
    
        /**
         * Creates a new instance with the given key and placeholder.
         * Used to hold the key and placeholder for later use.
         *
         * @param key {String}
         * @param placeholder {String}
         * @returns {M.I18NItem}
         */
        create: function (key, placeholder) {
            if(!key) {
                return null;
            }
    
            this.key = key;
            if(placeholder) {
                this.placeholder = placeholder;
            }
            return _.extend({}, this);
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.I18N defines a prototype for internationalisation and localisation within
     * The M-Project. It is used to set and get the application's language and to
     * localize any string within an application.
     * @module M.I18N
     *
     * @extends M.Object
     */
    M.I18N = _.extend(Backbone.Events, M.Object.design({
    
        /**
         * The type of this object.
         *
         * @private
         */
        _type: 'M.I18N',
    
        /**
         * List of available locales.
         *
         * @private
         */
        _availableLocales: [],
    
        /**
         * The current active locale
         *
         * @private
         */
        _activeLocale: null,
    
        /**
         * List of loaded dictionaries
         *
         * @private
         */
        _dictionary: [],
    
        /**
         * Set all available locales.
         *
         * @returns {Array}
         */
        setLocales: function (locales) {
            if (locales && _.isArray(locales) && locales.length > 0) {
                this._availableLocales = locales;
                return true;
            } else {
                console.log('No locales given!');
                return false;
            }
        },
    
        /**
         * Returns all available locales.
         *
         * @returns {Array}
         */
        getLocales: function () {
            return this._availableLocales;
        },
    
        /**
         * Changes the active locale.
         *
         * @param {String}
         */
        setLocale: function (locale) {
            this._activeLocale = locale;
            this.loadFileForLocale();
            // TODO store locale
        },
    
        /**
         * Returns the active locale
         *
         * @returns {String}
         */
        getLocale: function () {
            return this._activeLocale;
        },
    
        /**
         * This is just a shorthand for M.I18NItem.create
         *
         * @param key
         * @param placeholder
         * @returns {key|*}
         */
        get: function (key, placeholder) {
            return M.I18NItem.create(key, placeholder);
        },
    
        /**
         * Translates key into current locale, given placeholders
         * in {{placeholderName}} are replaced with the appropriate value.
         *
         * @param key
         * @param placeholder
         * @returns {*}
         */
        l: function (key, placeholder) {
            if (this._dictionary[this._activeLocale] === undefined || key === undefined || key === '' || key === null) {
                return '';
            }
    
            var translation = this._dictionary[this._activeLocale];
            translation = translation[key];
    
            if (translation) {
                /**
                 * Replace placeholders with actual values
                 */
                if (placeholder) {
                    _.each(placeholder, function (value, key) {
                        translation = translation.replace('{{' + key + '}}', value);
                    });
                }
            } else {
                translation = 'MISSING TRANSLATION ' + this._activeLocale + ': ' + key;
                console.log(translation);
            }
    
            return translation;
        },
    
        /**
         * Loads the locale file and puts it into dictionary
         */
        loadFileForLocale: function () {
            var fileUrl = 'i18n/' + this._activeLocale + '.js';
    
            // set locale for moment.js
            moment.lang(this._activeLocale.substr(0, 2));
            var that = this;
    
            // Load file only if it's not yet available
            if (this._dictionary[that._activeLocale] === undefined) {
                $.getJSON(fileUrl)
                    .success(function (response) {
                        that._setDictionary(response);
                    })
                    .error(function (jqxhr, textStatus, error ) {
                        // TODO handle error
                        if(textStatus === 'parsererror') {
                            console.log( 'It\'s seem that the i18n file '+ fileUrl +' is corrupt! ' + error.message );
                        } else {
                            console.log( arguments );
                        }
                    });
            }
            else {
                this._triggerLocaleChangedEvent();
            }
        },
    
        /**
         * Keeps the given keys in the dictionary.
         *
         * @param {Object}
         * @private
         */
        _setDictionary: function (locales) {
            var parsed = this._parseObject(locales);
            this._dictionary[this._activeLocale] = parsed;
            this._triggerLocaleChangedEvent();
        },
    
        /**
         * Triggers the locale changed event.
         *
         * @private
         */
        _triggerLocaleChangedEvent: function () {
            this.trigger(M.CONST.I18N.LOCALE_CHANGED, this._activeLocale);
        },
    
        /**
         * Return a flattened version of an object.
         *
         * @param {Object}
         * @returns {Object}
         * @private
         */
        _parseObject: function (obj) {
            var result = {};
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                if (_.isObject(obj[key])) {
                    var flatObject = this._parseObject(obj[key]);
                    for (var childKey in flatObject) {
                        if (!flatObject.hasOwnProperty(childKey)) {
                            continue;
                        }
                        result[key + '.' + childKey] = flatObject[childKey];
                    }
                } else {
                    result[key] = obj[key];
                }
            }
            return result;
        }
    }));
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    // ===========================================================================
    //
    // M.ObjectId uses code from meteor.js
    // https://github.com/meteor/meteor/blob/master/packages/minimongo
    //
    // Thanks for sharing!
    //
    // ===========================================================================
    
    // m_require('core/foundation/object.js');
    /**
     *
     * @module M.ObjectID
     *
     */
    M.ObjectID = function( hexString ) {
        M.ObjectID.counter   = M.ObjectID.counter   || parseInt(Math.random() * Math.pow(16, 6));
        M.ObjectID.machineId = M.ObjectID.machineId || parseInt(Math.random() * Math.pow(16, 6));
        M.ObjectID.processId = M.ObjectID.processId || parseInt(Math.random() * Math.pow(16, 4));
        this._ObjectID(hexString);
    };
    
    M.ObjectID._looksLikeObjectID = function( str ) {
        return str.length === 24 && str.match(/^[0-9a-f]*$/);
    };
    
    _.extend(M.ObjectID.prototype, {
    
        _str: '',
    
        _ObjectID: function( hexString ) {
            //random-based impl of Mongo ObjectID
            if( hexString ) {
                hexString = hexString.toLowerCase();
                if( !M.ObjectID._looksLikeObjectID(hexString) ) {
                    throw new Error('Invalid hexadecimal string for creating an ObjectID');
                }
                // meant to work with _.isEqual(), which relies on structural equality
                this._str = hexString;
            } else {
    
                this._str =
                    this._hexString(8, new Date().getTime()/1000) +     // a 4-byte value from the Unix timestamp
                    this._hexString(6, M.ObjectID.machineId) +          // a 3-byte machine identifier
                    this._hexString(4, M.ObjectID.processId) +          // a 2-byte process identifier
                    this._hexString(6, M.ObjectID.counter++);   // a 3-byte counter, starting with a random value.
            }
            return this._str;
        },
    
        _hexString: function(len, num) {
            num = num || parseInt(Math.random() * Math.pow(16,len));
            var str = num.toString(16);
            while(str.length < len) {
                str = '0'+str;
            }
            return str.substr(0, len);
        },
    
        toString: function() {
            return 'ObjectID(\'' + this._str + '\')';
        },
    
        equals: function( other ) {
            return other instanceof this._ObjectID && this.valueOf() === other.valueOf();
        },
    
        clone: function() {
            return new M.ObjectID(this._str);
        },
    
        typeName: function() {
            return 'oid';
        },
    
        getTimestamp: function() {
            return parseInt(this._str.substr(0, 8), 16)*1000;
        },
    
        getMachineId: function() {
            return parseInt(this._str.substr(8, 6), 16);
        },
    
        getProcessId: function() {
            return parseInt(this._str.substr(14, 4), 16);
        },
    
        getCounter: function() {
            return parseInt(this._str.substr(18, 6), 16);
        },
    
        valueOf: function() {
            return this._str;
        },
    
        toJSON: function() {
            return this._str;
        },
    
        toHexString: function() {
            return this._str;
        },
    
        // Is this selector just shorthand for lookup by _id?
        _selectorIsId: function( selector ) {
            return (typeof selector === 'string') ||
                (typeof selector === 'number') ||
                selector instanceof M.ObjectId;
        },
    
        // Is the selector just lookup by _id (shorthand or not)?
        _selectorIsIdPerhapsAsObject: function( selector ) {
            return this._selectorIsId(selector) || (selector && typeof selector === 'object' && selector._id && this._selectorIsId(selector._id) && _.size(selector) === 1);
        },
    
        // If this is a selector which explicitly constrains the match by ID to a finite
        // number of documents, returns a list of their IDs.  Otherwise returns
        // null. Note that the selector may have other restrictions so it may not even
        // match those document!  We care about $in and $and since those are generated
        // access-controlled update and remove.
        _idsMatchedBySelector: function( selector ) {
            // Is the selector just an ID?
            if( this._selectorIsId(selector) ) {
                return [selector];
            }
            if( !selector ) {
                return null;
            }
    
            // Do we have an _id clause?
            if( _.has(selector, '_id') ) {
                // Is the _id clause just an ID?
                if( this._selectorIsId(selector._id) ) {
                    return [selector._id];
                }
                // Is the _id clause {_id: {$in: ["x", "y", "z"]}}?
                if( selector._id && selector._id.$in && _.isArray(selector._id.$in) && !_.isEmpty(selector._id.$in) && _.all(selector._id.$in, this._selectorIsId) ) {
                    return selector._id.$in;
                }
                return null;
            }
    
            // If this is a top-level $and, and any of the clauses constrain their
            // documents, then the whole selector is constrained by any one clause's
            // constraint. (Well, by their intersection, but that seems unlikely.)
            if( selector.$and && _.isArray(selector.$and) ) {
                for( var i = 0; i < selector.$and.length; ++i ) {
                    var subIds = this._idsMatchedBySelector(selector.$and[i]);
                    if( subIds ) {
                        return subIds;
                    }
                }
            }
    
            return null;
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    // Returns a unique identifier
    
    /**
     *
     * @module M.UniqueId
     *
     * @type {*}
     * @extends M.Object
     */
    M.UniqueId = M.Object.design({
        uuid: function(len, radix) {
            // based on Robert Kieffer's randomUUID.js at http://www.broofa.com
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [];
            //len = len ? len : 32; 
            radix = radix || chars.length;
            var i;
    
            if (len) {
                for (i = 0; i < len; i++) {
                    uuid[i] = chars[0 | Math.random() * radix];
                }
            } else {
                // rfc4122, version 4 form
                var r;
    
                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
    
                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * This prototype defines decoding and encoding mechanisms based on the Base64 algorithm. You
     * normally don't call this object respectively its methods directly, but let M.Cypher handle
     * this.
     * @module M.Base64
     *
     * @extends M.Object
     */
    M.Base64 = M.Object.design(/** @scope M.Base64.prototype */ {
    
            /**
             * The type of this object.
             *
             * @type String
             */
            type: 'M.Base64',
    
            /**
             * The key string for the base 64 decoding and encoding.
             *
             * @type String
             */
            _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    
            /**
             * This method encodes a given binary input, using the base64 encoding.
             *
             * @param {String} input The binary to be encoded. (e.g. an requested image)
             * @returns {String} The base64 encoded string.
             */
            encodeBinary: function( input ) {
                var output = '';
                var bytebuffer;
                var encodedCharIndexes = new Array(4);
                var inx = 0;
                var paddingBytes = 0;
    
                while( inx < input.length ) {
                    // Fill byte buffer array
                    bytebuffer = new Array(3);
                    for( var jnx = 0; jnx < bytebuffer.length; jnx++ ) {
                        if( inx < input.length ) {
                            bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff;
                        } // throw away high-order byte, as documented at: https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
                        else {
                            bytebuffer[jnx] = 0;
                        }
                    }
    
                    // Get each encoded character, 6 bits at a time
                    // index 1: first 6 bits
                    encodedCharIndexes[0] = bytebuffer[0] >> 2;
                    // index 2: second 6 bits (2 least significant bits from input byte 1 + 4 most significant bits from byte 2)
                    encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);
                    // index 3: third 6 bits (4 least significant bits from input byte 2 + 2 most significant bits from byte 3)
                    encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);
                    // index 3: forth 6 bits (6 least significant bits from input byte 3)
                    encodedCharIndexes[3] = bytebuffer[2] & 0x3f;
    
                    // Determine whether padding happened, and adjust accordingly
                    paddingBytes = inx - (input.length - 1);
                    switch( paddingBytes ) {
                        case 2:
                            // Set last 2 characters to padding char
                            encodedCharIndexes[3] = 64;
                            encodedCharIndexes[2] = 64;
                            break;
                        case 1:
                            // Set last character to padding char
                            encodedCharIndexes[3] = 64;
                            break;
                        default:
                            break; // No padding - proceed
                    }
                    // Now we will grab each appropriate character out of our keystring
                    // based on our index array and append it to the output string
                    for( jnx = 0; jnx < encodedCharIndexes.length; jnx++ ) {
                        output += this._keyStr.charAt(encodedCharIndexes[jnx]);
                    }
                }
                return output;
            },
    
            /**
             * This method encodes a given input string, using the base64 encoding.
             *
             * @param {String} input The string to be encoded.
             * @returns {String} The base64 encoded string.
             */
            encode: function( input ) {
                var output = '';
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
    
                input = M.Cypher.utf8Encode(input);
    
                while( i < input.length ) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
    
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
    
                    if( isNaN(chr2) ) {
                        enc3 = enc4 = 64;
                    } else if( isNaN(chr3) ) {
                        enc4 = 64;
                    }
    
                    output += this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                }
    
                return output;
            },
    
            binaryEncode: function( input ) {
                var output = '';
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
    
                while( i < input.length ) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
    
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
    
                    if( isNaN(chr2) ) {
                        enc3 = enc4 = 64;
                    } else if( isNaN(chr3) ) {
                        enc4 = 64;
                    }
    
                    output += this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                }
    
                return output;
            },
    
            /**
             * This method decodes a given input string, using the base64 decoding.
             *
             * @param {String} input The string to be decoded.
             * @returns {String} The base64 decoded string.
             */
            decode: function( input ) {
                var output = '';
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
    
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    
                while( i < input.length ) {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));
    
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
    
                    output = output + String.fromCharCode(chr1);
    
                    if( enc3 !== 64 ) {
                        output = output + String.fromCharCode(chr2);
                    }
    
                    if( enc4 !== 64 ) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
    
                return M.Cypher.utf8Decode(output);
            }
    
        });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * This prototype defines a hashing mechanism based on the SHA256 algorithm. You normally
     * don't call this object respectively its methods directly, but let M.Cypher handle
     * this.
     * @module M.SHA256
     *
     * @extends M.Object
     */
    M.SHA256 = M.Object.design(/** @scope M.SHA256.prototype */ {
    
            /**
             * The type of this object.
             *
             * @type String
             */
            type: 'M.SHA256',
    
            /**
             * Defines the bits per input character: 8 - ASCII, 16 - Unicode
             *
             * @type Number
             */
            chrsz: 8,
    
            /**
             * Defines the hex output format: 0 - lowercase, 1 - uppercase
             *
             * @type Number
             */
            hexcase: 0,
    
            /**
             * This method is called from the 'outside world', controls the hashing and
             * finally returns the hash value.
             *
             * @param {String} input The input string to be hashed.
             * @returns {String} The sha256 hashed string.
             */
            hash: function( input ) {
                input = M.Cypher.utf8Encode(input);
                return this.binb2hex(this.coreSha256(this.str2binb(input), input.length * this.chrsz));
            },
    
            /**
             * @private
             */
            safeAdd: function( x, y ) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            },
    
            /**
             * @private
             */
            S: function( X, n ) {
                return ( X >>> n ) | (X << (32 - n));
            },
    
            /**
             * @private
             */
            R: function( X, n ) {
                return ( X >>> n );
            },
    
            /**
             * @private
             */
            Ch: function( x, y, z ) {
                return ((x & y) ^ ((~x) & z));
            },
    
            /**
             * @private
             */
            Maj: function( x, y, z ) {
                return ((x & y) ^ (x & z) ^ (y & z));
            },
    
            /**
             * @private
             */
            Sigma0256: function( x ) {
                return (this.S(x, 2) ^ this.S(x, 13) ^ this.S(x, 22));
            },
    
            /**
             * @private
             */
            Sigma1256: function( x ) {
                return (this.S(x, 6) ^ this.S(x, 11) ^ this.S(x, 25));
            },
    
            /**
             * @private
             */
            Gamma0256: function( x ) {
                return (this.S(x, 7) ^ this.S(x, 18) ^ this.R(x, 3));
            },
    
            /**
             * @private
             */
            Gamma1256: function( x ) {
                return (this.S(x, 17) ^ this.S(x, 19) ^ this.R(x, 10));
            },
    
            /**
             * @private
             */
            coreSha256: function( m, l ) {
                var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
                var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
                var W = new Array(64);
                var a, b, c, d, e, f, g, h, i, j;
                var T1, T2;
    
                m[l >> 5] |= 0x80 << (24 - l % 32);
                m[((l + 64 >> 9) << 4) + 15] = l;
    
                for( i = 0; i < m.length; i += 16 ) {
                    a = HASH[0];
                    b = HASH[1];
                    c = HASH[2];
                    d = HASH[3];
                    e = HASH[4];
                    f = HASH[5];
                    g = HASH[6];
                    h = HASH[7];
    
                    for( j = 0; j < 64; j++ ) {
                        if( j < 16 ) {
                            W[j] = m[j + i];
                        } else {
                            W[j] = this.safeAdd(this.safeAdd(this.safeAdd(this.Gamma1256(W[j - 2]), W[j - 7]), this.Gamma0256(W[j - 15])), W[j - 16]);
                        }
    
                        T1 = this.safeAdd(this.safeAdd(this.safeAdd(this.safeAdd(h, this.Sigma1256(e)), this.Ch(e, f, g)), K[j]), W[j]);
                        T2 = this.safeAdd(this.Sigma0256(a), this.Maj(a, b, c));
    
                        h = g;
                        g = f;
                        f = e;
                        e = this.safeAdd(d, T1);
                        d = c;
                        c = b;
                        b = a;
                        a = this.safeAdd(T1, T2);
                    }
    
                    HASH[0] = this.safeAdd(a, HASH[0]);
                    HASH[1] = this.safeAdd(b, HASH[1]);
                    HASH[2] = this.safeAdd(c, HASH[2]);
                    HASH[3] = this.safeAdd(d, HASH[3]);
                    HASH[4] = this.safeAdd(e, HASH[4]);
                    HASH[5] = this.safeAdd(f, HASH[5]);
                    HASH[6] = this.safeAdd(g, HASH[6]);
                    HASH[7] = this.safeAdd(h, HASH[7]);
                }
                return HASH;
            },
    
            /**
             * @private
             */
            str2binb: function( str ) {
                var bin = [];
                var mask = (1 << this.chrsz) - 1;
                for( var i = 0; i < str.length * this.chrsz; i += this.chrsz ) {
                    bin[i >> 5] |= (str.charCodeAt(i / this.chrsz) & mask) << (24 - i % 32);
                }
                return bin;
            },
    
            /**
             * @private
             */
            binb2hex: function( binarray ) {
                var hexTab = this.hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
                var str = '';
                for( var i = 0; i < binarray.length * 4; i++ ) {
                    str += hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8  )) & 0xF);
                }
                return str;
            }
    
        });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.Cypher defines a prototype for handling decoding, encoding and hashing of string
     * based values.
     * @module M.Cypher
     *
     * @extends M.Object
     */
    M.Cypher = M.Object.design(/** @scope M.Cypher.prototype */ {
    
            /**
             * The type of this object.
             *
             * @type String
             */
            type: 'M.Cypher',
    
            /**
             * The default decoder.
             *
             * @type M.Base64
             */
            defaultDecoder: M.Base64,
    
            /**
             * The default encoder.
             *
             * @type M.Base64
             */
    
            defaultEncoder: M.Base64,
    
            /**
             * The default hash algorithm.
             *
             * @type M.SHA256
             */
    
            defaultHasher: M.SHA256,
    
            /**
             * This method is the one that initiates the decoding of a given string, based on either
             * the default decoder or a custom decoder.
             *
             * @param {String} input The input string to be decoded.
             * @param {Object} algorithm The algorithm object containing a decode method.
             * @returns {String} The decoded string.
             */
            decode: function( input, algorithm ) {
    
                if( algorithm && algorithm.decode ) {
                    return algorithm.decode(input);
                } else {
                    return this.defaultDecoder.decode(input);
                }
    
            },
    
            /**
             * This method is the one that initiates the encoding of a given string, based on either
             * the default encoder or a custom encoder.
             *
             * @param {String} input The input string to be decoded.
             * @param {Object} algorithm The algorithm object containing a encode method.
             * @returns {String} The encoded string.
             */
            encode: function( input, algorithm ) {
    
                if( algorithm && algorithm.encode ) {
                    return algorithm.encode(input);
                } else {
                    return this.defaultEncoder.encode(input);
                }
    
            },
    
            /**
             * This method is the one that initiates the hashing of a given string, based on either
             * the default hashing algorithm or a custom hashing algorithm.
             *
             * @param {String} input The input string to be hashed.
             * @param {Object} algorithm The algorithm object containing a hash method.
             * @returns {String} The hashed string.
             */
            hash: function( input, algorithm ) {
    
                if( algorithm && algorithm.hash ) {
                    return algorithm.hash(input);
                } else {
                    return this.defaultHasher.hash(input);
                }
    
            },
    
            /**
             * Private method for UTF-8 encoding
             *
             * @private
             * @param {String} string The string to be encoded.
             * @returns {String} The utf8 encoded string.
             */
            utf8Encode: function( string ) {
                string = string.replace(/\r\n/g, '\n');
                var utf8String = '';
    
                for( var n = 0; n < string.length; n++ ) {
    
                    var c = string.charCodeAt(n);
    
                    if( c < 128 ) {
                        utf8String += String.fromCharCode(c);
                    } else if( (c > 127) && (c < 2048) ) {
                        utf8String += String.fromCharCode((c >> 6) | 192);
                        utf8String += String.fromCharCode((c & 63) | 128);
                    } else {
                        utf8String += String.fromCharCode((c >> 12) | 224);
                        utf8String += String.fromCharCode(((c >> 6) & 63) | 128);
                        utf8String += String.fromCharCode((c & 63) | 128);
                    }
    
                }
    
                return utf8String;
            },
    
            /**
             * Private method for UTF-8 decoding
             *
             * @private
             * @param {String} string The string to be decoded.
             * @returns {String} The utf8 decoded string.
             */
            utf8Decode: function( utf8String ) {
                var string = '';
                var i;
                var c;
                var c1;
                var c2;
                var c3;
                i = c = c1 = c2 = 0;
    
                while( i < utf8String.length ) {
    
                    c = utf8String.charCodeAt(i);
    
                    if( c < 128 ) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if( (c > 191) && (c < 224) ) {
                        c2 = utf8String.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utf8String.charCodeAt(i + 1);
                        c3 = utf8String.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
    
                }
    
                return string;
            }
    
        });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Date
     *
     * @extends M.Object
     */
    M.Date = {
    
        /**
         * This method is used to create a new instance of M.Date based on the data
         * library moment.js.
         *
         * @returns {Object}
         */
        create: function() {
            var m = moment.apply(this, arguments);
            return _.extend(m, this);
        }
    };
    
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Request
     *
     * @extends M.Object
     */
    M.Request = M.Object.design(/** @scope M.Request.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Request',
    
        /**
         * This property contains the requests unique ID that is generated
         * when initializing a request object. It is used within an application
         * to identify a request object.
         */
        _id: null,
    
        /**
         * This property is used internally to store the jQuery request object.
         *
         * @type {Object}
         */
        _request: null,
    
        /**
         * The http method to use for the request. Default is GET.
         *
         * @type {String}
         */
        method: null,
    
        /**
         * The url to connect to. This property has to be set in order to init
         * an instance of M.Request.
         *
         * @type {String}
         */
        url: null,
    
        /**
         * The property can be used to specify a request timeout in milliseconds. By
         * default, there will be no timeout.
         *
         * @type {Number}
         */
        timeout: null,
    
        /**
         * The data property can be used to attach any kind of data to a request. This can
         * either be a JSON object (key/value) or a string.
         *
         * @type {Object|String}
         */
        data: null,
    
        /**
         * This method is based on M.Object's extend() but adds some request specific features.
         * It creates a new instance of M.Request based on the given configuration properties.
         *
         * @param obj
         * @returns {M.Request}
         */
        init: function( obj ) {
            return this.design(obj);
        },
    
        /**
         * This method is used internally to process the configuration object for the request
         * before handing it to the extend method. The job of this method is to make sure that
         * the configuration object fits the requirements of the extend process.
         *
         * @param obj
         * @returns Object
         * @private
         */
        _normalize: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
            obj.callbacks = obj.callbacks || {};
    
            return obj;
        },
    
        /**
         * M.Request's _init method.
         *
         * @private
         */
        _init: function() {
            /* throw exception if this is an instance of M.Request and there is no URL given */
            if( Object.getPrototypeOf(this) === M.Request && !this.url ) {
                throw M.Exception.NO_REQUEST_URL_SPECIFIED.getException();
            }
    
            /* generate the requests uuid */
            this._id = M.UniqueId.uuid();
    
            /* check for method and eventually set to GET (default) */
            this.method = this.method || 'GET';
    
            /* set the data property to what is given or empty string */
            this.data = this.data || '';
    
            /* check for a timeout property and eventually remove it */
            if( typeof this.timeout !== 'number' || this.timeout < 0 ) {
                delete this.timeout;
            }
        },
    
        /**
         * This method returns the request's unique ID. This ID is automatically generated
         * on the initialization of the request.
         *
         * @returns {String}
         */
        getId: function() {
            return this._id;
        },
    
        send: function() {
            this._request = $.ajax({
                type: this.method,
                url: this.url,
                timeout: this.timeout,
                data: this.data,
                context: this,
                beforeSend: this._handleBeforeSend,
                success: this._handleSuccess,
                error: this._handleError
            });
        },
    
        cancel: function() {
            if( this._request ) {
                this._request.abort();
            }
            this._request = null;
        },
    
        /**
         * This method is used internally to handle the before send callbacks. It
         * automatically calls any registered before send handler.
         *
         * @param xhr
         * @private
         */
        _handleBeforeSend: function( xhr ) {
            this.handleCallback(this.callbacks.beforeSend, {
                id: this.getId(),
                xhr: xhr
            });
        },
    
        /**
         * This method is used internally to handle the success callbacks. It
         * automatically calls any registered success handler.
         *
         * @param data
         * @param status
         * @param xhr
         * @private
         */
        _handleSuccess: function( data, status, xhr ) {
            this.handleCallback(this.callbacks.success, {
                id: this.getId(),
                data: data,
                status: status,
                xhr: xhr
            });
    
            this.cancel();
        },
    
        /**
         * This method is used internally to handle the error callbacks. It
         * automatically calls any registered error handler.
         *
         * @param xhr
         * @param status
         * @param error
         * @private
         */
        _handleError: function( xhr, status, error ) {
            this.handleCallback(this.callbacks.error, {
                id: this.getId(),
                xhr: xhr,
                status: status,
                error: error
            });
    
            this.cancel();
        },
    
        /*
         url = "http://example.com:3000/pathname/?search=test#hash";
    
         location.protocol; // => "http:"
         location.host;     // => "example.com:3000"
         location.hostname; // => "example.com"
         location.port;     // => "3000"
         location.pathname; // => "/pathname/"
         location.hash;     // => "#hash"
         location.search;   // => "?search=test"
         */
        getLocation: function( url ) {
            var location = document.createElement('a');
            location.href = url || this.url;
            // IE doesn't populate all link properties when setting .href with a relative URL,
            // however .href will return an absolute URL which then can be used on itself
            // to populate these additional fields.
            if( location.host === '' ) {
                location.href = location.href;
            }
            return location;
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.RequestManager
     *
     * @extends M.Object
     */
    M.RequestManager = M.Object.design(/** @scope M.RequestManager.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.RequestManager',
    
        /**
         * The url to connect to. This property has to be set in order to init
         * an instance of M.RequestManager. It contains the base url for each
         * request performed by this request manager.
         *
         * @type {String}
         */
        baseUrl: null,
    
        /**
         * The http method to use for each request. This timeout will be used as
         * the request manager's default value. It can be overwritten when
         * calling makeRequest(). Default is GET.
         *
         * @type {String}
         */
        method: null,
        /**
         * The property can be used to specify a request timeout in milliseconds. This
         * timeout will be used as the request manager's default value. It can be
         * overwritten when calling makeRequest().
         *
         * @type {Number}
         */
        timeout: null,
    
        /**
         * This property is used internally to store requests initialized out of the
         * request manager. It is built as a hash map with the request's id as the key
         * and the request object as the value.
         *
         * @type {Object}
         */
        _requests: null,
    
        /**
         * This method is based on M.Object's design() but adds some request manager specific
         * features. It creates a new instance of M.RequestManager based on the given
         * configuration properties.
         *
         * @param obj
         * @returns {M.RequestManager}
         */
        init: function( obj ) {
            return this.design(obj);
        },
    
        /**
         * This method is used internally to process the configuration object for the request
         * manager before handing it to the design method. The job of this method is to make
         * sure that the configuration object fits the requirements of the design process.
         *
         * @param obj
         * @returns Object
         * @private
         */
        _normalize: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
            obj.callbacks = obj.callbacks || {};
            obj.baseUrl = obj.baseUrl || obj.url;
    
            return obj;
        },
    
        /**
         * M.RequestManager's _init method.
         *
         * @private
         */
        _init: function() {
            /* throw exception if this is an instance of M.RequestManager and there is no URL given */
            if( Object.getPrototypeOf(this) === M.RequestManager && !this.baseUrl ) {
                throw M.Exception.NO_REQUEST_MANAGER_BASE_URL_SPECIFIED.getException();
            }
    
            /* setup the internally used requests hash map */
            this._requests = {};
    
            /* clean up the base url to not end with a '/' */
            if( this.baseUrl && this.baseUrl.lastIndexOf('/') === (this.baseUrl.length - 1) ) {
                this.baseUrl = this.baseUrl.substr(0, this.baseUrl.length - 1);
            }
    
            /* remove possible url property (was already mapped to baseUrl before) */
            if( this.url ) {
                delete this.url;
            }
    
            /* check for method and eventually set to GET (default) */
            this.method = this.method || 'GET';
    
            /* check for a timeout property and eventually remove it */
            if( typeof this.timeout !== 'number' || this.timeout < 0 ) {
                delete this.timeout;
            }
        },
    
        /**
         * This method initializes and then sends a request based on the request
         * manager's configuration and the given parameters object. If callbacks
         * are specified for this request handler (or via the passed configuration
         * object), those callbacks are handed over to the request and will be
         * called properly.
         *
         * @param obj
         * @returns {M.Request} The request that was sent.
         */
        doRequest: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
    
            var request = M.Request.init({
                url: this.getUrl(obj),
                timeout: !isNaN(obj.timeout) ? obj.timeout : this.timeout,
                method: obj.method ? obj.method : this.method,
                data: obj.data ? obj.data : '',
                callbacks: {
                    beforeSend: {
                        target: this,
                        action: '_handleBeforeSend'
                    },
                    success: {
                        target: this,
                        action: '_handleSuccess'
                    },
                    error: {
                        target: this,
                        action: '_handleError'
                    }
                }
            });
    
            this._requests[request.getId()] = request;
    
            request.send();
    
            return request;
        },
    
        /**
         * This method returns the request's url based on the base url of the request
         * manager and a given path within the configuration object passed to the
         * doRequest() method.
         *
         * @param obj
         * @returns {String}
         */
        getUrl: function( obj ) {
            /* clean up the path to start a '/' */
            if( obj.path && obj.path[0] !== '/' ) {
                obj.path = '/' + obj.path;
            }
    
            return this.baseUrl + (obj.path ? obj.path : '');
        },
    
        /**
         * This method is used internally to handle the before send callbacks. It
         * automatically calls any registered before send handler.
         *
         * @param obj
         * @private
         */
        _handleBeforeSend: function( obj ) {
            this.handleCallback(this.callbacks.beforeSend, obj);
        },
    
        /**
         * This method is used internally to handle the success callbacks. It
         * automatically calls any registered success handler.
         *
         * @param obj
         * @private
         */
        _handleSuccess: function( obj ) {
            this.handleCallback(this.callbacks.success, obj);
    
            this.requestFinished(obj.id);
        },
    
        /**
         * This method is used internally to handle the error callbacks. It
         * automatically calls any registered error handler.
         *
         * @param obj
         * @private
         */
        _handleError: function( obj ) {
            this.handleCallback(this.callbacks.error, obj);
    
            this.requestFinished(obj.id);
        },
    
        requestFinished: function( id ) {
            if( this._requests && this._requests[id] ) {
                this._requests[id] = null;
                delete this._requests[id];
            }
        },
    
        /**
         * This method cancels a ongoing request based on its id.
         *
         * @param id
         */
        cancelRequest: function( id ) {
            if( this._requests && this._requests[id] ) {
                this._requests[id].cancel();
                this.requestFinished(id);
            }
        },
    
        /**
         * This method cancels all currently active requests of this request manager.
         */
        cancelAllRequest: function() {
            _.each(this._requests, function( request, id ) {
                this.cancelRequest(id);
            }, this);
        }
    
    });
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Field
     *
     */
    
    /**
     * Field describing a data attribute
     *
     * contains functions to comperate, detect and convert data type
     *
     * @param options
     * @constructor
     */
    M.Field = function (options) {
        this.merge(options);
        this.initialize.apply(this, arguments);
    };
    
    M.Field.extend = M.extend;
    M.Field.create = M.create;
    M.Field.design = M.design;
    
    _.extend(M.Field.prototype, M.Object, {
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Field',
    
        name: null,
    
        type: null,
    
        index: null,
    
        defaultValue: undefined,
    
        length: null,
    
        required: NO,
    
        persistent: YES,
    
        initialize: function () {
        },
    
        /**
         * merge field properties into this instance
         *
         * @param obj
         */
        merge: function (obj) {
            obj = _.isString(obj) ? { type: obj } : (obj || {});
    
            this.name = !_.isUndefined(obj.name) ? obj.name : this.name;
            this.type = !_.isUndefined(obj.type) ? obj.type : this.type;
            this.index = !_.isUndefined(obj.index) ? obj.index : this.index;
            this.defaultValue = !_.isUndefined(obj.defaultValue) ? obj.defaultValue : this.defaultValue;
            this.length = !_.isUndefined(obj.length) ? obj.length : this.length;
            this.required = !_.isUndefined(obj.required) ? obj.required : this.required;
            this.persistent = !_.isUndefined(obj.persistent) ? obj.persistent : this.persistent;
        },
    
        /**
         * converts the give value into the required data type
         *
         * @param value
         * @param type
         * @returns {*}
         */
        transform: function (value, type) {
            type = type || this.type;
            try {
                if (_.isUndefined(value)) {
                    return this.defaultValue;
                }
                if (type === M.CONST.TYPE.STRING || type === M.CONST.TYPE.TEXT) {
                    if (_.isObject(value)) {
                        return JSON.stringify(value);
                    } else {
                        return _.isNull(value) ? 'null' : value.toString();
                    }
                } else if (type === M.CONST.TYPE.INTEGER) {
                    return parseInt(value);
                } else if (type === M.CONST.TYPE.BOOLEAN) {
                    return value === true || value === 'true'; // true, 1, "1" or "true"
                } else if (type === M.CONST.TYPE.FLOAT) {
                    return parseFloat(value);
                } else if (type === M.CONST.TYPE.OBJECT || type === M.CONST.TYPE.ARRAY) {
                    if (!_.isObject(value)) {
                        return _.isString(value) ? JSON.parse(value) : null;
                    }
                } else if (type === M.CONST.TYPE.DATE) {
                    if (!M.Date.isPrototypeOf(value)) {
                        var date = value ? M.Date.create(value) : null;
                        return date && date.isValid() ? date : null;
                    }
                } else if (type === M.CONST.TYPE.OBJECTID) {
                    if (!M.ObjectID.prototype.isPrototypeOf(value)) {
                        return _.isString(value) ? new M.ObjectID(value) : null;
                    }
                }
                return value;
            } catch (e) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Failed converting value! ' + e.message);
            }
        },
    
        /**
         * check to values to be equal for the type of this field
         *
         * @param a
         * @param b
         * @returns {*}
         */
        equals: function (a, b) {
            var v1 = this.transform(a);
            var v2 = this.transform(b);
            return this._equals(v1, v2, _.isArray(v1));
        },
    
        /**
         * check if this field holds binary data
         *
         * @param obj
         * @returns {boolean|*}
         */
        isBinary: function (obj) {
            return (typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array) || (obj && obj.$Uint8ArrayPolyfill);
        },
    
        /**
         * detect the type of a given value
         *
         * @param v
         * @returns {*}
         */
        detectType: function (v) {
            if (_.isNumber(v)) {
                return M.CONST.TYPE.FLOAT;
            }
            if (_.isString(v)) {
                return M.CONST.TYPE.STRING;
            }
            if (_.isBoolean(v)) {
                return M.CONST.TYPE.BOOLEAN;
            }
            if (_.isArray(v)) {
                return M.CONST.TYPE.ARRAY;
            }
            if (_.isNull(v)) {
                return M.CONST.TYPE.NULL;
            }
            if (_.isDate(v) || M.Date.isPrototypeOf(v)) {
                return M.CONST.TYPE.DATE;
            }
            if (M.ObjectID.prototype.isPrototypeOf(v)) {
                return M.CONST.TYPE.OBJECTID;
            }
            if (this.isBinary(v)) {
                return M.CONST.TYPE.BINARY;
            }
            return M.CONST.TYPE.OBJECT;
        },
    
        /**
         * returns the sort order for the given type, used by sorting different type
         * 
         * @param type
         * @returns {number}
         */
        typeOrder: function (type) {
            switch (type) {
                case M.CONST.TYPE.NULL   :
                    return 0;
                case M.CONST.TYPE.FLOAT  :
                    return 1;
                case M.CONST.TYPE.STRING :
                    return 2;
                case M.CONST.TYPE.OBJECT :
                    return 3;
                case M.CONST.TYPE.ARRAY  :
                    return 4;
                case M.CONST.TYPE.BINARY :
                    return 5;
                case M.CONST.TYPE.DATE   :
                    return 6;
            }
            return -1;
        },
    
        _equals: function (a, b, keyOrderSensitive) {
            var that = this;
            var i;
            if (a === b) {
                return true;
            }
            if (!a || !b) { // if either one is false, they'd have to be === to be equal
                return false;
            }
            if (!(_.isObject(a) && _.isObject(b))) {
                return false;
            }
            if (a instanceof Date && b instanceof Date) {
                return a.valueOf() === b.valueOf();
            }
            if (this.isBinary(a) && this.isBinary(b)) {
                if (a.length !== b.length) {
                    return false;
                }
                for (i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                        return false;
                    }
                }
                return true;
            }
            if (_.isFunction(a.equals)) {
                return a.equals(b);
            }
            if (_.isArray(a)) {
                if (!_.isArray(b)) {
                    return false;
                }
                if (a.length !== b.length) {
                    return false;
                }
                for (i = 0; i < a.length; i++) {
                    if (!that.equals(a[i], b[i], keyOrderSensitive)) {
                        return false;
                    }
                }
                return true;
            }
            // fall back to structural equality of objects
            var ret;
            if (keyOrderSensitive) {
                var bKeys = [];
                _.each(b, function (val, x) {
                    bKeys.push(x);
                });
                i = 0;
                ret = _.all(a, function (val, x) {
                    if (i >= bKeys.length) {
                        return false;
                    }
                    if (x !== bKeys[i]) {
                        return false;
                    }
                    if (!that.equals(val, b[bKeys[i]], keyOrderSensitive)) {
                        return false;
                    }
                    i++;
                    return true;
                });
                return ret && i === bKeys.length;
            } else {
                i = 0;
                ret = _.all(a, function (val, key) {
                    if (!_.has(b, key)) {
                        return false;
                    }
                    if (!that.equals(val, b[key], keyOrderSensitive)) {
                        return false;
                    }
                    i++;
                    return true;
                });
                return ret && _.size(b) === i;
            }
        },
    
        /**
         * compare two values of unknown type according to BSON ordering
         * semantics. (as an extension, consider 'undefined' to be less than
         * any other value.) return negative if a is less, positive if b is
         * less, or 0 if equal
         *
         * @param a
         * @param b
         * @returns {*}
         * @private
         */
        _cmp: function (a, b) {
            if (a === undefined) {
                return b === undefined ? 0 : -1;
            }
            if (b === undefined) {
                return 1;
            }
            var i = 0;
            var ta = this.detectType(a);
            var tb = this.detectType(b);
            var oa = this.typeOrder(ta);
            var ob = this.typeOrder(tb);
            if (oa !== ob) {
                return oa < ob ? -1 : 1;
            }
            if (ta !== tb) {
                throw new Error('Missing type coercion logic in _cmp');
            }
            if (ta === 7) { // ObjectID
                // Convert to string.
                ta = tb = 2;
                a = a.toHexString();
                b = b.toHexString();
            }
            if (ta === M.CONST.TYPE.DATE) {
                // Convert to millis.
                ta = tb = 1;
                a = a.getTime();
                b = b.getTime();
            }
            if (ta === M.CONST.TYPE.FLOAT) {
                return a - b;
            }
            if (tb === M.CONST.TYPE.STRING) {
                return a < b ? -1 : (a === b ? 0 : 1);
            }
            if (ta === M.CONST.TYPE.OBJECT) {
                // this could be much more efficient in the expected case ...
                var toArray = function (obj) {
                    var ret = [];
                    for (var key in obj) {
                        ret.push(key);
                        ret.push(obj[key]);
                    }
                    return ret;
                };
                return this._cmp(toArray(a), toArray(b));
            }
            if (ta === M.CONST.TYPE.ARRAY) { // Array
                for (i = 0; ; i++) {
                    if (i === a.length) {
                        return (i === b.length) ? 0 : -1;
                    }
                    if (i === b.length) {
                        return 1;
                    }
                    var s = this._cmp(a[i], b[i]);
                    if (s !== 0) {
                        return s;
                    }
                }
            }
            if (ta === M.CONST.TYPE.BINARY) {
                if (a.length !== b.length) {
                    return a.length - b.length;
                }
                for (i = 0; i < a.length; i++) {
                    if (a[i] < b[i]) {
                        return -1;
                    }
                    if (a[i] > b[i]) {
                        return 1;
                    }
                }
                return 0;
            }
            if (ta === M.CONST.TYPE.BOOLEAN) {
                if (a) {
                    return b ? 0 : 1;
                }
                return b ? -1 : 0;
            }
            if (ta === M.CONST.TYPE.NULL) {
                return 0;
            }
    //        if( ta === M.CONST.TYPE.REGEXP ) {
    //            throw Error("Sorting not supported on regular expression");
    //        } // XXX
    //        if( ta === 13 ) // javascript code
    //        {
    //            throw Error("Sorting not supported on Javascript code");
    //        } // XXX
            throw new Error('Unknown type to sort');
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Entity
     *
     */
    
    /**
     * Holds description about fields and other entity properties.
     * Also helper functions for field and transform operations
     * @module M.Entity
     *
     * @param options
     * @constructor
     */
    M.Entity = function (options) {
        var fields = this.fields;
        this.fields = {};
        this._mergeFields(fields);
        options = options || {};
        if (options.fields) {
            this._mergeFields(options.fields);
        }
        this.typeMapping = options.typeMapping || this.typeMapping;
        var collection = options.collection;
        var model = options.model || (collection ? collection.prototype.model : null);
        this.idAttribute = options.idAttribute || this.idAttribute || (model ? model.prototype.idAttribute : '');
        this._updateFields(this.typeMapping);
        this.initialize.apply(this, arguments);
    };
    
    /**
     * create a new entity from an other entity or given properties
     *
     * @param entity
     * @param options
     * @returns {*}
     */
    M.Entity.from = function (entity, options) {
        // is not an instance of M.Entity
        if (!M.Entity.prototype.isPrototypeOf(entity)) {
            // if this is a prototype of an entity, create an instance
            if (_.isFunction(entity) &&
                M.Entity.prototype.isPrototypeOf(entity.prototype)) {
                var Entity = entity;
                entity = new Entity(options);
            } else {
                if (typeof entity === 'string') {
                    entity = {
                        name: entity
                    };
                }
                // if this is just a config create a new Entity
                var E = M.Entity.extend(entity);
                entity = new E(options);
            }
        } else if (options && options.typeMapping) {
            entity._updateFields(options.typeMapping);
        }
        return entity;
    };
    
    M.Entity.extend = M.extend;
    M.Entity.create = M.create;
    M.Entity.design = M.design;
    
    _.extend(M.Entity.prototype, M.Object, {
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Entity',
    
        /**
         * Entity name, used for tables or collections
         *
         * @type String
         */
        name: '',
    
        /**
         * idAttribute, should be the same as in the corresponding model
         *
         * @type String
         */
        idAttribute: '',
    
        /**
         *
         *
         * @type Object
         */
        fields: {},
    
        /**
         * initialize function will be called after creating an entity
         */
        initialize: function () {
        },
    
        /**
         * get the field list of this entity
         *
         * @returns {Object}
         */
        getFields: function () {
            return this.fields;
        },
    
        /**
         * get a specified field from this entity
         *
         * @param fieldKey
         * @returns M.Field instance
         */
        getField: function (fieldKey) {
            return this.fields[fieldKey];
        },
    
        /**
         * get the translated name of a field
         *
         * @param fieldKey
         * @returns String
         */
        getFieldName: function (fieldKey) {
            var field = this.getField(fieldKey);
            return field && field.name ? field.name : fieldKey;
        },
    
        /**
         * get the primary key of this entity
         *
         * @returns String
         */
        getKey: function () {
            return this.idAttribute || M.Model.idAttribute;
        },
    
        /**
         * get a list of keys for this entity
         *
         * @returns {Array}
         */
        getKeys: function () {
            return this.splitKey(this.getKey());
        },
    
        /**
         * Splits a comma separated list of keys to a key array
         *
         * @returns {Array} array of keys
         */
        splitKey: function (key) {
            var keys = [];
            if (_.isString(key)) {
                _.each(key.split(','), function (key) {
                    var k = key.trim();
                    if (k) {
                        keys.push(k);
                    }
                });
            }
            return keys;
        },
    
        /**
         * merge a new list of fields into the exiting fields
         *
         * @param newFields
         * @private
         */
        _mergeFields: function (newFields) {
            if (!_.isObject(this.fields)) {
                this.fields = {};
            }
            var that = this;
            if (_.isObject(newFields)) {
                _.each(newFields, function (value, key) {
                    if (!that.fields[key]) {
                        that.fields[key] = new M.Field(value);
                    } else {
                        that.fields[key].merge(value);
                    }
                });
            }
        },
    
        /**
         * check and update missing properties of fields
         *
         * @param typeMapping
         * @private
         */
        _updateFields: function (typeMapping) {
            var that = this;
            _.each(this.fields, function (value, key) {
                // remove unused properties
                if (value.persistent === NO) {
                    delete that.fields[key];
                } else {
                    // add missing names
                    if (!value.name) {
                        value.name = key;
                    }
                    // apply default type conversions
                    if (typeMapping && typeMapping[value.type]) {
                        value.type = typeMapping[value.type];
                    }
                }
            });
        },
    
        /**
         * transform the given data to attributes
         * considering the field specifications
         *
         * @param data
         * @param id
         * @param fields
         * @returns {*}
         */
        toAttributes: function (data, id, fields) {
            fields = fields || this.fields;
            if (data && !_.isEmpty(fields)) {
                // map field names
                var value, attributes = {};
                _.each(fields, function (field, key) {
                    value = _.isFunction(data.get) ? data.get(field.name) : data[field.name];
                    attributes[key] = value;
                });
                return attributes;
            }
            return data;
        },
    
        /**
         * transform the given attributes to the destination data format
         * considering the field specifications
         *
         * @param attrs
         * @param fields
         * @returns {*}
         */
        fromAttributes: function (attrs, fields) {
            fields = fields || this.fields;
            if (attrs && !_.isEmpty(fields)) {
                var data = {};
                _.each(fields, function (field, key) {
                    var value = _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
                    value = field.transform(value);
                    if (!_.isUndefined(value)) {
                        data[field.name] = value;
                    }
                });
                return data;
            }
            return attrs;
        },
    
        /**
         * set the id of the given model or attributes
         *
         * @param attrs
         * @param id
         * @returns {*}
         */
        setId: function (attrs, id) {
            if (attrs && id) {
                var key = this.getKey() || attrs.idAttribute;
                if (key) {
                    if (_.isFunction(attrs.set)) {
                        attrs.set(key, id);
                    } else {
                        attrs[key] = id;
                    }
                }
            }
            return attrs;
        },
    
        /**
         * get the id of the given model or attributes
         *
         * @param attrs
         * @returns {*|Object|key|*}
         */
        getId: function (attrs) {
            if (attrs) {
                var key = this.getKey() || attrs.idAttribute;
                if (key) {
                    return _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
                }
            }
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Security
     *
     * @type {{logon: Function, logonBasicAuth: Function, logonMcapAuth: Function, getHost: Function}}
     */
    M.Security = M.Object.design({
    
    
        logon: function (options, callback) {
            var credentials = options ? options.credentials : null;
            if (credentials) {
                switch (credentials.type) {
                    case 'basic':
                        return this.logonBasicAuth(options, callback);
                }
            }
            this.handleCallback(callback);
        },
    
        logonBasicAuth: function (options, callback) {
            var credentials = options.credentials;
            options.beforeSend = function (xhr) {
                M.Security.setBasicAuth(xhr, credentials);
            };
            this.handleCallback(callback);
        },
    
        setBasicAuth: function( xhr, credentials ) {
            if( credentials && credentials.username && xhr && M.Base64 ) {
                var basicAuth = M.Base64.encode(encodeURIComponent(credentials.username + ':' + (credentials.password || '')));
                xhr.setRequestHeader('Authorization', 'Basic ' + basicAuth);
            }
        }
    
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Model
     *
     * @type {*}
     * @extends Backbone.Model
     */
    M.Model = Backbone.Model.extend({
        constructor: function( attributes, options ) {
            this.init(attributes, options);
            Backbone.Model.apply(this, arguments);
        }
    });
    
    M.Model.create = M.create;
    M.Model.design = M.design;
    
    _.extend(M.Model.prototype, M.Object, {
    
        _type: 'M.Model',
    
        isModel: YES,
    
        entity: null,
    
        defaults: {},
    
        changedSinceSync: {},
    
        logon: M.Security.logon,
    
        init: function( attributes, options ) {
            options = options || {};
    
            this.collection = options.collection || this.collection;
            this.idAttribute = options.idAttribute || this.idAttribute;
            this.store = this.store || (this.collection ? this.collection.store : null) || options.store;
            if( this.store && _.isFunction(this.store.initModel) ) {
                this.store.initModel(this, options);
            }
            this.entity = this.entity || (this.collection ? this.collection.entity : null) || options.entity;
            if( this.entity ) {
                this.entity = M.Entity.from(this.entity, { model: this.constructor, typeMapping: options.typeMapping });
                this.idAttribute = this.entity.idAttribute || this.idAttribute;
            }
            this.credentials = this.credentials || (this.collection ? this.collection.credentials : null) || options.credentials;
            this.on('change', this.onChange, this);
            this.on('sync', this.onSync, this);
        },
    
        sync: function( method, model, options ) {
            options = options || {};
            options.credentials = options.credentials || this.credentials;
            var store = (options.store ? options.store : null) || this.store;
            var that = this;
            var args = arguments;
    
            this.logon(options, function( result ) {
                if( store && _.isFunction(store.sync) ) {
                    return store.sync.apply(that, args);
                } else {
                    return Backbone.sync.apply(that, args);
                }
            });
        },
    
        onChange: function( model, options ) {
            // For each `set` attribute, update or delete the current value.
            var attrs = model.changedAttributes();
            if( _.isObject(attrs) ) {
                for( var key in attrs ) {
                    this.changedSinceSync[key] = attrs[key];
                }
            }
        },
    
        onSync: function( model, options ) {
            this.changedSinceSync = {};
        },
    
        getUrlRoot: function() {
            if( this.urlRoot ) {
                return _.isFunction(this.urlRoot) ? this.urlRoot() : this.urlRoot;
            } else if( this.collection ) {
                return this.collection.getUrlRoot();
            } else if( this.url ) {
                var url = _.isFunction(this.url) ? this.url() : this.url;
                if( url && this.id && url.indexOf(this.id) > 0 ) {
                    return url.substr(0, url.indexOf(this.id));
                }
                return url;
            }
        },
    
        toJSON: function( options ) {
            options = options || {};
            var entity = options.entity || this.entity;
            if( M.isEntity(entity) ) {
                return entity.fromAttributes(options.attrs || this.attributes);
            }
            return options.attrs || _.clone(this.attributes);
        },
    
        parse: function( resp, options ) {
            options = options || {};
            var entity = options.entity || this.entity;
            if( M.isEntity(entity) ) {
                return entity.toAttributes(resp);
            }
            return resp;
        }
    
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * The M.Collection can be used like a Backbone Collection,
     *
     * but there are some enhancements to fetch, save and delete the
     * contained models from or to other "data stores".
     *
     * see LocalStorageStore, WebSqlStore or BikiniStore for examples
     *
     * @module M.Collection
     *
     * @type {*}
     * @extends Backbone.Collection
     *
     */
    M.Collection = Backbone.Collection.extend({
    
        constructor: function (options) {
            this.init(options);
            Backbone.Collection.apply(this, arguments);
        }
    });
    
    M.Collection.create = M.create;
    M.Collection.design = M.design;
    
    _.extend(M.Collection.prototype, M.Object, {
    
        _type: 'M.Collection',
    
        isCollection: YES,
    
        model: M.Model,
    
        entity: null,
    
        options: null,
    
        logon: M.Security.logon,
    
        init: function (options) {
            options = options || {};
            this.store = options.store || this.store || (this.model ? this.model.prototype.store : null);
            this.entity = options.entity || this.entity || (this.model ? this.model.prototype.entity : null);
            this.options = options.options || this.options;
    
            var entity = this.entity || this.entityFromUrl(this.url);
            if (entity) {
                this.entity = M.Entity.from(entity, { model: this.model, typeMapping: options.typeMapping });
            }
            this._updateUrl();
    
            if (this.store && _.isFunction(this.store.initCollection)) {
                this.store.initCollection(this, options);
            }
        },
    
        entityFromUrl: function (url) {
            if (url) {
                // extract last path part as entity name
                var parts = M.Request.getLocation(this.url).pathname.match(/([^\/]+)\/?$/);
                if (parts && parts.length > 1) {
                    return parts[1];
                }
            }
        },
    
        sort: function (options) {
            if (_.isObject(options && options.sort)) {
                this.comparator = M.DataSelector.compileSort(options.sort);
            }
            Backbone.Collection.prototype.sort.apply(this, arguments);
        },
    
        select: function (options) {
            var selector = options && options.query ? M.DataSelector.create(options.query) : null;
            var collection = M.Collection.create(null, { model: this.model });
    
            if (options && options.sort) {
                collection.comparator = M.DataSelector.compileSort(options.sort);
            }
    
            this.each(function (model) {
                if (!selector || selector.matches(model.attributes)) {
                    collection.add(model);
                }
            });
            return collection;
        },
    
        destroy: function (options) {
            options = options || {};
            var success = options.success;
            if (this.length > 0) {
                options.success = function () {
                    if (this.length === 0 && success) {
                        success();
                    }
                };
                var model;
                while ((model = this.first())) {
                    this.sync('delete', model, options);
                    this.remove(model);
                }
            } else if (success) {
                success();
            }
        },
    
        sync: function (method, model, options) {
            options = options || {};
            options.credentials = options.credentials || this.credentials;
            var store = (options.store ? options.store : null) || this.store;
            var that = this;
            var args = arguments;
    
            this.logon(options, function (result) {
                if (store && _.isFunction(store.sync)) {
                    return store.sync.apply(that, args);
                } else {
                    return Backbone.sync.apply(that, args);
                }
            });
        },
    
        /**
         * save all containing models
         */
        save: function() {
            this.each(function(model) {
                model.save();
            });
        },
    
        getUrlParams: function (url) {
            url = url || this.getUrl();
            var m = url.match(/\?([^#]*)/);
            var params = {};
            if (m && m.length > 1) {
                _.each(m[1].split('&'), function (p) {
                    var a = p.split('=');
                    params[a[0]] = a[1];
                });
            }
            return params;
        },
    
        getUrl: function (collection) {
            return (_.isFunction(this.url) ? this.url() : this.url) || '';
        },
    
        getUrlRoot: function () {
            var url = this.getUrl();
            return url ? ( url.indexOf('?') >= 0 ? url.substr(0, url.indexOf('?')) : url) : '';
        },
    
        applyFilter: function (callback) {
            this.trigger('filter', this.filter(callback));
        },
    
        _updateUrl: function () {
            var params = this.getUrlParams();
            if (this.options) {
                this.url = this.getUrlRoot();
                if (this.options.query) {
                    params.query = encodeURIComponent(JSON.stringify(this.options.query));
                }
                if (this.options.fields) {
                    params.fields = encodeURIComponent(JSON.stringify(this.options.fields));
                }
                if (this.options.sort) {
                    params.sort = encodeURIComponent(JSON.stringify(this.options.sort));
                }
                if (!_.isEmpty(params)) {
                    this.url += '?';
                    var a = [];
                    for (var k in params) {
                        a.push(k + (params[k] ? '=' + params[k] : ''));
                    }
                    this.url += a.join('&');
                }
            }
        }
    
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    // M.DataSelector uses code from meteor.js
    // https://github.com/meteor/meteor/tree/master/packages/minimongo
    //
    // Thanks for sharing!
    
    /**
     *
     * @module M.DataSelector
     *
     * @type {*}
     * @extends M.Object
     */
    M.DataSelector = M.Object.design({
    
        _type: 'M.DataSelector',
    
        _selector: null,
    
        create: function (docSelector) {
            var selector = this.design({
                _selector: null
            });
            selector.init(docSelector);
            return selector;
        },
    
        init: function (docSelector) {
            this._selector = this.compileSelector(docSelector);
        },
    
        matches: function (value) {
            if (_.isFunction(this._selector)) {
                return this._selector(value);
            }
            return false;
        },
    
        hasOperators: function (valueSelector) {
            var theseAreOperators;
            for (var selKey in valueSelector) {
                var thisIsOperator = selKey.substr(0, 1) === '$';
                if (theseAreOperators === undefined) {
                    theseAreOperators = thisIsOperator;
                } else if (theseAreOperators !== thisIsOperator) {
                    throw new Error('Inconsistent selector: ' + valueSelector);
                }
            }
            return !!theseAreOperators;  // {} has no operators
        },
    
        // Given a selector, return a function that takes one argument, a
        // document, and returns true if the document matches the selector,
        // else false.
        compileSelector: function (selector) {
            // you can pass a literal function instead of a selector
            if ( _.isFunction(selector)) {
                return function (doc) {
                    return selector.call(doc);
                };
            }
    
            // shorthand -- scalars match _id
            if (this._selectorIsId(selector)) {
                return function (record) {
                    var id = _.isFunction(record.getId) ? record.getId() : (record._id || record.id);
                    return M.Field.prototype.equals(id, selector);
                };
            }
    
            // protect against dangerous selectors.  falsey and {_id: falsey} are both
            // likely programmer error, and not what you want, particularly for
            // destructive operations.
            if (!selector || (('_id' in selector) && !selector._id)) {
                return function (doc) {
                    return false;
                };
            }
    
            // Top level can't be an array or true or binary.
            if (_.isBoolean(selector) || _.isArray(selector) || M.Field.prototype.isBinary(selector)) {
                throw new Error('Invalid selector: ' + selector);
            }
    
            return this.compileDocSelector(selector);
        },
    
        // The main compilation function for a given selector.
        compileDocSelector: function (docSelector) {
            var that = M.DataSelector;
            var perKeySelectors = [];
            _.each(docSelector, function (subSelector, key) {
                if (key.substr(0, 1) === '$') {
                    // Outer operators are either logical operators (they recurse back into
                    // this function), or $where.
                    if (!_.has(that.LOGICAL_OPERATORS, key)) {
                        throw new Error('Unrecognized logical operator: ' + key);
                    }
                    perKeySelectors.push(that.LOGICAL_OPERATORS[key](subSelector));
                } else {
                    var lookUpByIndex = that._makeLookupFunction(key);
                    var valueSelectorFunc = that.compileValueSelector(subSelector);
                    perKeySelectors.push(function (doc) {
                        var branchValues = lookUpByIndex(doc);
                        // We apply the selector to each 'branched' value and return true if any
                        // match. This isn't 100% consistent with MongoDB; eg, see:
                        // https://jira.mongodb.org/browse/SERVER-8585
                        return _.any(branchValues, valueSelectorFunc);
                    });
                }
            });
    
            return function (record) {
                var doc = _.isFunction(record.getData) ? record.getData() : record;
                return _.all(perKeySelectors, function (f) {
                    return f(doc);
                });
            };
        },
    
        compileValueSelector: function (valueSelector) {
            var that = M.DataSelector;
            if (valueSelector === null) {  // undefined or null
                return function (value) {
                    return that._anyIfArray(value, function (x) {
                        return x === null;  // undefined or null
                    });
                };
            }
    
            // Selector is a non-null primitive (and not an array or RegExp either).
            if (!_.isObject(valueSelector)) {
                return function (value) {
                    return that._anyIfArray(value, function (x) {
                        return x === valueSelector;
                    });
                };
            }
    
            if (_.isRegExp(valueSelector)) {
                return function (value) {
                    if (_.isUndefined(value)) {
                        return false;
                    }
                    return that._anyIfArray(value, function (x) {
                        return valueSelector.test(x);
                    });
                };
            }
    
            // Arrays match either identical arrays or arrays that contain it as a value.
            if (_.isArray(valueSelector)) {
                return function (value) {
                    if (!_.isArray(value)) {
                        return false;
                    }
                    return that._anyIfArrayPlus(value, function (x) {
                        return that._equal(valueSelector, x);
                    });
                };
            }
    
            // It's an object, but not an array or regexp.
            if (this.hasOperators(valueSelector)) {
                var operatorFunctions = [];
                _.each(valueSelector, function (operand, operator) {
                    if (!_.has(that.VALUE_OPERATORS, operator)) {
                        throw new Error('Unrecognized operator: ' + operator);
                    }
                    operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, valueSelector.$options));
                });
                return function (value) {
                    return _.all(operatorFunctions, function (f) {
                        return f(value);
                    });
                };
            }
    
            // It's a literal; compare value (or element of value array) directly to the
            // selector.
            return function (value) {
                return that._anyIfArray(value, function (x) {
                    return that._equal(valueSelector, x);
                });
            };
        },
    
        // _makeLookupFunction(key) returns a lookup function.
        //
        // A lookup function takes in a document and returns an array of matching
        // values.  This array has more than one element if any segment of the key other
        // than the last one is an array.  ie, any arrays found when doing non-final
        // lookups result in this function 'branching'; each element in the returned
        // array represents the value found at this branch. If any branch doesn't have a
        // final value for the full key, its element in the returned list will be
        // undefined. It always returns a non-empty array.
        //
        // _makeLookupFunction('a.x')({a: {x: 1}}) returns [1]
        // _makeLookupFunction('a.x')({a: {x: [1]}}) returns [[1]]
        // _makeLookupFunction('a.x')({a: 5})  returns [undefined]
        // _makeLookupFunction('a.x')({a: [{x: 1},
        //                                 {x: [2]},
        //                                 {y: 3}]})
        //   returns [1, [2], undefined]
        _makeLookupFunction: function (key) {
            var dotLocation = key.indexOf('.');
            var first, lookupRest, nextIsNumeric;
            if (dotLocation === -1) {
                first = key;
            } else {
                first = key.substr(0, dotLocation);
                var rest = key.substr(dotLocation + 1);
                lookupRest = this._makeLookupFunction(rest);
                // Is the next (perhaps final) piece numeric (ie, an array lookup?)
                nextIsNumeric = /^\d+(\.|$)/.test(rest);
            }
    
            return function (doc) {
                if (doc === null) { // null or undefined
                    return [undefined];
                }
                var firstLevel = doc[first];
    
                // We don't 'branch' at the final level.
                if (!lookupRest) {
                    return [firstLevel];
                }
    
                // It's an empty array, and we're not done: we won't find anything.
                if (_.isArray(firstLevel) && firstLevel.length === 0) {
                    return [undefined];
                }
    
                // For each result at this level, finish the lookup on the rest of the key,
                // and return everything we find. Also, if the next result is a number,
                // don't branch here.
                //
                // Technically, in MongoDB, we should be able to handle the case where
                // objects have numeric keys, but Mongo doesn't actually handle this
                // consistently yet itself, see eg
                // https://jira.mongodb.org/browse/SERVER-2898
                // https://github.com/mongodb/mongo/blob/master/jstests/array_match2.js
                if (!_.isArray(firstLevel) || nextIsNumeric) {
                    firstLevel = [firstLevel];
                }
                return Array.prototype.concat.apply([], _.map(firstLevel, lookupRest));
            };
        },
    
        _anyIfArray: function (x, f) {
            if (_.isArray(x)) {
                return _.any(x, f);
            }
            return f(x);
        },
    
        _anyIfArrayPlus: function (x, f) {
            if (f(x)) {
                return true;
            }
            return _.isArray(x) && _.any(x, f);
        },
    
        // Is this selector just shorthand for lookup by _id?
        _selectorIsId: function (selector) {
            return _.isString(selector) || _.isNumber(selector);
        },
    
        // deep equality test: use for literal document and array matches
        _equal: function (a, b) {
            return M.Field.prototype._equals(a, b, true);
        },
    
        _cmp: function (a, b) {
            return M.Field.prototype._cmp(a, b);
        },
    
        LOGICAL_OPERATORS: {
            '$and': function (subSelector) {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
                return function (doc) {
                    return _.all(subSelectorFunctions, function (f) {
                        return f(doc);
                    });
                };
            },
    
            '$or': function (subSelector) {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
                return function (doc) {
                    return _.any(subSelectorFunctions, function (f) {
                        return f(doc);
                    });
                };
            },
    
            '$nor': function (subSelector) {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
                return function (doc) {
                    return _.all(subSelectorFunctions, function (f) {
                        return !f(doc);
                    });
                };
            },
    
            '$where': function (selectorValue) {
                if (!_.isFunction(selectorValue)) {
                    var value = selectorValue;
                    selectorValue = function() { return value; };
                }
                return function (doc) {
                    return selectorValue.call(doc);
                };
            }
        },
    
        VALUE_OPERATORS: {
            '$in': function (operand) {
                if (!_.isArray(operand)) {
                    throw new Error('Argument to $in must be array');
                }
                return function (value) {
                    return M.DataSelector._anyIfArrayPlus(value, function (x) {
                        return _.any(operand, function (operandElt) {
                            return M.DataSelector._equal(operandElt, x);
                        });
                    });
                };
            },
    
            '$all': function (operand) {
                if (!_.isArray(operand)) {
                    throw new Error('Argument to $all must be array');
                }
                return function (value) {
                    if (!_.isArray(value)) {
                        return false;
                    }
                    return _.all(operand, function (operandElt) {
                        return _.any(value, function (valueElt) {
                            return M.DataSelector._equal(operandElt, valueElt);
                        });
                    });
                };
            },
    
            '$lt': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) < 0;
                    });
                };
            },
    
            '$lte': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) <= 0;
                    });
                };
            },
    
            '$gt': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) > 0;
                    });
                };
            },
    
            '$gte': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) >= 0;
                    });
                };
            },
    
            '$ne': function (operand) {
                return function (value) {
                    return !M.DataSelector._anyIfArrayPlus(value, function (x) {
                        return M.DataSelector._equal(x, operand);
                    });
                };
            },
    
            '$nin': function (operand) {
                if (!_.isArray(operand)) {
                    throw new Error('Argument to $nin must be array');
                }
                var inFunction = this.VALUE_OPERATORS.$in(operand);
                return function (value) {
                    // Field doesn't exist, so it's not-in operand
                    if (value === undefined) {
                        return true;
                    }
                    return !inFunction(value);
                };
            },
    
            '$exists': function (operand) {
                return function (value) {
                    return operand === (value !== undefined);
                };
            },
            '$mod': function (operand) {
                var divisor = operand[0], remainder = operand[1];
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return x % divisor === remainder;
                    });
                };
            },
    
            '$size': function (operand) {
                return function (value) {
                    return _.isArray(value) && operand === value.length;
                };
            },
    
            '$type': function (operand) {
                return function (value) {
                    // A nonexistent field is of no type.
                    if (_.isUndefined(value)) {
                        return false;
                    }
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.Field.prototype.detectType(x) === operand;
                    });
                };
            },
    
            '$regex': function (operand, options) {
    
                if (_.isUndefined(options)) {
                    // Options passed in $options (even the empty string) always overrides
                    // options in the RegExp object itself.
    
                    // Be clear that we only support the JS-supported options, not extended
                    // ones (eg, Mongo supports x and s). Ideally we would implement x and s
                    // by transforming the regexp, but not today...
                    if (/[^gim]/.test(options)) {
                        throw new Error('Only the i, m, and g regexp options are supported');
                    }
    
                    var regexSource = _.isRegExp(operand) ? operand.source : operand;
                    operand = new RegExp(regexSource, options);
                } else if (!_.isRegExp(operand)) {
                    operand = new RegExp(operand);
                }
    
                return function (value) {
                    if (_.isUndefined(value)) {
                        return false;
                    }
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return operand.test(x);
                    });
                };
            },
    
            '$options': function (operand) {
                // evaluation happens at the $regex function above
                return function (value) {
                    return true;
                };
            },
    
            '$elemMatch': function (operand) {
                var matcher = M.DataSelector.compileDocSelector(operand);
                return function (value) {
                    if (!_.isArray(value)) {
                        return false;
                    }
                    return _.any(value, function (x) {
                        return matcher(x);
                    });
                };
            },
    
            '$not': function (operand) {
                var matcher = M.DataSelector.compileDocSelector(operand);
                return function (value) {
                    return !matcher(value);
                };
            }
        },
    
        // Give a sort spec, which can be in any of these forms:
        //   {'key1': 1, 'key2': -1}
        //   [['key1', 'asc'], ['key2', 'desc']]
        //   ['key1', ['key2', 'desc']]
        //
        // (.. with the first form being dependent on the key enumeration
        // behavior of your javascript VM, which usually does what you mean in
        // this case if the key names don't look like integers ..)
        //
        // return a function that takes two objects, and returns -1 if the
        // first object comes first in order, 1 if the second object comes
        // first, or 0 if neither object comes before the other.
    
        compileSort: function (spec) {
            var sortSpecParts = [];
    
            if (_.isArray(spec)) {
                for (var i = 0; i < spec.length; i++) {
                    if (typeof spec[i] === 'string') {
                        sortSpecParts.push({
                            lookup: this._makeLookupFunction(spec[i]),
                            ascending: true
                        });
                    } else {
                        sortSpecParts.push({
                            lookup: this._makeLookupFunction(spec[i][0]),
                            ascending: spec[i][1] !== 'desc'
                        });
                    }
                }
            } else if (typeof spec === 'object') {
                for (var key in spec) {
                    sortSpecParts.push({
                        lookup: this._makeLookupFunction(key),
                        ascending: spec[key] >= 0
                    });
                }
            } else {
                throw new Error('Bad sort specification: ', JSON.stringify(spec));
            }
    
            if (sortSpecParts.length === 0) {
                return function () {
                    return 0;
                };
            }
    
            // reduceValue takes in all the possible values for the sort key along various
            // branches, and returns the min or max value (according to the bool
            // findMin). Each value can itself be an array, and we look at its values
            // too. (ie, we do a single level of flattening on branchValues, then find the
            // min/max.)
            var reduceValue = function (branchValues, findMin) {
                var reduced;
                var first = true;
                // Iterate over all the values found in all the branches, and if a value is
                // an array itself, iterate over the values in the array separately.
                _.each(branchValues, function (branchValue) {
                    // Value not an array? Pretend it is.
                    if (!_.isArray(branchValue)) {
                        branchValue = [branchValue];
                    }
                    // Value is an empty array? Pretend it was missing, since that's where it
                    // should be sorted.
                    if (_.isArray(branchValue) && branchValue.length === 0) {
                        branchValue = [undefined];
                    }
                    _.each(branchValue, function (value) {
                        // We should get here at least once: lookup functions return non-empty
                        // arrays, so the outer loop runs at least once, and we prevented
                        // branchValue from being an empty array.
                        if (first) {
                            reduced = value;
                            first = false;
                        } else {
                            // Compare the value we found to the value we found so far, saving it
                            // if it's less (for an ascending sort) or more (for a descending
                            // sort).
                            var cmp = M.DataSelector._cmp(reduced, value);
                            if ((findMin && cmp > 0) || (!findMin && cmp < 0)) {
                                reduced = value;
                            }
                        }
                    });
                });
                return reduced;
            };
    
            return function (a, b) {
                a = a.attributes ? a.attributes : a;
                b = b.attributes ? b.attributes : b;
                for (var i = 0; i < sortSpecParts.length; ++i) {
                    var specPart = sortSpecParts[i];
                    var aValue = reduceValue(specPart.lookup(a), specPart.ascending);
                    var bValue = reduceValue(specPart.lookup(b), specPart.ascending);
                    var compare = M.DataSelector._cmp(aValue, bValue);
                    if (compare !== 0) {
                        return specPart.ascending ? compare : -compare;
                    }
                }
                return 0;
            };
        }
    
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.SqlSelector
     *
     * @type {*}
     * @extends M.DataSelector
     */
    M.SqlSelector = M.DataSelector.design({
    
        _type: 'M.SqlSelector',
    
        _selector: null,
        _query: null,
        _entity: null,
    
        create: function (docSelector, entity) {
            var selector = this.extend({
                _entity: entity,
                _selector: null,
                _query: null
            });
            selector.init(docSelector);
    
            return selector;
        },
    
        init: function (docSelector) {
            this._selector = this.compileSelector(docSelector);
            this._query = this.buildSqlQuery(docSelector);
        },
    
        buildStatement: function (obj) {
            return this._query;
        },
    
        buildSqlQuery: function (selector, connector) {
            // you can pass a literal function instead of a selector
            if (selector instanceof Function) {
                return '';
            }
    
            // shorthand -- sql
            if (_.isString(selector)) {
                return selector;
            }
    
            // protect against dangerous selectors.  falsey and {_id: falsey} are both
            // likely programmer error, and not what you want, particularly for
            // destructive operations.
            if (!selector || (('_id' in selector) && !selector._id)) {
                return '1=2';
            }
    
            // Top level can't be an array or true or binary.
            if (_.isBoolean(selector) || _.isArray(selector) || M.DataField.isBinary(selector)) {
                throw new Error('Invalid selector: ' + selector);
            }
    
            return this.buildSqlWhere(selector)();
        },
    
        // The main compilation function for a given selector.
        buildSqlWhere: function (docSelector) {
            var where = '';
            var that = this;
            var perKeySelectors = [];
            _.each(docSelector, function (subSelector, key) {
                if (key.substr(0, 1) === '$') {
                    // Outer operators are either logical operators (they recurse back into
                    // this function), or $where.
                    perKeySelectors.push(that.buildLogicalOperator(key, subSelector));
                } else {
                    var valueLookup = that.buildLookup(key);
                    var valueSelector = that.buildValueSelector(subSelector);
                    if (_.isFunction(valueSelector)) {
                        perKeySelectors.push(function () {
                            return valueSelector(valueLookup);
                        });
                    }
                }
            });
    
            return function () {
                var sql = '';
                _.each(perKeySelectors, function (f) {
                    if (_.isFunction(f)) {
                        sql += f.call(that);
                    }
                });
                return sql;
            };
        },
    
        buildValueSelector: function (valueSelector) {
            var that = this;
            if (valueSelector === null) {  // undefined or null
                return function (key) {
                    return key + ' IS NULL';
                };
            }
    
            // Selector is a non-null primitive (and not an array or RegExp either).
            if (!_.isObject(valueSelector)) {
                return function (key) {
                    return key + ' = ' + that.buildValue(valueSelector);
                };
            }
    
            if (_.isRegExp(valueSelector)) {
                var regEx = valueSelector.toString();
                var match = regEx.match(/\/[\^]?([^^.*$'+()]*)[\$]?\//);
                if (match && match.length > 1) {
                    var prefix = regEx.indexOf('/^') < 0 ? '%' : '';
                    var suffix = regEx.indexOf('$/') < 0 ? '%' : '';
                    return function (key) {
                        return key + ' LIKE "' + prefix + match[1] + suffix + '"';
                    };
                }
                return null;
            }
    
            // Arrays match either identical arrays or arrays that contain it as a value.
            if (_.isArray(valueSelector)) {
                return null;
            }
    
            // It's an object, but not an array or regexp.
            if (this.hasOperators(valueSelector)) {
                var operatorFunctions = [];
                _.each(valueSelector, function (operand, operator) {
                    if (!_.has(that.VALUE_OPERATORS, operator)) {
                        throw new Error('Unrecognized operator: ' + operator);
                    }
                    operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, that));
                });
                return function (key) {
                    return that.LOGICAL_OPERATORS.$and(operatorFunctions, key);
                };
            }
    
            // It's a literal; compare value (or element of value array) directly to the
            // selector.
            return function (key) {
                return key + ' = ' + that.buildValue(valueSelector);
            };
        },
    
        buildLookup: function (key) {
            var field = this._entity ? this._entity.getField(key) : null;
            key = field && field.name ? field.name : key;
            return '"' + key + '"';
        },
    
        buildValue: function (value) {
            if (_.isString(value)) {
                return '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
        },
    
        buildLogicalOperator: function (operator, subSelector) {
            if (!_.has(this.LOGICAL_OPERATORS, operator)) {
                throw new Error('Unrecognized logical operator: ' + operator);
            } else {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunction = _.map(subSelector, this.buildSqlWhere, this);
                var that = this;
                return function (key) {
                    return that.LOGICAL_OPERATORS[operator](subSelectorFunction, key);
                };
            }
        },
    
        LOGICAL_OPERATORS: {
            '$and': function (subSelectorFunction, key) {
                var sql = '';
                var count = 0;
                _.each(subSelectorFunction, function (f) {
                    var s = f !== null ? f(key) : '';
                    if (s) {
                        count++;
                        sql += sql ? ' AND ' + s : s;
                    }
                });
                return count > 1 ? '( ' + sql + ' )' : sql;
            },
            '$or': function (subSelectorFunction, key) {
                var sql = '';
                var miss = false;
                _.each(subSelectorFunction, function (f) {
                    var s = f !== null ? f(key) : '';
                    miss |= !s;
                    sql += sql && s ? ' OR ' + s : s;
                });
                return miss ? '' : '( ' + sql + ' )';
            },
            '$nor': function (subSelectorFunction, key) {
                var sql = '';
                var miss = false;
                _.each(subSelectorFunction, function (f) {
                    var s = f !== null ? f(key) : '';
                    miss |= !s;
                    sql += sql && s ? ' OR ' + s : s;
                });
                return miss ? '' : 'NOT ( ' + sql + ' )';
            }
        },
    
        VALUE_OPERATORS: {
    
            '$in': function (operand) {
                return null;
            },
    
            '$all': function (operand) {
                return null;
            },
    
            '$lt': function (operand, that) {
                return function (key) {
                    return key + ' < ' + that.buildValue(operand);
                };
            },
    
            '$lte': function (operand, that) {
                return function (key) {
                    return key + ' <= ' + that.buildValue(operand);
                };
            },
    
            '$gt': function (operand, that) {
                return function (key) {
                    return key + ' > ' + that.buildValue(operand);
                };
            },
    
            '$gte': function (operand, that) {
                return function (key) {
                    return key + '' > '' + that.buildValue(operand);
                };
            },
    
            '$ne': function (operand, that) {
                return function (key) {
                    return key + ' <> ' + that.buildValue(operand);
                };
            },
    
            '$nin': function (operand) {
                return null;
            },
    
            '$exists': function (operand, that) {
                return function (key) {
                    return key + ' IS NOT NULL';
                };
            },
    
            '$mod': function (operand) {
                return null;
            },
    
            '$size': function (operand) {
                return null;
            },
    
            '$type': function (operand) {
                return null;
            },
    
            '$regex': function (operand, options) {
                return null;
            },
            '$options': function (operand) {
                return null;
            },
    
            '$elemMatch': function (operand) {
                return null;
            },
    
            '$not': function (operand, that) {
                var matcher = that.buildSqlWhere(operand);
                return function (key) {
                    return 'NOT (' + matcher(key) + ')';
                };
            }
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * Base class to build a custom data store.
     *
     * See: M.LocalStorageStore, M.WebSqlStore and M.BikiniStore
     *
     * @module M.Store
     *
     */
    M.Store = function() {
        this.initialize.apply(this, arguments);
    };
    
    M.Store.extend = M.extend;
    M.Store.create = M.create;
    M.Store.design = M.design;
    
    // Attach all inheritable methods to the Connector prototype.
    _.extend(M.Store.prototype, Backbone.Events, M.Object, {
    
        _type: 'M.Store',
    
        entities: null,
    
        options: null,
    
        name: '',
    
        typeMapping: (function() {
            var map = {};
            map [M.CONST.TYPE.OBJECTID] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.DATE] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.BINARY] = M.CONST.TYPE.TEXT;
            return map;
        })(),
    
        initialize: function( options ) {
            options = options || {};
            this.options = this.options || {};
            this.options.name = this.name;
            this.options.typeMapping = this.typeMapping;
            this.options.entities = this.entities;
            _.extend(this.options, options || {});
    
            this._setEntities(options.entities || {});
        },
    
        _setEntities: function( entities ) {
            this.entities = {};
            for( var name in entities ) {
                var entity = M.Entity.from(entities[name], {
                    store: this,
                    typeMapping: this.options.typeMapping
                });
                entity.name = entity.name || name;
    
                // connect collection and model to this store
                var collection = entity.collection || M.Collection.extend({ model: M.Model.extend({}) });
                var model = collection.prototype.model;
                // set new entity and name
                collection.prototype.entity = model.prototype.entity = name;
                collection.prototype.store = model.prototype.store = this;
                entity.idAttribute = entity.idAttribute || model.prototype.idAttribute;
                this.entities[name] = entity;
            }
        },
    
        getEntity: function( obj ) {
            if( obj ) {
                var entity = obj.entity || obj;
                var name = _.isString(entity) ? entity : entity.name;
                if( name ) {
                    return this.entities[name] || (entity && entity.name ? entity : { name: name });
                }
            }
        },
    
        getCollection: function( entity ) {
            if( _.isString(entity) ) {
                entity = this.entities[entity];
            }
            if( entity && entity.collection ) {
                if( M.Collection.prototype.isPrototypeOf(entity.collection) ) {
                    return entity.collection;
                } else {
                    return new entity.collection();
                }
            }
        },
    
        createModel: function( entity, attrs ) {
            if( _.isString(entity) ) {
                entity = this.entities[entity];
            }
            if( entity && entity.collection ) {
                var Model = entity.collection.model || entity.collection.prototype.model;
                if( Model ) {
                    return new Model(attrs);
                }
            }
        },
    
        getArray: function( data ) {
            if( _.isArray(data) ) {
                return data;
            } else if( M.isCollection(data) ) {
                return data.models;
            }
            return _.isObject(data) ? [ data ] : [];
        },
    
        getDataArray: function( data ) {
            var array = [];
            if( _.isArray(data) || Backbone.Collection.prototype.isPrototypeOf(data) ) {
                _.each(data, function( d ) {
                    var attrs = this.getAttributes(d);
                    if( attrs ) {
                        array.push(attrs);
                    }
                });
            } else {
                var attrs = this.getAttributes(data);
                if( attrs ) {
                    array.push(this.getAttributes(attrs));
                }
            }
            return array;
        },
    
        getAttributes: function( model ) {
            if( Backbone.Model.prototype.isPrototypeOf(model) ) {
                return model.attributes;
            }
            return _.isObject(model) ? model : null;
        },
    
        initModel: function( model ) {
        },
    
        initCollection: function( collection ) {
        },
    
        initEntity: function( entity ) {
        },
    
        sync: function( method, model, options ) {
        },
    
        /**
         *
         * @param collection usally a collection, but can also be a model
         * @param options
         */
        fetch: function( collection, options ) {
            if( collection && !collection.models && !collection.attributes && !options ) {
                options = collection;
            }
            if( (!collection || (!collection.models && !collection.attributes)) && options && options.entity ) {
                collection = this.getCollection(options.entity);
            }
            if( collection && collection.fetch ) {
                var opts = _.extend({}, options || {}, { store: this });
                collection.fetch(opts);
            }
        },
    
        create: function( collection, model, options ) {
            if( collection && !collection.models && !options ) {
                model = collection;
                options = model;
            }
            if( (!collection || !collection.models) && options && options.entity ) {
                collection = this.getCollection(options.entity);
            }
            if( collection && collection.create ) {
                var opts = _.extend({}, options || {}, { store: this });
                collection.create(model, opts);
            }
        },
    
        save: function( model, attr, options ) {
            if( model && !model.attributes && !options ) {
                attr = model;
                options = attr;
            }
            if( (!model || !model.attributes) && options && options.entity ) {
                model = this.createModel(options.entity);
            }
            if( model && model.save ) {
                var opts = _.extend({}, options || {}, { store: this });
                model.save(attr, opts);
            }
        },
    
        destroy: function( model, options ) {
            if( model && model.destroy ) {
                var opts = _.extend({}, options || {}, { store: this });
                model.destroy(opts);
            }
        },
    
        _checkEntity: function( obj, entity ) {
            if( !M.isEntity(entity) ) {
                var error = 'No valid entity passed.';
                M.Logger.error(M.CONST.ERROR.VALIDATION_PRESENCE, error);
                this.handleCallback(obj.error, error);
                this.handleCallback(obj.finish, error);
                return false;
            }
            return true;
        },
    
        _checkData: function( obj, data ) {
            if( (!_.isArray(data) || data.length === 0) && !_.isObject(data) ) {
                var error = 'No data passed.';
                M.Logger.error(M.CONST.ERROR.VALIDATION_PRESENCE, error);
                this.handleCallback(obj.error, error);
                this.handleCallback(obj.finish, error);
                return false;
            }
            return true;
        },
    
        handleSuccess: function( obj ) {
            var args = Array.prototype.slice.call(arguments, 1);
            if( obj.success ) {
                this.handleCallback.apply(this, [ obj.success ].concat(args));
            }
            if( obj.finish ) {
                this.handleCallback.apply(this, [ obj.finish ].concat(args));
            }
        },
    
        handleError: function( obj ) {
            var args = Array.prototype.slice.call(arguments, 1);
            if( obj.error ) {
                this.handleCallback.apply(this, [ obj.error ].concat(args));
            }
            if( obj.finish ) {
                this.handleCallback.apply(this, [ obj.finish ].concat(args));
            }
        },
    
        CONST: {
            ERROR_NO_ENTITY: 'No valid entity specified',
            ERROR_LOAD_DATA: 'Error while loading data from store',
            ERROR_SAVE_DATA: 'Error while saving data to the store',
            ERROR_LOAD_IDS:  'Error while loading ids from store',
            ERROR_SAVE_IDS:  'Error while saving ids to the store'
        }
    
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * The M.LocalStorageStore can be used to store model collection into
     * the localStorage
     *
     * @module M.LocalStorageStore
     *
     * @type {*}
     * @extends M.Store
     *
     * @example
     *
     * // The LocalStorageStore will save each model data as a json under his id,
     * // and keeps all id's under an extra key for faster access
     *
     * var MyCollection = M.Collection.extend({
     *      store: M.LocalStorageStore.create(),
     *      entity: 'myEntityName'
     * });
     *
     */
    M.LocalStorageStore = M.Store.extend({
    
        _type: 'M.LocalStorageStore',
    
        ids: {},
    
        sync: function( method, model, options ) {
            options = options || {};
            var that = options.store || this.store;
            var entity = that.getEntity(model.entity || options.entity || this.entity);
            var attrs;
            if( that && entity && model ) {
                var id = model.id || (method === 'create' ? new M.ObjectID().toHexString() : null);
                attrs = options.attrs || model.toJSON(options);
                switch( method ) {
                    case 'patch':
                    case 'update':
                    case 'create':
                        if (method !== 'create') {
                            attrs = _.extend(that._getItem(entity, id) || {}, attrs);
                        }
                        if( model.id !== id && model.idAttribute ) {
                            attrs[model.idAttribute] = id;
                        }
                        that._setItem(entity, id, attrs);
                        break;
                    case 'delete' :
                        that._removeItem(entity, id);
                        break;
                    case 'read' :
                        if( id ) {
                            attrs = that._getItem(entity, id);
                        } else {
                            attrs = [];
                            var ids = that._getItemIds(entity);
                            for( id in ids ) {
                                var itemData = that._getItem(entity, id);
                                if( itemData ) {
                                    attrs.push(itemData);
                                }
                            }
                        }
                        break;
                    default:
                        return;
                }
            }
            if( attrs ) {
                that.handleSuccess(options, attrs);
            } else {
                that.handleError(options, M.Store.CONST.ERROR_NO_ENTITY);
            }
        },
    
        drop: function( options ) {
            var entity = this.getEntity(options);
            if( entity && entity.name ) {
                var keys   = this._findAllKeys(entity);
                for (var i=0; i<keys.length; i++) {
                    localStorage.removeItem(keys[i]);
                }
                localStorage.removeItem('__ids__' + entity.name);
                this.handleSuccess(options);
            } else {
                this.handleError(options, M.Store.CONST.ERROR_NO_ENTITY);
            }
        },
    
        _getKey: function( entity, id ) {
            return '_' + entity.name + '_' + id;
        },
    
        _getItem: function( entity, id ) {
            var attrs;
            if( entity && id ) {
                try {
                    attrs = JSON.parse(localStorage.getItem(this._getKey(entity, id)));
                    if( attrs ) {
                        entity.setId(attrs, id); // fix id
                    } else {
                        this._delItemId(id);
                    }
                } catch( e ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, M.Store.CONST.ERROR_LOAD_DATA, e);
                }
            }
            return attrs;
        },
    
        _setItem: function( entity, id, attrs ) {
            if( entity && id && attrs ) {
                try {
                    localStorage.setItem(this._getKey(entity, id), JSON.stringify(attrs));
                    this._addItemId(entity, id);
                } catch( e ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, M.Store.CONST.ERROR_SAVE_DATA, e);
                }
            }
        },
    
        _removeItem: function( entity, id ) {
            if( entity && id ) {
                localStorage.removeItem(this._getKey(entity, id));
                this._delItemId(entity, id);
            }
        },
    
        _addItemId: function( entity, id ) {
            var ids = this._getItemIds(entity);
            if( !(id in ids) ) {
                ids[id] = '';
                this._saveItemIds(entity, ids);
            }
        },
    
        _delItemId: function( entity, id ) {
            var ids = this._getItemIds(entity);
            if( id in ids ) {
                delete ids[id];
                this._saveItemIds(entity, ids);
            }
        },
    
        _findAllKeys: function (entity) {
            var keys = [];
            var prefixItem = this._getKey(entity, '');
            if( prefixItem ) {
                var key, len = localStorage.length;
                for (var i=0; i < len; i++) {
                    key = localStorage.key(i);
                    if (key && key === prefixItem) {
                        keys.push(key);
                    }
                }
            }
            return keys;
        },
    
        _getItemIds: function( entity ) {
            try {
                var key = '__ids__' + entity.name;
                if( !this.ids[entity.name] ) {
                    this.ids[entity.name] = JSON.parse(localStorage.getItem(key)) || {};
                }
                return this.ids[entity.name];
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, M.Store.CONST.ERROR_LOAD_IDS, e);
            }
        },
    
        _saveItemIds: function( entity, ids ) {
            try {
                var key = '__ids__' + entity.name;
                localStorage.setItem(key, JSON.stringify(ids));
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, M.Store.CONST.ERROR_SAVE_IDS, e);
            }
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * The M.WebSqlStore can be used to store model collection into
     * the webSql database
     *
     * @module M.WebSqlStore
     *
     * @type {*}
     * @extends M.Store
     *
     * @example
     *
     * // The default configuration will save the complete model data as json
     * // into a database column with the name "data"
     *
     * var MyCollection = M.Collection.extend({
     *      model: MyModel,
     *      entity: 'MyTableName',
     *      store: new M.WebSqlStorageStore()
     * });
     *
     * // If you want to use specific columns you can specify the fields
     * // in the entity of your model like this:
     *
     * var MyModel = M.Model.extend({
     *      idAttribute: 'id',
     *      fields: {
     *          id:          { type: M.CONST.TYPE.STRING,  required: YES, index: YES },
     *          sureName:    { name: 'USERNAME', type: M.CONST.TYPE.STRING },
     *          firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
     *          age:         { type: M.CONST.TYPE.INTEGER }
     *      }
     * });
     *
     *
     */
    M.WebSqlStore = M.Store.extend({
    
        _type: 'M.WebSqlStore',
    
        _selector: null,
    
        options: null,
    
        name: 'themproject',
    
        size: 1024 * 1024, // 1 MB
    
        version: '1.0',
    
        db: null,
    
        dataField: { name: 'data', type: 'text', required: true },
    
        idField: { name: 'id', type: 'string', required: true },
    
        typeMapping: (function() {
            var map = {};
            map [M.CONST.TYPE.OBJECTID] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.DATE] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.OBJECT] = M.CONST.TYPE.TEXT;
            map [M.CONST.TYPE.ARRAY] = M.CONST.TYPE.TEXT;
            map [M.CONST.TYPE.BINARY] = M.CONST.TYPE.TEXT;
            return map;
        })(),
    
        sqlTypeMapping: (function() {
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
        })(),
    
        initialize: function( options ) {
            M.Store.prototype.initialize.apply(this, arguments);
            this.options = this.options || {};
            this.options.name = this.name;
            this.options.size = this.size;
            this.options.version = this.version;
            this.options.typeMapping = this.typeMapping;
            this.options.sqlTypeMapping = this.sqlTypeMapping;
            _.extend(this.options, options || {});
    
            this._openDb({
                error: function( msg ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, msg);
                }
            });
        },
    
        sync: function( method, model, options ) {
            var that = options.store || this.store;
            var models = M.isCollection(model) ? model.models : [ model ];
            options.entity = options.entity || this.entity;
            switch( method ) {
                case 'create':
                    that._checkTable(options, function() {
                        that._insertOrReplace(models, options);
                    });
                    break;
    
                case 'update':
                case 'patch':
                    that._checkTable(options, function() {
                        that._insertOrReplace(models, options);
                    });
                    break;
    
                case 'delete':
                    that._delete(models, options);
                    break;
    
                case 'read':
                    that._select(this, options);
                    break;
    
                default:
                    break;
            }
        },
    
        select: function( options ) {
            this._select(null, options);
        },
    
        drop: function( options ) {
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
                        this.db = window.openDatabase(this.options.name, '', '', this.options.size);
                        if( this.entities ) {
                            for( var key in this.entities ) {
                                this._createTable({ entity: this.entities[key] });
                            }
                        }
                    }
                } catch( e ) {
                    dbError = e;
                }
            }
            if( this.db ) {
                if( this.options.version && this.db.version !== this.options.version ) {
                    this._updateDb(options);
                } else {
                    this.handleSuccess(options, this.db);
                }
            } else if( dbError === 2  || dbError === '2') {
                // Version number mismatch.
                this._updateDb(options);
            } else {
                if( !error && dbError ) {
                    error = dbError;
                }
                this.handleSuccess(options, error);
            }
        },
    
        _updateDb: function( options ) {
            var error;
            var lastSql;
            var that = this;
            try {
                var db = window.openDatabase(this.options.name, '', '', this.options.size);
                try {
                    var arSql = this._sqlUpdateDatabase(db.version, this.options.version);
                    db.changeVersion(db.version, this.options.version, function( tx ) {
                        _.each(arSql, function( sql ) {
                            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'SQL-Statement: ' + sql);
                            lastSql = sql;
                            tx.executeSql(sql);
                        });
                    }, function( msg ) {
                        that.handleError(options, msg, lastSql);
                    }, function() {
                        that.handleSuccess(options);
                    });
                } catch( e ) {
                    error = e.message;
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'changeversion failed, DB-Version: ' + db.version);
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
            return 'DROP TABLE IF EXISTS \'' + name + '\'';
        },
    
        _isAutoincrementKey: function( entity, key ) {
            if( entity && key ) {
                var column = this.getField(entity, key);
                return column && column.type === M.CONST.TYPE.INTEGER;
            }
        },
    
        _sqlPrimaryKey: function( entity, keys ) {
            if( keys && keys.length === 1 ) {
                if( this._isAutoincrementKey(entity, keys[0]) ) {
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
            if( !columns ) {
                columns = this._dbAttribute(this.dataField);
            }
            var sql = 'CREATE TABLE IF NOT EXISTS \'' + entity.name + '\' (';
            sql += primaryKey ? primaryKey + ', ' : '';
            sql += columns;
            sql += constraint ? ', ' + constraint : '';
            sql += ');';
            return sql;
        },
    
        _sqlDelete: function(options, entity ) {
            var sql = 'DELETE FROM \'' + entity.name + '\'';
            var where = this._sqlWhere(options, entity) || this._sqlWhereFromData(options, entity);
            if( where ) {
                sql += ' WHERE ' + where;
            }
            sql += options.and ? ' AND ' + options.and : '';
            return sql;
        },
    
        _sqlWhere: function( options, entity ) {
            this._selector = null;
            var sql = '';
            if( _.isString(options.where) ) {
                sql = options.where;
            } else if( _.isObject(options.where) ) {
                this._selector = M.SqlSelector.create(options.where, entity);
                sql = this._selector.buildStatement();
            }
            return sql;
        },
    
        _sqlWhereFromData: function(options, entity ) {
            var that = this;
            var ids = [];
            if( options && options.models && entity && entity.idAttribute ) {
                var id, key = entity.idAttribute;
                var field = this.getField(entity, key);
                _.each(options.models, function( model ) {
                    id = model.id;
                    if( !_.isUndefined(id) ) {
                        ids.push(that._sqlValue(id, field));
                    }
                });
                if( ids.length > 0 ) {
                    return key + ' IN (' + ids.join(',') + ')';
                }
            }
            return '';
        },
    
        _sqlSelect: function( options, entity ) {
    
            var sql = 'SELECT ';
            if( options.fields ) {
                if( options.fields.length > 1 ) {
                    sql += options.fields.join(', ');
                } else if( options.fields.length === 1 ) {
                    sql += options.fields[0];
                }
            } else {
                sql += '*';
            }
            sql += ' FROM \'' + entity.name + '\'';
            if( options.join ) {
                sql += ' JOIN ' + options.join;
            }
    
            if( options.leftJoin ) {
                sql += ' LEFT JOIN ' + options.leftJoin;
            }
    
            var where = this._sqlWhere(options, entity) || this._sqlWhereFromData(options, entity);
            if( where ) {
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
            if( type === M.CONST.TYPE.INTEGER || type === M.CONST.TYPE.FLOAT ) {
                return value;
            } else if( type === M.CONST.TYPE.BOOLEAN ) {
                return value ? '1' : '0';
            } else if( type === M.CONST.TYPE.NULL ) {
                return 'NULL';
            }
            value = M.Field.prototype.transform(value, M.CONST.TYPE.STRING);
            value = value.replace(/"/g, '""');
            return '"' + value + '"';
        },
    
        _dbAttribute: function( field ) {
            if( field && field.name ) {
                var type = this.options.sqlTypeMapping[field.type];
                var isReqStr = field.required ? ' NOT NULL' : '';
                if( type ) {
                    return field.name + ' ' + type.toUpperCase() + isReqStr;
                }
            }
        },
    
        _dropTable: function( options ) {
    
            var entity = this.getEntity(options);
            entity.db = null;
    
            if( this._checkDb(options) && entity ) {
                var sql = this._sqlDropTable(entity.name);
                // reset flag
                this._executeTransaction(options, [sql]);
            }
        },
    
        _createTable: function( options ) {
    
            var entity = this.getEntity(options);
            entity.db = this.db;
    
            if( this._checkDb(options) && this._checkEntity(options, entity) ) {
                var sql = this._sqlCreateTable(entity);
                // reset flag
                this._executeTransaction(options, [sql]);
            }
        },
    
        _checkTable: function( options, callback ) {
            var entity = this.getEntity(options);
            var that = this;
            if( entity && !entity.db ) {
                this._createTable({
                    success: function() {
                        callback();
                    },
                    error: function( error ) {
                        this.handleError(options, error);
                    },
                    entity: entity
                });
            } else {
                callback();
            }
        },
    
        _insertOrReplace: function( models, options ) {
    
            var entity = this.getEntity(options);
    
            if( this._checkDb(options) && this._checkEntity(options, entity) && this._checkData(options, models) ) {
    
                var isAutoInc = this._isAutoincrementKey(entity, entity.getKey());
                var statements = [];
                var sqlTemplate = 'INSERT OR REPLACE INTO \'' + entity.name + '\' (';
                for( var i = 0; i < models.length; i++ ) {
                    var model = models[i];
                    var statement = ''; // the actual sql insert string with values
                    if( !isAutoInc && !model.id && model.idAttribute ) {
                        model.set(model.idAttribute, new M.ObjectID().toHexString());
                    }
                    var value = options.attrs || model.toJSON();
                    var args, keys;
                    if( !_.isEmpty(entity.fields) ) {
                        args = _.values(value);
                        keys = _.keys(value);
                    } else {
                        args = [ model.id, JSON.stringify(value) ];
                        keys = [ 'id', 'data'];
                    }
                    if( args.length > 0 ) {
                        var values = new Array(args.length).join('?,') + '?';
                        var columns = '\'' + keys.join('\',\'') + '\'';
                        statement += sqlTemplate + columns + ') VALUES (' + values + ');';
                        statements.push({ statement: statement, arguments: args });
                    }
                }
                this._executeTransaction(options, statements);
            }
        },
    
        _select: function( result, options ) {
    
            var entity = this.getEntity(options);
    
            if( this._checkDb(options) && this._checkEntity(options, entity) ) {
                var lastStatement;
                var isCollection = M.isCollection(result);
                if( isCollection ) {
                    result = [];
                } else {
                    options.models = [ result ];
                }
                var stm = this._sqlSelect(options, entity);
                var that = this;
                this.db.readTransaction(function( t ) {
                    var statement = stm.statement || stm;
                    var args = stm.arguments;
                    lastStatement = statement;
                    M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'SQL-Statement: ' + statement);
                    if( args ) {
                        M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, '    Arguments: ' + JSON.stringify(args));
                    }
                    t.executeSql(statement, args, function( tx, res ) {
                        var len = res.rows.length;//, i;
                        for( var i = 0; i < len; i++ ) {
                            var item = res.rows.item(i);
                            var attrs;
                            if( !_.isEmpty(entity.fields) || !that._hasDefaultFields(item) ) {
                                attrs = item;
                            } else {
                                try {
                                    attrs = JSON.parse(item.data);
                                } catch( e ) {
                                }
                            }
                            if( attrs && (!that._selector || that._selector.matches(attrs)) ) {
                                if( isCollection ) {
                                    result.push(attrs);
                                } else {
                                    result = attrs;
                                    break;
                                }
                            }
                        }
                    }, function() {
                        // M.Logger.log('Incorrect statement: ' + sql, M.ERR)
                    }); // callbacks: SQLStatementErrorCallback
                }, function( sqlError ) { // errorCallback
                    M.Logger.error(M.CONST.ERROR.WEBSQL_SYNTAX, 'WebSql Syntax Error: ' + sqlError.message);
                    that.handleError(options, sqlError.message, lastStatement);
                }, function() { // voidCallback (success)
                    that.handleSuccess(options, result);
                });
            }
        },
    
        _delete: function( models, options ) {
            var entity = this.getEntity(options);
            if( this._checkDb(options) && this._checkEntity(options, entity) ) {
                options.models = models;
                var sql = this._sqlDelete(options, entity);
                // reset flag
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
                            var args = stm.arguments;
                            lastStatement = statement;
                            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'SQL-Statement: ' + statement);
                            if( args ) {
                                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, '    Arguments: ' + JSON.stringify(args));
                            }
                            t.executeSql(statement, args);
                        });
                    }, function( sqlError ) { // errorCallback
                        M.Logger.error(M.CONST.ERROR.WEBSQL_SYNTAX, sqlError.message);
                        that.handleError(options, sqlError.message, lastStatement);
                    }, function() {
                        that.handleSuccess(options);
                    });
                } catch( e ) {
                    M.Logger.error(M.CONST.ERROR.WEBSQL_UNKNOWN, e.message);
                }
            }
            if( error ) {
                this.handleCallback(options.error, error, lastStatement);
            }
        },
    
        _hasDefaultFields: function( item ) {
            return _.every(_.keys(item), function( key ) {
                return key === this.idField.name || key === this.dataField.name;
            }, this);
        },
    
        _checkDb: function( options ) {
            // has to be initialized first
            if( !this.db ) {
                var error = 'db handler not initialized.';
                M.Logger.error(M.CONST.ERROR.WEBSQL_NO_DBHANDLER, error);
                this.handleError(options, error);
                return false;
            }
            return true;
        },
    
        getFields: function( entity ) {
            if( !_.isEmpty(entity.fields) ) {
                return entity.fields;
            } else {
                var fields = {};
                fields.data = this.dataField;
                var idAttribute = entity.idAttribute || 'id';
                fields[idAttribute] = this.idField;
                return fields;
            }
        },
    
        getField: function( entity, key ) {
            return this.getFields(entity)[key];
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * The M.BikiniStore is used to connect a model collection to an
     * bikini server.
     *
     * This will give you an online and offline store with live data updates.
     *
     * @module M.BikiniStore
     *
     * @type {*}
     * @extends M.Store
     *
     * @example
     *
     * // The default configuration will save the complete model data as a json,
     * // and the offline change log to a local WebSql database, synchronize it
     * // trough REST calls with the server and receive live updates via a socket.io connection.
     *
     * var MyCollection = M.Collection.extend({
     *      model: MyModel,
     *      url: 'http://myBikiniServer.com:8200/bikini/myCollection',
     *      store: new M.BikiniStore( {
     *          useLocalStore:   YES, // (default) store the data for offline use
     *          useSocketNotify: YES, // (default) register at the server for live updates
     *          useOfflineChanges: YES // (default) allow changes to the offline data
     *      })
     * });
     *
     */
    M.BikiniStore = M.Store.extend({
    
        _type: 'M.BikiniStore',
    
        _selector: null,
    
        endpoints: {},
    
        options: null,
    
        localStore: M.WebSqlStore,
    
        useLocalStore: YES,
    
        useSocketNotify: YES,
    
        useOfflineChanges: YES,
    
        isConnected: NO,
    
        typeMapping: {
            'binary': 'text',
            'date': 'string'
        },
    
        initialize: function( options ) {
            M.Store.prototype.initialize.apply(this, arguments);
            this.options = this.options || {};
            this.options.useLocalStore = this.useLocalStore;
            this.options.useSocketNotify = this.useSocketNotify;
            this.options.useOfflineChanges = this.useOfflineChanges;
            this.options.socketPath = this.socketPath;
            this.options.localStore = this.localStore;
            this.options.typeMapping = this.typeMapping;
            if( this.options.useSocketNotify && typeof io !== 'object' ) {
                console.log('Socket.IO not present !!');
                this.options.useSocketNotify = NO;
            }
            _.extend(this.options, options || {});
        },
    
        initModel: function( model ) {
        },
    
        initCollection: function( collection ) {
            var url = collection.getUrlRoot();
            var entity = this.getEntity(collection.entity);
            if( url && entity ) {
                var name = entity.name;
                var hash = this._hashCode(url);
                var credentials = entity.credentials || collection.credentials;
                var user = credentials && credentials.username ? credentials.username : '';
                var channel = name + user + hash;
                collection.channel = channel;
                // get or create endpoint for this url
                var that = this;
                var endpoint = this.endpoints[hash];
                if( !endpoint ) {
                    var href = M.Request.getLocation(url);
                    endpoint = {};
                    endpoint.baseUrl = url;
                    endpoint.readUrl = collection.getUrl();
                    endpoint.host = href.protocol + '//' + href.host;
                    endpoint.path = href.pathname;
                    endpoint.entity = entity;
                    endpoint.channel = channel;
                    endpoint.credentials = credentials;
                    endpoint.socketPath = this.options.socketPath;
                    endpoint.localStore = this.createLocalStore(endpoint);
                    endpoint.messages = this.createMsgCollection(endpoint);
                    endpoint.socket = this.createSocket(endpoint);
                    endpoint.info = this.fetchServerInfo(endpoint);
                    that.endpoints[hash] = endpoint;
                }
                collection.endpoint = endpoint;
                collection.listenTo(this, endpoint.channel, this.onMessage, collection);
            }
        },
    
        getEndpoint: function( url ) {
            if( url ) {
                var hash = this._hashCode(url);
                return this.endpoints[hash];
            }
        },
    
        createLocalStore: function( endpoint, idAttribute ) {
            if( this.options.useLocalStore && endpoint ) {
                var entities = {};
                entities[endpoint.entity.name] = {
                    name: endpoint.channel,
                    idAttribute: idAttribute
                };
                return this.options.localStore.create({
                    entities: entities
                });
            }
        },
    
        createMsgCollection: function( endpoint ) {
            if( this.options.useOfflineChanges && endpoint ) {
                var messages = M.Collection.design({
                    url: endpoint.url,
                    entity: 'msg-' + endpoint.channel,
                    store: this.options.localStore.create()
                });
                var that = this;
                messages.fetch({
                    success: function() {
                        that.sendMessages(endpoint);
                    }
                });
                return messages;
            }
        },
    
        createSocket: function( endpoint, name ) {
            if( this.options.useSocketNotify && endpoint.socketPath && endpoint ) {
                var that = this;
                var url  = endpoint.host;
                var path = endpoint.path;
                path = endpoint.socketPath || (path + (path.charAt(path.length - 1) === '/' ? '' : '/' ) + 'live');
                // remove leading /
                var resource = (path && path.indexOf('/') === 0) ? path.substr(1) : path;
    
                endpoint.socket = io.connect(url, { resource: resource });
                endpoint.socket.on('connect', function() {
                    that._bindChannel(endpoint, name);
                    that.onConnect(endpoint);
                });
                endpoint.socket.on('disconnect', function() {
                    console.log('socket.io: disconnect');
                    that.onDisconnect(endpoint);
                });
                return endpoint.socket;
            }
        },
    
        _bindChannel: function(endpoint, name ) {
            var that = this;
            if (endpoint && endpoint.socket) {
                var channel = endpoint.channel;
                var socket  = endpoint.socket;
                var time    = this.getLastMessageTime(channel);
                name = name || endpoint.entity.name;
                socket.on(channel, function( msg ) {
                    if( msg ) {
                        that.trigger(channel, msg);
                        if (that.options.useLocalStore) {
                            that.setLastMessageTime(channel, msg.time);
                        }
                    }
                });
                socket.emit('bind', {
                    entity: name,
                    channel: channel,
                    time: time
                });
            }
        },
    
        getLastMessageTime: function( channel ) {
            return localStorage.getItem('__' + channel + 'last_msg_time') || 0;
        },
    
        setLastMessageTime: function( channel, time ) {
            if( time ) {
                localStorage.setItem('__' + channel + 'last_msg_time', time);
            }
        },
    
        _hashCode: function( str ) {
            var hash = 0, char;
            if( str.length === 0 ) {
                return hash;
            }
            for( var i = 0, l = str.length; i < l; i++ ) {
                char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        },
    
        onConnect: function( endpoint ) {
            this.isConnected = YES;
            this.fetchChanges(endpoint );
            this.sendMessages(endpoint );
        },
    
        onDisconnect: function(endpoint) {
            this.isConnected = NO;
            if (endpoint.socket && endpoint.socket.socket) {
                endpoint.socket.socket.onDisconnect();
            }
        },
    
        onMessage: function( msg ) {
            if( msg && msg.method ) {
                var localStore = this.endpoint ? this.endpoint.localStore : null;
                var options = {
                    store: localStore,
                    entity: this.entity,
                    merge: YES,
                    fromMessage: YES,
                    parse: YES
                };
                var attrs = msg.data;
    
                switch( msg.method ) {
                    case 'patch':
                    case 'update':
                    case 'create':
                        options.patch = msg.method === 'patch';
                        var model = msg.id ? this.get(msg.id) : null;
                        if( model ) {
                            model.save(attrs, options);
                        } else {
                            this.create(attrs, options);
                        }
                        break;
                    case 'delete':
                        if( msg.id ) {
                            if( msg.id === 'all' ) {
                                while( (model = this.first()) ) {
                                    if( localStore ) {
                                        localStore.sync.apply(this, [
                                            'delete',
                                            model,
                                            { store: localStore, fromMessage: YES }
                                        ]);
                                    }
                                    this.remove(model);
                                }
                                this.store.setLastMessageTime(this.endpoint.channel, '');
                            } else {
                                var msgModel = this.get(msg.id);
                                if( msgModel ) {
                                    msgModel.destroy(options);
                                }
                            }
                        }
                        break;
    
                    default:
                        break;
                }
            }
        },
    
        sync: function( method, model, options ) {
            var that = options.store || this.store;
            if( options.fromMessage ) {
                return that.handleCallback(options.success);
            }
            var endpoint = that.getEndpoint(this.getUrlRoot());
            if( that && endpoint ) {
                var channel = this.channel;
    
                if( M.isModel(model) && !model.id ) {
                    model.set(model.idAttribute, new M.ObjectID().toHexString());
                }
    
                var time = that.getLastMessageTime(channel);
                // only send read messages if no other store can do this
                // or for initial load
                if( method !== 'read' || !endpoint.localStore || !time ) {
                    // do backbone rest
                    that.addMessage(method, model, // we don't need to call callbacks if an other store handle this
                        endpoint.localStore ? {} : options, endpoint);
                } else if( method === 'read' ) {
                    that.fetchChanges(endpoint);
                }
                if( endpoint.localStore ) {
                    options.store = endpoint.localStore;
                    endpoint.localStore.sync.apply(this, arguments);
                }
            }
        },
    
        addMessage: function( method, model, options, endpoint ) {
            var that = this;
            if( method && model ) {
                var changes = model.changedSinceSync;
                var data = null;
                var storeMsg = YES;
                switch( method ) {
                    case 'update':
                    case 'create':
                        data = options.attrs || model.toJSON();
                        break;
    
                    case 'patch':
                        if( _.isEmpty(changes) ) {
                            return;
                        }
                        data = model.toJSON({ attrs: changes });
                        break;
    
                    case 'delete':
                        break;
    
                    default:
                        storeMsg = NO;
                        break;
                }
                var msg = {
                    _id: model.id,
                    id: model.id,
                    method: method,
                    data: data
                };
                var emit = function( endpoint, msg ) {
                    that.emitMessage(endpoint, msg, options, model);
                };
                if( storeMsg ) {
                    this.storeMessage(endpoint, msg, emit);
                } else {
                    emit(endpoint, msg);
                }
            }
        },
    
        emitMessage: function( endpoint, msg, options, model ) {
            var channel = endpoint.channel;
            var that = this;
            var url = M.isModel(model) || msg.method !== 'read' ? endpoint.baseUrl : endpoint.readUrl;
            if( msg.id && msg.method !== 'create' ) {
                url += '/' + msg.id;
            }
            model.sync.apply(model, [msg.method, model, {
                url: url,
                error: function( xhr, status ) {
                    if( !xhr.responseText && that.options.useOfflineChanges ) {
                        // this seams to be only a connection problem, so we keep the message an call success
                        that.onDisconnect(endpoint);
                        that.handleCallback(options.success, msg.data);
                    } else {
                        that.removeMessage(endpoint, msg, function( endpoint, msg ) {
                            // Todo: revert changed data
                            that.handleCallback(options.error, status);
                        });
                    }
                },
                success: function( data ) {
                    if (!that.isConnected) {
                        that.onConnect(endpoint);
                    }
                    that.removeMessage(endpoint, msg, function( endpoint, msg ) {
                        if( options.success ) {
                            var resp = data;
                            that.handleCallback(options.success, resp);
                        } else {
                            // that.setLastMessageTime(channel, msg.time);
                            if( msg.method === 'read' ) {
                                var array = _.isArray(data) ? data : [ data ];
                                for( var i = 0; i < array.length; i++ ) {
                                    data = array[i];
                                    if( data ) {
                                        that.trigger(channel, {
                                            id: data._id,
                                            method: 'update',
                                            data: data
                                        });
                                    }
                                }
                            } else {
                                that.trigger(channel, msg);
                            }
                        }
                    });
                },
                store: {}
            }]);
        },
    
        fetchChanges: function( endpoint ) {
            var that = this;
            var channel = endpoint ? endpoint.channel : '';
            var time = that.getLastMessageTime(channel);
            if( endpoint && endpoint.baseUrl && channel && time ) {
                var changes = new M.Collection({});
                changes.fetch({
                    url: endpoint.baseUrl + '/changes/' + time,
                    success: function() {
                        changes.each(function( msg ) {
                            if( msg.time && msg.method ) {
                                if (that.options.useLocalStore) {
                                    that.setLastMessageTime(channel, msg.time);
                                }
                                that.trigger(channel, msg);
                            }
                        });
                    },
                    credentials: endpoint.credentials
                });
            }
        },
    
        fetchServerInfo: function( endpoint ) {
            var that = this;
            if( endpoint && endpoint.baseUrl ) {
                var info = new M.Model();
                var time = that.getLastMessageTime(endpoint.channel);
                info.fetch({
                    url: endpoint.baseUrl + '/info',
                    success: function() {
                        if( !time && info.get('time') ) {
                            that.setLastMessageTime(endpoint.channel, info.get('time'));
                        }
                        if( !endpoint.socketPath && info.get('socketPath') ) {
                            endpoint.socketPath = info.get('socketPath');
                            var name = info.get('entity') || endpoint.entity.name;
                            if( that.options.useSocketNotify ) {
                                that.createSocket(endpoint, name);
                            }
                        }
                    },
                    credentials: endpoint.credentials
                });
            }
        },
    
        sendMessages: function( endpoint ) {
            if( endpoint && endpoint.messages ) {
                var that = this;
                endpoint.messages.each(function( message ) {
                    var msg;
                    try {
                        msg = JSON.parse(message.get('msg'));
                    } catch( e ) {
                    }
                    var channel = message.get('channel');
                    if( msg && channel ) {
                        var model = that.createModel({ collection: endpoint.messages }, msg.data);
                        that.emitMessage(endpoint, msg, {}, model);
                    } else {
                        message.destroy();
                    }
                });
            }
        },
    
        mergeMessages: function( data, id ) {
            return data;
        },
    
        storeMessage: function( endpoint, msg, callback ) {
            if( endpoint && endpoint.messages && msg ) {
                var channel = endpoint.channel;
                var message = endpoint.messages.get(msg._id);
                if( message ) {
                    var oldMsg = JSON.parse(message.get('msg'));
                    message.save({
                        msg: JSON.stringify(_.extend(oldMsg, msg))
                    });
                } else {
                    endpoint.messages.create({
                        _id: msg._id,
                        id: msg.id,
                        msg: JSON.stringify(msg),
                        channel: channel
                    });
                }
            }
            callback(endpoint, msg);
        },
    
        removeMessage: function( endpoint, msg, callback ) {
            if( endpoint && endpoint.messages ) {
                var message = endpoint.messages.get(msg._id);
                if( message ) {
                    message.destroy();
                }
            }
            callback(endpoint, msg);
        },
    
        clear: function( collection ) {
            if( collection ) {
                var endpoint = this.getEndpoint(collection.getUrlRoot());
                if( endpoint ) {
                    if( endpoint.localStore ) {
                        endpoint.localStore.destroy();
                    }
                    if( endpoint.messages ) {
                        endpoint.messages.destroy();
                    }
                    collection.reset();
                    this.setLastMessageTime(endpoint.channel, '');
                }
            }
        }
    });
    
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.Interface
     *
     * @type {*}
     * @extends M.Object
     */
    M.Interface = M.Object.design(/** @scope M.Interface.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Interface',
    
        /**
         * This property is used to identify M.Interface and all of its derived object as
         * valid interfaces.
         *
         * @type Boolean
         */
        isMInterface: YES,
    
        /**
         * This method returns the object to implement the interface of
         * some component within the framework. This basic implementation
         * of M.Interface has to be overwritten in any concrete sub-object
         * of M.Interface.
         *
         * @returns {Object}
         */
        getInterface: function() {
            return void null;
        }
    
    });
    
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ViewEnableState
     *
     * @type {*}
     * @extends M.Interface
     */
    M.ViewEnableState = M.Interface.design(/** @scope M.ContentBinding.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.ViewEnableState',
    
        _isEnabled: YES,
    
        disable: function() {
            this._isEnabled = NO;
            this.$el.addClass('disabled').removeClass('enabled');
            this._disableEvents();
            return this;
        },
    
        enable: function() {
            this._isEnabled = YES;
            this.$el.addClass('enabled').removeClass('disabled');
            this._enableEvents();
            return this;
        },
    
        getInterface: function() {
            return {
                disable: this.disable,
                enable: this.enable
            };
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    M.ActiveState = M.Interface.design(/** @scope M.Interface.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.ActiveState',
    
        /**
         * Add an event to the elements root DOM element and listen to touchstart and mousedown. If the event happen add a css class named 'active' to that root element.
         * The css class gets removed on touchcancel, touchend or mouseup
         * @param {M.View} context - The View that implements this Interface
         * @private
         * @example
         *
         * MyOnActiveView = M.View.extend().implements([M.ActiveState]);
         *
         */
        _registerActiveState: function( context ) {
            if(context._isInButtonGroup){
                return;
            }
            // get the Views internal events and store them in a swap object
            var events = context._internalEvents || {};
    
            // be sure that the event names are defined
            events.touchstart = events.touchstart || [];
            events.touchend = events.touchend || [];
            events.touchcancel = events.touchcancel || [];
            events.mousedown = events.touchstart || [];
            events.mouseup = events.touchend || [];
            // Bugifx for android <4.1 devices. If a touch start happens and a scrolling, no touchend is fired.
            events.touchmove = events.touchmove || [];
            events.touchleave = events.touchleave || [];
    
            // be sure that the events are arrays
            events.touchstart = _.isArray(events.touchstart) ? events.touchstart : [events.touchstart];
            events.touchend = _.isArray(events.touchend) ? events.touchend : [events.touchend];
            events.touchcancel = _.isArray(events.touchcancel) ? events.touchcancel : [events.touchcancel];
            events.mousedown = _.isArray(events.mousedown) ? events.mousedown : [events.mousedown];
            events.mouseup = _.isArray(events.mouseup) ? events.mouseup : [events.mouseup];
            events.touchmove = _.isArray(events.touchmove) ? events.touchmove : [events.touchmove];
            events.touchleave = _.isArray(events.touchleave) ? events.touchleave : [events.touchleave];
    
            // touchstrart callback - add the class 'active'
            var touchstart = function setActiveStateOnTouchstart(event, element){
                if(element._hammertime.enabled === NO){
                    return;
                }
                element.$el.addClass('active');
            };
    
            // touchend callback - remove the class 'active'
            var touchend = function removeActiveStateOnTouchend(event, element){
                element.$el.removeClass('active');
            };
    
            // touchcancel callback - remove the class 'active'
            var touchcancel = function removeActiveStateOnTouchcancel(event, element){
                element.$el.removeClass('active');
            };
    
            // add the events to the swap object
            events.touchstart.push(touchstart);
            events.touchend.push(touchend);
            events.touchcancel.push(touchcancel);
            events.mousedown.push(touchstart);
            events.mouseup.push(touchend);
            events.touchmove.push(touchend);
            events.touchleave.push(touchend);
    
            // overwrite the interal events with the swap element
            context._internalEvents = events;
    
        },
    
        /**
         *
         * @param context
         * @returns {{registerActiveState: *}}
         * @override
         */
        getInterface: function( context ) {
            return {
                /* Call the function at the creation time to add the events when the element is initialized */
                registerActiveState: this._registerActiveState(context)
            };
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.AddCssClass
     *
     * @type {*}
     * @extends M.Interface
     */
    M.AddCssClass = M.Interface.design(/** @scope M.Interface.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.AddCssClass',
    
        _addCssClass: function(context){
            if(context.classes){
                context._internalCssClasses += ' ' + context.classes;
            } else {
    
            }
    
        },
        /**
         *
         * @param context
         * @returns {{registerActiveState: *}}
         * @override
         */
        getInterface: function( context ) {
            return {
                /* Call the function at the creation time to add the events when the element is initialized */
                registerAddCssClassInterface: this._addCssClass(context)
            };
        }
    
    });
    
    
    
    // Copyright (c) 2014 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    ////////////////////////////////////////////////////////////////
    // DO NOT EDIT THIS FILE - it is generated by grunt
    ////////////////////////////////////////////////////////////////
    
    /* jshint -W109 */
    M.Templates = {"default":{"accordion.ejs":"<ul><%= value %></ul>","accordionitem.ejs":"<ul><%= value %></ul>","button.ejs":"<div class=\"button\"><% if(icon) { %> <i class=\"fa <%= icon %>\"></i> <% } %> <div data-binding=\"value\"<% if(value) {  } %>><%= value %></div></div>","buttongroup.ejs":"<div class=\"clearfix\" data-childviews=\"buttons\"></div>","checkboxlist.ejs":"<div><%= label %><div data-childviews=\"checkbox-options\"></div></div>","checkboxoption.ejs":"<label><input type=\"checkbox\" name=\"<%= name %>\" value=\"<%= value %>\"><i class=\"needsclick fa\"></i> <%= label %></label>","debug.ejs":"<div><div data-childviews=\"debug-menu\"></div><div data-childviews=\"debug-grid\"></div></div>","dialog.ejs":"<div></div>","image.ejs":"<img src=\"<%= value %>\" alt=\"<%= alt %>\"/>","label.ejs":"<div contenteditable=\"true\"><%= value %></div>","list.ejs":"<ul data-childviews=\"list\"></ul>","listitem.ejs":"<li><%= value %></li>","listitemlinked.ejs":"<li><span><%= value %></span><i class=\"fa <%= icon %>\"></i></li>","loader.ejs":"<div class=\"m-view m-overlayview m-loaderview m-loaderview-show\" style=\"display: block;\"> <div class=\"m-view m-overlayview-inner m-loaderview-inner\"> <div class=\"m-view m-labelview m-loaderview-inner-message\"></div> <div class=\"m-view m-loaderview-inner-icon m-loaderview-inner-icon-only\"> <div class=\"m-view m-loaderview-inner-icon-1\"></div> <div class=\"m-view m-loaderview-inner-icon-2\"></div> <div class=\"m-view m-loaderview-inner-icon-3\"></div> <div class=\"m-view m-loaderview-inner-icon-4\"></div> <div class=\"m-view m-loaderview-inner-icon-5\"></div> <div class=\"m-view m-loaderview-inner-icon-6\"></div> <div class=\"m-view m-loaderview-inner-icon-7\"></div> <div class=\"m-view m-loaderview-inner-icon-8\"></div> </div> </div> </div>","menu.ejs":"<div class=\"movable-backdrop fade\"></div><div class=\"movable-container\"><span><%= value %></span><div class=\"menu-content\" data-childviews=\"menu-content\"></div></div>","modal.ejs":"<div data-childviews=\"content\"><div>","model.ejs":"<ul><%= value %></ul>","movable.ejs":"<div class=\"movable-element\"><%= value %></div>","radiolist.ejs":"<div><%= label %><div data-childviews=\"radio-options\"></div></div>","radiooption.ejs":"<label><input type=\"radio\" name=\"<%= name %>\" value=\"<%= value %>\"><i class=\"needsclick fa\"></i><%= label %></label>","searchfield.ejs":"<div contenteditable=\"true\"><%= value %></div>","select.ejs":"<div class=\"selection-list<% if(isMultiple){ %> multiple<% } %>\"><select<% if(isMultiple){ %> multiple<% } %>><%= value %></select></div>","slider.ejs":"<input type=\"range\">","tabbarbuttongroup.ejs":"<div></div>","text.ejs":"<div><% if(label) {  %><div class=\"label\"><%= label %></div><% } %><div><% if(icon) {  %><div class=\"input-icon-addon\"><i class=\"fa <%= icon %> fa-fw\"></i><% } %><%= value %></div>","textarea.ejs":"<div><% if(label) {  %><label><%= label %><% } %><textarea><%= value %></textarea><% if(label) {  %></label><% } %></div>","textfield.ejs":"<div><% if(label) {  %><label><%= label %><% } %><div class=\"<% if(icon) {  %> input-icon-addon<% } %>\"><% if(icon) {  %><i class=\"fa <%= icon %> fa-fw\"></i><% } %><input type=\"<%= type %>\" <% if(placeholder) { %> placeholder=\"<%= placeholder %>\"<% } %> value=\"<%= value %>\"></div><% if(label) {  %></label><% } %></div>","toast.ejs":"<div class=\"toast\"><div id=\"<%= id %>\"><%= text %></div></div>","toggle.ejs":"<div><div data-childviews=\"first\"></div><div data-childviews=\"second\"></div></div>","toggleswitch.ejs":"<div>\n    <div class=\"toggleswitch-value-listener\" contenteditable=\"true\"><%= value %></div>\n\n    <% if(label){%>\n        <div class=\"label-descr\"> <%= label %></div>\n    <% }%>\n    <div class=\"movable-grid\">\n        <div class=\"movable-container\">\n              <% if(onLabel){%>\n                  <div class=\"on-value\"><%= onLabel %></div>\n              <% }%>\n\n              <% if(onLabel){%>\n                  <div class=\"off-value\"><%= offLabel %></div>\n              <% }%>\n\n              <% if(onLabel){%>\n                  <div class=\"movable-element\"></div>\n              <% }%>\n        </div>\n    </div>\n</div>\n\n","toolbar.ejs":"<div><div data-childviews=\"first\"></div> <div class=\"center\" data-binding=\"value\"><%= value %></div> <div data-childviews=\"second\"></div></div>","view.ejs":"<div><%= value %></div>"}};
    /* jshint +W109 */
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Animation
     * @type {*}
     * @extends M.Object
     */
    M.Animation = M.Object.design({
    
        /**
         * Indicating whether css animations are supported or not.
         *
         * @returns {boolean}
         */
        animationSupport: (function() {
            // CSS animations are supported by Android < 4 devices but only if a single property is changed.
            if( M.Environment.isLowerThanAndroid4 ) {
                return false;
            }
            if( M.Environment.isLowerThaniPhone4S ) {
                //return false;
            }
            return Modernizr.cssanimations;
        })(),
    
        /**
         * Indicating whether css transitions are supported or not.
         *
         * @returns {boolean}
         */
        transitionSupport: (function() {
            return Modernizr.csstransitions;
        })(),
    
        /**
         * Returns the prefixed css property for animationEnd.
         *
         * @returns {String}
         */
        animationEndEventName: (function() {
            var cssEvents = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            };
            return cssEvents[ Modernizr.prefixed('animation') ];
        }()),
    
        /**
         * Returns the prefixed css property for transitionEnd.
         *
         * @returns {String}
         */
        transitionEndEventName: (function() {
            var cssEvents = {
                'WebkitTransition': 'webkitTransitionEnd',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            };
            return cssEvents[ Modernizr.prefixed('transition') ];
        }())
    });
    // Copyright (c) 2014 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    ////////////////////////////////////////////////////////////////
    // DO NOT EDIT THIS FILE - it is generated by grunt
    ////////////////////////////////////////////////////////////////
    
    M.ThemeVars = {
        _vars: {
        "default": {
            "blue": "#1092d3",
            "lightblue": "#58b3e0",
            "darkblue": "#0e7cb4",
            "purple": "#6c64ff",
            "lightpurple": "#9893ff",
            "darkpurple": "#5c55d9",
            "green": "#2dcca2",
            "lightgreen": "#6cdbbe",
            "darkgreen": "#26ae8a",
            "red": "#ed253d",
            "lightred": "#f26778",
            "darkred": "#ca1f34",
            "orange": "#f45b42",
            "lightorange": "#f78d7b",
            "darkorange": "#d04d38",
            "yellow": "#eab13a",
            "lightyellow": "#f0c975",
            "darkyellow": "#d99731",
            "grey": "#c3c3c3",
            "lightgrey": "#d5d5d5",
            "darkgrey": "#a6a6a6",
            "black": "#000000",
            "white": "#FFFFFF",
            "darkwhite": "#F2F2F2",
            "debug-1": "#02ccb9",
            "debug-2": "#00cc09",
            "debug-3": "#cc3500",
            "debug-4": "#cc008d",
            "debug-5": "#9f00cc",
            "debug-6": "#4f00cc",
            "debug-7": "#003fcc",
            "debug-8": "#0073cc",
            "grid-columns": "12",
            "grid-gutter-width": "30px",
            "lightenPercentage": "15%",
            "lightenPercentageLight": "5%",
            "m-button-icon-only-width": "50px",
            "m-button-border-width": "1px",
            "m-button-border-color": "#1092d3",
            "m-button-text-color": "#1092d3",
            "m-button-border-radius": "4px",
            "m-button-border-style": "solid",
            "m-button-padding-bottom": "10px",
            "m-button-padding-top": "10px",
            "m-button-padding-left-right": "10px",
            "m-button-padding": "10px 10px 10px 10px",
            "m-button-primary-border-color": "#6c64ff",
            "m-button-primary-text-color": "#6c64ff",
            "m-button-primary-background-color": "#FFFFFF",
            "m-button-success-border-color": "#2dcca2",
            "m-button-success-text-color": "#2dcca2",
            "m-button-success-background-color": "#FFFFFF",
            "m-button-error-border-color": "#ed253d",
            "m-button-error-text-color": "#ed253d",
            "m-button-error-background-color": "#FFFFFF",
            "m-button-warning-border-color": "#f45b42",
            "m-button-warning-text-color": "#f45b42",
            "m-button-warning-background-color": "#FFFFFF",
            "m-button-info-border-color": "#eab13a",
            "m-button-info-text-color": "#eab13a",
            "m-button-info-background-color": "#FFFFFF",
            "m-button-fuzzy-border-color": "#c3c3c3",
            "m-button-fuzzy-text-color": "#c3c3c3",
            "m-button-fuzzy-background-color": "#FFFFFF",
            "strong": "bold",
            "normal": "normal",
            "weak": "lighter",
            "form-border-width": "1px",
            "form-border-color": "#1092d3",
            "form-border-style": "solid",
            "form-element-border": "1px solid #1092d3",
            "textfield-icon-padding": "30px",
            "textfield-icon-x-position": "4px",
            "textfield-icon-y-position": "14px",
            "textfield-icon-font-size": "2.2rem",
            "textfield-padding": "6px",
            "m-primary-color": "#1092d3",
            "m-primary-text-color": "#000000",
            "m-primary-border-color": "#58b3e0",
            "m-primary-active-color": "#0e7cb4",
            "m-primary-active-text-color": "#FFFFFF",
            "tablayout-menu-height": "50px",
            "tablayout-menu-button-padding": "13px 0 0 0",
            "tablayout-menu-scroll-button-width": "200px",
            "switch-header-content-padding": "4px 0 0 0",
            "header-top": "4px",
            "m-header-icon-only-font-size": "2.4rem",
            "m-primary-font-family": "\"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif",
            "m-primary-font-weight": "300",
            "m-primary-font-size": "1.6rem",
            "m-primary-calc-font-size": "16px",
            "m-primary-line-height": "2.2rem",
            "m-primary-font-color": "#000000",
            "m-primary-margin-top": "10px",
            "m-primary-margin-bottom": "20px",
            "modal-backdrop-background-color": "#000000",
            "content-padding": "15px",
            "m-primary-disabled-color": "#d5d5d5",
            "m-primary-disabled-text-color": "#c3c3c3",
            "selection-color": "#c3c3c3",
            "selection-checked-color": "#1092d3",
            "m-list-item-color": "#2dcca2",
            "m-stencil-text-shadow": "rgba(255, 255, 255, 0.5) 0px 3px 3px",
            "m-menu-view-width": "200px",
            "m-menu-view-device-swipe-listener-width": "20px",
            "m-menu-view-transition-width": "200px - 20px",
            "m-menu-transition": "500ms"
        },
        "android_dark": {
            "m-primary-color": "#669900",
            "m-primary-border-color": "#669900",
            "m-primary-active-color": "#99CC00"
        },
        "android_light": {
            "m-primary-color": "#669900",
            "m-primary-border-color": "#669900",
            "m-primary-active-color": "#99CC00"
        },
        "ios": {
            "blue": "#59C8FA",
            "lightblue": "#46b8da",
            "darkblue": "#007AFF",
            "green": "#4BD964",
            "red": "#FF3B30",
            "lightred": "#FF2D55",
            "grey": "#8E8E93",
            "m-primary-font-family": "-apple-system-font, \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif",
            "lightenPercentage": "25%",
            "textfield-icon-y-position": "13px",
            "m-primary-active-color": "$lightgrey",
            "m-primary-active-text-color": "#007AFF",
            "tablayout-menu-height": "50px",
            "tablayout-menu-scroll-button-width": "140px",
            "selection-checked-color": "#59C8FA",
            "m-button-padding-bottom": "10px",
            "m-button-padding": "$m-button-padding-top $m-button-padding-left-right 10px $m-button-padding-left-right-top $m-button-padding-top $m-button-padding-left-right 10px $m-button-padding-left-right-left-right 10px $m-button-padding-top $m-button-padding-left-right 10px $m-button-padding-left-right-left-right"
        }
    },
        get: function (name, theme) {
            var theme = theme || M.Environment.device.os;
    
            var result = this._vars[theme] ? this._vars[theme][name] : false;
            if (!result && theme != M.ThemeVars.CONST.DEFAULT) {
                result = this._vars[M.ThemeVars.CONST.DEFAULT][name];
            }
            if (!result) {
                console.log('Can not find varibale "' + name + '".');
            }
            return result;
        }
    }
    
    M.ThemeVars.CONST = {
        IOS: 'ios',
        ANDROID_DARK: 'android_dark',
        ANDROID_LIGHT: 'android_light',
        ANDROID: 'android_dark',
        DEFAULT: 'default'
    }
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * The M.TemplateManager is a singleton instance which
     * contain all our templates for the framework views.
     * You can retrieves a template with the get() method.
     *
     * @module M.TemplateManager
     *
     * @type {*}
     * @extends M.Object
     * @example
     *
     * var tpl = M.TemplateManager.get('ListView');
     * console.log( tpl ); // <ul data-childviews="list"></ul>
     *
     */
    M.TemplateManager = M.Object.design({
    
        _currentUI: 'default',
    
        /**
         * Returns the template with the given name or
         * the default template for M.View if there is no such template.
         *
         * @param {String} name
         * @returns {String}
         */
        get: function( template, ui ) {
    
            ui = ui || M.TemplateManager._currentUI;
    
            var tpl = M.Templates[ui][template];
    
            if(tpl) {
                return tpl;
            }
    
            if(ui !== 'default') {
                return this.get(template, 'default');
            }
    
            return null;
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    // Thanks to: https://github.com/codrops/PageTransitions
    
    /**
     *
     * @module M.PageTransitions
     * @type {*}
     * @extends M.Object
     */
    M.Transitions = M.Object.design({
        _transition: '',
        _main: null,
        _iterate: null,
        _pages: null,
        _pagesCount: 0,
        _current: 0,
        _isAnimating: false,
        _endCurrPage: false,
        _endNextPage: false,
    
        reset: function() {
            this._transition = '';
            this._main = null;
            this._iterate = null;
            this._pages = null;
            this._pagesCount = 0;
            this._current = 0;
            this._isAnimating = false;
            this._endCurrPage = false;
            this._endNextPage = false;
        },
    
        init: function( main ) {
            this._main = main ? main : $('#m-main');
            this._pages = this._main.find('div.m-page');
            this._pagesCount = this._pages.length;
    
            this._pages.each(function() {
                var page = $(this);
                page.data('originalClassList', page.attr('class'));
            });
    
            this._pages.eq(this._current).addClass('m-page-current');
    
            return this;
        },
    
        startTransition: function() {
    
            // If a animation is running or the app is in the
            // inital load process skip this transition.
    
            if( this._isAnimating || (global[M.APPLICATION_NAME] && global[M.APPLICATION_NAME].isInitialLoad) ) {
                return false;
            }
    
            // TODO dispatch a custom animation-start event.
            this._isAnimating = true;
    
            var currPage = this._pages.eq(this._current);
    
            if( this._current < this._pagesCount - 1 ) {
                this._current += 1;
            } else {
                this._current = 0;
            }
    
            if( !this._transition ) {
                this._transition = this.getDefaultTransition();
            }
    
            var nextPage = this._pages.eq(this._current).addClass('m-page-current');
            if( !M.Animation.animationSupport || this._transition === M.PageTransitions.CONST.NONE ) {
                this._onEndAnimation(currPage, nextPage);
                return;
            }
    
            var transitionClasses = this._transition.split('|');
            var outClass = transitionClasses[0];
            var inClass = transitionClasses[1];
            var that = this;
    
            var animEndEventName = M.Animation.animationEndEventName;
            $(currPage[0]).on(animEndEventName, function() {
                currPage.off(animEndEventName);
                that._endCurrPage = true;
                if( that._endNextPage ) {
                    that._onEndAnimation(currPage, nextPage);
                }
            });
    
    
            $(nextPage[0]).on(animEndEventName, function() {
                nextPage.off(animEndEventName);
                that._endNextPage = true;
                if( that._endCurrPage ) {
                    that._onEndAnimation(currPage, nextPage);
                }
            });
    
            setTimeout(function() {
                nextPage.addClass(inClass);
                currPage.addClass(outClass);
            },0);
        },
    
        setTransition: function( name ) {
            this._transition = name;
        },
    
        getDefaultTransition: function() {
            return M.PageTransitions.CONST.MOVE_TO_LEFT_FROM_RIGHT;
        },
    
        isAnimating: function() {
            return this._isAnimating;
        },
    
        _onEndAnimation: function( outpage, inpage ) {
            // TODO dispatch a custom animation-end event.
    
            this._endCurrPage = false;
            this._endNextPage = false;
    
            this._resetPage(outpage, inpage);
            this._isAnimating = false;
        },
    
        _resetPage: function( outpage, inpage ) {
            outpage.attr('class', outpage.data('originalClassList'));
            inpage.attr('class', inpage.data('originalClassList') + ' m-page-current');
        }
    });
    
    M.Transitions.CONST = {
        NONE: 'none',
        MOVE_TO_LEFT_FROM_RIGHT: 'm-page-moveToLeft|m-page-moveFromRight',
        MOVE_TO_RIGHT_FROM_LEFT: 'm-page-moveToRight|m-page-moveFromLeft',
        MOVE_TO_TOP_FROM_BOTTOM: 'm-page-moveToTop|m-page-moveFromBottom',
        MOVE_TO_BOTTOM_FROM_TOP: 'm-page-moveToBottom|m-page-moveFromTop',
        FADE_FROM_RIGHT: 'm-page-fade|m-page-moveFromRight m-page-ontop',
        FADE_FROM_LEFT: 'm-page-fade|m-page-moveFromLeft m-page-ontop',
        FADE_FROM_BOTTOM: 'm-page-fade|m-page-moveFromBottom m-page-ontop',
        FADE_FROM_TOP: 'm-page-fade|m-page-moveFromTop m-page-ontop',
        FADE_LEFT_FADE_RIGHT: 'm-page-moveToLeftFade|m-page-moveFromRightFade',
        FADE_RIGHT_FADE_LEFT: 'm-page-moveToRightFade|m-page-moveFromLeftFade',
        FADE_TOP_FADE_BOTTOM: 'm-page-moveToTopFade|m-page-moveFromBottomFade',
        FADE_BOTTOM_FADE_TOP: 'm-page-moveToBottomFade|m-page-moveFromTopFade',
        DIFFERENT_EASING_FROM_RIGHT: 'm-page-moveToLeftEasing m-page-ontop|m-page-moveFromRight',
        DIFFERENT_EASING_FROM_LEFT: 'm-page-moveToRightEasing m-page-ontop|m-page-moveFromLeft',
        DIFFERENT_EASING_FROM_BOTTOM: 'm-page-moveToTopEasing m-page-ontop|m-page-moveFromBottom',
        DIFFERENT_EASING_FROM_TOP: 'm-page-moveToBottomEasing m-page-ontop|m-page-moveFromTop',
        SCALE_DOWN_FROM_RIGHT: 'm-page-scaleDown|m-page-moveFromRight m-page-ontop',
        SCALE_DOWN_FROM_LEFT: 'm-page-scaleDown|m-page-moveFromLeft m-page-ontop',
        SCALE_DOWN_FROM_BOTTOM: 'm-page-scaleDown|m-page-moveFromBottom m-page-ontop',
        SCALE_DOWN_FROM_TOP: 'm-page-scaleDown|m-page-moveFromTop m-page-ontop',
        SCALE_DOWN_SCALE_DOWN: 'm-page-scaleDown|m-page-scaleUpDown m-page-delay300',
        SCALE_UP_SCALE_UP: 'm-page-scaleDownUp|m-page-scaleUp m-page-delay300',
        MOVE_TO_LEFT_SCALE_UP: 'm-page-moveToLeft m-page-ontop|m-page-scaleUp',
        MOVE_TO_RIGHT_SCALE_UP: 'm-page-moveToRight m-page-ontop|m-page-scaleUp',
        MOVE_TO_TOP_SCALE_UP: 'm-page-moveToTop m-page-ontop|m-page-scaleUp',
        MOVE_TO_BOTTOM_SCALE_UP: 'm-page-moveToBottom m-page-ontop|m-page-scaleUp',
        SCALE_DOWN_SCALE_UP: 'm-page-scaleDownCenter|m-page-scaleUpCenter m-page-delay400',
        GLUE_LEFT_FROM_RIGHT: 'm-page-rotateRightSideFirst|m-page-moveFromRight m-page-delay200 m-page-ontop',
        GLUE_RIGHT_FROM_LEFT: 'm-page-rotateLeftSideFirst|m-page-moveFromLeft m-page-delay200 m-page-ontop',
        GLUE_BOTTOM_FROM_TOP: 'm-page-rotateTopSideFirst|m-page-moveFromTop m-page-delay200 m-page-ontop',
        GLUE_TOP_FROM_BOTTOM: 'm-page-rotateBottomSideFirst|m-page-moveFromBottom m-page-delay200 m-page-ontop',
        FLIP_RIGHT: 'm-page-flipOutRight|m-page-flipInLeft m-page-delay500',
        FLIP_LEFT: 'm-page-flipOutLeft|m-page-flipInRight m-page-delay500',
        FLIP_TOP: 'm-page-flipOutTop|m-page-flipInBottom m-page-delay500',
        FLIP_BOTTOM: 'm-page-flipOutBottom|m-page-flipInTop m-page-delay500',
        FALL: 'm-page-rotateFall m-page-ontop|m-page-scaleUp',
        NEWSPAPER: 'm-page-rotateOutNewspaper|m-page-rotateInNewspaper m-page-delay500',
        PUSH_LEFT_FROM_RIGHT: 'm-page-rotatePushLeft|m-page-moveFromRight',
        PUSH_RIGHT_FROM_LEFT: 'm-page-rotatePushRight|m-page-moveFromLeft',
        PUSH_TOP_FROM_BOTTOM: 'm-page-rotatePushTop|m-page-moveFromBottom',
        PUSH_BOTTOM_FROM_TOP: 'm-page-rotatePushBottom|m-page-moveFromTop',
        PUSH_LEFT_PULL_RIGHT: 'm-page-rotatePushLeft|m-page-rotatePullRight m-page-delay180',
        PUSH_RIGHT_PULL_LEFT: 'm-page-rotatePushRight|m-page-rotatePullLeft m-page-delay180',
        PUSH_TOP_PULL_BOTTOM: 'm-page-rotatePushTop|m-page-rotatePullBottom m-page-delay180',
        PUSH_BOTTOM_PULL_TOP: 'm-page-rotatePushBottom|m-page-rotatePullTop m-page-delay180',
        FOLD_LEFT_FROM_RIGHT: 'm-page-rotateFoldLeft|m-page-moveFromRightFade',
        FOLD_RIGHT_FROM_LEFT: 'm-page-rotateFoldRight|m-page-moveFromLeftFade',
        FOLD_TOP_FROM_BOTTOM: 'm-page-rotateFoldTop|m-page-moveFromBottomFade',
        FOLD_BOTTOM_FROM_TOP: 'm-page-rotateFoldBottom|m-page-moveFromTopFade',
        MOVE_TO_RIGHT_UNFOLD_LEFT: 'm-page-moveToRightFade|m-page-rotateUnfoldLeft',
        MOVE_TO_LEFT_UNFOLD_RIGHT: 'm-page-moveToLeftFade|m-page-rotateUnfoldRight',
        MOVE_TO_BOTTOM_UNFOLD_TOP: 'm-page-moveToBottomFade|m-page-rotateUnfoldTop',
        MOVE_TO_TOP_UNFOLD_BOTTOM: 'm-page-moveToTopFade|m-page-rotateUnfoldBottom',
        ROOM_TO_LEFT: 'm-page-rotateRoomLeftOut m-page-ontop|m-page-rotateRoomLeftIn',
        ROOM_TO_RIGHT: 'm-page-rotateRoomRightOut m-page-ontop|m-page-rotateRoomRightIn',
        ROOM_TO_TOP: 'm-page-rotateRoomTopOut m-page-ontop|m-page-rotateRoomTopIn',
        ROOM_TO_BOTTOM: 'm-page-rotateRoomBottomOut m-page-ontop|m-page-rotateRoomBottomIn',
        CUBE_TO_LEFT: 'm-page-rotateCubeLeftOut m-page-ontop|m-page-rotateCubeLeftIn',
        CUBE_TO_RIGHT: 'm-page-rotateCubeRightOut m-page-ontop|m-page-rotateCubeRightIn',
        CUBE_TO_TOP: 'm-page-rotateCubeTopOut m-page-ontop|m-page-rotateCubeTopIn',
        CUBE_TO_BOTTOM: 'm-page-rotateCubeBottomOut m-page-ontop|m-page-rotateCubeBottomIn',
        CAROUSEL_TO_LEFT: 'm-page-rotateCarouselLeftOut m-page-ontop|m-page-rotateCarouselLeftIn',
        CAROUSEL_TO_RIGHT: 'm-page-rotateCarouselRightOut m-page-ontop|m-page-rotateCarouselRightIn',
        CAROUSEL_TO_TOP: 'm-page-rotateCarouselTopOut m-page-ontop|m-page-rotateCarouselTopIn',
        CAROUSEL_TO_BOTTOM: 'm-page-rotateCarouselBottomOut m-page-ontop|m-page-rotateCarouselBottomIn',
        SIDES: 'm-page-rotateSidesOut|m-page-rotateSidesIn m-page-delay200',
        SLIDE: 'm-page-rotateSlideOut|m-page-rotateSlideIn'
    };
    
    M.PageTransitions = M.Transitions.design();
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    (function () {
    
        /**
         * M.View inherits from Backbone.View
         * @module M.View
         *
         * @type {*}
         * @extends Backbone.View
         */
        M.View = Backbone.View.extend({
    
            /**
             * @constructor
             * @param {options} Attributes for the current Instance
             */
            constructor: function (options) {
                this.cid = _.uniqueId('view');
                options = options || {};
                var viewOptions = ['scope', 'model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events', 'scopeKey', 'binding', 'computedValue', 'onSet', 'onGet', 'enabled'];
                _.extend(this, _.pick(options, viewOptions));
                this._ensureElement();
                this.initialize.apply(this, arguments);
                this.delegateEvents();
            }
        });
    
        /**
         *
         * Extend M.View with the M.create function. You can use this function to create an M.View with the create function. Instances from Backbone are generated with new. This function wrapps the new.
         *
         * @type {Function}
         */
    
        M.View.create = M.create;
    
        /**
         *
         * Extend M.View with the M.design function. With the design you can extend an object and get an instance at once.
         *
         * @type {Function}
         */
    
        M.View.design = function (obj, childViews, isScope) {
            return this.extend().create(obj, childViews, isScope);
        };
    
        M.View.implements = M.implements;
    
        /**
         * Extend the M.View also from M.Object
         */
    
        _.extend(M.View.prototype, M.Object, {
    
            /**
             * The View type
             * @private
             */
            _type: 'M.View',
    
            /**
             * define a user template
             */
            template: null,
    
            /**
             * define a template based on the tmpl template engine
             * @private
             */
            _template: null, //_.tmpl(M.TemplateManager.get('View')),
    
            _templateString: M.TemplateManager.get('view.ejs'),
    
            /**
             * use this property to define which data are given to the template
             * @private
             */
            _templateValues: null,
    
            /**
             * extend the default template with this one. It gets injected into the <%= _value %> placeholder
             */
            extendTemplate: null,
    
            /**
             * Indicates if this is the view was rendered before
             * @private
             */
            _firstRender: YES,
    
            /**
             * Specify if the View has an surrounding DOM-Element or not
             */
            useElement: NO,
    
            /**
             * Has the View a localization listener
             * @private
             */
            _hasI18NListener: NO,
    
            /**
             * Model data to view value transformation.
             * Change the display value of a view. Use this if the model has another data format as the view representation accepts it.
             * @param value The value of a view
             * @returns {*} The value of a view
             */
            onSet: null,
    
            /**
             * View value to model data transformation.
             * Change the display value of a view back to the model data. Use this if the view has another data format as the model accepts it.
             * @param value The value of a view
             * @returns {*} The value of a view
             */
            onGet: null,
    
            /**
             * Bootstrap css wrap
             */
            cssClass: null,
    
            /**
             * String of css classes whitespace separated
             */
            _internalCssClasses: '',
    
            /**
             * Bootstrap css classes for a grid implementation
             */
            grid: null,
    
            /**
             * Store events from outside the framework here. Developer should use this to bind events on their views like they know it from backbone.
             */
            events: null,
    
            /**
             * internal framework events. This is used to store every event till the _registerEvents is called. _registerEvents binds only the events stored inside this attribute
             */
            _events: null,
    
            _internalEvents: null,
    
            /**
             * The Value of the view
             */
            _value: null,
    
            /**
             * The hammer.js event object
             */
            _hammertime: null,
    
            /**
             * The parent of the view.
             * @type {M.View}
             */
            _parentView: null,
    
            /**
             * Use this property to access a model from the given scope. The scope needs to be a M.Controller if you want to use a nested scopeKey
             *
             *  @type: {String}
             *  @example
             *
             *  var scope = M.Controller.extend({
             *      person: M.Model.create({
             *          favorite: ON
             *      })
             *   }).create();
             *
             * var toggleSwitch = M.ToggleSwitchView.extend({
             *   scopeKey: 'person.favorite',
             * }).create(scope, null, true).render();
             *
             */
            scopeKey: null,
    
            /**
             * Same as scopeKey
             *
             *  @type: {String}
             *  @example
             *
             *  var scope = M.Controller.extend({
             *      person: M.Model.create({
             *          favorite: ON
             *      })
             *   }).create();
             *
             * var toggleSwitch = M.ToggleSwitchView.extend({
             *   binding: 'person.favorite',
             * }).create(scope, null, true).render();
             *
             */
            binding: null,
    
            /**
             * Store the given events inside this attribute. The events object is set to null to prefent backbone of setting events. To not loose the information it gets stored.
             */
            _originalEvents: null,
    
            /**
             * A childview gets the value set from his parent. So the childview has the same value as his parent
             * @example
             * var view = M.View.extend({
             *     value:'foo'
             *   },
             *   {
             *     c1: M.View.extend({
             *       useParentValue: YES
             *     })
             * }).create();
             *
             * view.getValue(); // 'foo'
             * view.childViews.c1.getValue(); // 'foo'
             *
             */
            useParentValue: NO,
    
            /**
             * Set the model of the view
             * @param { M.Model } The Model to be set
             * @returns {View}
             * @private
             */
            _setModel: function (value) {
                this.model = value;
                return this;
            },
    
            /**
             * Set the collection of the view
             * @param { M.Collection } The Collection to be set
             * @returns {View}
             * @private
             */
            _setCollection: function (value) {
                this.collection = value;
                return this;
            },
    
    
            /**
             * Get the Model for the View
             * @returns {M.Model}
             * @private
             */
            _getModel: function () {
                return this.model;
            },
    
    
            /**
             * Get the value of a view. If the value is a M.Model return its attributes.
             * @returns {*}
             */
            getValue: function () {
                if (this.model) {
                    if (this._value.hasOwnProperty('attribute') && this._value.hasOwnProperty('model')) {
                        return this._value.model.get(this._value.attribute);
                    }
                    return this._getModel().attributes;
                } else {
                    return this._value;
                }
            },
    
            _getValue: function () {
                return this._value;
            },
    
            _setValue: function (value) {
                this._value = value;
            },
    
            /**
             * If a childView has set useParentValue to true the value from the current view gets assigned
             * @param value
             * @private
             */
            _setChildViewValue: function (value) {
    
                _.each(this.childViews, function (child) {
                    if (child.useParentValue) {
                        child._setValue(value);
                        if( M.isModel(value)){
                            child._setModel(value);
                        }
                    }
                }, this);
            },
    
            getPropertyValue: function (propertyString, data) {
                var o = data;
                _.each(propertyString.split('.'), function (key) {
                    if (o[key]) {
                        o = o[key];
                    } else if (M.isModel(o) || M.isCollection(o)) {
                        //o = o.get(key);
                        o = {
                            model: o,
                            attribute: key
                        };
                    } else {
                        o = null;
                    }
                });
                return o;
            },
    
            /**
             *
             * @returns {*}
             */
    
            initialize: function (options) {
                this.scopeKey = this.scopeKey || this.binding;
                this._registerView();
                this._addInterfaces();
                this._assignValue(options);
                this._assignTemplateValues();
                this._mapEventsToScope(this.scope);
                this._addInternalEvents();
                this._addCustomEvents(this.scope);
                if (!this.useElement) {
                    this._registerEvents();
                }
                this._assignContentBinding();
                //            this._assignComplexView();
                //            this.init();
                return this;
            },
    
            _registerView: function () {
                M.ViewManager.registerView(this);
            },
    
            _assignValue: function (options) {
                //don't write _value in the view definition - write value and here it gets assigned
                if (this.value || (typeof this.value !== 'undefined' && this.value !== null)) {
                    this._setValue(this.value);
                } else if (this.scopeKey) {
                    this._setValue(this.getPropertyValue(this.scopeKey, this.scope));
                } else if (options && options.value) {
                    this._setValue(options.value);
                }
    
                var _value = this._getValue();
    
                if (_value) {
                    if (M.isModel(_value.model)) {
                        this._setModel(_value.model);
                    } else if (M.isModel(_value)) {
                        this._setModel(_value);
                    } else if (M.isCollection(_value)) {
                        this.collection = _value;
                    }
                }
    
                if (this._reactOnLocaleChanged()) {
                    M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function () {
                        this.render();
                    }, this);
                    this._hasI18NListener = YES;
                }
    
                return this;
            },
    
            /**
             * Returns true if either the value or the label is from type M.I18NItem
             * @returns {*}
             * @private
             */
            _reactOnLocaleChanged: function () {
                return M.isI18NItem(this.value) || M.isI18NItem(this.label);
            },
    
    
            _assignContentBinding: function () {
                var that = this;
                var _value = this._getValue();
                if (this.scopeKey && M.isModel(_value)) {
                    this.listenTo(this.scope, this.scopeKey, function (model) {
                        that._setModel(model);
                        that.render();
                    });
                } else if (this.scopeKey && M.isCollection(_value)) {
                    this.listenTo(this.scope, this.scopeKey, function (model) {
                        that._setCollection(model);
                        that.render();
                    });
                } else if (this.scopeKey && _value && M.isModel(_value.model) && _value.attribute) {
                    this.listenTo(this.scope, this.scopeKey.split('.')[0], function (model) {
                        that._setModel(model);
                        that.render();
                    });
                }
                return this;
            },
    
            /**
             *
             * Prepares the events. Loops over all defined events and searchs for the callback function for every element. If the event is a string, search in the given scope for the callback function.
             * The event attribute of every object is also used by backbone. The event handling is done by hammer.js so we map the events to an internal used _events object delete the events.
             * Before that we store the events in an internal _originalEvents so the information isn't lost.
             * Every event type e.q. tap is an array to handle more than one callback function.
             *
             * @param scope
             * @returns {View}
             * @private
             */
            _mapEventsToScope: function (scope) {
                // A swap object for the given events to assign it later to the _events object.
                var events = {};
                if (this.events) {
                    _.each(this.events, function (value, key) {
                        var callback = value;
                        // If the event callback type is an string, search in the given scope for a function
                        if (typeof value === 'string' && scope && typeof scope[value] === 'function') {
                            callback = scope[value];
                        }
                        // Create an array for the specific eventtype
                        events[key] = _.isArray(callback) ? callback : [callback];
                    }, this);
    
                    // Store the events object to not loose the information
                    this._originalEvents = this.events;
                    // backbone should not bind events so set it to null
                    this.events = null;
                }
                // events should be an object
                this._events = events;
    
                return this;
            },
    
    
            /**
             * Merge the internal events with the external ones.
             * @private
             */
            _addInternalEvents: function () {
                if (this._internalEvents) {
                    this._addEvents(this._internalEvents);
                }
            },
    
            /**
             * Loop over the given events and add them.
             * @private
             */
            _addEvents: function(events){
                _.each(events, function (event, eventType) {
                    this._addEvent(event, eventType);
                }, this);
            },
    
            /**
             * Add a event to a view.
             * Events are stored inside the _events object. Every event has an array with callbacks that are called when the event type was triggered.
             * The callbacks are allways stored in an array.
             *
             * @private
             */
            _addEvent:function(event, eventType){
                //if the event isn't an array create one
                var internal = _.isArray(event) ? event : [event];
                //if the object has no _events or the object is not an array create one
                this._events[eventType] = _.isArray(this._events[eventType]) ? this._events[eventType] : [];
                //merge the internal and external events
                this._events[eventType] = this._events[eventType].concat(internal);
            },
    
            /**
             * There are some custom events e.q. pressing the enter key. These custom events are bound in this method.
             *
             * @private
             */
            _addCustomEvents: function () {
                // only bind custom events if there are any
                if (!this._events) {
                    return;
                }
                var that = this;
                // store all custom events
                var customEvents = {
                    // create the custom event: enter
                    enter: {
                        // the original event type that is triggered
                        'origin': 'keyup',
                        // the callback for the keyup
                        'callback': function (event) {
                            // this callback gets called on every keyup so filter only the enter events
                            if (event.keyCode === 13) {
                                // if enter was pressed call the function
                                that._events.enter[0].apply(that.scope, arguments);
                            }
    
                        }
                    }
                };
                for (var event in this._events) {
                    if (customEvents.hasOwnProperty(event)) {
                        this._addEvent(customEvents[event].callback, customEvents[event].origin);
                    }
                }
            },
    
            _getEventOptions: function () {
    
                // No Ghost click on Android
                var preventDefault = false;
                var noMouseevents = true;
                var stopBrowserBehavior = false;
    
                return {
                    'prevent_default': preventDefault,
                    'no_mouseevents': noMouseevents,
                    'stop_browser_behavior': stopBrowserBehavior
                };
            },
    
            /**
             * Register events via hammer.js
             *
             * @private
             */
            _registerEvents: function () {
                if (this._events) {
                    var that = this;
    
                    this._eventCallback = {};
                    Object.keys(this._events).forEach(function (eventName) {
    
                        this._hammertime = new Hammer(that.el, that._getEventOptions());
    
                        this._eventCallback[eventName] = function (event) {
                            // for debug purposes
                            //M.Toast.show(eventName, 200);
                            if (that._hammertime.enabled === NO) {
                                return;
                            }
                            var args = Array.prototype.slice.call(arguments);
                            args.push(that);
                            _.each(that._events[event.type], function (func) {
                                func.apply(that.scope, args);
                            }, that);
                        };
                        this._hammertime.on(eventName, this._eventCallback[eventName]);
    
                    }, this);
                }
            },
    
            /**
             * Disable all events on this element. Events are still bound but not triggered. Wrapper for hammer.js.
             * See hammer.js docu: https://github.com/EightMedia/hammer.js/wiki/Instance-methods#hammertimeoffgesture-handler
             * @private
             */
            _disableEvents: function () {
                if (this._hammertime) {
                    this._hammertime.enable(NO);
                }
            },
    
            /**
             * Enable all events on this element when they where disabled. Wrapper for hammer.js.
             * See hammer.js docu: https://github.com/EightMedia/hammer.js/wiki/Instance-methods#hammertimeoffgesture-handler
             * @private
             */
            _enableEvents: function () {
                if (this._hammertime) {
                    this._hammertime.enable(YES);
                }
            },
    
            /**
             *
             * @returns {Boolean} if events are active or not
             */
            isEnabled: function () {
                return this._hammertime.enabled;
            },
    
            /**
             * implement render function
             * @returns {this}
             */
            render: function () {
                //this._assignValue();
                this._preRender();
                this._render();
                this._renderChildViews();
                this._postRender();
                return this;
            },
    
            _preRender: function () {
                this._assignTemplate();
                this._assignTemplateValues();
                this._extendTemplate();
                this.preRender();
                return this;
            },
    
            //        _assignTemplate: function( template ) {
            //
            //            template = template || this.template;
            //            if( template ) {
            //                // use a custom template set by extend or given as a parameter
            //                if( typeof template === 'function' ) {
            //                    this._template = template;
            //                } else if( _.isString(template) ) {
            //                    this._template = _.tmpl(template);
            //                } else if( _.isObject(template) ) {
            //                    this._template = _.tmpl(M.TemplateManager.get.apply(this, ['template']));
            //                }
            //            } else {
            //                if( this._useStickit() ) {
            //                    // if stickit is used use the tmpl template engine
            //                    this._template = _.tmpl(this._templateString);
            //                } else {
            //                    // otherwise use the underscore template engine
            //                }
            //                this.template = this._template;
            //            }
            //        },
    
            _assignTemplate: function (template) {
                template = template || this.template;
                if (typeof template !== 'undefined' && template !== null) {
                    if (typeof template === 'function') {
                        this._template = template;
                    } else if (_.isString(template)) {
                        this._template = _.tmpl(template);
                    } else if (_.isObject(template)) {
                        this._template = _.tmpl(M.TemplateManager.get.apply(this, ['template']));
                    }
                } else if (this._templateString) {
                    if (this._useStickit()) {
                        // if stickit is used use the tmpl template engine
                        this._template = _.tmpl(this._templateString);
                    } else {
                        // otherwise use the
                        this._template = _.tmpl(this._templateString, null, {useStickitAttribute: NO});
                        //this._template = _.tmpl(this._templateString);
                    }
                    this.template = this._template;
                }
                return this;
            },
    
            _assignTemplateValues: function () {
                this._templateValues = {};
                var _value = this._getValue();
    
                if (this.model) {
                    if (M.isModel(_value)) {
                        this._templateValues = M.Object.deepCopy(this.model.attributes);
                    } else {
                        this._templateValues._value = this.model.get(_value.attribute);
                    }
                } else if (M.isI18NItem(_value)) {
                    this._templateValues._value = M.I18N.l(_value.key, _value.placeholder);
                } else if (typeof _value === 'string' || typeof _value === 'number') {
                    this._templateValues._value = _value;
                } else if (_value !== null && typeof _value === 'object' && this._hasI18NListener === NO) {
                    this._templateValues = M.Object.deepCopy(_value);
                } else if (this._hasI18NListener) {
                    _.each(_value, function (value, key) {
                        this._templateValues[key] = M.I18N.l(value.key, value.placeholder);
                    }, this);
                }
    
                if (typeof this._templateValues._value !== 'undefined' && typeof this._templateValues.value === 'undefined') {
                    this._templateValues.value = this._templateValues._value;
                } else {
    
                }
    
                _.extend(this._templateValues, this.assignTemplateValues());
            },
    
            assignTemplateValues: function () {
                return null;
            },
    
            _extendTemplate: function () {
                if (this.extendTemplate) {
                    var template = _.template(this._templateString);
                    this._templateValues.value = this.extendTemplate;
                    this._template = _.tmpl(template(this._templateValues));
                }
            },
    
            preRender: function () {
    
            },
    
            _render: function () {
                var dom = this._template(this._templateValues);
    
                if (this.useElement) {
                    this.setElement(dom);
                } else if (this._attachToDom()) {
                    this.$el.html(dom);
                } else {
                    this.$el.html('');
                }
                return this;
            },
    
            /**
             * Specify if the template needs to be attached to the element or not.
             *
             * @returns {boolean}
             * @private
             */
            _attachToDom: function () {
                return this.getValue() !== null;
            },
    
            _renderChildViews: function () {
    
                if (!this.childViews) {
                    return;
                }
                _.each(this.childViews, function (child, name) {
                    var dom = this._getChildViewRenderDom(name);
    
                    if (typeof child.render === 'function') {
                        this._renderChildView(dom, child);
                    } else if (_.isArray(child)) {
                        _.each(child, function (c) {
                            this._renderChildView(dom, c);
                        }, this);
                    }
    
                }, this);
    
                return this;
            },
    
            _getChildViewRenderDom: function (name) {
                var dom = this.$el;
                if (this.$el.find('[data-childviews="' + name + '"]').length) {
                    dom = this.$el.find('[data-childviews="' + name + '"]');
                    dom.addClass(name);
                }
                return dom;
            },
    
            _renderChildView: function (dom, child) {
                this._renderChildViewToDom(dom, child);
                child.delegateEvents();
            },
    
            _renderChildViewToDom: function (dom, child) {
                this._appendToDom(dom, child.render().$el);
            },
    
            _appendToDom: function (dom, element) {
                dom.append(element);
            },
    
            _postRender: function () {
                //use element can be given from the parent element
                if (this.useElement) {
                    this._registerEvents();
                }
                this._addClassNames();
                if (this._useStickit()) {
                    this._assignBinding();
                    this.stickit();
                }
                if (this.model && this.useElement) {
                    //console.warn('be aware that stickit only works if you define useElement with NO');
                }
                this.postRender();
                this._firstRender = NO;
                return this;
            },
    
            _addClassNames: function () {
                var viewCssClassName = this._getViewCssClassName();
                this.$el.addClass(viewCssClassName);
                if (this.cssClass) {
                    this.$el.addClass(this.cssClass);
                }
                if (this._internalCssClasses) {
                    this.$el.addClass(this._internalCssClasses);
                }
                if (this.grid) {
                    this.$el.addClass(this.grid);
                }
            },
    
    
            /**
             * If there is a model defined we should use stickit for the two way binding
             * @returns {Boolean|YES|*|Function}
             * @private
             */
            _useStickit: function () {
                return this.model ? YES : NO;
            },
    
            /**
             * Returns based on the _type property of the view the cssClassName. If the type starts with 'M.' it is in the M context. This will return the name of the view without 'M.' in lowercase.
             * If the _type is not in the M context a check on whitespaces and dots is made. If there isn't a forbidden character the _type is returned as string.
             * @returns {String}
             * @private
             * @example
             * M.ButtonView.extend().create()._getViewCssClassName(); // buttonview
             */
            _getViewCssClassName: function () {
                // return value. if there is a error/warning a empty string is returned
                var cssClassName = null;
                // if the name contains 'M.' like every view should from the framework
                if (this._type.toString().indexOf('M.') === 0) {
                    // this is a View in the M context
                    cssClassName = this._type.split('M.')[1].toLowerCase();
                } else {
                    cssClassName = this._type.toString();
                }
                // check if there are any whitespaces in the _type property and show a warning if there are any.
                if (cssClassName.indexOf(' ') >= 0) {
                    console.warn('The View type contains whitespaces: ' + this._type + '. The _type property gets added to the css classes. Since there are whitespaces inside the name the view has multiple classes. To set a class overwrite _getViewCssClassName method of the view');
                    cssClassName = '';
                }
                // check if there are any dots in the _type property. If there are any don't add the cssClass
                if (cssClassName.indexOf('.') >= 0) {
                    console.warn('The View type contains dots: ' + this._type + '. The _type property gets added to the css classes. Since there are dots inside the name we skiped this. To enable this featuer overwrite the _getViewCssClassName method');
                    cssClassName = '';
                }
                // a error should overwrite the cssClassName with an empty string. If this doesn't happen set the cssClassName to the type
                return cssClassName;
            },
    
            _assignBinding: function () {
                var bindings = {};
    
                var _value = this._getValue();
                var selector = '';
    
                if (this.model && !M.isModel(_value)) {
                    selector = '[data-binding="value"]';
                    bindings[selector] = {observe: '' + _value.attribute};
                } else if (this.collection) {
                    selector = '[data-binding="value"]';
                    bindings[selector] = {observe: 'value'};
                } else if (this.model && M.isModel(_value)) {
                    _.each(this.model.attributes, function (value, key) {
                        var selector = '[data-binding="' + key + '"]';
                        bindings[selector] = {observe: '' + key};
                    }, this);
                } else if (this.extendTemplate === null && this.scopeKey) {
                    selector = '[data-binding="value"]';
                    bindings[selector] = {observe: '' + this.scopeKey};
                } else {
                    _.each(this._templateValues, function (value, key) {
                        selector = '[data-binding="' + key + '"]';
                        bindings[selector] = {observe: '' + key};
                    }, this);
                }
    
                _.each(bindings, function (value, key) {
                    if (typeof this.onGet === 'function') {
                        bindings[key].onGet = function (value) {
                            var ret = this.onGet(value);
                            return ret;
                        };
                    }
    
                    if (typeof this.onSet === 'function') {
                        bindings[key].onSet = function (value) {
                            var ret = this.onSet(value);
                            return ret;
                        };
                    }
                }, this);
    
                this.bindings = bindings;
    
                return this;
            },
    
            postRender: function () {
    
            },
    
            updateTemplate: function () {
                var template = this.template || M.TemplateManager.get(this._type);
                this._assignTemplate(template);
                this._updateChildViewsTemplate();
                return this;
            },
    
            _updateChildViewsTemplate: function () {
    
                if (!this.childViews) {
                    return;
                }
                _.each(this.childViews, function (child) {
                    if (typeof child.updateTemplate === 'function') {
                        child.updateTemplate();
                    } else if (_.isArray(child)) {
                        _.each(child, function (c) {
                            c.updateTemplate();
                        });
                    }
    
                }, this);
                return this;
            },
    
            /**
             * Sets an childview to the given selector. If it doesn't exist it gets created.
             * @param selector
             * @param view
             */
            setChildView: function (selector, view) {
    
                if (!this.childViews[selector]) {
                    this.addChildView(selector, view);
                } else {
                    this.childViews[selector] = view;
                }
    
            },
    
            /**
             * Gets an childview by the given selector. If it doesn't exist it retuns null.
             * @param selector
             * @param {M.View}
             */
            getChildView: function (selector) {
                if (this.childViews[selector]) {
                    return this.childViews[selector];
                }
                return null;
            },
    
            /**
             * adds a childview to the view.
             * @param {String} selector - the selector to identify in which childview container the view should be added
             * @param {M.View} the view that should be added
             */
            addChildView: function (selector, view) {
                if (_.isObject(selector)) {
                    // this can be an object if the you use it as addChildViews function
                    /**
                     * @example
                     *
                     * var children = {
                     *  b1: M.View.extend(),
                     *  b2: M.View.extend()
                     * };
                     *
                     * M.View.create().addChildView(children);
                     *
                     */
                    _.each(selector, function (view, selector) {
                        this._mergeChildView(selector, view);
                    }, this);
                } else {
                    return this._mergeChildView(selector, view);
                }
                return this;
            },
    
            /**
             * Appends a child view to the given selector. If there is already a childview for the given selector, create an array an add the old and the new one.
             * @param {String} selector - the selector to identify in which childview container the view should be added
             * @param {M.View} the view that should be added
             * @private
             */
            _mergeChildView: function (selector, view) {
                if (!(_.isString(selector)) || !(M.isView(view))) {
                    return void 0;
                }
    
                var existingChildViews = this.childViews[selector];
    
                if (_.isArray(existingChildViews)) {
                    existingChildViews.push(view);
                } else if (_.isObject(existingChildViews)) {
                    var container = [];
                    container.push(existingChildViews);
                    container.push(view);
                    this.childViews[selector] = container;
                    container = null;
                } else {
                    this.childViews[selector] = view;
                }
    
                return this;
            },
    
            /**
             * Remove all events to the given eventtype
             * @param {String} The eventtype e.q. tap
             * @private
             * @todo removing an event by its name removes all bound event callbacks. At the moment it isn't possible to remove a single eventype function.
             * @example
             *
             * //Create a view with an tap event
             * var view = M.View.extend({
             *   events: {
             *      tap: function(){console.log('tap did happen')}
             *   }
             * }).create().render();
             *
             * //Log all bound events (Chrome provides the getEventListeners function to log all event on an DOM object)
             * getEventListeners(view.el); // Object {touchstart: Array[1], mousedown: Array[1], tap: Array[1]}
             *
             * //Remove all tap events
             * view._unbindEvent('tap');
             *
             * //Log again
             * getEventListeners(view.el); //Object {touchstart: Array[1], mousedown: Array[1]}
             */
            _unbindEvent: function (eventtype) {
                this._hammertime.off(eventtype, this._eventCallback[eventtype]);
            },
    
    
            /**
             *
             * Returns a childview of an object either by the name or the index of the childview
             * @param {(string|number)} the index or name of the childview
             * @private
             *
             * @example
             * var testView = M.View.extend({}, {
             *    child1: M.View.extend({value: 'child 1 value'}),
             *    child2: M.View.extend({value: 'child 2 value'})
             * }).create();
             *
             * testView._getChildView(0);  //child1
             * testView._getChildView(1);  //child2
             * testView._getChildView('child1');  //child1
             * testView._getChildView('child2');  //child2
             * testView._getChildView('child2');  //child2
             */
            _getChildView: function (identifier) {
                var ident = parseInt(identifier, 10);
                if (!_.isNaN(ident)) {
                    identifier = ident;
                }
                var childName = _.isNumber(identifier) ? Object.keys(this.childViews)[identifier] : identifier;
                return this.childViews[childName];
            },
    
    
            /**
             *
             * @param {String|M.I18NItem} text - The text to get the internationalization from
             * @returns {String|M.I18NItem} returns an empty string if no param is defined. Returns the translatation if its an M.I18NItem. Returns the text if there is no translation
             * @private
             * @example
             *
             * _assignTemplateValues: function() {
             *   M.View.prototype._assignTemplateValues.apply(this, arguments);
             *   this._templateValues.placeholder = this._getInternationalizedTemplateValue(this.placeholder);
             * }
             *
             */
            _getInternationalizedTemplateValue: function (text) {
                if (M.isI18NItem(text)) {
                    return M.I18N.l(text.key, text.placeholder);
                } else if (text) {
                    return text;
                } else {
                    return '';
                }
            },
    
            /**
             * Gets called if the view is visible in the dom. Typical usage is the calculaction of the widht or height.
             * Calls for the same function for every child view and then the attachToDom for a user
             * @private
             */
            _getsVisible: function () {
                this._childViewsGetsVisible();
                this.getsVisible();
            },
    
            /**
             * Gets called if the view is visible in the dom. Typical usage is the calculaction of the widht or height
             */
            getsVisible: function () {
    
            },
    
            /**
             * Calls _attachedToDom on every childView
             * @private
             */
            _childViewsGetsVisible: function () {
                _.each(this.childViews, function (child) {
                    child._getsVisible();
                }, this);
            },
    
            /**
             * Getter for the parent view
             * @returns {M.View}
             * @example
             * var parent = M.View.extend({},
             {
                 c1: M.View.extend({})
             }).create();
    
             parent.childViews.c1.getParent() === parent //true
             *
             *
             */
            getParent: function () {
                return this._parentView;
            }
    
        });
    
        /**
         * extend the Backbone.View extend function with a childViews parameter
         * @param options
         * @param childViews
         * @returns {*}
         */
        M.View.extend = function (options, childViews) {
            options = options || {};
    
            if (childViews) {
                options._childViews = childViews;
            }
    
            if (options.childViews) {
                options._childViews = options.childViews;
            }
    
            return Backbone.View.extend.apply(this, [options]);
        };
    
        /**
         *
         * @param scope
         * @returns {this}
         */
        M.View.create = function (scope, childViews, isScope) {
    
            var _scope = isScope || M.isController(scope) ? {scope: scope} : scope;
    
            var f = new this(_scope);
            f.childViews = {};
            if (f._childViews) {
                _.each(f._childViews, function (childView, name) {
                    var _scope = scope;
                    if (f.useAsScope === YES) {
                        _scope = f;
    
                    }
                    f.childViews[name] = childView.create(_scope || f, null, true);
                    // set the this as parentView in the current childView
                    f.childViews[name]._parentView = f;
                });
            }
            if (childViews) {
                f.childViews = f.childViews || {};
                _.each(childViews, function (childView, name) {
                    f.childViews[name] = childView;
                    // set the this as parentView in the current childView
                    f.childViews[name]._parentView = f;
                });
            }
    
            // set the value of the childview to this value
            f._setChildViewValue(f._getValue());
    
            return f;
        };
    
    })(this);
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Layout
     * @type {*}
     * @extends M.View
     */
    M.Layout = M.View.extend(/** @scope M.Layout.prototype */{
    
        //el: $(".m-perspective"),
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Layout',
    
        /**
         * This property is used to identify M.Layout and all of its derived object
         * as layouts.
         *
         * @type Boolean
         */
        isMLayout: YES,
    
        template: '<div></div>',
    
        childViews: {},
    
        applyViews: function() {
            this._getsVisible();
        },
    
        _attachToDom: function() {
            return YES;
        },
    
        setTransition: function( name ) {
            M.PageTransitions.setTransition( name );
        },
    
        startTransition: function() {
            M.PageTransitions.startTransition();
            this._getsVisible();
        },
    
        isAnimating: function() {
            return M.PageTransitions.isAnimating();
        },
    
        destroy: function() {
            this.$el.remove();
            this.$el = null;
            this.childViews = null;
            M.PageTransitions.reset();
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.Themes
     * @type {*}
     * @extends M.Object
     */
    M.Themes = M.Object.design({
        DEFAULT_THEME: 'basic',
    
        basic: {},
    
        _currentThemeName: 'basic',
    
        _themes: {},
    
        registerTemplateForTheme: function (themeName, templateName, template, override) {
            override = override || false;
    
            var theme = this._getThemeByName(themeName);
            if (!theme) {
                this._createThemeWithName(themeName);
            }
    
            var exists = this._getTemplateByNameForTheme(themeName, templateName) !== '';
            if (!exists || override) {
                this._themes[ themeName ][ templateName ] = template;
                return true;
            }
    
            console.warn('Template "' + templateName + '" already defined for theme "' + themeName + '"');
            return false;
        },
    
        getTemplateByName: function (templateName) {
    
            var template = this.getTemplateByNameForTheme(this._currentThemeName, templateName);
            if (template === '' && this._currentThemeName !== this.DEFAULT_THEME) {
                console.log('Template "' + templateName + '" not defined for theme "' + this._currentThemeName + '", switched to default theme "' + this.DEFAULT_THEME + '"');
                template = this.getTemplateByNameForTheme(this.DEFAULT_THEME, templateName);
            }
            return template;
        },
    
        getTemplateByNameForTheme: function (themeName, templateName) {
            var template = this._getTemplateByNameForTheme(themeName, templateName);
            if (template) {
                return template;
            }
            console.warn('Template "' + templateName + '" not defined for theme "' + themeName + '"');
            return '';
        },
    
        _getTemplateByNameForTheme: function (themeName, templateName) {
            var theme = this._getThemeByName(themeName);
            if (theme && theme[templateName]) {
                return theme[templateName];
            }
            return '';
        },
    
        _createThemeWithName: function (name) {
            this._themes[ name ] = {};
        },
    
        _getThemeByName: function (name) {
            if (this._themes[ name ]) {
                return this._themes[ name ];
            }
            return null;
        }
    });
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * A input field.
     * @module M.TextfieldView
     *
     * @type {M|*}
     * @extends M.View
     * @implements M.IconBackground
     *
     * @example
     *
     * example1: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Label',
                    value: '',
                    icon: 'fa-rocket',
                    placeholder: 'Rocket'
                }),
    
     backgroundRightTextfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Label',
                    value: '',
                    cssClass: 'right',
                    icon: 'fa-dot-circle-o',
                    placeholder: 'Dot'
                }),
    
     // custom clear icon
    
     M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Label',
                    type: 'clear',
                    placeholder: 'clear me',
                    //icon: 'fa-dot-circle-o',
                    value: M.Model.create({
                        value: ''
                    })
                })
     *
     */
    M.TextfieldView = M.View.extend({
    
        /**
         * The type of the input.
         * @private
         */
        _type: 'M.TextfieldView',
    
        /**
         * The label of the input.
         */
        label: null,
    
        /**
         * The type of the input. Default is search to have the cancel button
         */
        type: 'search',
    
        /**
         * HTML Placeholder
         */
        placeholder: null,
    
        /**
         * String - The icon for a Textfieldview. Use a icon from font-awesome. Default is the icon on the left. give the parent div a class right and it will be displayed on the right
         *
         */
        icon: null,
    
        /**
         * the template of the input
         */
        _template: null, //_.tmpl(M.TemplateManager.get('TextfieldView')),
    
        _templateString: M.TemplateManager.get('textfield.ejs'),
    
        /**
         * If the type of the view is 'clear' use a custom text delete element
         */
        _useCustomClear: NO,
    
        /**
         *
         */
        useCustomClear: NO,
    
        /**
         * Initialize the TextfieldView
         */
        initialize: function( options ) {
            if( this.type === 'clear' || options.type === 'clear' || this.useCustomClear  ) {
                //override the type to a html tag attribute - the type gets passed to the template
                this.type = this.type || 'text';
                // to check if the type of the object was from type 'clear' set _useCustomClear to true
                this._useCustomClear = YES;
            }
            M.View.prototype.initialize.apply(this, arguments);
            // If the type of the view is 'clear' use a custom text delete element
            if( this._useCustomClear ) {
                this._addClearButton();
            }
            return this;
        },
    
        /**
         * If the type of the view is 'clear' use a custom text delete element
         * @private
         */
        _addClearButton: function() {
            //get the value
            var value = this._getValue();
            // if it isn't allready a model, create one
            if( !M.isModel(value) ) {
                var val = value;
                if(!val){
                    val = '';
                }
                value = M.Model.create({
                    value: val
                });
            }
            // ensure that the value of a textfield is a model
            this._setModel(value);
            this._setValue(value);
    
    
            var that = this;
            // the icon of the clear button
            this.icon = this.icon || 'fa-times-circle';
            // the possition of the icon
            this.cssClass = this.cssClass || 'right';
            // if there is a default value show the icon
            if( this.getValue().value === '' ) {
                this.cssClass += ' hidden-icon';
            }
            // toggle the icon when a value is set or empty
            this.onSet = function( val ) {
                if( val ) {
                    that.$el.removeClass('hidden-icon');
                } else {
                    that.$el.addClass('hidden-icon');
                }
                return val;
            };
            return this;
        },
    
        /**
         * Add all the template values
         */
        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this);
            this._addLabelToTemplateValues();
            this._addTypeToTemplateValues();
            this._addPlaceholderToTemplateValues();
            this._addIconToTemplateValues();
            return this;
        },
    
        /**
         * Gets a internationalized version of the label and add this to the templateValues
         * @private
         */
        _addLabelToTemplateValues: function() {
            this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
            return this;
        },
    
        /**
         * Gets a internationalized version of the placeholder and add this to the templateValues
         * @private
         */
        _addPlaceholderToTemplateValues: function() {
            this._templateValues.placeholder = this._getInternationalizedTemplateValue(this.placeholder);
            return this;
        },
    
        /**
         * Add the type of the textfieldview to the template values
         * @private
         */
        _addTypeToTemplateValues: function() {
            this._templateValues.type = this.type;
            return this;
        },
    
        /**
         * Add the type of the icon to the template values, if no icon is set the value is empty string
         * @private
         */
        _addIconToTemplateValues: function() {
            this._templateValues.icon = this.icon || '';
        },
    
        /**
         * This function needs to be implemented to render the view if there is no value given
         * @returns {Boolean|Function|YES}
         * @private
         */
        _attachToDom: function() {
            return YES;
        },
    
        /**
         * Internal function that is called after the render process.
         * @returns {TextfieldView}
         * @private
         */
        _postRender: function() {
            M.View.prototype._postRender.apply(this, arguments);
    
            // if the type was set to 'clear'
            if( this._useCustomClear ) {
                var that = this;
                // TODO: is this the correct way to bind events?
                // add the clear functionality
                this.$el.find('i').on('click', function() {
                    // set the value empty...
                    that.value.set('value', '');
                    // and hide the clear icon
                    that.$el.addClass('hidden-icon');
                });
            }
            return this;
        },
    
        _extendTemplate: function(){
            if( this.extendTemplate ) {
                console.warn('Extend the Template of a M.TextFieldView is possible but be aware that the value attribute of the input is set with this string. Otherwise overwrite _templateString.');
            }
            M.View.prototype._extendTemplate.apply(this, arguments);
        },
    
        /**
         * returns the value of the view. if the value was just a string and not a model, then always return the dom value
         * @returns {*}
         */
        getValue: function(){
            var ret = M.View.prototype.getValue.apply(this, arguments);
            // if there isn't a value and no model access the dom to get the value
            if(!ret || !this.model){
                ret = this.$el.find('input').val();
            }
            return ret;
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.SearchfieldView
     *
     * @type {*}
     * @extends M.TextfieldView
     */
    M.SearchfieldView = M.TextfieldView.extend({
    
        _type: 'M.SearchfieldView',
    
        placeholder: 'Search',
    
        _templateString: M.TemplateManager.get('searchfield.ejs'),
    
        initialize: function () {
            M.View.prototype.initialize.apply(this);
        },
    
        _assignTemplateValues: function () {
            M.TextfieldView.prototype._assignTemplateValues.apply(this);
            this._templateValues.placeholder = this.placeholder || '';
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.TextareaView
     *
     * @type {*}
     * @extends M.TextfieldView
     */
    M.TextareaView = M.TextfieldView.extend({
    
        _type: 'M.TextareaView',
    
        _templateString: M.TemplateManager.get('textarea.ejs'),
    
        _attachToDom: function () {
            return YES;
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ListItemView
     *
     * @type {*}
     * @extends M.View
     */
    M.ListItemView = M.View.extend({
    
        /**
         * The type of the view
         * @type String
         * @private
         */
        _type: 'M.ListItemView',
    
        /**
         * The template of the view
         *
         */
        _templateString: M.TemplateManager.get('listitem.ejs'),
    
        /**
         * The type of the listitem. Default is 'basic' and just displays the value
         * select from the M.ListItemView.CONS
         * @type {String}
         * @example
         *
         * M.ListItemView.extend({
         *
         *   type: M.ListItemView.CONS.LINKED
         *
         * });
         *
         */
        type: 'basic',
    
        icon: 'fa-angle-right',
    
        /**
         * sets the view in the creation process to be enabled or disabled
         * @type {Boolean}
         */
    
        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
            this._applyBehaviour();
        },
    
        /**
         * returns the value of the icon inside of the listitem view
         * @returns {*|String|Array|Object|Choice|Undefined|key|*}
         * @type {function}
         * @example
         *
         * linkedCustomIconOnList: M.ListView.extend({
    
                        grid: 'col-xs-12',
    
                        value: M.Collection.create([
                            {value: 'Android'},
                            {value: 'Linux'},
                            {value: 'Apple'},
                            {value: 'Windows'}
                        ]),
    
                        listItemView: M.ListItemView.extend({
                            type: M.ListItemView.CONS.ICON,
                            getIcon: function() {
                                return 'fa-' + this.model.get('_value').toLocaleLowerCase();
                            }
                        })
    
                    })
         */
        getIcon: function() {
            if(this.model){
                return this.model.get('icon');
            }
            return this.icon;
        },
    
        /**
         * Set properties regarding to the selected type
         * @private
         */
        _applyBehaviour: function() {
    
            if( this.type === M.ListItemView.CONST.ICON ) {
                this.enabled = NO;
            }
    
            if( this.type === M.ListItemView.CONST.LINKED || this.type === M.ListItemView.CONST.ICON ) {
                this.template = _.tmpl(M.TemplateManager.get('listitemlinked.ejs'));
            }
        },
    
        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this, arguments);
            if( this.type === M.ListItemView.CONST.LINKED || this.type === M.ListItemView.CONST.ICON ) {
                this._templateValues.icon = this.getIcon();
            }
        },
    
        _postRender: function() {
            M.View.prototype._postRender.apply(this, arguments);
            if( this.enabled === NO && this.disable ) {
                this.disable();
            }
        },
    
        _renderChildViewToDom: function(dom, child) {
            this._appendToDom(dom.find('li'), child.render().$el);
        }
    
    }).implements([M.ActiveState, M.ViewEnableState]);
    
    /**
     * Constant that specifies the behaviour of the ItemView
     * @type {{LINKED: number, BASIC: number, ICON: number}}
     */
    M.ListItemView.CONST = {
        LINKED: 1,
        BASIC: 2,
        ICON: 3
    };
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.ButtonView inherits from M.View
     * @module M.ButtonView
     *
     * @type {*}
     * @extends M.View
     */
    M.ButtonView = M.View.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: 'M.ButtonView',
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _templateString: M.TemplateManager.get('button.ejs'),
    
        /**
         * The active state of the button. Use isActive and setActive to change this property.
         * @private
         */
        _isActive: YES,
    
        /**
         * sets the view in the creation process to be enabled or disabled
         * @type {Boolean}
         */
        enabled: YES,
    
        initialize:function(){
            this.value = this.value || '';
            M.View.prototype.initialize.apply(this, arguments);
        },
    
        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this, arguments);
            this._templateValues.icon = this.icon ? this.icon : '';
        },
    
        _addClassNames: function() {
            M.View.prototype._addClassNames.apply(this, arguments);
            var value = this._getValue();
            if(value !== '' && this.icon && this.icon !== ''){
                this.$el.addClass('has-icon');
            } else if(value === '' && this.icon && this.icon !== ''){
                this.$el.addClass('is-icon-only');
            }
        },
    
        isActive: function() {
            return this._isActive();
        },
    
        activate: function() {
            this._isAcitve = YES;
            this.$el.addClass('active');
    
        },
    
        deactivate: function() {
            this._isAcitve = NO;
            this.$el.removeClass('active');
        },
    
        _postRender: function() {
            M.View.prototype._postRender.apply(this, arguments);
            if( this.enabled === NO && this.disable ) {
                this.disable();
            }
        }
    
    }).implements([M.ActiveState, M.ViewEnableState]);
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ListView
     *
     * @type {*}
     * @extends M.View
     * @example
     * M.ListView.extend({
    
                        value: M.Collection.create([
                            {lastname: 'black', firstname: 'anton', header: true},
                            {lastname: 'müller', firstname: 'aron'},
                            {lastname: 'müller', firstname: 'absinthe', footer: true},
                            {lastname: 'akkerman', firstname: 'bernhard', header: true, footer: true},
                            {lastname: 'kewlman', firstname: 'coolio', header: true, footer: true},
                            {lastname: 'null', firstname: 'druk', header: true},
                            {lastname: 'bender', firstname: 'dirk',footer: true},
                            {lastname: 'false', firstname: 'eric', header: true},
                            {lastname: 'drop table *;', firstname: 'erico', header: true, footer: true}
                        ]),
    
                        getListItemHeader: function(model, index){
                            if(model.get('header')){
                                return M.ListItemView.extend({
                                    cssClass: 'listHeader',
                                    value: 'Start: ' + model.get('firstname').slice(0,1).toUpperCase(),
                                    enabled: NO
                                });
                            }
                        },
    
                        getListItemFooter: function(model, index){
                            if(model.get('footer')){
                                return M.ListItemView.extend({
                                    cssClass: 'listFooter',
                                    value: 'End: ' + model.get('firstname').slice(0,1).toUpperCase(),
                                    enabled: NO
                                });
                            }
                        },
    
                        getListItem: function(model, index){
    
                            var cssClass = 'even';
                            if(index % 2){
                                cssClass = 'odd'
                            }
                            return M.ListItemView.extend({
                                cssClass: cssClass,
                                childViews: {
                                    firstname: M.View.extend({
                                        useParentValue: YES,
                                        extendTemplate: '<%= firstname %>'
                                    }),
                                    lastname: M.View.extend({
                                        useParentValue: YES,
                                        extendTemplate: '<%= lastname %>'
                                    })
                                }
                            });
                        }
                    });
    
     // SortBy Example:
    
     var collection = M.Collection.create([
     {lastname: 'black', firstname: 'anton'},
     {lastname: 'müller', firstname: 'aron'},
     {lastname: 'müller', firstname: 'absinthe'},
     {lastname: 'akkerman', firstname: 'bernhard'},
     {lastname: 'kewlman', firstname: 'coolio'},
     {lastname: 'null', firstname: 'druk'},
     {lastname: 'bender', firstname: 'dirk'},
     {lastname: 'false', firstname: 'eric'},
     {lastname: 'drop table *;', firstname: 'erico'}
     ]);
    
     var testView = M.ListView.extend({
    
                value: collection,
    
                filterBy: function(model) {
    
                    if(this.getFilterValue() === true){
                        return true;
                    }
                    var val = this.getFilterValue();
                    if(model.get('firstname').indexOf(val.val) >= 0 || model.get('lastname').indexOf(val.val)  >= 0){
                        return true;
                    }
    
                    return false;
                },
    
                getListItem: function( model, index ) {
                    return M.ListItemView.extend({
                        childViews: {
                            firstname: M.View.extend({
                                useParentValue: YES,
                                extendTemplate: '<%= firstname %>'
                            }),
                            lastname: M.View.extend({
                                useParentValue: YES,
                                extendTemplate: '<%= lastname %>'
                            })
                        }
                    });
                }
            }).create().render();
     // display only the first entry
     testView.filter({val: 'anton'});
     // display all
     testView.filter();
     // or
     testView.setFilterValue(true);
     testView.filter();
     *
     *
     */
    M.ListView = M.View.extend({
    
    
        /**
         * The type of the view
         * @type {String}
         * @private
         */
        _type: 'M.ListView',
    
        /**
         * A map to access the view with the model cid
         * @type {Object}
         * @private
         */
        _viewModelMapping: null,
    
    
        /**
         * The template of the view
         * @type {function}
         * @private
         */
        _template: null,
    
        /**
         * The template blueprint of the view
         * @type {String}
         * @private
         */
        _templateString: M.TemplateManager.get('list.ejs'),
    
        /**
         * The blueprint for every list item. Overwrite the property with a view prototype to display every list entry with this object.
         * @type {function}
         */
        listItemView: null,
    
    
        /**
         * The childViews of a list are the items therefore the renderChildViews implements its own add strategie
         * @private
         * @returns {M.ListView}
         */
        _renderChildViews: function() {
            // gets also called for filtering with useRenderUpdateFilter so skip that - because in this case the filtervalue is needed
            if( !this.useRenderUpdateFilter ) {
                //reset the filtervalue if the view gets rerendered
                this._filterValue = true;
            }
            if( this.collection ) {
                // add all models to the view
                this._renderItems(this.collection.filter(this.filterBy, this));
            }
            // TODO: evaluate this:
            else if( _.isArray(this.getValue()) ) {
                this._renderItems(this.getValue());
            }
            return this;
        },
    
        /**
         * The initialization of the view
         * @returns {M.ListView}
         */
        initialize: function() {
            // call super
            M.View.prototype.initialize.apply(this, arguments);
            // if there is a collection add collection listener
            if( this.collection ) {
                this._applyListener();
            }
            // initialize the mapping to cache the access to a view
            this._viewModelMapping = {};
            return this;
        },
    
        /**
         * Adds listeners 'add', 'fetch, 'change', 'remove' and 'sort'for the collection.
         * @private
         * @returns {M.ListView}
         */
        _applyListener: function() {
            this.listenTo(this.collection, 'add', function( model ) {
                // add an item to the view
                this._renderEntry(model);
            });
    
            this.listenTo(this.collection, 'fetch', function() {
                // TODO: implement behavior
            });
            this.listenTo(this.collection, 'change', function() {
                // TODO: implement behavior
            });
            this.listenTo(this.collection, 'remove', function( model ) {
                var v = this._viewModelMapping[model.cid];
                if (v && v.$el) {
                    v.$el.remove();
                }
            });
    
            this.listenTo(this.collection, 'sort', function() {
                // TODO: implement a better behavior
                this.render();
            });
    
            return this;
        },
    
        /**
         * renders all items of the view
         * @param models
         * @returns {M.ListView}
         */
        _renderItems: function( models ) {
            _.each(models, function( model, index ) {
                this._renderEntry(model, index);
            }, this);
            return this;
        },
    
        /**
         * Render a single entry. First render its header then the actual content and then as last a possible footer.
         * @param model the model of the entry
         * @param index the index of the entry
         * @returns {M.ListView}
         */
        _renderEntry: function( model, index ) {
            var row = {
                header: this._getListItemHeader(model, index),
                item: this._getListItem(model, index),
                footer: this._getListItemFooter(model, index)
            };
    
            row = this._renderListItemRow(row);
            this._cacheListItemRow(row, model.cid);
            return this;
        },
    
        _renderListItemRow: function( row ) {
            var rowCopy = {};
            _.each(row, function( listItemView, ident ) {
                rowCopy[ident] = this._renderItem(listItemView);
            }, this);
            return rowCopy;
        },
    
        _cacheListItemRow: function( listItemRow, identifier ) {
            this._viewModelMapping[identifier] = listItemRow;
        },
    
        /**
         * Renders the given view to the list.
         * @param listItemView
         * @returns {M.ListItemView|undefined}
         * @private
         */
        _renderItem: function( listItemView ) {
    
            // if there is no given view return undefined
            if( !listItemView ) {
                return void 0;
            }
    
            if( M.View.prototype.isPrototypeOf(listItemView.prototype) && _.isFunction(listItemView) ) {
                listItemView = listItemView.create();
            }
    
            listItemView.render();
            this.$el.find('[data-childviews="list"]').append(listItemView.$el);
            listItemView.delegateEvents();
            return listItemView;
        },
    
        /**
         * Returns a instance of a ListItem. The highest priority has the getListItem getter. then the listItemView property. If nothing is given a M.ListItemView instance gets returned.
         * @param model
         * @param index
         * @returns {M.ListView}
         * @private
         */
        _getListItem: function( model, index ) {
    
            // if the getListItem function is implemented return an instance of the view that gets returned from the getListItem function
            if( _.isFunction(this.getListItem) ) {
                return this.getListItem(model, index).create({
                    scope: this.scope,
                    value: model
                });
            }
    
            // if the getListItem function is not implemented but the listItemView property return an instance of the listItemView property
            if( this.listItemView ) {
                return this.listItemView.create({
                    scope: this.scope,
                    value: model
                });
            }
    
            // if none of the above kicks in return a instance of the ListItemView
            return M.ListItemView.create({
                scope: this.scope,
                value: model,
                enable: NO
            });
        },
    
        /**
         * Overwrite this with a function that gets called for every listItem. Return a View prototype of the content that represents an entry
         * @param model
         * @param index
         * @type {Function}
         */
        getListItem: null,
    
        /**
         * Internal call for the list item header
         * @param model
         * @param index
         * @returns {*}
         * @private
         */
        _getListItemHeader: function( model, index ) {
            // if the user overwrites the getListItemHeader with a function return that
            if( _.isFunction(this.getListItemHeader) ) {
                return this.getListItemHeader(model, index);
            }
            return this.getListItemHeader;
        },
    
        /**
         * Overwrite this with a function that gets called for every listItem. Return a View prototype of the content that represents an entry. This will be displayed above the getListItem element.
         */
        getListItemHeader: null,
    
        /**
         * Internal call for the list item footer
         * @param model
         * @param index
         * @returns {*}
         * @private
         */
        _getListItemFooter: function( model, index ) {
            // if the user overwrites the getListItemHeader with a function return that
            if( _.isFunction(this.getListItemFooter) ) {
                return this.getListItemFooter(model, index);
            }
            return this.getListItemFooter;
        },
    
        /**
         * Overwrite this with a function that gets called for every listItem. Return a View prototype of the content that represents an entry. This will be displayed below the getListItem element.
         * @param model
         * @param index
         * @type {Function}
         */
        getListItemFooter: null,
    
        /**
         * If set to false: apply a filter on a list will only show and hide the given elements. If the property is set to true every listitem gets instanciated (may course velocity issues)
         * @type {BOOLEAN}
         */
        useRenderUpdateFilter: NO,
    
        /**
         * Gets called for every collection entry. Return true to add the entry to the list and false to remove it from the list view
         * @param model
         * @returns {*}
         *
         */
        filterBy: function( model ) {
            return this.getFilterValue();
        },
    
        /**
         * Creates new instances on every filter
         * @param filterValue
         * @returns {*}
         */
        _renderUpdateFilter: function( filterValue ) {
            // empty the current list
            this.$el.find('[data-childviews="list"]').empty();
            // render the list items
            this._renderChildViews();
            return this;
        },
    
        /**
         * Toggles hide/show on the DOM element on filter
         * @param filterValue
         * @returns {*}
         */
        _showHideFilter: function() {
            // hide the current list
            this.$el.find('[data-childviews="list"] .listitemview').hide();
            // array of all elements to show
            var listItems = this.collection.filter(this.filterBy, this);
    
            _.each(listItems, function( model, index ) {
    
                // if it is a simple listItemView then just call the show method
                if( this.listItemView ) {
                    this._showFilterElement(model.cid);
                } else {
                    // if getters and setters are defined get the row. Usually it contains header, item and footer
                    var row = this._viewModelMapping[model.cid];
                    // if a getter for the header is defined
                    if( _.isFunction(this.getListItemHeader) ) {
                        // call the get header item with the current header view to manipulate it
                        this.getListItemHeader(model, index, row.header);
                        // then show it
                        this._showFilterElement(model.cid, 'header');
                    }
                    if( _.isFunction(this.getListItem) ) {
                        // call the get item with the current item view to manipulate it
                        this.getListItem(model, index, row.item);
                        // then show it
                        this._showFilterElement(model.cid, 'item');
                    }
                    if( _.isFunction(this.getListItemFooter) ) {
                        // call the get footer item with the current footer view to manipulate it
                        this.getListItemFooter(model, index, row.footer);
                        // then show it
                        this._showFilterElement(model.cid, 'footer');
                    }
                }
            }, this);
        },
    
        /**
         * Gets used if useRenderUpdateFilter is set to true to toggle all hidden list items
         * @param identifier
         * @param elementSpecification
         * @private
         */
        _showFilterElement: function( identifier, elementSpecification ) {
            // if set to header, footer or item
            if(elementSpecification){
                // get the view from the cache
                var view = this._viewModelMapping[identifier];
                if(view[elementSpecification] && view[elementSpecification].$el){
                    // show it
                    view[elementSpecification].$el.show();
                }
            } else {
                // loop over the cached views and show them
                // this should be the same as:
                // view.item
                this._viewModelMapping[identifier].item.$el.show();
    //            _.each(this._viewModelMapping[identifier], function(view){
    //                view.$el.show();
    //            }, this);
            }
        },
    
        /**
         * Trigger a filter on the list. This will not effect the collection only the visibility of a list entry
         * The given filterValue is accessable with the getter: getFilterValue
         * If this.useRenderUpdateFilter is set to true all list elements are instanciatet per filter call. If the property is set to false the DOM of every elements gets hidden or shown.
         * @param filterValue
         * @returns {*}
         */
        filter: function( filterValue ) {
    
            if(typeof filterValue !== 'undefined'){
                this.setFilterValue(filterValue);
            }
    
            if( this.useRenderUpdateFilter ) {
                this._renderUpdateFilter();
            } else {
                this._showHideFilter();
            }
            return this;
        },
    
        /**
         * Stores an object to access in the filterBy method.
         * The value can be set via setFilterValue and get with getFilterValue.
         */
        _filterValue: true,
    
        /**
         * Sets the _filterValue property
         * @param filterValue
         * @returns {*}
         */
        setFilterValue: function( filterValue ) {
            var val = typeof filterValue === 'undefined' ? YES : filterValue;
            this._filterValue = val;
            return this;
        },
    
        /**
         * Return the _filterValue property
         * @returns {boolean}
         */
        getFilterValue: function() {
            return this._filterValue;
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.SliderView
     *
     * @type {*}
     * @extends M.View
     */
    M.SliderView = M.View.extend({
    
        _type: 'M.SliderView',
    
        _templateString: M.TemplateManager.get('slider.ejs'),
    
        _getEventOptions: function () {
            return {
                'prevent_default': false,
                'no_mouseevents': true
            };
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.DialogView
     *
     * @type {*}
     * @extends M.View
     */
    M.DialogView = M.View.extend({
    
        _type: 'M.DialogView',
    
        _templateString: M.TemplateManager.get('dialog.ejs')
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ToggleView
     *
     * @type {*}
     * @extends M.View
     */
    M.ToggleView = M.View.extend({
    
        _type: 'M.ToggleView',
    
        _templateString: M.TemplateManager.get('toggle.ejs'),
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
        },
    
        render: function (settings) {
            //this._assignValue();
            this._preRender(settings);
            this._render(settings);
            this._renderChildViews(settings);
            this._postRender(settings);
            return this;
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ImageView
     *
     * @type {*}
     * @extends M.View
     */
    M.ImageView = M.View.extend({
    
        _type: 'M.ImageView',
    
        _templateString: M.TemplateManager.get('image.ejs'),
    
        /**
         * Represents the alt attribute of the img tag
         */
        alt: null,
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
            this.alt = this.alt || '';
            return this;
        },
    
        /**
         * Override this function to add 'alt' parameter
         * @private
         * @returns this
         */
        _assignTemplateValues: function () {
    
            M.View.prototype._assignTemplateValues.apply(this, arguments);
    
            var _value = this._getValue();
    
            if (this.model) {
                if (M.isModel(_value)) {
                } else {
                    this._templateValues.alt = this.model.get(this.alt.attribute);
                }
            } else if (_value || typeof _value === 'string') {
                this._templateValues.alt = this.alt;
            }
            return this;
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.Toast
     *
     * @type {*}
     * @extends M.View
     *
     * @example
     * M.Toast.show('test');
     * M.Toast.show('test', M.Toast.CONST.CRISPY);
     *
     */
    M.Toast = M.View.extend({
    
        _type: 'M.ToastView',
    
        /**
         * the template of the toast
         *
         */
        _templateString: M.TemplateManager.get('toast.ejs'),
    
        /**
         * the id of the toast
         */
        id: null,
    
        /**
         * Add the toast to the 'body' after initialize it
         * @param settings
         */
        initialize: function (settings) {
            var that = this;
            that.id = _.uniqueId();
            that.text = settings.text || M.Toast.CONST.TEXT;
            $('body').append(that.render().$el);
    
            that.timeoutId = setTimeout(function () {
                that.remove();
            }, settings.timeout || M.Toast.CONST.MEDIUM);
        },
    
        /**
         * assign the values for the template engine
         * @private
         */
        _assignTemplateValues: function () {
            this._templateValues = {
                id: this.id,
                text: this.text
            };
        },
    
        /**
         * remove
         */
        remove: function() {
            M.View.prototype.remove.apply(this, arguments);
            if(this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            M.Toast._run();
        },
    
        /**
         * This function needs to be implemented to render the view if there is no value given
         * @returns {Boolean|Function|YES}
         * @private
         */
        _attachToDom: function() {
            return YES;
        }
    
    });
    
    M.Toast._stack = [];
    M.Toast._isSequencing = false;
    M.Toast._currentToast = null;
    
    /**
     * Show a toast
     * @param {String} text to display
     * @param {Number} milliseconds to show the toast
     * @returns {M.Toast}
     */
    M.Toast.show = function( options, timeout ) {
        if( typeof options === 'string' ) {
            options = {
                text: options,
                timeout: timeout
            };
        }
    
        // Push the toast into the stack
        this._stack.push(options);
    
        // Start sequence if it is not already running
        if( !this._isSequencing ) {
            this._isSequencing = true;
            this._run();
        }
    };
    
    /**
     * Removes all toasts from the sequence.
     */
    M.Toast.removeAll = function() {
        this._stack = [];
        if( this._currentToast ) {
            this._currentToast.remove();
            this._currentToast = null;
        }
    };
    
    M.Toast._run = function() {
        if( this._stack.length === 0 ) {
            this._isSequencing = false;
            return;
        }
        var options = this._stack.shift();
        this._currentToast = M.Toast.create(options);
    };
    
    M.Toast.CONST = {
        RAW: 500,
        MEDIUM: 2000,
        CRISPY: 4000,
        TEXT: ''
    };
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ToolbarView
     *
     * @type {*}
     * @extends M.View
     */
    M.ToolbarView = M.View.extend({
    
        /**
         * The type of the view
         * @private
         * @type {String}
         */
        _type: 'M.ToolbarView',
    
        /**
         * The template of the view
         * @private
         * @type {function}
         */
        _templateString: M.TemplateManager.get('toolbar.ejs')
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.SelectView
     *
     * @type {*}
     * @extends M.View
     */
    M.SelectView = M.View.extend({
    
        _type: 'M.SelectView',
    
        isMultiple: NO,
    
        _templateString: M.TemplateManager.get('select.ejs'),
    
        _assignBinding: function () {
            M.View.prototype._assignBinding.apply(this, arguments);
            if (this.selectOptions) {
                _.each(this.bindings, function (value) {
                    value.selectOptions = this.selectOptions;
                }, this);
            }
            return this;
        },
    
        _assignTemplateValues: function () {
            M.View.prototype._assignTemplateValues.apply(this);
            this._templateValues.isMultiple = this.isMultiple;
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ButtonGroupView
     * @type {*}
     * @extends M.View
     */
    M.ButtonGroupView = M.View.extend({
    
        _type: 'M.ButtonGroupView',
    
        _templateString: M.TemplateManager.get('buttongroup.ejs'),
    
        _internalCssClasses: 'clearfix',
    
        setActive: function( view ) {
    
            var setActiveView = M.isView(view) ? view : this._getChildView(view);
            _.each(this.childViews, function( child ) {
                child.deactivate();
            }, this);
            setActiveView.activate();
        },
    
        getActive: function() {
            return _.find(this._childViews, function( view ) {
                return view.isActive();
            }, this);
        },
    
        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
            var that = this;
            if( this._childViews ) {
                _.each(this._childViews, function( child, key ) {
    
                    this._childViews[key] = child.extend({
                        _isInButtonGroup: YES,
                        _internalEvents: {
                            touchstart: [function( events, element ) {
                                that.setActive(element);
                            }],
                            mousedown: [function( events, element ) {
                                that.setActive(element);
                            }]
                        }
                    });
                }, this);
            }
    
        },
    
        _preRender: function() {
            M.View.prototype._preRender.apply(this, arguments);
            _.each(this.childViews, function( child ) {
                if( child.selected ) {
                    this.setActive(child);
                }
            }, this);
        },
    
        _addClassNames: function() {
            M.View.prototype._addClassNames.apply(this, arguments);
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ButtonGroupView
     * @type {*}
     * @extends M.View
     */
    M.TabbarButtonGroupView = M.ButtonGroupView.extend({
    
        _type: 'M.TabbarButtonGroupView',
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
            var that = this;
            if (this._childViews) {
                var gridSize = M.CONST.GRID.COLUMNS / Object.keys(this._childViews).length;
                _.each(this._childViews, function (child, key) {
                    this._childViews[key] = child.extend({
                        grid: 'col-xs-' + gridSize,
                        _internalEvents: {
                            tap: [function (events, element) {
                                that.setActive(element);
                            }]
                        }
                    });
                }, this);
            }
    
        },
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.TabView
     *
     * @type {*}
     * @extends M.View
     */
    M.TabView = M.View.extend({
    
        _type: 'M.TabView',
    
        cssClass: 'm-page m-tab'
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.SelectionlistView
     *
     * @type {*}
     * @extends M.View
     */
    M.SelectionlistView = M.View.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: 'M.SelectionlistView',
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _template: null,
    
        _templateString: null,
    
        /**
         * The template of an option before initializing it.
         * @private
         */
        _optionTemplate: null,
    
        /**
         * Selector name which is used internally to determine the parent dom element.
         * @private
         */
        _optionsContainer: '',
    
        /**
         * Override this function to call the '_renderOptions' method.
         *
         * @override
         * @returns {this}
         * @private
         */
        _render: function () {
    
            M.View.prototype._render.apply(this, arguments);
            this._renderOptions();
            return this;
        },
    
        /**
         * This method renders the options based on the selectOptions property.
         *
         * @returns {this}
         * @private
         */
        _renderOptions: function () {
    
            if (this.selectOptions && this.selectOptions.collection) {
                var dom = '';
                _.each(this.selectOptions.collection, function (value) {
                    dom += this._optionTemplate({
                        name: this.cid + '-option',
                        value: value[this.selectOptions.valuePath || 'value'],
                        label: value[this.selectOptions.labelPath || 'label']
                    });
                }, this);
    
                this.$el.children('div').children('[data-childviews="' + this._optionsContainer + '-options"]').append(dom);
            }
    
            return this;
        }
    }).implements([M.ActiveState]);
    
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * The {M.RadiolistView} view class render a group of <input type="radio"> HTML elements.
     * An example would be ask the user for his favorite drink. The user can
     * choose between different drinks, but he can only select one of them.
     * @module M.RadiolistView
     *
     * @type {M.RadiolistView}
     * @extend {M.SelectionlistView}
     * @example
     *
     * M.RadioButtonView.extend({
     *     scopeKey: 'userModel.favoriteDrink',
     *     selectOptions: {
     *         collection: [
     *             {id: 1, name: 'Absinthe'},
     *             {id: 2, name: 'Water'},
     *             {id: 3, name: 'Dr Pepper'}
     *         ],
     *         labelPath: 'name',
     *         valuePath: 'id'
     *     }
     * });
     */
    
    M.RadiolistView = M.SelectionlistView.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: 'M.RadiolistView',
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _templateString: M.TemplateManager.get('radiolist.ejs'),
    
        /**
         * The template of an option before initializing it.
         * @private
         */
        _optionTemplate: _.tmpl(M.TemplateManager.get('radiooption.ejs')),
    
        /**
         * Selector name which is used internally to determine the parent dom element.
         * @private
         */
        _optionsContainer: 'radio'
    }).implements([M.ActiveState]);
    
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.CheckboxlistView
     *
     * @type {*}
     * @extends M.SelectionlistView
     */
    M.CheckboxlistView = M.SelectionlistView.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: 'M.CheckboxlistView',
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _templateString: M.TemplateManager.get('checkboxlist.ejs'),
    
        _optionTemplate: _.tmpl(M.TemplateManager.get('checkboxoption.ejs')),
    
        _optionsContainer: 'checkbox'
    
    });
    
    
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ModalView
     * @type {M|*}
     */
    M.ModalView = M.View.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: 'M.ModalView',
    
        /**
         * The default cssClass for this view.
         * @type {String}
         */
        cssClass: 'modalview',
    
        /**
         * Determines if the modal should close on clicking the overlay.
         * @type {String}
         */
        hideOnOverlayClick: YES,
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _templateString: M.TemplateManager.get('modal.ejs'),
    
        /**
         * Determines if the modal is shown or not. Access it by calling isShown()
         * @private
         * @type {Boolean}
         */
        _isShown: NO,
    
        /**
         * Counts the number how often the show function was called.
         * @private
         * @type {Number}
         */
        _shownCounter: 0,
    
        /**
         * Background element for this modal view.
         * @private
         * @type {$}
         */
        _$backdrop: null,
    
        /**
         * Is set to true on show. If the hide is called before the transition ends and _backdropWillAppear is set to false the backdrop gets hidden immediately
         */
        _backdropWillAppear: NO,
    
        /**
         * Register internal events for this view.
         * @private
         */
        _internalEvents: {
            tap: function( events, view ) {
                view._closeHandler(events, view);
            }
        },
    
        /**
         * Show the modal view
         * @returns {M.ModalView}
         */
        show: function() {
            this._shownCounter += 1;
            if( this._shownCounter > 0 ) {
                this._showBackdrop();
                $('body').append(this.$el);
                this._isShown = YES;
            }
            return this;
        },
    
        /**
         * Hide the modal view. You have to call for every show a hide or force it by calling with true as first parameter
         * @param {Boolean} force - Force the modal view to hide
         * @returns {M.ModalView}
         */
        hide: function( force ) {
            this._shownCounter -= 1;
            if( force === YES || this._shownCounter <= 0 ) {
                this.$el.remove();
                this._isShown = NO;
                this._shownCounter = 0;
                this._hideBackdrop();
            }
    
            return this;
        },
    
        /**
         * If the modal view is visible at the moment
         * @returns {Boolean}
         */
        isShown: function() {
            return this._isShown;
        },
    
        /**
         * Toggle the modal view. If the modal view is visibile it gets hidden if it is hidden show the modal view
         * @returns {Boolean}
         */
        toggle: function( text ) {
            if( this.isShown(text) ) {
                this.hide(true);
            } else {
                this.show(text);
            }
        },
    
        /**
         * This function needs to be implemented to render the view if there is no value given
         * @returns {Boolean|Function|YES}
         * @private
         */
        _attachToDom: function() {
            return YES;
        },
    
        /**
         * Show the backdrop
         * @private
         */
        _showBackdrop: function() {
            var that = this;
            if( that._$backdrop ) {
                return;
            }
    
            that._$backdrop = $('<div class="modal-backdrop fade"><div>');
            that._$backdrop.appendTo('body');
    
            if( M.Animation.transitionSupport ) {
                that._backdropWillAppear = YES;
                that._$backdrop.on(M.Animation.transitionEndEventName, function() {
                    that._backdropWillAppear = NO;
                });
                setTimeout(function() {
                    if( that._$backdrop ) {
                        that._$backdrop.addClass('in');
                    }
                }, 0);
            }
        },
    
        /**
         * Hide the backdrop
         * @private
         */
        _hideBackdrop: function() {
            var that = this;
            var callback = function() {
                if( that._$backdrop ) {
                    that._$backdrop.remove();
                    that._$backdrop = null;
                    that._backdropWillAppear = NO;
                }
            };
            if( that._$backdrop ) {
                if( M.Animation.transitionSupport && that._backdropWillAppear === NO ) {
                    that._$backdrop.on(M.Animation.transitionEndEventName, callback);
                    setTimeout(function() {
                        if( that._$backdrop ) {
                            that._$backdrop.removeClass('in');
                        }
                    }, 0);
                } else {
                    callback();
                }
            }
        },
    
        /**
         * Hides the view
         *
         * @param {Event} event
         * @param {M.Modal} view
         * @private
         */
        _closeHandler: function( event, view ) {
            if( this.hideOnOverlayClick && event.target === view.el ) {
                view.hide();
            }
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * The base implementation of a loader. Calling the show/toggle shows the loader.
     * Calling multiple times the show function with a different text will update the text.
     * Call hide/toggle for every show to hide the Loader.
     * To force the hidding pass true to the hide call
     *
     * @module M.LoaderView
     * @extends M.ModalView
     * @type {*|Object|void}
     *
     * @example
     * var loader = M.LoaderView.extend().create().render();
     * //show loader
     * loader.show('loading');
     * //hide loader
     * loader.hide();
     * //show loader
     * loader.toggle('loading second time');
     * //hide loader
     * loader.toggle();
     * //show loader
     * loader.show('loading');
     * //udpte text
     * loader.show('still loading');
     * //force hidding
     * loader.hide(true);
     *
     */
    M.LoaderView = M.ModalView.extend({
    
        /**
         * The type of the View
         * @private
         * @type {String}
         */
        _type: 'M.LoaderView',
    
        /**
         * Defines that the loader view can't be closed by clicking on the overlay.
         * @type {String}
         */
        hideOnOverlayClick: NO,
    
        /**
         * Show the loader
         * @param {String} text - The text for the Loader
         * @returns {LoaderView}
         */
        show: function( text ) {
            text = text || '';
            M.ModalView.prototype.show.apply(this, arguments);
            this.$el.find('.m-loaderview-inner-message').html(text);
            return this;
        }
    }, {
        content: M.View.extend({
    
            /**
             * The template of the view
             * @private
             * @type {function}
             */
            _templateString: M.TemplateManager.get('loader.ejs'),
    
            /**
             * This function needs to be implemented to render the view if there is no value given
             * @returns {Boolean|Function|YES}
             * @private
             */
            _attachToDom: function() {
                return YES;
            }
        })
    });
    
    
    /**
     *
     * @module M.Loader
     * @static
     * Static implementation of the LoaderView
     *
     * @type {*|Prompt|String|this}
     * @example
     * M.ButtonView.extend({
        grid: 'col-xs-12',
        value: 'Toggle LoaderView',
        events: {
            tap: function() {
                M.Loader.toggle();
            }
        }
     */
    M.Loader = M.LoaderView.create().render();
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * A View to display text. It's like a Textfieldview with icon and label but without edit mode
     * @type {*|Object|void}
     * @module M.TextView
     * @example
     * M.TextView.extend({
            label: 'Cloud',
            icon: 'fa-cloud',
            value: 'Cloud based Saas'
        }),
     *
     */
    M.TextView = M.View.extend({
    
        /**
         * The type of the input.
         * @private
         */
        _type: 'M.TextView',
    
        /**
         * The label of the input.
         */
        label: null,
    
        /**
         * String - The icon for a Textfieldview. Use a icon from font-awesome. Default is the icon on the left. give the parent div a class right and it will be displayed on the right
         *
         */
        icon: null,
    
        /**
         * the template of the input
         */
        _templateString: M.TemplateManager.get('text.ejs'),
    
        /**
         * Add all the template values
         */
        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this);
            this._addLabelToTemplateValues();
            this._addIconToTemplateValues();
            return this;
        },
    
        /**
         * Gets a internationalized version of the label and add this to the templateValues
         * @private
         */
        _addLabelToTemplateValues: function() {
            this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
            return this;
        },
    
        /**
         * Add the type of the icon to the template values, if no icon is set the value is empty string
         * @private
         */
        _addIconToTemplateValues: function() {
            this._templateValues.icon = this.icon || '';
        },
    
        /**
         * This function needs to be implemented to render the view if there is no value given
         * @returns {Boolean|Function|YES}
         * @private
         */
        _attachToDom: function() {
            return YES;
        }
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.DebugView
     *
     * @type {*}
     * @extends M.View
     */
    M.DebugView = M.View.extend({
    
        _type: 'M.DebugView',
    
        _templateString: M.TemplateManager.get('debug.ejs'),
    
        _debugViewIsHidden: YES,
    
        cssClass: 'bg',
    
        useAsScope: YES,
    
        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
            this._addShakeEvent();
        },
    
        hide: function() {
            this._debugViewIsHidden = YES;
            this.$el.hide();
        },
    
        show: function() {
            if( this._firstRender ) {
                $('body').append(this.render().$el);
            }
            this._debugViewIsHidden = NO;
            this.$el.show();
        },
    
        toggle: function() {
            if( this._debugViewIsHidden ) {
                this.show();
            } else {
                this.hide();
            }
        },
    
        toggleGrid: function() {
            this.$el.toggleClass('bg');
            this.childViews['debug-grid'].$el.toggle();
        },
    
        androidLightTheme: function() {
            this.resetTheme();
            $('html').addClass('android-light');
        },
    
        iosTheme: function() {
            this.resetTheme();
            $('html').addClass('ios');
        },
    
        resetTheme: function() {
            $('html').removeClass('android').removeClass('android-light').removeClass('android-dark').removeClass('ios');
        },
    
        _addShakeEvent: function() {
            var that = this;
            window.addEventListener('shake', function() {
                that.toggle();
            }, false);
        }
    }, {
        'debug-menu': M.ButtonGroupView.extend({
            cssClass: 'debug-menu'
        }, {
            toggleGrid: M.ButtonView.extend({
                value: 'Toggle grid',
                events: {
                    tap: 'toggleGrid'
                }
            }),
    
            androidLight: M.ButtonView.extend({
                value: 'android-light theme',
                events: {
                    tap: 'androidLightTheme'
                }
            }),
    
            ios: M.ButtonView.extend({
                value: 'ios theme',
                events: {
                    tap: 'iosTheme'
                }
            }),
    
            reset: M.ButtonView.extend({
                value: 'reset theme',
                events: {
                    tap: 'resetTheme'
                }
            })
        }),
    
        'debug-grid': M.View.extend({
            useElement: YES,
            template: (function() {
                var tpl = '<div class="debug-container"><div class="debug-grid col-xs-12"><div class="row">';
                for( var i = 0; i < 12; i++ ) {
                    tpl += '<div class="col-xs-1"><div class="inner"></div></div>';
                }
                tpl += '</div></div></div>';
                return tpl;
            })()
        })
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.MovableView inherits from M.View
     * @module M.MovableView
     *
     * @type {*}
     * @extends M.View
     */
    M.MovableView = M.View.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: 'M.MovableView',
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _templateString: M.TemplateManager.get('movable.ejs'),
    
        leftEdge: 0,
    
        duration: 1000,
    
        /**
         * The right border to stop the moveable item
         */
        rightEdge: null,
    
        /**
         * The right border to stop the moveable item used internal
         */
        _rightEdge: null,
    
    
        /**
         * Save the last position of the moveable element after the user releases the moveable element
         * x: the x position absolute to the window
         * y: the y position absolute to the window
         * deltay: the difference from the draging startpoint on the x axis
         * deltaY: the difference from the draging startpoint on the y axis
         * @type {Object}
         * @private
         */
        _lastPos: {
            x: 0,
            y: 0,
            deltaX: 0,
            deltaY: 0,
            direction: ''
        },
    
        /**
         * Save the current position for every move of the moveable element
         * x: the x position absolute to the window
         * y: the y position absolute to the window
         * deltay: the difference from the draging startpoint on the x axis
         * deltaY: the difference from the draging startpoint on the y axis
         * @type {Object}
         * @private
         */
        _currentPos: {
            x: 0,
            y: 0,
            deltaX: 0,
            deltaY: 0,
            direction: ''
        },
    
        /**
         * The widht of the moveable item. To calculate the edge of the moveable element
         * @type {Number|String}
         * @private
         */
        _movableWidth: null,
    
        /**
         * The width of the container. To calculate the edge of the moveable element
         * @type {Number|String}
         * @private
         */
    
        _containerWidth: null,
    
        /**
         * DOM that should be moved
         * @type {jQuery DOM Object}
         */
        _$movableContent: null,
    
        /**
         * Determines if there is a current animation
         * @private
         */
        _isAnimating: NO,
    
        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
            this.leftEdge = this.leftEdge || 0;
            // if the right edge was defined by the user set it, otherwise initialize it in _setDimensions
        },
    
        _postRender: function() {
            M.View.prototype._postRender.apply(this, arguments);
            this._$movableContent = this._getMovableContent();
        },
    
        _getsVisible: function() {
            M.View.prototype._getsVisible.apply(this, arguments);
            this.toLeft();
            this.setDimensions();
        },
    
        /**
         * Drag and TouchEnd are registered for the Movable-Element
         * @type {Object}
         * @private
         */
        _internalEvents: {
            dragright: function( event, element ) {
                // call the drag method of M.MovableView
                element._drag(event, element);
            },
    
            dragleft: function( event, element ) {
                // call the drag method of M.MovableView
                element._drag(event, element);
            },
    
            touchend: function( event, element ) {
                // call the touchend method of M.MovableView
                element._touchEnd(event, element);
            },
    
            mouseup: function( event, element ) {
                // call the touchend method of M.MovableView
                element._touchEnd(event, element);
            }
        },
    
        /**
         * Get called on every touch move of the moveable element. Calculates the position of the element and calls the move method to the calculated points
         * @param event
         * @private
         */
        _drag: function( event ) {
            var position = {};
            // the last position of the last touchend added with the current moved distance
            position.x = this._lastPos.x + event.gesture.deltaX;
            // cache the delta
            position.deltaX = event.gesture.deltaX;
            position.direction = this._currentPos.deltaX > event.gesture.deltaX ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
            // move the element
            this._move(position);
        },
    
        /**
         * /**
         * Get called on every touchend / after every drag to store the last point of the element for further calculations on the next drag start.
         * @private
         */
        _touchEnd: function( event, element ) {
    
            if( event.target !== this._$movableContent[0] && !this.$el.hasClass('on-move') ) {
                return;
            }
    
            // check the boundaries
            if( this._currentPos.x < this.leftEdge ) {
                // set the left edge of the element to the left edge of the container
                this._currentPos.x = this.leftEdge;
            } else if( this._containerWidth < this._currentPos.x + this._movableWidth ) {
                // set the right edge of the element to the right edge of the container
                this._currentPos.x = this._containerWidth - this._movableWidth;
            }
    
            // cache the current position. The view needs this to calculate further drags
            this._lastPos = this._currentPos;
            // move the element to the position so it can't get lost out of the boundaries.
            this.onRelease();
        },
    
        /**
         * Move the movable Element to the left or right on release according to the direction. Overwrite this to enable a different behavior
         */
        onRelease: function() {
            if( this._currentPos.direction === Hammer.DIRECTION_LEFT ) {
                this.toLeft();
            } else {
                this.toRight();
            }
        },
    
        /**
         * Overwrite the default hammer configuration. This needs to be done to get a constant move tracking on the drag event
         * @returns {{prevent_default: boolean, no_mouseevents: boolean, stop_browser_behavior: boolean}}
         * @private
         */
        _getEventOptions: function() {
            return {
                'prevent_default': true,
                'no_mouseevents': true,
                'stop_browser_behavior': {
                    // this also triggers onselectstart=false for IE
                    userSelect: 'none',
                    // this makes the element blocking in IE10 >, you could experiment with the value
                    // see for more options this issue; https://github.com/EightMedia/hammer.js/issues/241
                    touchAction: 'none',
                    touchCallout: 'none',
                    contentZooming: 'none',
                    userDrag: 'none'
                }
            };
        },
    
    
        /**
         * Cache the dimensions of the elements
         * @private
         */
        setDimensions: function() {
            // get the outer width of the moveable
            this._movableWidth = this._$movableContent.outerWidth();
            // get the outer width of the container
            this._containerWidth = this.$el.outerWidth();
            //default is the with of the outer object minus the moveable part
            this._rightEdge = this.rightEdge || this._containerWidth - this._movableWidth;
        },
    
        /**
         * Returns the element that should be animated
         * @returns {*|Cursor|Mixed}
         * @private
         */
        _getMovableContent: function() {
            return this.$el.find('.movable-element');
        },
    
        /**
         * Moves the element. The best performance on old devices is with position absolute and setting the left and top property
         * @param position
         * @private
         */
        _move: function( position ) {
            var pos = parseInt(position.x, 10);
    
            if( pos > this._rightEdge ) {
                return;
            }
            if( pos < this.leftEdge ) {
                return;
            }
    
            this._removeCssClasses();
            this.$el.addClass('on-move');
            this._setCss(position);
    
            // if there is a position cache it
            if( position ) {
                this._currentPos = position;
            }
        },
    
        /**
         * Animate the moveable to the left
         */
        toLeft: function() {
            this.$el.removeClass('on-right');
            this.$el.addClass('on-left');
            this._resetInlineCss();
            this._lastPos.x = this.leftEdge;
            this._setCss({
                x: this._lastPos.x
            });
    
        },
    
        /**
         * Animate the movable to the right
         */
        toRight: function() {
            this.$el.addClass('on-right');
            this.$el.removeClass('on-left');
            this.$el.removeClass('on-move');
            this._resetInlineCss();
            this._lastPos.x = this._rightEdge;
            this._setCss({
                x: this._lastPos.x
            });
        },
    
    
        /**
         * Toggle between left and right animation
         */
        toggle: function() {
            if( this.$el.hasClass('on-left') ) {
                this.toRight();
            } else {
                this.toLeft();
            }
            return this;
        },
    
    
        /**
         * Applies the css to the movable element
         * @param position
         * @private
         */
        _setCss: function( position ) {
            if( position && position.x && typeof position.x !== 'undefined' ) {
                var pos = parseInt(position.x, 10);
                if( !isNaN(pos) ) {
                    this._$movableContent.css('-webkit-transform', 'translate3d(' + pos + 'px, 0, 0)');
                    this._$movableContent.css('-moz-transform', 'translate3d(' + pos + 'px, 0, 0)');
                    this._$movableContent.css('transform', 'translate3d(' + pos + 'px, 0, 0)');
                    return this;
                }
            }
            return void 0;
    
        },
    
        /**
         * Removes all css classes set by itself
         * @private
         */
        _removeCssClasses: function() {
            this.$el.removeClass('to-left');
            this.$el.removeClass('to-right');
            this.$el.removeClass('on-move');
        },
    
        /**
         * Removes all inline styles. Done because it was the easiest way to remove the transform of the move
         * @param position
         * @private
         */
        _resetInlineCss: function( position ) {
            this._$movableContent.attr('style', '');
        },
    
        /**
         * This function needs to be implemented to render the view if there is no value given
         * @returns {Boolean|Function|YES}
         * @private
         */
        _attachToDom: function() {
            return YES;
        }
    
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * @module M.ToggleSwitchView
     *
     * @type {*}
     * @extends M.ToggleSwitchView
     * @example
     *
     * M.ToggleSwitchView.extend({
        grid: 'col-xs-12',
        label: 'Wifi',
        offLabel: 'Off',
        onLabel: 'On',
        scopeKey: 'settings',
        extendTemplate: '<%= wifistatus  %>',
        onValue: '1',
        offValue: '2'
     })
     *
     *
     */
    M.ToggleSwitchView = M.MovableView.extend({
    
        /**
         * The type of the view
         * @type {string}
         * @private
         */
        _type: 'M.ToggleSwitchView',
    
        /**
         * The Template of the view before initializing it
         * @type function
         * @param {object} _templateValues
         * @private
         */
        _templateString: M.TemplateManager.get('toggleswitch.ejs'),
    
        /**
         * The value of the on state
         * @default
         * @type {*}
         */
        onValue: YES,
    
        /**
         * The value of the off state
         * @default
         * @type {*}
         */
        offValue: NO,
    
        /**
         * The label on the view of the on state
         * @default
         * @type {string}
         */
        onLabel: M.TOGGLE_SWITCH_ON,
    
        /**
         * The label on the view of the off state
         * @default
         * @type {string}
         */
        offLabel: M.TOGGLE_SWITCH_OFF,
    
        rightEdge: 35,
    
        /**
         * Use stickit to bind the values like it is done in the M.SelectionListView
         * @private
         */
        selectOptions: null,
    
        /**
         * Add all the template values
         * @private
         */
        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this, arguments);
            this._addLabelToTemplateValues();
            this._addOnLabelToTemplateValues();
            this._addOffLabelToTemplateValues();
    
        },
    
        /**
         * Initialize the View.
         * Before the View gets initialized add stickit support
         * @param options
         */
        initialize: function( options ) {
            this._setSelectOptions();
            var that = this;
            this._internalEvents.tap = function() {
                that.toggle();
            };
            M.View.prototype.initialize.apply(this, arguments);
            if( this.getValue() === null ) {
                this._setValue(this.offValue);
            }
        },
    
        /**
         * Use intern the stickit API.
         * @private
         */
        _setSelectOptions: function() {
            this.selectOptions = {
                collection: []
            };
        },
    
        /**
         * @private
         * @returns {Object} returns onValue if the the value equals onValue or onLabel otherwise offValue
         */
        onGet: function( value ) {
            if( value === this.onValue || value === this.onLabel ) {
                M.MovableView.prototype.toLeft.apply(this, arguments);
                return this.onValue;
            } else {
                M.MovableView.prototype.toRight.apply(this, arguments);
                return this.offValue;
            }
        },
    
        /**
         * @private
         * @returns {Object} returns onValue if checked or if unchecked the offValue
         */
        onSet: function() {
            if( this.$el.hasClass('on-left') ) {
                return this.onValue;
            } else if( this.$el.hasClass('on-right') ) {
                return this.offValue;
            }
        },
    
        toLeft: function() {
            M.MovableView.prototype.toLeft.apply(this, arguments);
            this._$valueContainer.trigger('change');
        },
    
        toRight: function() {
            M.MovableView.prototype.toRight.apply(this, arguments);
            this._$valueContainer.trigger('change');
        },
    
        _$valueContainer: null,
    
        _postRender: function() {
            M.MovableView.prototype._postRender.apply(this, arguments);
            this._$valueContainer = this.$el.find('[contenteditable="true"]');
        },
    
        /**
         * Gets a internationalized version of the label and add this to the templateValues
         * @private
         */
        _addLabelToTemplateValues: function() {
            this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
        },
    
        /**
         * Gets a internationalized version of the label and add this to the templateValues
         * @private
         */
        _addOnLabelToTemplateValues: function() {
            this._templateValues.onLabel = this.onLabel || M.TOGGLE_SWITCH_ON;
        },
    
        /**
         * Gets a internationalized version of the label and add this to the templateValues
         * @private
         */
        _addOffLabelToTemplateValues: function() {
            this._templateValues.offLabel = this.offLabel || M.TOGGLE_SWITCH_OFF;
        }
    });
    
    /**
     * Constant that specifies the behaviour of the ItemView
     * @type {{LINKED: number, BASIC: number, ICON: number}}
     */
    M.ToggleSwitchView.CONST = {
        TOGGLE_SWITCH_ON: 1,
        TOGGLE_SWITCH_OFF: 2
    };
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     * M.MenuView inherits from M.View.
     * To add childViews to this view name it 'menu-content'
     * @module M.MenuView
     *
     * @type {*}
     * @extends M.View
     * @example
     * var menu = M.MenuView.extend({
     *     onOpen: function(){
     *         console.log('menu open');
     *     },
     *     onClose: function(){
     *         console.log('menu close');
     *     }
     * },{
            'menu-content': M.View.extend({},{
                b1 : M.ButtonView.extend({value:'b1'}),
                b2 : M.ButtonView.extend({value:'b2'})
            })
        }).create().render()
     *
     */
    M.MenuView = M.MovableView.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: 'M.MenuView',
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _templateString: M.TemplateManager.get('menu.ejs'),
    
        /**
         * The most left position of the menu
         */
        leftEdge: 0,
    
        /**
         * The most right position of the menu
         */
        rightEdge: null,
    
        /**
         * The Backdrop dom representation
         * @type {jQuery DOM Object}
         */
        _$backdrop: null,
    
        /**
         * The 'padding' of the element that listens to the drag from outside the device
         */
        _deviceSwipeListenerWidth: 0,
    
        /**
         * Timeout to fade out the menu.
         */
        _transitionTimeout: null,
    
    
        /**
         * basic css class is on-left to start on the left side
         */
        _internalCssClasses: 'on-left',
    
        /**
         * calculate the leftEdge and rightEdge vars
         */
        initialize: function() {
            this._deviceSwipeListenerWidth = parseInt(M.ThemeVars.get('m-menu-view-device-swipe-listener-width'), 10);
            this.leftEdge = this.leftEdge || 0;
            this._rightEdge = this.rightEdge || parseInt(M.ThemeVars.get('m-menu-view-width'), 10) - this._deviceSwipeListenerWidth;
            M.MovableView.prototype.initialize.apply(this, arguments);
        },
    
        setDimensions: function() {
            M.MovableView.prototype.setDimensions.apply(this, arguments);
            this._rightEdge = this.rightEdge || parseInt(M.ThemeVars.get('m-menu-view-width'), 10) - this._deviceSwipeListenerWidth;
        },
    
        _postRender: function() {
            this._$backdrop = this.$el.find('.movable-backdrop');
            M.MovableView.prototype._postRender.apply(this, arguments);
        },
    
        /**
         * Animate the moveable to the left
         * Add background to the element.
         */
        toLeft: function() {
            this.$el.removeClass('on-right');
            //copy of the prototype:
            this.$el.addClass('on-left');
            this._resetInlineCss();
            this._lastPos.x = 0;
    
            // add backdrop functionality
            this._$backdrop.removeClass('in');
            this._$backdrop.css('opacity', '0');
            var that = this;
            window.clearTimeout(this._transitionTimeout);
            var animationDuration = parseInt(M.ThemeVars.get('m-menu-transition'), 10);
            this._transitionTimeout = setTimeout(function() {
                that.$el.removeClass('on-move');
            }, animationDuration);
            this._onClose();
        },
    
        /**
         * Animate the movable to the right.
         * Add background to the element.
         */
        toRight: function() {
            M.MovableView.prototype.toRight.apply(this, arguments);
            this._$backdrop.addClass('in');
            this._$backdrop.css('opacity', '0.8');
            this._onOpen();
        },
    
        /**
         * Applies the css to the movable element with background
         * @param position
         * @private
         */
        _setCss: function( position ) {
            if( position && position.x && typeof position.x !== 'undefined' ) {
                var pos = parseInt(position.x, 10);
                if( !isNaN(pos) ) {
                    this._setOpacity(this._getOpacityByPosition(position.x));
                    return M.MovableView.prototype._setCss.apply(this, arguments);
                }
            }
            return void 0;
        },
    
        _getOpacityByPosition: function( position ) {
            var opacity = position === 0 ? position : (parseInt(10 - (this._rightEdge / position), 10) / 10);
            if( opacity < 0 ) {
                opacity = 0;
            }
            if( opacity > 1 ) {
                opacity = 1;
            }
            if( !isNaN(opacity) ) {
                return opacity;
            }
            return void 0;
        },
    
        _setOpacity: function( opacity ) {
            this._$backdrop.css('opacity', opacity);
        },
    
        /**
         * Returns the complete DOM node to be swipeable.
         * @returns {$el|*}
         * @private
         */
        _getMovableContent: function() {
            return this.$el.find('.movable-container');
        },
    
        /**
         * Get called on every touch move of the moveable element. Calculates the position of the element and calls the move method to the calculated points
         * @param event
         * @private
         */
        _drag: function() {
            M.MovableView.prototype._drag.apply(this, arguments);
            window.clearTimeout(this._transitionTimeout);
        },
    
        /**
         * Internal on close function. Gets called when the menu is closed
         * @private
         */
        _onClose: function(){
            this.onClose();
        },
    
        /**
         * Internal on open function. Gets called when the menu is closed
         * @private
         */
        _onOpen: function(){
            this.onOpen();
        },
    
        /**
         * Gets called when the menu is closed.
         * @private
         */
        onClose: function(){
    
        },
    
        /**
         * Gets called when the menu is opened.
         * @private
         */
        onOpen: function(){
    
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'header-layout', '<div data-childviews="header" class="header"></div>');
    /**
     *
     * @module M.HeaderLayout
     * @type {*}
     * @extends M.Layout
     */
    M.HeaderLayout = M.Layout.extend({
    
        _type: 'header-layout',
    
        template: M.Themes.getTemplateByName('header-layout'),
    
        applyViews: function( settings ) {
    
    
            var ident = 'header';
    
            if(!this.childViews[ident] && settings.header){
                this.addChildView(ident, settings.header);
            }
    
            if( settings.header && !this._firstRender ) {
                this.$el.find('[data-childviews="' + ident + '"]').html('');
                this.$el.find('[data-childviews="' + ident + '"]').html(settings.header.render().$el);
            }
    
            return this;
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'bottom-bar-layout', '<div class="bottom-bar"></div>' );
    /**
     *
     * @module M.BottomBarLayout
     * @type {*}
     * @extends M.Layout
     */
    M.BottomBarLayout = M.Layout.extend({
    
        _type: 'bottom-bar-layout',
    
        template: M.Themes.getTemplateByName('bottom-bar-layout')
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'switch-layout', '<div id="m-main" class="m-perspective"><div class="m-page m-page-1"><div data-childviews="content_page1" class="content-wrapper"></div></div><div class="m-page m-page-2"><div data-childviews="content_page2" class="content-wrapper"></div></div></div>');
    /**
     *
     * @module M.SwitchLayout
     * @type {*}
     * @extends M.Layout
     */
    M.SwitchLayout = M.Layout.extend({
    
        /**
         * The type of the Layout
         */
        _type: 'M.SwitchLayout',
    
        /**
         * The template of the Layout
         */
        template: M.Themes.getTemplateByName('switch-layout'),
    
        /**
         * The SwitchLayout has two container to display the content. This attribute determines which of those 2 is active at the moment
         */
        _currentPage: null,
    
        /**
         * Map views to dom
         * @param settings
         * @returns {SwitchLayout}
         */
        applyViews: function( settings ){
    
            if(this._currentPage === null || this._currentPage === undefined || this._currentPage === 'content_page2'){
                this._currentPage = 'content_page1';
    
            } else if(this._currentPage === 'content_page1'){
                this._currentPage = 'content_page2';
            }
    
            if(!this.childViews[this._currentPage]){
                if(settings.content){
                    this.setChildView(this._currentPage, settings.content);
                }
    
            } else if(this.childViews[this._currentPage] !== settings.content){
                if(settings.content){
                    this.setChildView(this._currentPage, settings.content);
                }
    
            }
    
            if(!this._firstRender){
                //clear the dom before inserting the view
                this.$el.find('[data-childviews="' + this._currentPage + '"]').html('');
                //insert the view
                this.$el.find('[data-childviews="' + this._currentPage + '"]').html(settings.content.render().$el);
            }
    
            M.Layout.prototype.applyViews.apply(this, arguments);
            return this;
        },
    
        /**
         * Initialize the Transitions on first render then call the prototype
         * @private
         */
        _postRender: function(){
    
            if(this._firstRender){
                M.PageTransitions.init(this.$el.find('#m-main'));
            }
            M.Layout.prototype._postRender.apply(this, arguments);
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    
    //TODO do this in good
    var template = $('<div class="wrap"> <div class="left-panel firstLeft"> <div class="action-menu-close"></div> <div class="content"></div> </div> <div class="right-panel"> <div class="content"></div> </div> </div>');
    template.find('.right-panel').before(M.SwitchLayout.prototype.template);
    
    M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'swipe-layout', template );
    /**
     *
     * @module M.SwipeLayout
     * @type {*}
     * @extends M.SwitchLayout
     */
    M.SwipeLayout = M.SwitchLayout.extend({
    
        _type: 'M.SwipeLayout',
    
        template: M.Themes.getTemplateByName('swipe-layout'),
    
        leftPanelIsOpen: null,
    
        rightThreshold: null,
    
        initialize: function() {
            M.SwitchLayout.prototype.initialize.call(this);
    
            var w = $(window).width();
            this.rightThreshold = (w / 100) * 80;
        },
    
        toggleRightPanel: function() {
            this.closeLeftPanel();
            $('.right-panel').toggleClass('show');
        },
    
        closeRightPanel: function() {
            $('.right-panel').removeClass('show');
        },
    
        toggleLeftPanel: function() {
            this.closeRightPanel();
            if( this.leftPanelIsOpen ) {
                this.closeLeftPanel();
            } else {
                this.openLeftPanel();
            }
        },
    
        startMoveLeftPanel: function( evt ) {
            if( !evt || !evt.originalEvent ) {
                return;
            }
            evt.stopPropagation();
            evt.preventDefault();
            var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
    
            if( this.leftPanelIsOpen ) {
                this.moveStart = 0;
            } else {
                this.moveStart = touch.pageX;
            }
        },
    
        stopMoveLeftPanel: function( evt ) {
            evt.stopPropagation();
            evt.preventDefault();
            $('#m-main').addClass('easing');
    
            if( this.leftPanelIsOpen ) {
                this.closeLeftPanel();
            } else {
                this.openLeftPanel();
            }
    
            setTimeout(function() {
                $('#m-main').removeClass('easing');
            }, 500);
    
        },
    
        moveLeftPanel: function( evt ) {
            //                if(!evt || !evt.originalEvent){
            //                    return;
            //                }
            //                evt.stopPropagation();
            //                evt.preventDefault();
            var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
    
            var diff = touch.pageX - this.moveStart;
            if( diff <= 0 ) {
                diff = 0;
            } else if( diff >= this.rightThreshold ) {
                diff = this.rightThreshold;
            } else {
                $('#m-main').css('-webkit-transform', 'translate3d(' + diff + 'px, 0, 0)');
            }
    
            //        -webkit-transform: translate3d(80%, 0, 0);
            //        -moz-transform: translate3d(80%, 0, 0);
            //        -ms-transform: translate3d(80%, 0, 0);
            //        -o-transform: translate3d(80%, 0, 0);
            //        transform: translate3d(80%, 0, 0);
        },
    
        closeLeftPanel: function() {
            //$('.os-bb10 .template-bottom, .os-bb10 .template-right').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
            $('#m-main').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
            this.leftPanelIsOpen = false;
        },
    
        openLeftPanel: function() {
            $('#m-main').css('-webkit-transform', 'translate3d(' + this.rightThreshold + 'px, 0, 0)');
            this.leftPanelIsOpen = true;
        }
    });
    
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.TabLayout
     * @type {*}
     * @extends M.Layout
     */
    M.TabLayout = M.Layout.extend({
    
        _tabMenu: null,
    
        _type: 'M.TabLayout',
    
        scrolling: NO,
    
        smoothScrollAnimation: YES,
    
        template: '<div id="m-main" class="m-perspective"><div data-childviews="tab-menu"></div><div data-childviews="tab-content"></div></div>',
    
        switchToTabCallback: null,
    
        initialize: function() {
            this._tabMenu = M.TabbarButtonGroupView.extend({}, {}).create(this, null, YES);
        },
    
        _render: function() {
            M.Layout.prototype._render.apply(this, arguments);
        },
    
        _postRender: function() {
            M.Layout.prototype._postRender.apply(this, arguments);
            this.$el.addClass(this.scrolling ? 'scrolling' : '');
            this.$scrollContainer = this.$el.find('[data-childviews=tab-menu]');
            if(this.scrolling){
                var width = parseInt(M.ThemeVars.get('tablayout-menu-scroll-button-width'), 10) * Object.keys(this._tabMenu.childViews).length;
                this.$scrollContainer.children('.tabbarbuttongroupview').css('width', width + 'px');
            }
    
        },
    
        switchToTab: function( index ) {
            if( index < 0 || index >= Object.keys(this._tabMenu.childViews).length ) {
                return;
            }
            this._scrollToTab(index);
            this._tabMenu.setActive(index);
            this.$el.find('.m-tab.m-page-current').removeClass('m-page-current');
            this.childViews['tab-content'][index].$el.addClass('m-page-current');
            if(this.switchToTabCallback && typeof this.switchToTabCallback === 'function'){
                this.switchToTabCallback(index);
            }
        },
    
        _scrollToTab: function( index ) {
            if(!this.$scrollContainer){
                return;
            }
    
            var buttonWidth = parseInt(M.ThemeVars.get('tablayout-menu-scroll-button-width'), 10);
            var toPos = index * buttonWidth - 50;
            if( this.smoothScrollAnimation ) {
    
                this.$scrollContainer.stop().animate({
                    scrollLeft: toPos
                }, 200);
    
            } else {
                this.$scrollContainer.scrollLeft(toPos);
            }
    
        },
    
    
        applyViews: function( tabs ) {
    
            var that = this;
    
            var contents = [];
            var grid = 'col-xs-' + Math.floor(12 / tabs.length);
            if( this.scrolling ) {
                grid = '';
            }
            for( var t = 0; t < tabs.length; t++ ) {
                var button = this._createButton({
                    index: t,
                    grid: grid,
                    headline: tabs[t].headline,
                    icon: tabs[t].icon
                });
                this._tabMenu.addChildView('button' + t, button);
                contents.push(this._extendContent({
                    index: t,
                    content: tabs[t].content
                }));
            }
    
            this.addChildView('tab-menu', this._tabMenu);
            this.addChildView('tab-content', contents);
        },
    
        _createButton: function( options ) {
            var that = this;
            return M.ButtonView.extend({
                value: options.headline,
                index: options.index,
                grid: options.grid,
                icon: options.icon,
                events: {
                    tap: function( event, element ) {
                        that.switchToTab(element.index);
                    }
                }
            }).create();
        },
    
        _extendContent: function( options ) {
            var that = this;
            return options.content.extend({
                events: {
                    dragleft: function( event, element ) {
                        that.switchToTab(options.index + 1);
                    },
                    dragright: function( event, element ) {
                        that.switchToTab(options.index - 1);
                    }
                }
            }).create();
        },
    
        //TODO
        _mergeChildView: function(selector, view){
            this.childViews[selector] = view;
            return this;
        }
    
    });
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    (function( scope ) {
    
        /**
         * the switchlayout template
         * @type {string}
         */
        var switchTemplate = M.SwitchLayout.prototype.template;
        /**
         * the header template
         * @type {string}
         */
        var headerTemplate = M.HeaderLayout.prototype.template;
        /**
         * add a header to the both content container
         * @type {string}
         */
        var myTemplate = switchTemplate.replace(/m-page-1">/gi, 'm-page-1">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page1_header"'));
        myTemplate = myTemplate.replace(/m-page-2">/gi, 'm-page-2">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page2_header"'));
    
        /**
         * A Switchlayout with a header and content
         * @type {*|Object|void}
         */
        M.SwitchHeaderContentLayout = M.SwitchLayout.extend({
    
            _type: 'M.SwitchHeaderContentLayout',
    
            /**
             * the template - a combination of the header and switch template
             * @type {string}
             */
            template: myTemplate,
    
            cssClass:'switch-header-content-layout',
    
            /**
             * The content gets mapped to the DOM via the Switchlayout. Then map the header to the Layout.
             * @param {Object} the views to display
             * @returns {SwitchHeaderContentLayout}
             */
            applyViews: function( settings ) {
    
                M.SwitchLayout.prototype.applyViews.apply(this, [settings]);
    
                if(!this.childViews[this._currentPage + '_header'] && settings.header){
                    this.setChildView(this._currentPage + '_header', settings.header);
                }
    
                if( settings.header && !this._firstRender ) {
                    this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html('');
                    this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html(settings.header.render().$el);
                }
    
                return this;
            }
        });
    
    
    })(this);
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    (function( scope ) {
    
        /**
         * the switchlayout template
         * @type {string}
         */
        var switchTemplate = M.SwitchLayout.prototype.template;
        /**
         * the header template
         * @type {string}
         */
    
        var headerTemplate = M.HeaderLayout.prototype.template;
        /**
         * add a header to the both content container
         * @type {string}
         */
        var myTemplate = switchTemplate.replace(/m-page-1">/gi, 'm-page-1">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page1_header"'));
        myTemplate = myTemplate.replace(/m-page-2">/gi, 'm-page-2">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page2_header"'));
    
        /**
         * A Switchlayout with a header and content
         * @type {*|Object|void}
         */
        M.SwitchMenuHeaderContentLayout = M.SwitchHeaderContentLayout.extend({
    
            _type: 'M.SwitchHeaderContentLayout',
    
            /**
             * the template - a combination of the header and switch template
             * @type {string}
             */
            template: myTemplate,
    
            cssClass: 'switch-menu-header-content-layout',
    
            menu: null,
    
            /**
             * The content gets mapped to the DOM via the Switchlayout. Then map the header to the Layout.
             * @param {Object} the views to display
             * @returns {SwitchHeaderContentLayout}
             */
            applyViews: function( settings ) {
                if( !this.menu ) {
                    if( settings.menuContent && M.MenuView.prototype.isPrototypeOf(settings.menuContent) ) {
                        this.menu = settings.menuContent;
                        this.setChildView('menu', settings.menuContent);
                        this.menu.render();
                        this.$el.append(this.menu.$el);
                    } else {
                        this.menu = M.MenuView.extend().create();
                        this.setChildView('menu', this.menu);
                        this.menu.setChildView('menu-content', settings.menuContent);
                        this.menu.render();
                        this.$el.append(this.menu.$el);
                    }
                }
                var that = this;
                M.SwitchHeaderContentLayout.prototype.applyViews.apply(this, [settings]);
    
                return this;
            }
        });
    
    })(this);
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    (function( scope ) {
    
        /**
         * the switchlayout template
         * @type {string}
         */
        var switchTemplate = M.SwitchLayout.prototype.template;
        /**
         * the header template
         * @type {string}
         */
        var headerTemplate = M.HeaderLayout.prototype.template;
        /**
         * add a header to the both content container
         * @type {string}
         */
        var myTemplate = switchTemplate.replace(/m-page-1">/gi, 'm-page-1">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page1_header"'));
        myTemplate = myTemplate.replace(/m-page-2">/gi, 'm-page-2">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page2_header"'));
    
        /**
         * A Switchlayout with a header and content
         * @type {*|Object|void}
         */
        M.SwitchHeaderContentLayout = M.SwitchLayout.extend({
    
            _type: 'M.SwitchHeaderContentLayout',
    
            /**
             * the template - a combination of the header and switch template
             * @type {string}
             */
            template: myTemplate,
    
            cssClass:'switch-header-content-layout',
    
            /**
             * The content gets mapped to the DOM via the Switchlayout. Then map the header to the Layout.
             * @param {Object} the views to display
             * @returns {SwitchHeaderContentLayout}
             */
            applyViews: function( settings ) {
    
                M.SwitchLayout.prototype.applyViews.apply(this, [settings]);
    
                if(!this.childViews[this._currentPage + '_header'] && settings.header){
                    this.setChildView(this._currentPage + '_header', settings.header);
                }
    
                if( settings.header && !this._firstRender ) {
                    this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html('');
                    this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html(settings.header.render().$el);
                }
    
                return this;
            }
        });
    
    
    })(this);
    // Copyright (c) 2013 M-Way Solutions GmbH
    // http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt
    
    /**
     *
     * @module M.SwitchLayout
     * @type {*}
     * @extends M.Layout
     */
    M.SplitLayout = M.SwitchLayout.extend({
    
        /**
         * The type of the Layout
         */
        _type: 'M.SplitLayout',
    
        /**
         * Bootstrap grid class for the left container
         * @type {String}
         */
        gridLeft: 'col-xs-4',
    
        /**
         * Bootstrap grid class for the right container
         * @type {String}
         */
        gridRight: 'col-xs-8',
    
        /**
         * The template of the Layout
         */
        template: '<div id="m-main" class="m-perspective"><div id="leftContainer"><div class="m-page m-page-1"><div data-childviews="left_page1"></div></div><div class="m-page m-page-2"><div data-childviews="left_page2"></div></div></div><div id="rightContainer"><div class="m-page m-page-1"><div data-childviews="content_page1" class="content-wrapper"></div></div><div class="m-page m-page-2"><div data-childviews="content_page2" class="content-wrapper"></div></div></div></div>',
    
        /**
         * The SwitchLayout has two container to display the content. This attribute determines which of those 2 is active at the moment
         */
        _currentPage: null,
    
        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
        },
    
        /**
         * Map views to dom
         * @param settings
         * @returns {M.SplitLayout}
         */
        applyViews: function( settings, firstInit ) {
    
            var newContent = this._mapViews(this._currentContent, 'content', settings.content);
            var newLeft = this._mapViews(this._currentLeft, 'left', settings.left);
    
            this._startTransition(settings.left, settings.content);
    
            this._currentContent = newContent;
            this._currentLeft = newLeft;
    
            return this;
        },
    
        /**
         * Starts a transition if the given page is currently not visible.
         *
         * @param leftView
         * @param contentView
         * @private
         */
        _startTransition: function( leftView, contentView ) {
    
            var currentContentView = this.getChildView(this._currentContent);
            var currentLeftView = this.getChildView(this._currentLeft);
    
            if( currentContentView && currentContentView !== contentView ) {
                this.rightTransition.startTransition();
            }
    
            if( currentLeftView && currentLeftView !== leftView ) {
                this.leftTransition.startTransition();
            }
        },
    
        /**
         * This method is responsible to add the view in the layout template.
         *
         * @param current {String}
         * @param dataChildViewName {String}
         * @param view {M.View}
         * @returns {String}
         * @private
         */
        _mapViews: function( current, dataChildViewName, view ) {
    
            var nameA = dataChildViewName + '_page1';
            var nameB = dataChildViewName + '_page2';
    
            if( this.getChildView(current) === view || !view ) {
                if( !view ) {
                    // The given view is null so clear the dom
                    this.$el.find('[data-childviews="' + nameA + '"]').html('');
                    this.$el.find('[data-childviews="' + nameB + '"]').html('');
                }
                return current;
            }
    
            if( current === null || current === undefined || current === nameB ) {
                current = nameA;
            } else if( current === nameA ) {
                current = nameB;
            }
    
            if( view && !this.childViews[current] ) {
                this.setChildView(current, view);
            } else if( view && this.childViews[current] !== view ) {
                this.setChildView(current, view);
            }
    
            if( !this._firstRender && view ) {
                //clear the dom before inserting the view
                this.$el.find('[data-childviews="' + current + '"]').html('');
                //insert the view
                this.$el.find('[data-childviews="' + current + '"]').html(view.render().$el);
            }
    
            M.Layout.prototype.applyViews.apply(this, arguments);
    
            return current;
        },
    
        /**
         * Initialize the Transitions on first render then call the prototype
         * @private
         */
        _postRender: function() {
    
            // Add grid classes
            this._getLeftContainer().addClass(this.gridLeft);
            this._getRightContainer().addClass(this.gridRight);
    
            if( this._firstRender ) {
                // Init transitions
                this.rightTransition = M.PageTransitions.design().init(this._getRightContainer());
                this.leftTransition = M.PageTransitions.design().init(this._getLeftContainer());
    
                setTimeout(_.bind(this._initRequire, this), 0);
            }
    
            // Call super
            M.Layout.prototype._postRender.apply(this, arguments);
    
            return this;
        },
    
        /**
         * Initialize the media queries helper 'enquire.js'
         *
         * @private
         */
        _initRequire: function() {
    
            // On mobile devices we only support the portrait orientation
            if( Modernizr.Detectizr.device.type === 'mobile' ) {
                this._onPortrait();
                return;
            }
    
            enquire.register('screen and (orientation: landscape)', {
                match: _.bind(this._onLandscape, this),
                unmatch: _.bind(this._onPortrait, this)
            });
    
            if (window.innerWidth < window.innerHeight) {
                this._onPortrait();
            } else {
                this._onLandscape();
            }
        },
    
        _onLandscape: function() {
            this.$el.addClass('full').removeClass('single');
            this._getLeftContainer().attr('class', '');
    
            this._getLeftContainer().addClass(this.gridLeft);
            this._getRightContainer().addClass(this.gridRight);
    
            this.onLandscape();
        },
    
        _onPortrait: function() {
            this.$el.addClass('single').removeClass('full');
            this._getLeftContainer().attr('class', '');
    
            this.closeLeftContainer();
            this._getRightContainer().addClass(this.gridRight).addClass('col-xs-12');
    
            this.onPortrait();
        },
    
        onLandscape: function() {
    
        },
    
        onPortrait: function() {
    
        },
    
        /**
         * Returns an jQuery element which represents the left container
         *
         * @returns {*|Mixed}
         * @private
         */
        _getLeftContainer: function() {
            return this.$el.find('#leftContainer');
        },
    
        /**
         * Returns an jQuery element which represents the right container
         *
         * @returns {*|Mixed}
         * @private
         */
        _getRightContainer: function() {
            return this.$el.find('#rightContainer');
        },
    
        isAnimating: function() {
            return this.rightTransition.isAnimating() || this.leftTransition.isAnimating();
        },
    
        toggleLeftContainer: function() {
            this._getLeftContainer().toggleClass('close');
        },
    
        openLeftContainer: function() {
            this._getLeftContainer().removeClass('close');
        },
    
        closeLeftContainer: function() {
    
            if( this.$el.hasClass('single') ) {
                this._getLeftContainer().addClass('close');
    
            }
        }
    });
    
    // iOS 7 orientation change bug
    // https://github.com/WickyNilliams/enquire.js/issues/79#issuecomment-27275481
    (function () {
        if (Modernizr.Detectizr.device.os === 'ios') {
            document.addEventListener('DOMContentLoaded', function () {
                var shim = document.createElement('div');
                shim.id = 'ios7-matchMedia-fix';
                document.body.appendChild(shim);
    
                var timer,
                    forceReflow = function () {
                        // Triggering a reflow/repaint fixes the problem.
                        shim.style.width = (window.innerWidth / 2) + 'px';
                    },
                    onResize = function () {
                        clearTimeout(timer);
                        timer = setTimeout(forceReflow, 100);
                    };
    
                window.addEventListener('resize', onResize, false);
            });
        }
    })();

})(this, Backbone, _, $);
