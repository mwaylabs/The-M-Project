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
