// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================


m_require('core/utility/logger.js');

/**
 * @class
 * 
 * The root object for Error objects
 *
 * M.Error encapsulates errors in The-M-Project.
 * Should be passed to error callbacks.
 *
 * 0-10:    general errors
 *
 * 11-20:
 *
 * 21-30:
 *
 * 31-40:   CouchDB errors
 *
 * Constant                     Code    Situation
 * --------                     ----    ---------
 * M.ERR_UNDEFINED              0       The reason for the error could not be clarified.
 * M.ERR_CONNECTION             1       A connection to an external service could not be established
 * 
 *
 * M.ERR_COUCHDB_CONFLICT       31      A conflict occured while saving a document in CouchDB, propably caused by duplicate IDs
 * M.ERR_COUCHDB_DBNOTFOUND     32      The provided database could not be found.
 * M.ERR_COUCHDB_DBEXISTS       33      The db already exists and therefor cannot be created.
 *
 * @extends M.Object
*/


/**
 * A constant value for an undefined error.
 *
 * @type Number
 */
M.ERR_UNDEFINED = 0;

/**
 * A constant value for an error occuring when a connection to an external service could not be established.
 *
 * @type Number
 */
M.ERR_CONNECTION = 1;

/**
 * A constant value for an error occuring when a conflict appears when saving a document in CouchDB. This is propably caused by duplicate IDs
 *
 * @type Number
 */
M.ERR_COUCHDB_CONFLICT = 31;

/**
 * A constant value for an error occuring if the provided database could not be found
 *
 * @type Number
 */
M.ERR_COUCHDB_DBNOTFOUND = 32;

/**
 * A constant value for an error occuring if a database that shall be created already exists
 *
 * @type Number
 */
M.ERR_COUCHDB_DBEXISTS = 33;

M.Error = M.Object.extend({
    code: M.ERROR_NAME,
    msg: '',
    errObj: null
});