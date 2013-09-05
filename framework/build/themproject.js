// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Version:   0.0.0
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
// Date:      Thu Aug 08 2013 23:52:08
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================
// Source: src/core/m.js
(function() {
    /**
     * Defines the general namespace
     * @type {Object}
     */
    M = {};

    /**
     * Version number of current release
     * @type {String}
     */
    M.Version = M.version = '2.0';

    /**
     * Empty function to be used when
     * no functionality is needed
     *
     * @type {Function}
     */
    M.f = function() {};

    M.create = function(x,y) {
        return new this(x,y);
    };

    M.isCollection = function (collection) {
        return Backbone.Collection.prototype.isPrototypeOf(collection);
    };

    M.isModel = function (model) {
        return Backbone.Model.prototype.isPrototypeOf(model);
    };


//    M.create = function() {
//        return this.apply(this, arguments);
//    };

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

    return M;

})();
// Source: src/core/const.js
/**
 * @class
 *
 * M.CONST defines constants used all over the framework.
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

    /***
     * Data type Constants.
     */
    TYPE: {
        INTEGER:    "integer",

        STRING:     "string",

        TEXT:       "text",

        DATE:       "date",

        BOOLEAN:    "boolean",

        FLOAT:      "float",

        OBJECT:     "object",

        ARRAY:      "array",

        BINARY:     "binary",

        OBJECTID:   "objectid",

        NULL:       "null"
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
     * M.CONST.ERROR.WEBSQL_TOO_LARGE               203     The statement failed because the data returned from the database was too large. The SQL "LIMIT" modifier might be useful to reduce the size of the result set.
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
         * "The transaction failed for reasons unrelated to the database itself and not covered by any other error code."
         * Error code in WebSQL specification: 0
         *
         * @type Number
         */
        WEBSQL_UNKNOWN: 200,

        /**
         * A constant value for an error occuring with WebSQL.
         * "The statement failed for database reasons not covered by any other error code."
         * Error code in WebSQL specification: 1
         *
         * @type Number
         */
        WEBSQL_DATABASE: 201,

        /**
         * A constant value for an error occuring with WebSQL.
         * "The transaction failed for reasons unrelated to the database itself and not covered by any other error code."
         * Error code in WebSQL specification: 2
         *
         * @type Number
         */
        WEBSQL_VERSION: 202,

        /**
         * A constant value for an error occuring with WebSQL.
         * "The statement failed because the data returned from the database was too large. The SQL "LIMIT" modifier might be useful to reduce the size of the result set."
         * Error code in WebSQL specification: 3
         *
         * @type Number
         */
        WEBSQL_TOO_LARGE: 203,

        /**
         * A constant value for an error occuring with WebSQL.
         * "The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database."
         * Error code in WebSQL specification: 4
         *
         * @type Number
         */
        WEBSQL_QUOTA: 204,

        /**
         * A constant value for an error occuring with WebSQL.
         * "The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only."
         * Error code in WebSQL specification: 5
         *
         * @type Number
         */
        WEBSQL_SYNTAX: 205,

        /**
         * A constant value for an error occuring with WebSQL.
         * "An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row."
         * Error code in WebSQL specification: 6
         *
         * @type Number
         */
        WEBSQL_CONSTRAINT: 206,

        /**
         * A constant value for an error occuring with WebSQL.
         * "A lock for the transaction could not be obtained in a reasonable time."
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
    }
};
// Source: src/core/object.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Marco
// Date:      08.01.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

//M.Object = function() {};
//
//M.Object.extend = Backbone.Model.extend;
//
//M.Object.create = function(properties) {
//    var f = this.extend(properties);
//    return new f();
//};

/**
 * @class
 */
// _.extend(M.Object.prototype, /** @scope M.Object.prototype */{
M.Object = {
    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Object',

    /**
     * This property is used internally in combination with the callFromSuper method.
     *
     * @private
     * @type Object
     */
    _lastThis: null,

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
        var f = function() {};
        f.prototype = proto;
        return new f();
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
    extend: function( properties ) {
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
            var i = obj.getInterface();
            _.each(i, function( value, key ) {
                if( _.contains(this.keys(), key) ) {
                    i[key] = null;
                    delete i[key];
                }
            }, this);
            this.include(i);

            this._implementedInterfaces = this._implementedInterfaces || [];
            this._implementedInterfaces.push(obj);
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
        }
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
     * This method returns the prototype implementation of a certain function but binds
     * it to the 'this' pointer.
     *
     * @param functionName
     * @param {Array} params
     * @return {Function} The context bound function.
     */
    callFromSuper: function( functionName, params ) {
        var bind = Object.getPrototypeOf(this);
        if( M.Object._lastThis === this ) {
            bind = Object.getPrototypeOf(bind);
        } else {
            M.Object._lastThis = this;
        }
        return this.bindToCaller(this, bind[functionName], _.isArray(params) ? params : [params])();
    },

    /**
     * Define hidden property
     * @param {String} name
     * @param {Mixed} value
     */
    defineHiddenProperty: function( name, value ) {
        this.defineProperty(name, value, {
            writable: YES,
            enumerable: NO,
            configurable: YES
        });
    },

    /**
     * Define readonly property on object
     *
     * @param {String} name
     * @param {Mixed} value
     */
    defineReadonlyProperty: function( name, value ) {
        this.defineProperty(name, value, {
            writable: NO,
            enumerable: YES,
            configurable: YES
        });
    },

    /**
     * Define new property on object and set hidden/readonly flags.
     *
     * @param {String} name
     * @param {Mixed} value
     * @param {Object} config
     */
    defineProperty: function( name, value, config ) {
        config = config || {};
        Object.defineProperty(this, name, {
            writable: !!config.writable,
            enumerable: !!config.enumerable,
            configurable: !!config.configurable,
            value: value
        });
    },

    /**
     * Returns an array of keys of the objects public own properties.
     *
     * @return {Array}
     */
//    keys: function() {
//        return Object.keys(this);
//    },

    /**
     * Returns the type of the object.
     *
     * @return {String}
     */
    getObjectType: function() {
        return this._type;
    }

};
// Source: src/core/logger.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Stefan
// Date:      12.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.Logger defines the prototype for any logging object.
 * It is used to log messages out of the application.
 *
 * @extends M.Object
 */
M.Logger = M.Object.extend(/** @scope M.Logger.prototype */ {

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
    _init: function () {

        // Prevent a console.log from blowing things up if we are on a browser that doesn't support this.
        if (_.isUndefined(console)) {
            window.console = {};
            console.log = console.debug = console.warn = console.error = function () {};
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
    log: function (tag, message) {
        this._print(this._OUTPUT_LOG, arguments);
    },

    /**
     * This method is used to log a message on logging level warning.
     *
     * @param {String/Array} tag
     * @param {...*} message The logging message.
     */
    warn: function (tag, message) {
        this._print(this._OUTPUT_WARN, arguments);
    },

    /**
     * This method is used to log a message on logging level error.
     *
     * @param {String/Array} tag
     * @param {...*} message The logging message.
     */
    error: function (tag, message) {
        this._print(this._OUTPUT_ERROR, message, tag);
    },

    /**
     * Starts a new timer with an associated label.
     *
     * @param {String}
     */
    time: function (label) {

        // Are we in production mode, then do not throw any logs
        if (this._appRunsInNotDebugMode) {
            return;
        }

        // Fallback if the browser doesn't support time
        if (_.isUndefined(console.time2)) {
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
    timeEnd: function (label) {

        // Are we in production mode, then do not throw any logs
        if (this._appRunsInNotDebugMode) {
            return;
        }

        // Fallback if the browser doesn't support timeEnd
        if (_.isUndefined(console.timeEnd2)) {
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
    count: function (label) {

        // Are we in production mode, then do not throw any logs
        if (this._appRunsInNotDebugMode) {
            return;
        }

        // Fallback if the browser doesn't support count
        if (_.isUndefined(console.count2)) {
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
    _print: function (output, args) {

        // Are we in production mode, then do not throw any logs
        if (this._appRunsInNotDebugMode) {
            return;
        }

        // Assign default level if level is undefined
        output = output || this._OUTPUT_LOG;

        args = Array.prototype.slice.call(args);

        // Assign default tag if tag is undefined
        if(args.length == 1) {
            args.splice(0,0, M.CONST.LOGGER.TAG_ALL);
        }

        var tags = args[0];

        if (this._preventOutputByTag(tags)) {
            return;
        }

        var prettyTagName = '';
        if (output < this._OUTPUT_ERROR) {
            if (_.isArray(tags) && this.filter.length > 0) {
                var tagString = _.without(this.filter, tags);
                prettyTagName = '[' + tagString + ']';
            } else if (tags.length > 0) {
                prettyTagName = '[' + tags + ']';
            }
        }

        if(args.length > 1) {
            if(prettyTagName == M.CONST.LOGGER.TAG_ALL) {
                args.splice(0,1);
            } else {
               args[0] = prettyTagName;
            }
        }

        switch (output) {
            case this._OUTPUT_LOG:
                console.log.apply(console, args);
                break;
            case this._OUTPUT_WARN:
                args.splice(0,0, 'WARNING:')
                console.warn.apply(console, args);
                break;
            case this._OUTPUT_ERROR:
                args.splice(0,0, 'ERROR:')
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
    _time: function (label) {
        var item = _.find(this._times, function (item) {
            return item.label === label;
        });
        if (!item) {
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
    _timeEnd: function (label) {
        var item = _.find(this._times, function (item) {
            return item.label === label;
        });
        if (item) {
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
    _count: function (label) {
        var item = _.find(this._counts, function (item) {
            return item.label === label;
        });
        if (item === undefined) {
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
    _preventOutputByTag: function (tag) {
        if (this.filter.length > 0 && this.filter.indexOf(M.CONST.TAG_ALL) === -1) {
            if (_.isString(tag)) {
                if (this.filter.indexOf(tag) === -1) {
                    return YES;
                }
            } else if (_.isArray(tag)) {
                if (_.difference(tag, this.filter).length === tag.length) {
                    return YES;
                }
            }
        }
        return NO;
    }

});
// Source: src/core/view_manager.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.ViewManager = M.Object.extend(/** @scope M.ViewManager.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.ViewManager',

    /**
     * This property contains the numerical index of the next view id to be
     * assigned. Whenever a component derived from M.View is generated,
     * an ID will be calculated based on this number and a static prefix which
     * is defined with the idPrefix property.
     *
     * @type Number
     */
    nextId: 0,

    /**
     * The prefix for the view IDs.
     *
     * @type String
     */
    idPrefix: 'm_',

    /**
     * This property contains a lookup map with all views within an application.
     *
     * @type Object
     * @private
     */
    _views: null,

    /**
     * This property is used internally to temporarily store a found view when looking
     * for it recursively.
     */
    _foundView: null,

    /**
     * This method returns a unique ID based on nextId and idPrefix. Each view within an
     * application get their own unique ID. This ID is stored both in the view's _id
     * property but also added to the view's DOM representation as the HTML id tag.
     *
     * @returns {String} The ID of a view.
     */
    getNewId: function( view ) {
        this.nextId = this.nextId + 1;

        var id = this.idPrefix + this.nextId;
        this.addView(view, id);

        return id;
    },

    addView: function(view, id){
        if(!id){
            id = view.cid
        }
        this._views[id] = view;
    },

    /**
     * This method initialized the view manager.
     */
    _init: function() {
        this.callFromSuper('_init');

        this._views = {};
    },

    /**
     * This method will return a view object based on a given ID.
     *
     * @param id
     * @returns M.View
     */
    getViewById: function( id ) {
        return this._views[id];
    },

    /**
     * Returns the view object from the view list array identified by the view's
     * name and its surrounding view. If there are multiple views with the same
     * name on the same surrounding view, the first result is returned.
     *
     * Note: Try to use unique names for your views within the same surrounding view!
     *
     * @param {M.View} parentView The parent view to search in.
     * @param {String} targetView The name of the view to be returned.
     * @returns {Object} The view object from the view list identified by the view's name and the page where it's on.
     */
    getView: function( parentView, targetView ) {
        if( !(parentView.isMView && parentView.hasChildViews()) ) {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UI, 'The given parentView in M.ViewManager.getView() is no valid view or does not provide any child views.');
            return null;
        }

        /* reset the temp. stored view */
        this._foundView = null;

        /* look for it recursively */
        this._findView(parentView, targetView);

        if( !this._foundView ) {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UI, 'The view \'' + targetView + '\' could not be found.');
        }

        return this._foundView;
    },

    /**
     * Searches for a certain view within a given parent view. If it is found, the result
     * is returned. Otherwise the search algorithm checks for possible child views and then
     * recursively searches within these child views for the target view.
     *
     * This method is a private function and mainly used by the getView() method to find a
     * view within a page.
     *
     * @param {M.View} parentView The parent view to search in.
     * @param {String} targetView The name of the view to be returned.
     * @private
     */
    _findView: function( parentView, targetView ) {
        if( !(parentView.isMView && parentView.hasChildViews()) ) {
            return;
        }

        var childViewsAsArray = parentView._getChildViewsAsArray();
        for( var i in childViewsAsArray ) {
            var childView = childViewsAsArray[i];
            if( targetView === childView ) {
                this._foundView = parentView[childView];
            } else {
                this._findView(parentView[childView], targetView);
            }
        }
    },

    /**
     * This method removes a given view from the internally used hash map that contains
     * all views used within an application.
     *
     * @param view
     */
    deleteView: function( view ) {
        if( view && view.isMView && view.getId() ) {
            delete this._views[view.getId()];
        }
    }

});
// Source: src/core/application.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      07.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================


M.Application = function() {

};

Backbone.Layout.configure({
    manage: true
});

_.extend(M.Application.prototype, Backbone.Events, {

    _type: 'M.Application',

    start: function() {
        Backbone.history.start();
    }
});
// Source: src/utility/i18n.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Stefan
// Date:      12.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

//m_require('core/foundation/object.js');

/**
 * @class
 *
 * M.I18N defines a prototype for internationalisation and localisation within
 * The M-Project. It is used to set and get the application's language and to
 * localize any string within an application.
 *
 * @extends M.Object
 */
M.I18N = M.Object.extend(/** @scope M.I18N.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.I18N',


    /**
     * The default language code.
     *
     * @type String
     * @private
     */
    _defaultLanguageCode: '',

    /**
     * The current language code.
     *
     * @type String
     * @private
     */
    _currentLanguageCode: '',


    /**
     * The current language object.
     *
     * @type Object
     * @private
     */
    _currentLanguage: null,

    /**
     *
     * @type {Object}
     * @private
     */
    _languages: {},

    /**
     * This property is used to map the navigator's language to an ISO standard
     * if necessary. E.g. 'de' will be mapped to 'de_de'. Currently we only provide
     * support for english and german. More languages are about to come or can be
     * added by overwriting this property.
     *
     * @type Object
     */
    _languageMapper: {
        en: 'en_us',
        de: 'de_de'
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language.
     *
     * @param {String} key The key to the localized string.
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     */
    l: function( key, context ) {
        return this._localize(key, context);
    },

    /**
     * This method sets the applications current language.
     *
     * @param {String} language The language to be set.
     */
    setCurrentLanguageCode: function( languageCode ) {

        if( languageCode && languageCode == this._currentLanguageCode ) {
            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Language \'' + languageCode + '\' already selected');
            return;
        }

        if( !this.isLanguageAvailable(languageCode) ) {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'There is no language \'' + languageCode + '\' specified using default language \'' + this._defaultLanguageCode + '\' instead!');
            this._currentLanguageCode = this._defaultLanguageCode;
        } else {
            this._currentLanguageCode = languageCode;
        }

        this._resetCurrentLanguage();

        // TODO: Save languageCode in local storage

        // TODO: Forces reload
        //location.href = location.protocol + '//' + location.host + location.pathname;
    },

    /**
     * This method is used to get a language for the current user. This process is divided
     * into three steps. If one step leads to a language, this on is returned. The steps are
     * prioritized as follows:
     *
     * - get the user's language by checking his navigator
     * - use the application's default language
     * - use the systems's default language
     *
     * @returns {String} The user's language.
     */
    getCurrentLanguageCode: function() {
        var language = null;

        // TODO: Get languageCode from local storage

        if( language ) {
            return language;
        }

        if( navigator ) {
            var regexResult = /([a-zA-Z]{2,3})[\s_.-]?([a-zA-Z]{2,3})?/.exec(navigator.language);
            if( regexResult && this[regexResult[0]] ) {
                return regexResult[0].toLowerCase();
            } else if( regexResult && regexResult[1] && this._languageMapper[regexResult[1]] ) {
                var language = this._languageMapper[regexResult[1]];
                return language.toLowerCase();
            } else {
                return this._defaultLanguageCode;
            }
        }

        return this._defaultLanguageCode;
    },


    setDefaultLanguageCode: function( languageCode ) {
        this._defaultLanguageCode = languageCode;
    },

    /**
     * This method adds a new language with the given languageCode.
     *
     * @param {String} languageCode
     * @param {Object} language
     */
    addLanguage: function( languageCode, language ) {

        var lang = this._parseObject(language);
        this._languages[languageCode] = _.extend({}, this._languages[languageCode], lang);

        // Force _getLanguage
        this._resetCurrentLanguage();
    },

    /**
     * This method returns a list of all available languages.
     *
     * @returns {Array} The available languages.
     */
    getAvailableLanguages: function() {
        var list = [];
        for( key in this._languages ) {
            list.push(key);
        }
        return list;
    },

    /**
     * This method checks if the passed language is available within the app or not.
     *
     * @param {String} languageCode The language to be checked.
     * @returns {Boolean} Indicates whether the requested language is available or not.
     */
    isLanguageAvailable: function( languageCode ) {

        var lang = this._languages[languageCode];
        if( lang && _.isObject(lang) ) {
            return YES;
        } else {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'No language \'' + languageCode + '\' specified.');
            return NO;
        }
    },

    /**
     * Returns a language with given languageCode.
     *
     * @param {String} languageCode Language which should be returned.
     * @returns {Object} An object containing value parts for the translated string
     */
    _getLanguage: function( languageCode ) {
        if( this.isLanguageAvailable(languageCode) ) {
            return this._languages[languageCode];
        }
        return this._languages[this._defaultLanguageCode];
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language. It is internally used as a wrapper for l() for
     * a better readability.
     *
     * @param {String} key The key to the localized string.
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     * @private
     */
    _localize: function( key, context ) {

        var translation;

        if( !this._currentLanguage ) {
            this._currentLanguage = this._getLanguage(this._currentLanguageCode);
        }

        var translation = this._currentLanguage[key];


        if( !translation ) {
            var defaultLanguage = this._getLanguage(this._defaultLanguageCode);
            if( defaultLanguage && defaultLanguage[key] ) {
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Key \'' + key + '\' not defined for language \'' + this._currentLanguageCode + '\', switched to default language \'' + this._defaultLanguageCode + '\'');
                translation = defaultLanguage[key];
            }
        }

        if( !translation ) {
            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Key \'' + key + '\' not defined for both language \'' + this._currentLanguageCode + '\' and the system\'s default language \'' + this._defaultLanguageCode + '\'');
            translation = key;
        }

        if( context ) {
            try {
                translation = _.template(translation, context);
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Error in I18N: Check your context object and the translation string with key "' + key + '". Error Message: ' , e);
            }
        }

        return translation;
    },

    /**
     * Set the current language to null to force a reassignment.
     *
     * @private
     */
    _resetCurrentLanguage: function() {
        this._currentLanguage = null;
    },

    /**
     * Return a flattened version of an object.
     *
     * @param {Object} obj To flatten object
     * @returns {Object}
     *
     * @private
     */
    _parseObject: function( obj ) {
        var result = {};
        for( var key in obj ) {
            if( !obj.hasOwnProperty(key) ) {
                continue;
            }
            if( _.isObject(obj[key]) ) {
                var flatObject = this._parseObject(obj[key]);
                for( var childKey in flatObject ) {
                    if( !flatObject.hasOwnProperty(childKey) ) {
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
});
// Source: src/utility/objectid.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      14.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

// ===========================================================================
//
// M.ObjectId uses code from meteor.js
// https://github.com/meteor/meteor/blob/master/packages/minimongo
//
// Thanks for sharing!
//
// ===========================================================================

// m_require('core/foundation/object.js');
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
                throw new Error("Invalid hexadecimal string for creating an ObjectID");
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
            str = "0"+str;
        }
        return str.substr(0, len);
    },

    toString: function() {
        return "ObjectID(\"" + this._str + "\")";
    },

    equals: function( other ) {
        return other instanceof this._ObjectID && this.valueOf() === other.valueOf();
    },

    clone: function() {
        return new M.ObjectID(this._str);
    },

    typeName: function() {
        return "oid";
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
        return (typeof selector === "string") || 
            (typeof selector === "number") || 
            selector instanceof M.ObjectId;
    },

    // Is the selector just lookup by _id (shorthand or not)?
    _selectorIsIdPerhapsAsObject: function( selector ) {
        return this._selectorIsId(selector) || 
            (selector && typeof selector === "object" && 
             selector._id && this._selectorIsId(selector._id) && 
             _.size(selector) === 1);
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
// Source: src/utility/uuid.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

// Returns a unique identifier

// m_require('core/foundation/object.js');

M.UniqueId = M.Object.extend({
    uuid: function(len, radix) {
        // based on Robert Kieffer's randomUUID.js at http://www.broofa.com
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        //len = len ? len : 32; 
        radix = radix || chars.length;
        var i;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
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
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
});
// Source: src/connection/request.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      13.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.Request = M.Object.extend(/** @scope M.Request.prototype */{

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
        return this.extend(obj);
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
    }

});
// Source: src/connection/request_manager.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      13.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.RequestManager = M.Object.extend(/** @scope M.RequestManager.prototype */{

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
     * This method is based on M.Object's extend() but adds some request manager specific
     * features. It creates a new instance of M.RequestManager based on the given
     * configuration properties.
     *
     * @param obj
     * @returns {M.RequestManager}
     */
    init: function( obj ) {
        return this.extend(obj);
    },

    /**
     * This method is used internally to process the configuration object for the request
     * manager before handing it to the extend method. The job of this method is to make
     * sure that the configuration object fits the requirements of the extend process.
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
// Source: src/connection/socket_io.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      21.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.SocketIO = M.Object.extend(/** @scope M.SocketIO.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.SocketIO',

    /**
     * The host name of the socket.io server.
     *
     * @type String
     */
    host: '',

    /**
     * The path to the socket.io instance on the server.
     *
     * @type String
     */
    path: '',

    /**
     * The path to the socket.io.js client script on the server.
     *
     * @type String
     */
    script: 'socket.io/socket.io.js',

    /**
     * This property is used to specifiy all events for a socket within an application.
     *
     * @type {Object}
     */
    events: null,

    /**
     * This property contains the socket connection.
     *
     * @type {Object}
     */
    _socket: null,

    /**
     * This property contains a socket's event handlers for all events.
     *
     * @type {Object}
     */
    _events: null,

    /**
     * This method is based on M.Object's extend() but adds some request specific features.
     * It creates a new instance of M.Request based on the given configuration properties.
     *
     * @param obj
     * @returns {M.Request}
     */
    create: function( obj ) {
        return this.extend(obj);
    },

    emit: function(event, data, callback) {
        this._socket.emit(event, data, callback);
    },

    on: function(eventType, handler) {
        var that = this;
        this._socket.on(eventType, function(data) {
            that.handleCallback(handler, data);
        });
    },

    disconnect: function() {
        var that = this;
        if (this._socket) {
            this._socket.removeAllListeners();
            this._socket.on('connect', function(data) {
                that._connected(data);
            });
            this._socket.on('disconnect', function(data) {
                that._disconnect(data);
            });
        }
        this._socket.disconnect();
    },

    connect: function(param) {
        var that = this;
        var url  = this.host + "/" + this.path;
        if (param) {
            url += "?" + (_.isString(param) ? param : $.param(param));
        }
        this._socket = io.connect(url);
        this._socket.on('connect', function(data) {
            that.connected(data);
        });
        that._registerEvents();
    },

    ready: function() {
        this.connect();
    },

    error: function(message) {
        console.log(message);
    },

    /**
     * This method returns the event handler of a certain event type of a socket.
     *
     * @param eventType
     * @returns {*}
     */
    getEventHandler: function( eventType ) {
        return this._events[eventType];
    },

    /**
     * M.SocketIO's _init method.
     *
     * @private
     */
    _init: function() {
        if ( Object.getPrototypeOf(this) === M.SocketIO ) {
            this._initEvents();
            var socket_io_js = this.host + "/" + this.script;
            var that = this;
            require([socket_io_js], function() {
                that.ready();
            });
        }
    },

    /**
     * This method is used to init a socket's event lists.
     *
     * @private
     */
    _initEvents: function() {
        this.events = this.events || {};
        this._events = {};

        _.each(this.events, function( handler, eventName ) {
            this._addEvent(name, handler)
        }, this);
    },

    _addEvent: function(eventName, handler) {
        if( _.isFunction(handler)) {
            handler = { action: handler };
        }
        if (!handler.target ) {
            handler.target = this;
        }
        this._events[eventName] = handler;
    },

    /**
     * This method registers all socket's events.
     *
     * @private
     */
    _registerEvents: function() {
        var that = this;
        this._socket.on('disconnect', function(data) {
            that.disconnect(data)
        } );
        _.each(this._events, function( handler, eventType ) {
            this._socket.on(eventType, function(data) {
                that.handleCallback(handler, data);
            });
        }, this);
    },

    connected: function(data) {
    },

    disconnect: function(data) {
    }

});
// Source: src/data/field.js
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      13.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.Field = function(options) {
    this.merge(options);
    this.initialize.apply(this, arguments);
};

M.Field.extend = Backbone.Model.extend;

M.Field.create = M.create;
_.extend(M.Field.prototype, M.Object, {

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Field',

    name: null,

    type: null,

    defaultValue: undefined,

    length: null,

    required: NO,

    persistent: YES,

    initialize: function() {
    },

    create: function( config ) {
        var field = this.extend({
            name:       config.name,
            type:       config.type,
            defaultValue:    config.defaultValue,
            length:     config.length,
            required:   config.required,
            persistent: config.persistent
        });
        return field;
    },

    merge: function(obj) {
        this.name       = !_.isUndefined(obj.name)       ? obj.name       : this.name;
        this.type       = !_.isUndefined(obj.type)       ? obj.type       : this.type;
        this.defaultValue    = !_.isUndefined(obj.defaultValue)    ? obj.defaultValue    : this.defaultValue;
        this.length     = !_.isUndefined(obj.length)     ? obj.length     : this.length;
        this.required   = !_.isUndefined(obj.required)   ? obj.required   : this.required;
        this.persistent = !_.isUndefined(obj.persistent) ? obj.persistent : this.persistent;
    },

    transform: function( value, type ) {
        type = type || this.type;
        try {
            if( _.isUndefined(value) ) {
                return this.defaultValue;
            }
            if( type === M.CONST.TYPE.STRING || type === M.CONST.TYPE.TEXT ) {
                if( _.isObject(value) ) {
                    return JSON.stringify(value);
                } else {
                    return _.isNull(value) ? 'null' : value.toString();
                }
            } else if( type === M.CONST.TYPE.INTEGER ) {
                return parseInt(value);
            } else if( type === M.CONST.TYPE.BOOLEAN ) {
                return value == true || value === 'true'; // true, 1, "1" or "true"
            } else if( type === M.CONST.TYPE.FLOAT ) {
                return parseFloat(value);
            } else if( type === M.CONST.TYPE.OBJECT || type === M.CONST.TYPE.ARRAY) {
                if( !_.isObject(value) ) {
                    return _.isString(value) ? JSON.parse(value) : null;
                }
            } else if( type === M.CONST.TYPE.DATE ) {
                if( !M.Date.isPrototypeOf(value) ) {
                    var date = value ? M.Date.create(value) : null;
                    return date && date.isValid() ? date : null;
                }
            } else if( type === M.CONST.TYPE.OBJECTID ) {
                if( !M.ObjectID.prototype.isPrototypeOf(value) ) {
                    return _.isString(value) ? new M.ObjectID(value) : null;
                }
            }
            return value;
        } catch( e ) {
            M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Failed converting value! ' + e.message);
        }
    },

    equals: function( a, b ) {
        var v1 = this.transform(a);
        var v2 = this.transform(b);
        return this._equals(v1, v2, _.isArray(v1));
    },

    isBinary: function( obj ) {
        return (typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array) || (obj && obj.$Uint8ArrayPolyfill);
    },

    detectType: function( v ) {
        if( _.isNumber(v) ) {
            return M.CONST.TYPE.FLOAT;
        }
        if( _.isString(v) ) {
            return M.CONST.TYPE.STRING;
        }
        if( _.isBoolean(v) ) {
            return M.CONST.TYPE.BOOLEAN;
        }
        if( _.isArray(v) ) {
            return M.CONST.TYPE.ARRAY;
        }
        if( _.isNull(v) ) {
            return M.CONST.TYPE.NULL;
        }
        if( _.isDate(v) || M.Date.isPrototypeOf(v) ) {
            return M.CONST.TYPE.DATE;
        }
        if( M.ObjectID.prototype.isPrototypeOf(v) ) {
            return M.CONST.TYPE.OBJECTID;
        }
        if( this.isBinary(v) ) {
            return M.CONST.TYPE.BINARY;
        }
        return M.CONST.TYPE.OBJECT;
    },

    typeOrder: function(type) {
        switch(type) {
            case M.CONST.TYPE.NULL   : return 0;
            case M.CONST.TYPE.FLOAT  : return 1;
            case M.CONST.TYPE.STRING : return 2;
            case M.CONST.TYPE.OBJECT : return 3;
            case M.CONST.TYPE.ARRAY  : return 4;
            case M.CONST.TYPE.BINARY : return 5;
            case M.CONST.TYPE.DATE   : return 6;
        }
        return -1;
    },

    _equals: function( a, b, keyOrderSensitive ) {
        var that = this;
        var i;
        if( a === b ) {
            return true;
        }
        if( !a || !b ) { // if either one is false, they'd have to be === to be equal
            return false;
        }
        if( !(_.isObject(a) && _.isObject(b)) ) {
            return false;
        }
        if( a instanceof Date && b instanceof Date ) {
            return a.valueOf() === b.valueOf();
        }
        if( this.isBinary(a) && this.isBinary(b) ) {
            if( a.length !== b.length ) {
                return false;
            }
            for( i = 0; i < a.length; i++ ) {
                if( a[i] !== b[i] ) {
                    return false;
                }
            }
            return true;
        }
        if( _.isFunction(a.equals) ) {
            return a.equals(b, options);
        }
        if( _.isArray(a) ) {
            if( !_.isArray(b) ) {
                return false;
            }
            if( a.length !== b.length ) {
                return false;
            }
            for( i = 0; i < a.length; i++ ) {
                if( !that.equals(a[i], b[i], keyOrderSensitive) ) {
                    return false;
                }
            }
            return true;
        }
        // fall back to structural equality of objects
        var ret;
        if( keyOrderSensitive ) {
            var bKeys = [];
            _.each(b, function( val, x ) {
                bKeys.push(x);
            });
            i = 0;
            ret = _.all(a, function( val, x ) {
                if( i >= bKeys.length ) {
                    return false;
                }
                if( x !== bKeys[i] ) {
                    return false;
                }
                if( !that.equals(val, b[bKeys[i]], keyOrderSensitive) ) {
                    return false;
                }
                i++;
                return true;
            });
            return ret && i === bKeys.length;
        } else {
            i = 0;
            ret = _.all(a, function( val, key ) {
                if( !_.has(b, key) ) {
                    return false;
                }
                if( !that.equals(val, b[key], keyOrderSensitive) ) {
                    return false;
                }
                i++;
                return true;
            });
            return ret && _.size(b) === i;
        }
    },

    // compare two values of unknown type according to BSON ordering
    // semantics. (as an extension, consider 'undefined' to be less than
    // any other value.) return negative if a is less, positive if b is
    // less, or 0 if equal
    _cmp: function( a, b ) {
        if( a === undefined ) {
            return b === undefined ? 0 : -1;
        }
        if( b === undefined ) {
            return 1;
        }
        var ta = this.detectType(a);
        var tb = this.detectType(b);
        var oa = this.typeOrder(ta);
        var ob = this.typeOrder(tb);
        if( oa !== ob ) {
            return oa < ob ? -1 : 1;
        }
        if( ta !== tb ) {
            throw Error("Missing type coercion logic in _cmp");
        }
        if( ta === 7 ) { // ObjectID
            // Convert to string.
            ta = tb = 2;
            a = a.toHexString();
            b = b.toHexString();
        }
        if( ta === M.CONST.TYPE.DATE ) {
            // Convert to millis.
            ta = tb = 1;
            a = a.getTime();
            b = b.getTime();
        }
        if( ta === M.CONST.TYPE.FLOAT ) {
            return a - b;
        }
        if( tb === M.CONST.TYPE.STRING ) {
            return a < b ? -1 : (a === b ? 0 : 1);
        }
        if( ta === M.CONST.TYPE.OBJECT ) {
            // this could be much more efficient in the expected case ...
            var to_array = function( obj ) {
                var ret = [];
                for( var key in obj ) {
                    ret.push(key);
                    ret.push(obj[key]);
                }
                return ret;
            };
            return this._cmp(to_array(a), to_array(b));
        }
        if( ta === M.CONST.TYPE.ARRAY ) { // Array
            for( var i = 0; ; i++ ) {
                if( i === a.length ) {
                    return (i === b.length) ? 0 : -1;
                }
                if( i === b.length ) {
                    return 1;
                }
                var s = this._cmp(a[i], b[i]);
                if( s !== 0 ) {
                    return s;
                }
            }
        }
        if( ta === M.CONST.TYPE.BINARY ) {
            if( a.length !== b.length ) {
                return a.length - b.length;
            }
            for( i = 0; i < a.length; i++ ) {
                if( a[i] < b[i] ) {
                    return -1;
                }
                if( a[i] > b[i] ) {
                    return 1;
                }
            }
            return 0;
        }
        if( ta === M.CONST.TYPE.BOOLEAN ) {
            if( a ) {
                return b ? 0 : 1;
            }
            return b ? -1 : 0;
        }
        if( ta === M.CONST.TYPE.NULL ) {
            return 0;
        }
//        if( ta === M.CONST.TYPE.REGEXP ) {
//            throw Error("Sorting not supported on regular expression");
//        } // XXX
//        if( ta === 13 ) // javascript code
//        {
//            throw Error("Sorting not supported on Javascript code");
//        } // XXX
        throw Error("Unknown type to sort");
    }
});

// Source: src/data/entity.js
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      13.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.Entity = function(options) {
    var fields  = this.fields;
    this.fields = {};
    this._mergeFields(fields);
    options = options || {};
    if (options.fields) {
        this._mergeFields(options.fields);
    }
    this.typeMapping = options.typeMapping || this.typeMapping;
    this.collection  = options.collection  || this.collection;
    this.idAttribute = options.idAttribute || this.idAttribute ||
        (this.collection && this.collection.prototype.model ? this.collection.prototype.model.idAttribute : '');
    this._updateFields(this.typeMapping);
    this.initialize.apply(this, arguments);
};

M.Entity.from = function(entity, options) {
    // is not an instance of M.Entity
    if (!M.Entity.prototype.isPrototypeOf(entity)) {
        // if this is a prototype of an entity, create an instance
        if ( _.isFunction(entity) &&
             M.Entity.prototype.isPrototypeOf(entity.prototype)) {
            entity = new entity(options);
        } else {
            // if this is just a config create a new Entity
            var e  = M.Entity.extend(entity);
            entity = new e(options);
        }
    } else if (options && options.typeMapping) {
        entity._updateFields(options.typeMapping);
    }
    return entity;
};

M.Entity.extend = Backbone.Model.extend;

M.Entity.create = M.create;


_.extend(M.Entity.prototype, M.Object, {

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Entity',

    name: '',

    idAttribute: '',

    collection: null,

    model: null,

    fields: {},

    initialize: function() {
    },

    getFields: function() {
        return this.fields;
    },

    getField: function(fieldKey) {
        return this.fields[fieldKey];
    },

    getFieldName: function(fieldKey) {
        var field = this.getField(fieldKey);
        return field && field.name ? field.name : fieldKey;
    },

    getKey: function() {
        return this.idAttribute || M.Model.idAttribute;
    },

    getKeys: function() {
        return this.splitKey(this.getKey());
    },

    /**
      * Splits a comma separated list of keys to a key array
      *
      * @returns {Array} array of keys
      */
    splitKey: function(key) {
         var keys = [];
         if( _.isString(key) ) {
             _.each(key.split(","), function(key) {
                 var k = key.trim();
                 if( k ) {
                     keys.push(k);
                 }
             });
         }
         return keys;
    },

    _mergeFields: function(newFields) {
        if (!_.isObject(this.fields)) {
            this.fields = {};
        }
        var that = this;
        if (_.isObject(newFields)) {
            _.each(newFields, function(value, key) {
                if (!that.fields[key]) {
                    that.fields[key] = new M.Field(value);
                } else {
                    that.fields[key].merge(value);
                }
            });
        }
    },

    _updateFields: function(typeMapping) {
        var that = this;
        _.each(this.fields, function(value, key) {
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

    toAttributes: function(data, id) {
        if (data && !_.isEmpty(this.fields)) {
            // map field names
            var value, attributes = {};
            _.each(this.fields, function(field, key) {
                value = _.isFunction(data.get) ? data.get(field.name) : data[field.name];
                attributes[key] = value;
            });
            return attributes;
        }
        return data;
    },

    fromAttributes: function(attrs) {
        if (attrs && !_.isEmpty(this.fields)) {
            var data = {};
            _.each(this.fields, function(field, key) {
                var value = _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
                value = field.transform(value);
                if( !_.isUndefined(value) ) {
                    data[field.name] = value;
                }
            });
            return data;
        }
        return attrs;
    },

    setId: function(attrs, id) {
        if (attrs && id && this.idAttribute) {
            attrs[this.idAttribute] = id;
        }
        return attrs;
    },

    getId: function(attrs) {
        if (attrs && this.idAttribute) {
            return attrs[this.idAttribute];
        }
    }
});

// Source: src/data/model.js

M.Model = Backbone.Model.extend(M.Object);

M.Model.create = M.create;

_.extend(M.Model.prototype, {

    _type: 'M.Model',

    isModel: YES,

    entity: null,

    changedSinceSync: {},

    constructor: function(attributes, options) {
        options = options || {};

        this.idAttribute = options.idAttribute || this.idAttribute;
        if (this.store && _.isFunction(this.store.initModel)) {
            this.store.initModel(this, options);
        }
        if (this.entity) {
            this.entity = M.Entity.from(this.entity, { typeMapping: options.typeMapping });
            this.idAttribute = entity.idAttribute || this.idAttribute;
        }
        this.on('change', this.onChange, this);
        this.on('sync',   this.onSync, this);

        // call base constructor
        Backbone.Model.apply(this, arguments);
    },

    initialize: function(attributes, options) {
    },

    sync: function(method, model, options) {
        var store = (options ? options.store : null) || this.store;
        if (store && _.isFunction(store.sync)) {
            return store.sync.apply(this, arguments);
        } else {
            return Backbone.sync.apply(this, arguments);
        }
    },

    onChange: function(model, options) {
    // For each `set` attribute, update or delete the current value.
        var attrs = model.changedAttributes();
        if ( _.isObject(attrs)) {
            for (attr in attrs) {
                val = attrs[attr];
                this.changedSinceSync[attr] = val;
            }
        }
    },

    onSync: function(model, options) {
        this.changedSinceSync = {};
    }

});

// Source: src/data/collection.js
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

M.Collection = Backbone.Collection.extend(M.Object);

M.Collection.create = M.create;

_.extend(M.Collection.prototype, {

    _type: 'M.Collection',

    isCollection: YES,

    model: M.Model,

    entity: null,

    constructor: function(options) {
        options = options || {};
        this.connector = options.connector || this.connector || (this.model ? this.model.prototype.connector : null);
        this.entity    = options.entity || this.entity || (this.model ? this.model.prototype.entity : null);

        if (this.connector && _.isFunction(this.connector.initCollection)) {
            this.connector.initCollection(this, options);
        }
        if (this.entity) {
            this.entity = M.Entity.from(this.entity, { typeMapping: options.typeMapping });
        }
        // call base constructor
        Backbone.Collection.apply(this, arguments);
    },

    initialize: function(options) {
    },

    select: function(options) {
        var selector   = options.where ? M.DataSelector.create(options.where) : null;
        var collection = M.Collection.create(null, { model: this.model });

        _.each(this, function(model) {
            if (!selector || selector.matches(model.attributes)) {
                collection.add(model);
            }
        });

        if (options.sort) {
            collection.sortBy(M.DataSelector.compileSort(options.sort));
        }
        return collection;
    },

    sync: function(method, model, options) {
        var store = (options ? options.store : null) || this.store;
        if (store && _.isFunction(store.sync)) {
            return store.sync.apply(this, arguments);
        } else {
            return Backbone.sync.apply(this, arguments);
        }
    }

});

// Source: src/data/data_selector.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      14.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

// ===========================================================================
//
// M.DataSelector uses code from meteor.js
// https://github.com/meteor/meteor/tree/master/packages/minimongo
//
// Thanks for sharing!
//
// ===========================================================================

M.DataSelector = M.Object.extend({

    _type: 'M.DataSelector',

    _selector: null,

    create: function( docSelector ) {
        var selector = this.extend({
            _selector: null
        });
        selector.init(docSelector);
        return selector;
    },

    init: function (docSelector) {
        this._selector = this.compileSelector(docSelector);
    },

    matches: function( value ) {
        if( _.isFunction(this._selector) ) {
            return this._selector(value);
        }
        return false;
    },

    hasOperators: function( valueSelector ) {
        var theseAreOperators = undefined;
        for( var selKey in valueSelector ) {
            var thisIsOperator = selKey.substr(0, 1) === '$';
            if( theseAreOperators === undefined ) {
                theseAreOperators = thisIsOperator;
            } else if( theseAreOperators !== thisIsOperator ) {
                throw new Error("Inconsistent selector: " + valueSelector);
            }
        }
        return !!theseAreOperators;  // {} has no operators
    },

    // Given a selector, return a function that takes one argument, a
    // document, and returns true if the document matches the selector,
    // else false.
    compileSelector: function( selector ) {
        // you can pass a literal function instead of a selector
        if( selector instanceof Function ) {
            return function( doc ) {
                return selector.call(doc);
            };
        }

        // shorthand -- scalars match _id
        if( this._selectorIsId(selector) ) {
            return function( record ) {
                var id = _.isFunction(record.getId) ? record.getId() : (record._id || record.id);
                return M.DataField.equals(id, selector);
            };
        }

        // protect against dangerous selectors.  falsey and {_id: falsey} are both
        // likely programmer error, and not what you want, particularly for
        // destructive operations.
        if( !selector || (('_id' in selector) && !selector._id) ) {
            return function( doc ) {
                return false;
            };
        }

        // Top level can't be an array or true or binary.
        if( _.isBoolean(selector) || _.isArray(selector) || M.DataField.isBinary(selector) ) {
            throw new Error("Invalid selector: " + selector);
        }

        return this.compileDocSelector(selector);
    },

    // The main compilation function for a given selector.
    compileDocSelector: function( docSelector ) {
        var that = M.DataSelector;
        var perKeySelectors = [];
        _.each(docSelector, function( subSelector, key ) {
            if( key.substr(0, 1) === '$' ) {
                // Outer operators are either logical operators (they recurse back into
                // this function), or $where.
                if( !_.has(that.LOGICAL_OPERATORS, key) ) {
                    throw new Error("Unrecognized logical operator: " + key);
                }
                perKeySelectors.push(that.LOGICAL_OPERATORS[key](subSelector));
            } else {
                var lookUpByIndex = that._makeLookupFunction(key);
                var valueSelectorFunc = that.compileValueSelector(subSelector);
                perKeySelectors.push(function( doc ) {
                    var branchValues = lookUpByIndex(doc);
                    // We apply the selector to each "branched" value and return true if any
                    // match. This isn't 100% consistent with MongoDB; eg, see:
                    // https://jira.mongodb.org/browse/SERVER-8585
                    return _.any(branchValues, valueSelectorFunc);
                });
            }
        });

        return function( record ) {
            var doc = _.isFunction(record.getData) ? record.getData() : record;
            return _.all(perKeySelectors, function( f ) {
                return f(doc);
            });
        };
    },

    compileValueSelector: function( valueSelector ) {
        var that = M.DataSelector;
        if( valueSelector == null ) {  // undefined or null
            return function( value ) {
                return that._anyIfArray(value, function( x ) {
                    return x == null;  // undefined or null
                });
            };
        }

        // Selector is a non-null primitive (and not an array or RegExp either).
        if( !_.isObject(valueSelector) ) {
            return function( value ) {
                return that._anyIfArray(value, function( x ) {
                    return x === valueSelector;
                });
            };
        }

        if( _.isRegExp(valueSelector) ) {
            return function( value ) {
                if( _.isUndefined(value) ) {
                    return false;
                }
                return that._anyIfArray(value, function( x ) {
                    return valueSelector.test(x);
                });
            };
        }

        // Arrays match either identical arrays or arrays that contain it as a value.
        if( _.isArray(valueSelector) ) {
            return function( value ) {
                if( !_.isArray(value) ) {
                    return false;
                }
                return that._anyIfArrayPlus(value, function( x ) {
                    return that._equal(valueSelector, x);
                });
            };
        }

        // It's an object, but not an array or regexp.
        if( this.hasOperators(valueSelector) ) {
            var operatorFunctions = [];
            _.each(valueSelector, function( operand, operator ) {
                if( !_.has(that.VALUE_OPERATORS, operator) ) {
                    throw new Error("Unrecognized operator: " + operator);
                }
                operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, valueSelector.$options));
            });
            return function( value ) {
                return _.all(operatorFunctions, function( f ) {
                    return f(value);
                });
            };
        }

        // It's a literal; compare value (or element of value array) directly to the
        // selector.
        return function( value ) {
            return that._anyIfArray(value, function( x ) {
                return that._equal(valueSelector, x);
            });
        };
    },

    // _makeLookupFunction(key) returns a lookup function.
    //
    // A lookup function takes in a document and returns an array of matching
    // values.  This array has more than one element if any segment of the key other
    // than the last one is an array.  ie, any arrays found when doing non-final
    // lookups result in this function "branching"; each element in the returned
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
    _makeLookupFunction: function( key ) {
        var dotLocation = key.indexOf('.');
        var first, lookupRest, nextIsNumeric;
        if( dotLocation === -1 ) {
            first = key;
        } else {
            first = key.substr(0, dotLocation);
            var rest = key.substr(dotLocation + 1);
            lookupRest = this._makeLookupFunction(rest);
            // Is the next (perhaps final) piece numeric (ie, an array lookup?)
            nextIsNumeric = /^\d+(\.|$)/.test(rest);
        }

        return function( doc ) {
            if( doc == null ) { // null or undefined
                return [undefined];
            }
            var firstLevel = doc[first];

            // We don't "branch" at the final level.
            if( !lookupRest ) {
                return [firstLevel];
            }

            // It's an empty array, and we're not done: we won't find anything.
            if( _.isArray(firstLevel) && firstLevel.length === 0 ) {
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
            if( !_.isArray(firstLevel) || nextIsNumeric ) {
                firstLevel = [firstLevel];
            }
            return Array.prototype.concat.apply([], _.map(firstLevel, lookupRest));
        };
    },

    _anyIfArray: function( x, f ) {
        if( _.isArray(x) ) {
            return _.any(x, f);
        }
        return f(x);
    },

    _anyIfArrayPlus: function( x, f ) {
        if( f(x) ) {
            return true;
        }
        return _.isArray(x) && _.any(x, f);
    },

    // Is this selector just shorthand for lookup by _id?
    _selectorIsId: function( selector ) {
        return _.isString(selector) || _.isNumber(selector);
    },

    // deep equality test: use for literal document and array matches
    _equal: function( a, b ) {
        return M.DataField._equals(a, b, true);
    },

    _cmp: function( a, b ) {
        return M.DataField._cmp(a, b);
    },

    LOGICAL_OPERATORS: {
        "$and": function( subSelector ) {
            if( !_.isArray(subSelector) || _.isEmpty(subSelector) ) {
                throw Error("$and/$or/$nor must be nonempty array");
            }
            var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
            return function( doc ) {
                return _.all(subSelectorFunctions, function( f ) {
                    return f(doc);
                });
            };
        },

        "$or": function( subSelector ) {
            if( !_.isArray(subSelector) || _.isEmpty(subSelector) ) {
                throw Error("$and/$or/$nor must be nonempty array");
            }
            var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
            return function( doc ) {
                return _.any(subSelectorFunctions, function( f ) {
                    return f(doc);
                });
            };
        },

        "$nor": function( subSelector ) {
            if( !_.isArray(subSelector) || _.isEmpty(subSelector) ) {
                throw Error("$and/$or/$nor must be nonempty array");
            }
            var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
            return function( doc ) {
                return _.all(subSelectorFunctions, function( f ) {
                    return !f(doc);
                });
            };
        },

        "$where": function( selectorValue ) {
            if( !(selectorValue instanceof Function) ) {
                selectorValue = new Function("return " + selectorValue);
            }
            return function( doc ) {
                return selectorValue.call(doc);
            };
        }
    },

    VALUE_OPERATORS: {
        "$in": function( operand ) {
            if( !_.isArray(operand) ) {
                throw new Error("Argument to $in must be array");
            }
            return function( value ) {
                return M.DataSelector._anyIfArrayPlus(value, function( x ) {
                    return _.any(operand, function( operandElt ) {
                        return M.DataSelector._equal(operandElt, x);
                    });
                });
            };
        },

        "$all": function( operand ) {
            if( !_.isArray(operand) ) {
                throw new Error("Argument to $all must be array");
            }
            return function( value ) {
                if( !_.isArray(value) ) {
                    return false;
                }
                return _.all(operand, function( operandElt ) {
                    return _.any(value, function( valueElt ) {
                        return M.DataSelector._equal(operandElt, valueElt);
                    });
                });
            };
        },

        "$lt": function( operand ) {
            return function( value ) {
                return M.DataSelector._anyIfArray(value, function( x ) {
                    return M.DataSelector._cmp(x, operand) < 0;
                });
            };
        },

        "$lte": function( operand ) {
            return function( value ) {
                return M.DataSelector._anyIfArray(value, function( x ) {
                    return M.DataSelector._cmp(x, operand) <= 0;
                });
            };
        },

        "$gt": function( operand ) {
            return function( value ) {
                return M.DataSelector._anyIfArray(value, function( x ) {
                    return M.DataSelector._cmp(x, operand) > 0;
                });
            };
        },

        "$gte": function( operand ) {
            return function( value ) {
                return M.DataSelector._anyIfArray(value, function( x ) {
                    return M.DataSelector._cmp(x, operand) >= 0;
                });
            };
        },

        "$ne": function( operand ) {
            return function( value ) {
                return !M.DataSelector._anyIfArrayPlus(value, function( x ) {
                    return M.DataSelector._equal(x, operand);
                });
            };
        },

        "$nin": function( operand ) {
            if( !_.isArray(operand) ) {
                throw new Error("Argument to $nin must be array");
            }
            var inFunction = this.VALUE_OPERATORS.$in(operand);
            return function( value ) {
                // Field doesn't exist, so it's not-in operand
                if( value === undefined ) {
                    return true;
                }
                return !inFunction(value);
            };
        },

        "$exists": function( operand ) {
            return function( value ) {
                return operand === (value !== undefined);
            };
        },

        "$mod": function( operand ) {
            var divisor = operand[0], remainder = operand[1];
            return function( value ) {
                return _anyIfArray(value, function( x ) {
                    return x % divisor === remainder;
                });
            };
        },

        "$size": function( operand ) {
            return function( value ) {
                return _.isArray(value) && operand === value.length;
            };
        },

        "$type": function( operand ) {
            return function( value ) {
                // A nonexistent field is of no type.
                if( _.isUndefined(value) ) {
                    return false;
                }
                return M.DataSelector._anyIfArray(value, function( x ) {
                    return M.DataField.detectType(x) === operand;
                });
            };
        },

        "$regex": function( operand, options ) {

            if( _.isUndefined(options) ) {
                // Options passed in $options (even the empty string) always overrides
                // options in the RegExp object itself.

                // Be clear that we only support the JS-supported options, not extended
                // ones (eg, Mongo supports x and s). Ideally we would implement x and s
                // by transforming the regexp, but not today...
                if( /[^gim]/.test(options) ) {
                    throw new Error("Only the i, m, and g regexp options are supported");
                }

                var regexSource = operand instanceof RegExp ? operand.source : operand;
                operand = new RegExp(regexSource, options);
            } else if( !(operand instanceof RegExp) ) {
                operand = new RegExp(operand);
            }

            return function( value ) {
                if( _.isUndefined(value) ) {
                    return false;
                }
                return M.DataSelector._anyIfArray(value, function( x ) {
                    return operand.test(x);
                });
            };
        },

        "$options": function( operand ) {
            // evaluation happens at the $regex function above
            return function( value ) {
                return true;
            };
        },

        "$elemMatch": function( operand ) {
            var matcher = M.DataSelector.compileDocSelector(operand);
            return function( value ) {
                if( !_.isArray(value) ) {
                    return false;
                }
                return _.any(value, function( x ) {
                    return matcher(x);
                });
            };
        },

        "$not": function( operand ) {
            var matcher = M.DataSelector.compileDocSelector(operand);
            return function( value ) {
                return !matcher(value);
            };
        }
    },

    // Give a sort spec, which can be in any of these forms:
    //   {"key1": 1, "key2": -1}
    //   [["key1", "asc"], ["key2", "desc"]]
    //   ["key1", ["key2", "desc"]]
    //
    // (.. with the first form being dependent on the key enumeration
    // behavior of your javascript VM, which usually does what you mean in
    // this case if the key names don't look like integers ..)
    //
    // return a function that takes two objects, and returns -1 if the
    // first object comes first in order, 1 if the second object comes
    // first, or 0 if neither object comes before the other.

    compileSort: function( spec ) {
        var sortSpecParts = [];

        if( _.isArray(spec) ) {
            for( var i = 0; i < spec.length; i++ ) {
                if( typeof spec[i] === "string" ) {
                    sortSpecParts.push({
                        lookup: this._makeLookupFunction(spec[i]),
                        ascending: true
                    });
                } else {
                    sortSpecParts.push({
                        lookup: this._makeLookupFunction(spec[i][0]),
                        ascending: spec[i][1] !== "desc"
                    });
                }
            }
        } else if( typeof spec === "object" ) {
            for( var key in spec ) {
                sortSpecParts.push({
                    lookup: this._makeLookupFunction(key),
                    ascending: spec[key] >= 0
                });
            }
        } else {
            throw Error("Bad sort specification: ", JSON.stringify(spec));
        }

        if( sortSpecParts.length === 0 ) {
            return function() {
                return 0;
            };
        }

        // reduceValue takes in all the possible values for the sort key along various
        // branches, and returns the min or max value (according to the bool
        // findMin). Each value can itself be an array, and we look at its values
        // too. (ie, we do a single level of flattening on branchValues, then find the
        // min/max.)
        var reduceValue = function( branchValues, findMin ) {
            var reduced;
            var first = true;
            // Iterate over all the values found in all the branches, and if a value is
            // an array itself, iterate over the values in the array separately.
            _.each(branchValues, function( branchValue ) {
                // Value not an array? Pretend it is.
                if( !_.isArray(branchValue) ) {
                    branchValue = [branchValue];
                }
                // Value is an empty array? Pretend it was missing, since that's where it
                // should be sorted.
                if( _.isArray(branchValue) && branchValue.length === 0 ) {
                    branchValue = [undefined];
                }
                _.each(branchValue, function( value ) {
                    // We should get here at least once: lookup functions return non-empty
                    // arrays, so the outer loop runs at least once, and we prevented
                    // branchValue from being an empty array.
                    if( first ) {
                        reduced = value;
                        first = false;
                    } else {
                        // Compare the value we found to the value we found so far, saving it
                        // if it's less (for an ascending sort) or more (for a descending
                        // sort).
                        var cmp = M.DataSelector._cmp(reduced, value);
                        if( (findMin && cmp > 0) || (!findMin && cmp < 0) ) {
                            reduced = value;
                        }
                    }
                });
            });
            return reduced;
        };

        return function( a, b ) {
            a = _.isFunction(a.getData) ? a.getData() : a;
            b = _.isFunction(b.getData) ? b.getData() : b;
            for( var i = 0; i < sortSpecParts.length; ++i ) {
                var specPart = sortSpecParts[i];
                var aValue = reduceValue(specPart.lookup(a), specPart.ascending);
                var bValue = reduceValue(specPart.lookup(b), specPart.ascending);
                var compare = M.DataSelector._cmp(aValue, bValue);
                if( compare !== 0 ) {
                    return specPart.ascending ? compare : -compare;
                }
            }
            return 0;
        };
    }

});

// Source: src/data/sql_selector.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      26.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.SqlSelector = M.DataSelector.extend({

    _type: 'M.SqlSelector',

    _selector:  null,
    _query:     null,
    _entity:     null,

    create: function( docSelector, entity ) {
        var selector = this.extend({
            _entity: entity,
            _selector: null,
            _query: null
        });
        selector.init(docSelector);

        return selector;
    },

    init: function (docSelector) {
        this._selector  = this.compileSelector(docSelector);
        this._query     = this.buildSqlQuery(docSelector);
    },

    buildStatement: function(obj) {
        return this._query;
    },

    buildSqlQuery: function( selector, connector ) {
        // you can pass a literal function instead of a selector
        if( selector instanceof Function ) {
            return "";
        }

        // shorthand -- sql
        if( _.isString(selector) ) {
            return selector;
        }

        // protect against dangerous selectors.  falsey and {_id: falsey} are both
        // likely programmer error, and not what you want, particularly for
        // destructive operations.
        if( !selector || (('_id' in selector) && !selector._id) ) {
            return "1=2";
        }

        // Top level can't be an array or true or binary.
        if( _.isBoolean(selector) || _.isArray(selector) || M.DataField.isBinary(selector) ) {
            throw new Error("Invalid selector: " + selector);
        }

        return this.buildSqlWhere(selector)();
    },

    // The main compilation function for a given selector.
    buildSqlWhere: function( docSelector ) {
        var where = "";
        var that = this;
        var perKeySelectors = [];
        _.each(docSelector, function( subSelector, key ) {
            if( key.substr(0, 1) === '$' ) {
                // Outer operators are either logical operators (they recurse back into
                // this function), or $where.
                perKeySelectors.push(that.buildLogicalOperator(key, subSelector));
            } else {
                var valueLookup   = that.buildLookup(key);
                var valueSelector = that.buildValueSelector(subSelector);
                if ( _.isFunction(valueSelector)) {
                    perKeySelectors.push(function() {
                        return valueSelector(valueLookup);
                    });
                }
            }
        });

        return function( ) {
            var sql = "";
            _.each(perKeySelectors, function( f ) {
                if ( _.isFunction(f)) {
                    sql += f.call(that);
                }
            });
            return sql;
        };
    },

    buildValueSelector: function( valueSelector ) {
        var that = this;
        if( valueSelector == null ) {  // undefined or null
            return function(key) {
                return key + ' IS NULL';
            }
        }

        // Selector is a non-null primitive (and not an array or RegExp either).
        if( !_.isObject(valueSelector) ) {
            return function( key ) {
                return key + ' = ' + that.buildValue(valueSelector);
            };
        }

        if( _.isRegExp(valueSelector) ) {
            var regEx = valueSelector.toString();
            var match = regEx.match(/\/[\^]?([^^.*$'+()]*)[\$]?\//);
            if (match && match.length > 1) {
                var prefix = regEx.indexOf('/^') < 0 ? "%" : "";
                var suffix = regEx.indexOf('$/') < 0 ? "%" : "";
                return function(key) {
                    return key + ' LIKE "' + prefix + match[1] + suffix + '"';
                }
            }
            return null;
        }

        // Arrays match either identical arrays or arrays that contain it as a value.
        if( _.isArray(valueSelector) ) {
            return null;
        }

        // It's an object, but not an array or regexp.
        if( this.hasOperators(valueSelector) ) {
            var operatorFunctions = [];
            _.each(valueSelector, function( operand, operator ) {
                if( !_.has(that.VALUE_OPERATORS, operator) ) {
                    throw new Error("Unrecognized operator: " + operator);
                }
                operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, that));
            });
            return function( key ) {
                return that.LOGICAL_OPERATORS['$and'](operatorFunctions, key);
            };
        }

        // It's a literal; compare value (or element of value array) directly to the
        // selector.
        return function( key ) {
            return key + ' = ' + that.buildValue(valueSelector);
        };
    },

    buildLookup: function(key) {
        var field = this._entity ? this._entity.getField(key) : null;
        key = field && field.name ? field.name : key;
        return '"' + key + '"';
    },

    buildValue: function(value) {
        if( _.isString(value) ) {
            return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
    },

    buildLogicalOperator: function(operator, subSelector) {
        if( !_.has(this.LOGICAL_OPERATORS, operator) ) {
            throw new Error("Unrecognized logical operator: " + operator);
        } else {
            if( !_.isArray(subSelector) || _.isEmpty(subSelector) ) {
                throw Error("$and/$or/$nor must be nonempty array");
            }
            var subSelectorFunction = _.map(subSelector, this.buildSqlWhere, this);
            var that = this;
            return function(key) {
                return that.LOGICAL_OPERATORS[operator](subSelectorFunction, key);
            };
        }
    },

    LOGICAL_OPERATORS: {
        "$and": function(subSelectorFunction, key) {
            var sql = "";
            var count = 0;
            _.each(subSelectorFunction, function( f ) {
                var s = f != null ? f(key) : '';
                if (s) {
                    count++;
                    sql += sql ? " AND " + s : s;
                }
            });
            return count>1 ? "( " +sql +" )" : sql;
        },
        "$or": function(subSelectorFunction, key) {
            var sql  = "";
            var miss = false;
             _.each(subSelectorFunction, function( f ) {
                 var s = f != null ? f(key) : '';
                 miss |= !s;
                 sql += sql && s ? " OR " + s : s;
             });
             return miss ? "" : "( " +sql +" )";
        },
        "$nor": function(subSelectorFunction, key) {
            var sql  = "";
            var miss = false;
             _.each(subSelectorFunction, function( f ) {
                 var s = f != null ? f(key) : '';
                 miss |= !s;
                 sql += sql && s ? " OR " + s : s;
             });
             return miss ? "" : "NOT ( " +sql +" )";
        }
     },

    VALUE_OPERATORS: {

        "$in": function( operand ) {
            return null;
        },

        "$all": function( operand ) {
            return null;
        },

        "$lt": function( operand, that) {
            return function (key) {
                return key + " < " + that.buildValue(operand);
            }
        },

        "$lte": function( operand, that) {
            return function (key) {
                return key + " <= " + that.buildValue(operand);
            }
        },

        "$gt": function( operand, that) {
            return function (key) {
                return key + " > " + that.buildValue(operand);
            }
        },

        "$gte": function( operand, that) {
            return function (key) {
                return key + " > " + that.buildValue(operand);
            }
        },

        "$ne": function( operand, that) {
            return function (key) {
                return key + " <> " + that.buildValue(operand);
            }
        },

        "$nin": function( operand ) {
            return null;
        },

        "$exists": function( operand, that) {
            return function (key) {
                return key + " IS NOT NULL";
            }
        },

        "$mod": function( operand ) {
            return null;
        },

        "$size": function( operand ) {
            return null;
        },

        "$type": function( operand ) {
            return null;
        },

        "$regex": function( operand, options ) {
            return null;
        },
        "$options": function( operand ) {
            return null;
        },

        "$elemMatch": function( operand ) {
            return null;
        },

        "$not": function( operand, that) {
            var matcher = that.buildSqlWhere(operand);
            return function( key ) {
                return "NOT (" + matcher(key) + ")";
            };
        }
    }
});

// Source: src/data/stores/store.js
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

M.Store = function() {
    this.initialize.apply(this, arguments);
};

M.Store.extend = Backbone.Model.extend;

M.Store.create = M.create;

// Attach all inheritable methods to the Connector prototype.
_.extend(M.Store.prototype, Backbone.Events, M.Object, {

    _type: 'M.Store',

    name: '',

    url: '',

    entities: null,

    typeMapping: function() {
        var map = {};
        map [M.CONST.TYPE.OBJECTID] = M.CONST.TYPE.STRING;
        map [M.CONST.TYPE.DATE]     = M.CONST.TYPE.STRING;
        map [M.CONST.TYPE.BINARY]   = M.CONST.TYPE.TEXT;
        return map;
    }(),

    initialize: function( config ) {
        config = config || {};
        this.name = config.name || this.name;
        this.url = config.url || this.url;
        this.typeMapping = config.typeMapping || this.typeMapping;

        var entities = config.entities || this.entities || {};
        this.entities = {};
        for( var name in entities ) {
            var entity = M.Entity.from(entities[name], {
                store: this,
                typeMapping: this.typeMapping
            });
            entity.name = entity.name || name;

            // connect collection and model to this store
            var collection = entity.collection || M.Collection.extend({ model: M.Model.extend({}) });
            var model      = collection.prototype.model;
            // keep old entity and store
            collection.prototype.lastEntity = model.prototype.lastEntity = collection.prototype.entity;
            collection.prototype.lastStore  = model.prototype.lastStore  = collection.prototype.store;
            // set new entity and name
            collection.prototype.entity = model.prototype.entity = name;
            collection.prototype.store  = model.prototype.store  = this;

            entity.idAttribute = entity.idAttribute || model.prototype.idAttribute;
            this.entities[name] = entity;
        }
    },

    getEntity: function(model, options, entity) {
        var name = entity ? (_.isString(entity) ? entity : entity.name) : null;
        name = name || (options ? options.entity : null);
        name = name || (model && model.entity ? model.entity.name : null);
        if (name) {
            return this.entities[name] || entity;
        }
    },

    getCollection: function(entity) {
        if (_.isString(entity)) {
            entity = this.entities[entity];
        }
        if (entity && entity.collection) {
            if (M.Collection.prototype.isPrototypeOf(entity.collection)) {
                return entity.collection;
            } else {
                return new entity.collection();
            }
        }
    },

    createModel: function(entity) {
        if (_.isString(entity)) {
            entity = this.entities[entity];
        }
        if (entity && entity.collection) {
            var model = entity.collection.model || entity.collection.prototype.model;
            if (model) {
                return new model();
            }
        }
    },

    getArray: function( data ) {
        if (_.isArray(data)) {
            return data;
        } else if (M.isCollection(data)) {
            return data.models;
        }
        return _.isObject(data) ? [ data ] : []
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
        if( !entity ) {
            var error = M.Error.create(M.CONST.ERROR.VALIDATION_PRESENCE, "No valid entity passed.");
            this.handleCallback(obj.error, error);
            this.handleCallback(obj.finish, error);
            return false;
        }
        return true;
    },

    _checkData: function( obj, data ) {
        if( (!_.isArray(data) || data.length == 0) && !_.isObject(data) ) {
            var error = M.Error.create(M.CONST.ERROR.VALIDATION_PRESENCE, "No data passed.");
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
    }

});

// Source: src/data/stores/local_storage.js
M.LocalStorageStore = M.Store.extend({

    _type: 'M.LocalStorageStore',

    name: 'bikini',

    ids: {},

    sync: function( method, model, options ) {
        var options = options || {};
        var that = options.store || this.store;
        var entity = that.getEntity(model, options, this.entity);
        if( that && entity && model ) {
            var id = model.id || (method === 'create' ? new M.ObjectID().toHexString() : null);
            var attrs = options.attrs || model.attributes;
            switch( method ) {
                case 'patch':
                case 'update':
                    var data = that._getItem(entity, id) || {};
                    attrs = _.extend(data, attrs);
                case 'create':
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
                            var data = that._getItem(entity, id);
                            if( data ) {
                                attrs.push(data);
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
            that.handleError(options);
        }
    },

    _getKey: function( entity, id ) {
        return '_' + entity.name + '_' + id;
    },

    _getItem: function( entity, id ) {
        var attrs;
        if( entity && id ) {
            try {
                var data = JSON.parse(localStorage.getItem(this._getKey(entity, id)));
                if( data ) {
                    attrs = entity.toAttributes(data);
                    entity.setId(attrs, id); // fix id
                } else {
                    this._delItemId(id);
                }
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while loading data from local storage: ', e);
            }
        }
        return attrs;
    },

    _setItem: function( entity, id, attrs ) {
        if( entity && id && attrs ) {
            try {
                var data = entity.fromAttributes(attrs);
                localStorage.setItem(this._getKey(entity, id), JSON.stringify(data));
                this._addItemId(entity, id);
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while saving data to local storage: ', e);
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

    _getItemIds: function( entity ) {
        try {
            var key = '__ids__' + entity.name;
            if( !this.ids[entity.name] ) {
                this.ids[entity.name] = JSON.parse(localStorage.getItem(key)) || {};
            }
            return this.ids[entity.name];
        } catch( e ) {
            M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while loading ids from local storage: ', e);
        }
    },

    _saveItemIds: function( entity, ids ) {
        try {
            var key = '__ids__' + entity.name;
            localStorage.setItem(key, JSON.stringify(ids));
        } catch( e ) {
            M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while saving ids to local storage: ', e);
        }
    }
});
// Source: src/data/stores/socket.js
M.SocketStore = M.Store.extend({

    _type: 'M.SocketStore',

    _transactionFailed: false,

    _selector: null,

    name: 'bikini',

    size: 1024 * 1024 * 5,

    version: '1.2',

    host:   '',

    path:   'live_data',

    msgStore:  null,

    messages:  null,

    typeMapping: {
        'binary':  'text',
        'date':    'string'
    },

    initialize: function( options ) {
        M.Store.prototype.initialize.apply(this, arguments);

        var that  = this;
        options   = options || {};

        this.host = options.host || this.host;
        this.path = options.path || this.path;

        this._initStores();

        this._socket = M.SocketIO.create({
            host: this.host,
            path: this.path,
            connected: function() {
                if( that.entities ) {
                    for( var name in that.entities ) {
                        var entity = that.entities[name];
                        that._bindEntity(entity);
                    }
                }
                that._initialized = true;
                that.sendMessages();
            }
        });
    },

    _initStores: function() {
        var MsgCollection  = M.Collection.extend({
            model: M.Model.extend({ idAttribute: '_id' })
        });
        this.msgStore = new M.LocalStorageStore({
            entities: {
                messages: {
                    collection: MsgCollection
                }
            }
        });
        this.messages  = new MsgCollection();
        this.messages.fetch();
    },

    _bindEntity: function(entity) {
        var that = this;
        entity.channel = entity.channel || 'entity_' + entity.name;
        var time = this.getLastMessageTime(entity.channel);
        this._socket.on(entity.channel, function(msg) {
            if (msg) {
                that.setLastMessageTime(entity.channel, msg.time);
                that.trigger(entity.channel, msg);
            }
        });
        this._socket.emit('bind', {
             entity: entity.name,
             time:   time
        });
    },

    getLastMessageTime: function(channel) {
        return localStorage.getItem('__'+ channel + 'last_msg_time') || 0;
    },

    setLastMessageTime: function(channel, time) {
        if (time) {
            localStorage.setItem('__'+ channel + 'last_msg_time', time);
        }
    },

    onMessage: function(msg) {
        if (msg && msg.method) {
            var options = { store: this.lastStore, merge: true, fromMessage: true };
            var attrs   = msg.data;
            switch(msg.method) {
                case 'patch':
                    options.patch = true;
                case 'update':
                    var model = this.get(msg.id);
                case 'create':
                    if (model) {
                        model.save(attrs, options);
                    } else {
                        this.create(attrs, options);
                    }
                    break;

                case 'delete':
                    if (msg.id) {
                        var model = this.get(msg.id);
                        if (model) {
                            model.destroy(options);
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    },

    sync: function(method, model, options) {
        var that   = options.store || this.store;
        if (options.fromMessage) {
            return that.handleCallback(options.success);
        }
        var entity = that.getEntity(model, options, this.entity);
        if (that && entity) {
            var channel = entity.channel;

            if ( M.isModel(model) && !model.id) {
                model.set(model.idAttribute, new M.ObjectID().toHexString());
            }

            // connect collection with this channel
            if ( M.isCollection(this) && channel && !this.channel) {
                this.channel = channel;
                this.listenTo(that, channel, that.onMessage, this);
            }

            var time = that.getLastMessageTime(entity.channel);
            // only send read messages if no other store can do this
            // or for initial load
            if (method !== "read" || !this.lastStore || !time) {
                that.addMessage(method, model,
                    this.lastStore ? {} : options, // we don't need to call callbacks if an other store handle this
                    entity);
            }
            if (this.lastStore) {
                options.store   = this.lastStore;
                this.lastStore.sync.apply(this, arguments);
            }
        }
    },

    addMessage: function(method, model, options, entity) {
        var that = this;
        if (method && model) {
            var changes = model.changedSinceSync;
            var data = null;
            switch (method) {
                case 'update':
                case 'create':
                    data = model.attributes;
                    break;
                case 'patch':
                    if ( _.isEmpty(changes)) return;
                    data = changes;
                    break;
            }
            var msg = {
                _id: model.id,
                id: model.id,
                method: method,
                data: data
            };
            this.storeMessage(entity.channel, msg, function(channel, msg) {
                if (that._initialized) {
                    that.emitMessage(channel, msg, options);
                } else {
                    that.handleCallback(options.success, msg.data);
                }
            });
        }
    },

    emitMessage: function(channel, msg, options) {
        var that = this;
        console.log('emitMessage:'+msg.id);
        this._socket.emit(channel, msg, function(msg, error) {
            that.removeMessage(channel, msg, function(channel, msg) {
                if (error) {
                    // Todo: revert changed data
                    that.handleCallback(options.error, error);
                } else {
                    if (options.success) {
                        var resp = msg ? msg.data : null;
                        that.handleCallback(options.success, resp);
                    } else {
                        that.setLastMessageTime(channel, msg.time);
                        if (msg.method === 'read') {
                            var array = _.isArray(msg.data) ? msg.data : [ msg.data ];
                            for (var i=0; i < array.length; i++) {
                                var data = array[i];
                                if (data) {
                                    that.trigger(channel, {
                                        id: data._id,
                                        method: 'update',
                                        data: data
                                    });
                                    that.setLastMessageTime(channel, msg.time);
                                }
                            }
                        } else {
                            that.trigger(channel, msg);
                        }
                    }
                }
            });
        });
    },

    sendMessages: function() {
        var that = this;
        this.messages.each( function(message) {
            var msg      = message.get('msg');
            var channel  = message.get('channel');
            var callback = message.get('callback');
            if (callback) {
                callback(channel, msg);
            } else if (that._initialized) {
                that.emitMessage(channel, msg, {});
            }
        });
    },

    mergeMessages: function(data, id) {
        return data;
    },

    storeMessage: function(channel, msg, callback) {
        var message = this.messages.get(msg._id);
        if (message) {
            message.save({
                msg: _.extend(message.get('msg'), msg)
            });
        } else {
            this.messages.create({
                _id: msg._id,
                id:  msg.id,
                msg: msg,
                channel: channel,
                callback: callback
            });
        }
        callback(channel, msg);
    },

    removeMessage: function(channel, msg, callback) {
        var message = this.messages.get(msg._id);
        if (message) {
            message.destroy();
        }
        callback(channel, msg);
    }

});
// Source: src/data/stores/web_sql.js
M.WebSqlStore = M.Store.extend({

    _type: 'M.WebSqlStore',

    _transactionFailed: false,

    _selector: null,

    name: 'bikini',

    size: 1024 * 1024 * 5,

    version: '1.2',

    db: null,

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

    _options: function(data, options, entity) {
        var opts = _.extend({}, options);
        opts.entity = this.getEntity(data, options, entity);
        opts.data   = this.getArray(data);
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
                    error = M.Error.create(M.CONST.ERROR.WEBSQL_NOT_SUPPORTED, 'Your browser does not support WebSQL databases.');
                } else {
                    this.db = window.openDatabase(this.name, "", "", this.size);
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
                error = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, dbError.message, dbError);
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
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, msg, arSql);
                    that.handleError(options, err, lastSql);
                }, function() {
                    that.handleSuccess(options);
                });
            } catch( e ) {
                error = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'changeversion failed, DB-Version: ' + db.version)
            }
        } catch( e ) {
            error = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
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
                sql.push(this._sqlDropTable(name));
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
        var fields = entity.getFields();
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
            var field   = entity.getField(key);
            _.each(data, function(model) {
                id = _.isFunction(model.get) ? model.get(key) : model[key];
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

        if( this._checkDb(options) && this._checkEntity(entity, options) ) {
            var sql = this._sqlDropTable(entity.name);
            // reset flag
            this._transactionFailed = NO;
            this._executeTransaction(options, [sql]);
        }
    },

    _createTable: function( options ) {

        var entity = this.getEntity(options);

        if( this._checkDb(options) && this._checkEntity(entity, options) ) {
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

        var entity = options.entity;
        var data   = options.data;

        if( this._checkDb(options) && this._checkEntity(options, entity) && this._checkData(options, data) ) {

            var statements = [];
            var sqlTemplate = "INSERT OR REPLACE INTO '" + entity.name + "' (";
            for( var i = 0; i < data.length; i++ ) {
                var statement = ''; // the actual sql insert string with values
                var value = entity.fromAttributes(data[i]);
                var args = _.values(value);
                var keys = _.keys(value);
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

        var entity = options.entity;
        var data   = options.data;

        if (this._checkDb(options) && this._checkEntity(options, entity) && this._checkData(options, data)) {

            data  = _.isArray(data) ? data : [ data ];
            var where = this._sqlWhere(options);
            var statements  = [];
            var sqlTemplate = "UPDATE OR REPLACE '" + entity.name + "' SET ";
            for( var i = 0; i < data.length; i++ ) {
                var statement = ''; // the actual sql insert string with values
                var value = entity.fromAttributes(data[i]);
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
            this._executeTransaction(options, statements);
        }
    },

    _select: function(result, options) {

        var entity = options.entity;

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
                        var attrs = entity.toAttributes(item);
                        if( !that._selector || that._selector.matches(attrs) ) {
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
                var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, sqlError);
                that.handleError(options, err, lastStatement);
            }, function() { // voidCallback (success)
                that.handleSuccess(options, result);
            });
        }
    },

    _delete: function(data, options) {

        var entity = this.getEntity(options);

        if( this._checkDb(options) && this._checkEntity(options, entity) ) {
            var sql = this._sqlDelete(data, options, entity);
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
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, sqlError);
                    that.handleError(options, err, lastStatement);
                }, function() {
                    that.handleSuccess(options);
                });
            } catch( e ) {
                error = M.Error.create(M.CONST.ERROR.WEBSQL_UNKNOWN, e.message, e);
            }
        }
        if( error ) {
            this.handleCallback(options.error, error, lastSql);
        }
    },

    _checkDb: function(options) {
        // has to be initialized first
        if( !this.db ) {
            var error = M.Error.create(M.CONST.ERROR.WEBSQL_NO_DBHANDLER, "db handler not initialized.");
            this.handleError(options, error);
            return false;
        }
        return true;
    }
});
// Source: src/ui/views/view.js
M.View = Backbone.View.extend(M.Object);


_.extend(M.View.prototype, {

    _type: 'M.View',

    value: null,

    valuePattern: "<%= value %>",

    _domEvents: [{}],

    initialize: function( properties ) {
//        _.extend(this, properties);
//        this.value = this.collection;
//        if( !this.value ) {
//            var value = { value: '' };
//            if(properties && properties.value){
//                value = properties.value;
//            }
//            this.value = M.Model.create(value);
//        }
////
//        this.set();
//        this._initEvents();
//
//        this.template = _.template(this.valuePattern);
    },

//    set: function( value ) {
//        this.value = value || this.value;
//
//        if( this.value ) {
//            this.value.on('remove', this._remove, this);
//            this.value.on('change', this._change, this);
//            this.value.on('add', this._add, this);
//            this.value.on('all', this._all, this);
//        }
//    },

//    _remove: function( data ) {
//        if(this.value.cid === data.cid){
//            this.remove();
//        }
//    },

//    _change: function( data ) {
//        this.render();
//    },

//    _add: function( model, collection, options ) {
//
//        /*CLONE EVENT ON create*/
//        var view = _.clone(this.valueView);
//        view.set(model);
//        var v = view.render().el;
//        this.$el.append(v);
//    },

//    _all: function( data ) {
//
//    },

//    constructor: function( properties ) {
//        _.extend(this, properties);
//        Backbone.View.apply(this, arguments);
//    },

//    _addClasses: function() {
//        this.$el.addClass(Object.getPrototypeOf(this)._getClasseName().reverse().join(' '));
//    },

//    _getCssClassByType: function() {
//        return this.getObjectType().replace('.', '-').toLowerCase();
//    },

//    _getClasseName: function( cssClasses ) {
//        if( !cssClasses ) {
//            cssClasses = [];
//        }
//        cssClasses.push(this._getCssClassByType());
//        if( this.getObjectType() !== 'M.View' ) {
//            Object.getPrototypeOf(this)._getClasseName(cssClasses);
//        }
//        return cssClasses;
//    },

//    _createDOM: function(){
//        if(this.value.attributes){
//            val = this.template(this.value.attributes);
//            this.$el.html(val);
//        }
//
//    },

//    _addId: function(){
//      this.$el.attr('id', this.cid);
//    },

    /** EVENTS **/

    /**
     * This property is used to specifiy all events for a view within an application.
     *
     * @type {Object}
     */
//    events: null,

    /**
     * This property contains a view's event handlers that are handled by the event dispatcher.
     *
     * @type {Object}
     */
//    _domEvents: null,

    /**
     * This property contains a view's event handlers for all events that are not handled by
     * the event dispatcher, e.g. 'postRender'.
     *
     * @type {Object}
     */
//    _events: null,
//
    /**
     * This property contains an array of event types that are not handled by the event dispatcher.
     *
     * @type {Array}
     */
//    _eventTypes: ['preRender', 'postRender'],

//    _initEvents: function() {
//        this.events = this.events || {};
//        this._domEvents = {};
//        this._events = {};
//
//        this._eventTypes = _.uniq(_.compact(this._eventTypes.concat(Object.getPrototypeOf(this)._eventTypes)));
//
//        _.each(this.events, function( eventHandler, eventName ) {
//            if( !this.events[eventName].target ) {
//                if( !this.events[eventName].action ) {
//                    var tmp = this.events[eventName];
//                    this.events[eventName] = null;
//                    this.events[eventName] = {
//                        action: tmp
//                    };
//                }
//
//                this.events[eventName].target = this;
//            }
//
//            if( _.contains(this._eventTypes, eventName) ) {
//                this._events[eventName] = this.events[eventName];
//            } else {
//                this._domEvents[eventName] = this.events[eventName];
//            }
//        }, this);
//    },
//
//    /**
//     * This method registers a view's dom events at the event dispatcher. This happens
//     * automatically during the render process of a view.
//     *
//     * @private
//     */
//    _registerEvents: function() {
//        _.each(this._domEvents, function( handler, eventType ) {
//            M.EventDispatcher.registerEvent({
//                type: eventType,
//                source: this
//            });
//        }, this);
//    },
//
//    /**
//     * This method returns the event handler of a certain event type of a view.
//     *
//     * @param eventType
//     * @returns {*}
//     */
//    getEventHandler: function( eventType ) {
//        return this._domEvents[eventType];
//    },
//
//    _unregisterEvents: function() {
//        _.each(this._domEvents, function( event, key ) {
//            M.EventDispatcher.unregisterEvent({
//                type: key,
//                source: this
//            });
//        }, this);
//    }
});

M.View.create = M.create;
// Source: src/ui/pagetransitions.js

var PageTransitions = (function() {

    var $main = null,
        $pages = null,
        $iterate = null,
        animcursor = 1,
        pagesCount = 0,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
    // animation end event name
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
    // support css animations
        support = Modernizr.cssanimations;

    function init() {

        $main = $( '#pt-main' );
        $pages = $main.children( 'div.pt-page' );
        $iterate = $( '#iterateEffects' );
        pagesCount = $pages.length;

        $pages.each( function() {
            var $page = $( this );
            $page.data( 'originalClassList', $page.attr( 'class' ) );
        } );

        $pages.eq( current ).addClass( 'pt-page-current' );
    }

    function switchToNextPage(){
        if( isAnimating ) {
            return false;
        }
        if( animcursor > 67 ) {
            animcursor = 1;
        }
        nextPage( animcursor );
        ++animcursor;

    }

    function nextPage( animation ) {
        if( isAnimating ) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq( current );

        if( current < pagesCount - 1 ) {
            ++current;
        }
        else {
            current = 0;
        }

        var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
            outClass = '', inClass = '';

        switch( animation ) {

            case 1:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 2:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 3:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 4:
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case 5:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 6:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 7:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 8:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 9:
                outClass = 'pt-page-moveToLeftFade';
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 10:
                outClass = 'pt-page-moveToRightFade';
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 11:
                outClass = 'pt-page-moveToTopFade';
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 12:
                outClass = 'pt-page-moveToBottomFade';
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 13:
                outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
                inClass = 'pt-page-moveFromRight';
                break;
            case 14:
                outClass = 'pt-page-moveToRightEasing pt-page-ontop';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 15:
                outClass = 'pt-page-moveToTopEasing pt-page-ontop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 16:
                outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
                inClass = 'pt-page-moveFromTop';
                break;
            case 17:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 18:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 19:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 20:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 21:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-scaleUpDown pt-page-delay300';
                break;
            case 22:
                outClass = 'pt-page-scaleDownUp';
                inClass = 'pt-page-scaleUp pt-page-delay300';
                break;
            case 23:
                outClass = 'pt-page-moveToLeft pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 24:
                outClass = 'pt-page-moveToRight pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 25:
                outClass = 'pt-page-moveToTop pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 26:
                outClass = 'pt-page-moveToBottom pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 27:
                outClass = 'pt-page-scaleDownCenter';
                inClass = 'pt-page-scaleUpCenter pt-page-delay400';
                break;
            case 28:
                outClass = 'pt-page-rotateRightSideFirst';
                inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
                break;
            case 29:
                outClass = 'pt-page-rotateLeftSideFirst';
                inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
                break;
            case 30:
                outClass = 'pt-page-rotateTopSideFirst';
                inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
                break;
            case 31:
                outClass = 'pt-page-rotateBottomSideFirst';
                inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
                break;
            case 32:
                outClass = 'pt-page-flipOutRight';
                inClass = 'pt-page-flipInLeft pt-page-delay500';
                break;
            case 33:
                outClass = 'pt-page-flipOutLeft';
                inClass = 'pt-page-flipInRight pt-page-delay500';
                break;
            case 34:
                outClass = 'pt-page-flipOutTop';
                inClass = 'pt-page-flipInBottom pt-page-delay500';
                break;
            case 35:
                outClass = 'pt-page-flipOutBottom';
                inClass = 'pt-page-flipInTop pt-page-delay500';
                break;
            case 36:
                outClass = 'pt-page-rotateFall pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 37:
                outClass = 'pt-page-rotateOutNewspaper';
                inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
                break;
            case 38:
                outClass = 'pt-page-rotatePushLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 39:
                outClass = 'pt-page-rotatePushRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 40:
                outClass = 'pt-page-rotatePushTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 41:
                outClass = 'pt-page-rotatePushBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case 42:
                outClass = 'pt-page-rotatePushLeft';
                inClass = 'pt-page-rotatePullRight pt-page-delay180';
                break;
            case 43:
                outClass = 'pt-page-rotatePushRight';
                inClass = 'pt-page-rotatePullLeft pt-page-delay180';
                break;
            case 44:
                outClass = 'pt-page-rotatePushTop';
                inClass = 'pt-page-rotatePullBottom pt-page-delay180';
                break;
            case 45:
                outClass = 'pt-page-rotatePushBottom';
                inClass = 'pt-page-rotatePullTop pt-page-delay180';
                break;
            case 46:
                outClass = 'pt-page-rotateFoldLeft';
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 47:
                outClass = 'pt-page-rotateFoldRight';
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 48:
                outClass = 'pt-page-rotateFoldTop';
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 49:
                outClass = 'pt-page-rotateFoldBottom';
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 50:
                outClass = 'pt-page-moveToRightFade';
                inClass = 'pt-page-rotateUnfoldLeft';
                break;
            case 51:
                outClass = 'pt-page-moveToLeftFade';
                inClass = 'pt-page-rotateUnfoldRight';
                break;
            case 52:
                outClass = 'pt-page-moveToBottomFade';
                inClass = 'pt-page-rotateUnfoldTop';
                break;
            case 53:
                outClass = 'pt-page-moveToTopFade';
                inClass = 'pt-page-rotateUnfoldBottom';
                break;
            case 54:
                outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomLeftIn';
                break;
            case 55:
                outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomRightIn';
                break;
            case 56:
                outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomTopIn';
                break;
            case 57:
                outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomBottomIn';
                break;
            case 58:
                outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeLeftIn';
                break;
            case 59:
                outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeRightIn';
                break;
            case 60:
                outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeTopIn';
                break;
            case 61:
                outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeBottomIn';
                break;
            case 62:
                outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselLeftIn';
                break;
            case 63:
                outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselRightIn';
                break;
            case 64:
                outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselTopIn';
                break;
            case 65:
                outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselBottomIn';
                break;
            case 66:
                outClass = 'pt-page-rotateSidesOut';
                inClass = 'pt-page-rotateSidesIn pt-page-delay200';
                break;
            case 67:
                outClass = 'pt-page-rotateSlideOut';
                inClass = 'pt-page-rotateSlideIn';
                break;
        }

        $($currPage[0]).on( animEndEventName, function() {
            $currPage.off( animEndEventName );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );
        $currPage.addClass( outClass );

        $($nextPage[0]).on( animEndEventName, function() {
            $nextPage.off( animEndEventName );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );
        $nextPage.addClass( inClass );

        $(document).on(animEndEventName, function(ev){
            onEndAnimation( $currPage, $nextPage );
        });

        if( !support ) {
            onEndAnimation( $currPage, $nextPage );
        }

    }

    function onEndAnimation( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;

        resetPage( $outpage, $inpage );
        isAnimating = false;
    }

    function resetPage( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
        $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
        //$outpage.removeClass('pt-page-current');
        //$inpage.addClass('pt-page-current');
    }

    //init();
    return { init : init, next: switchToNextPage };

})();
// Source: src/ui/layouts/layout.js
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      07.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.View
 */

M.Themes = M.Object.extend({
    DEFAULT_THEME: 'basic',

    basic: {},

    _currentThemeName: 'basic',

    _themes: {},

    registerTemplateForTheme: function( themeName, templateName, template, override ) {
        override = override || false;

        var theme = this._getThemeByName(themeName);
        if( !theme ) {
            this._createThemeWithName( themeName );
        }

        var exists = this._getTemplateByNameForTheme(themeName, templateName) !== '';
        if( !exists || override ) {
            this._themes[ themeName ][ templateName ] = template;
            return true;
        }

        console.warn('Template "' + templateName + '" already defined for theme "' + themeName + '"');
        return false;
    },

    getTemplateByName: function( templateName ) {

        var template = this.getTemplateByNameForTheme(this._currentThemeName, templateName);
        if( template == '' && this._currentThemeName != this.DEFAULT_THEME) {
            console.log( 'Template "' + templateName + '" not defined for theme "' + this._currentThemeName + '", switched to default theme "' + this.DEFAULT_THEME + '"');
            template = this.getTemplateByNameForTheme(this.DEFAULT_THEME, templateName);
        }
        return template;
    },

    getTemplateByNameForTheme: function( themeName, templateName ) {
        var template = this._getTemplateByNameForTheme(themeName, templateName);
        if( template ) {
            return template;
        }
        console.warn( 'Template "' + templateName + '" not defined for theme "' + themeName + '"');
        return '';
    },

    _getTemplateByNameForTheme: function( themeName, templateName ) {
        var theme = this._getThemeByName(themeName);
        if( theme && theme[templateName] ) {
            return theme[templateName];
        }
        return '';
    },

    _createThemeWithName: function( name ) {
        this._themes[ name ] = {};
    },

    _getThemeByName: function( name ) {
        if(this._themes[ name ]) {
            return this._themes[ name ];
        }
        return null;
    }
});

M.Layout = Backbone.Layout.extend(/** @scope M.Layout.prototype */{

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

    applyViews: function(){

    }

});




//    /**
//     * This method sets the layout's content.
//     *
//     * @param obj
//     * @private
//     */
//    _setContent: function( obj ) {
//        this.$el.empty().append(obj.view.render().el);
//        return;
//        this.$el.children().eq(this.currentChildIndex + 1).append(obj.view.render().el);
//
//        if( !this.first ) {
//            this._next();
//        }
//        this.first = false;
//    },
//
//    /**
//     * This method returns the basic layout markup that provides the skeleton
//     * for the views/content that will be displayed inside that layout.
//     *
//     * This basic implementation of M.Layout won't provide any markup. This is
//     * the job of each concrete layout implementation.
//     *
//     * @returns {String}
//     * @private
//     */
//    _generateMarkup: function() {
//        return '';
//    },
//
//    currentChildIndex: 0,
//
//    $pages: null,
//
//    totalChildren: null,
//
//    isAnimating: NO,
//
//    endCurrPage: NO,
//
//    endNextPage: NO,
//
//    first: YES,
//
//    animEndEventNames: {
//        'WebkitAnimation': 'webkitAnimationEnd',
//        'OAnimation': 'oAnimationEnd',
//        'msAnimation': 'MSAnimationEnd',
//        'animation': 'animationend'
//    },
//
//    animEndEventName: null,
//
//    initialize: function() {
//        this.$pages = this.$el.children('div');
//        this.totalChildren = this.$pages.length;
//        this.animEndEventName = this.animEndEventNames['WebkitAnimation'];
//        this.currentChildIndex = -1;
//        M.View.prototype.initialize.apply(this, arguments);
//    },
//
//
//    resetPage: function( $outpage, $inpage ) {
//        $outpage.attr('class', $outpage.data('originalClassList'));
//        $inpage.attr('class', $inpage.data('originalClassList') + ' m-page-current');
//        $('.m-perspective').removeClass('m-perspective-transitioning');
//    },
//
//    onEndAnimation: function( $outpage, $inpage ) {
//        this.endCurrPage = false;
//        this.endNextPage = false;
//        this.resetPage($outpage, $inpage);
//        this.isAnimating = false;
//    },
//
//    _next: function( animation ) {
//        if( this.isAnimating ) {
//            return false;
//        }
//
//        if(!animation){
//            animation = 1;
//        }
//
//        this.isAnimating = true;
//        this.$el.addClass('m-perspective-transitioning');
//
//        if( this.currentChildIndex < this.totalChildren - 1 ) {
//            this.currentChildIndex += 1;
//        } else {
//            this.currentChildIndex = 0;
//        }
//
//        var $currPage = this.$pages.eq(this.currentChildIndex);
//
//        var $nextPage = this.$pages.eq(this.currentChildIndex).addClass('m-page-current');
//        var outClass = '';
//        var inClass = '';
//
//        switch( animation ) {
//
//            case 1:
//                outClass = 'm-page-move-to-left';
//                inClass = 'm-page-move-from-right';
//
//                break;
//            case 2:
//                outClass = 'm-page-move-to-right';
//                inClass = 'm-page-move-from-left';
//                break;
//        }
//
//        var that = this;
//
//        setTimeout(function() {
//            $currPage.addClass(outClass).on(that.animEndEventName, function() {
//                $currPage.off(that.animEndEventName);
//                that.endCurrPage = true;
//                if( that.endNextPage ) {
//                    that.onEndAnimation($currPage, $nextPage);
//                }
//            });
//
//            $nextPage.addClass(inClass).on(that.animEndEventName, function() {
//                $nextPage.off(that.animEndEventName);
//                that.endNextPage = true;
//                if( that.endCurrPage ) {
//                    that.onEndAnimation($currPage, $nextPage);
//                }
//            });
//
//        }, 0)
//    }
//
//});
// Source: src/ui/layout_manager.js
_.extend(Backbone.Layout.prototype, {

    transition: null,

    currentLayout: null,

    isFirstLoad: true,

    setTransition: function( transition ) {

    },

    initialize: function() {

    },

    applyViews: function( settings ) {
        var views = this.currentLayout.applyViews(settings);
        this.setViews(views);
        this.render();
    },

    initialRenderProcess: function() {
        this.render();
        $('body').html(this.el);
        PageTransitions.init();
    },

    updateViewport: function() {

    },

    navigate: function( settings ) {

        var url = settings.route;
        var path = '';
        if( settings.params ) {
            path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
            url += '/';
        }
        var options = settings.options || true;

        this.setTransition(settings.transition);

        this.isFirstLoad = false;

        Backbone.history.navigate(url + path, options);
    },

    setLayout: function( layout ) {
        if( this.currentLayout && this.currentLayout.identifier === layout.identifier ) {
            return this;
        } else {
            this.currentLayout = layout;
            this.el = this.currentLayout.template;
            this.constructor(this);
            this.currentLayout.initialize();
            this.isFirstLoad = true;
        }
        return this;

    },

    getLayout: function() {
        return this.currentLayout;
    }


});

// Source: src/ui/layouts/header-layout/header-layout.js


M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'header-layout', '<div class="header"></div>' );

M.HeaderLayout = M.Layout.extend({

    _type: 'header-layout',

    template: M.Themes.getTemplateByName('header-layout')
});
// Source: src/ui/layouts/bottom-bar-layout/bottom-bar-layout.js
//
M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'bottom-bar-layout', '<div class="bottom-bar"></div>' );

M.BottomBarLayout = M.Layout.extend({

    _type: 'bottom-bar-layout',

    template: M.Themes.getTemplateByName('bottom-bar-layout')
});
// Source: src/ui/layouts/switch-layout/switch-layout.js

M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'switch-layout', '<div id="pt-main" class="pt-perspective"> <div class="pt-page pt-page-1"> <div class="content"></div> <div class="footer"></div> </div> <div class="pt-page pt-page-2"> <div class="content"></div> <div class="footer"></div> </div> </div>' );

M.SwitchLayout = M.Layout.extend({

    _type: 'switch-layout',

    template: M.Themes.getTemplateByName('switch-layout'),

    currentPage: '',

    applyViews: function( settings ){
        var current = $('.pt-page-current');

        var next = $('.pt-page:not(.pt-page-current)');

        var selector = '';

        if(current.length < 1){
            selector = 'pt-page-1';
        } else if(current.hasClass('pt-page-1')){
            selector = 'pt-page-2';
        } else if(current.hasClass('pt-page-2')){
            selector = 'pt-page-1';
        }

        var view = {};
        //                view['.' + selector + ' .content'] = settings.content;
        view['.' + selector + ' .content'] = settings.content;
        if( settings.footer ) {
            view['.' + selector + ' .footer'] = settings.footer;
        } else {
            view['.' + selector + ' .footer'] = 'settings.footer';
        }
        return view;
    }
});
// Source: src/ui/layouts/swipe-layout/swipe-layout.js
//TODO do this in good
var template = $('<div class="wrap"> <div class="left-panel firstLeft"> <div class="action-menu-close"></div> <div class="content"></div> </div> <div class="right-panel"> <div class="content"></div> </div> </div>');
template.find('.right-panel').before(M.SwitchLayout.prototype.template);

M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'swipe-layout', template );

M.SwipeLayout = M.SwitchLayout.extend({

    _type: 'swipe-layout',

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
        $('#pt-main').addClass('easing');

        if( this.leftPanelIsOpen ) {
            this.closeLeftPanel();
        } else {
            this.openLeftPanel();
        }

        setTimeout(function() {
            $('#pt-main').removeClass('easing');
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
            $('#pt-main').css('-webkit-transform', 'translate3d(' + diff + 'px, 0, 0)');
        }

        //        -webkit-transform: translate3d(80%, 0, 0);
        //        -moz-transform: translate3d(80%, 0, 0);
        //        -ms-transform: translate3d(80%, 0, 0);
        //        -o-transform: translate3d(80%, 0, 0);
        //        transform: translate3d(80%, 0, 0);
    },

    closeLeftPanel: function() {
        //$('.os-bb10 .template-bottom, .os-bb10 .template-right').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
        $('#pt-main').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
        this.leftPanelIsOpen = false;
    },

    openLeftPanel: function() {
        $('#pt-main').css('-webkit-transform', 'translate3d(' + this.rightThreshold + 'px, 0, 0)');
        this.leftPanelIsOpen = true;
    }
});
