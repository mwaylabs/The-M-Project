// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      28.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * CouchDB does not accept properties starting with _
 * Needs to be handled, e.g. with M.CREATED_AT (_createdAt)
 */

/**
 * @class
 *
 * Encapsulates access to CouchDB, a document-oriented database system with a HTTP REST interface.
 *
 * @extends M.DataProvider
 */
M.DataProviderCouchDb = M.DataProvider.extend(
/** @scope M.DataProviderCouchDb.prototype */ {
    /**
     * The type of this object.
     * @type String
     */
    type: 'M.DataProviderCouchDb',

    isAsync: YES,

    isInitialized: NO,

    config: null,

    internalCallback: null,

    configure: function(obj) {
        console.log('configure called...');
        var dp = this.extend({
            config:obj
        });

        dp.config.dbName = this.sanitizeDbName(dp.config.dbName);
        dp.config.url = this.sanitizeUrl(dp.config.url);

        // maybe some value checking before
        return dp;
    },

    init: function(obj, callback) {
        console.log('init called...');
        if(!this.internalCallback) {
            this.internalCallback = callback;
        }
        this.check(obj);
    },

    check: function(obj) {
        console.log('check called...');
        var dbName = this.config.dbName;
        var url = this.buildUrl('/_all_dbs');  // http://mycouchdb.com/_all_bs returns all databases of myCouchDB

        var that = this;

        this.performRequest('GET', url, YES, null, null,
            function(dbs) { /* onSuccess */
                /* check if db already exists by looking if dbName is part of returned array of DB names */
                if(_.include(dbs, dbName)) {
                    that.isInitialized = YES;
                    that.internalCallback(obj);
                } else {
                    that.isInitialized = NO;
                    that.createDatabase(obj);
                }
            },
            function(xhr, msg) { /* onFailure */
                var err = M.Error.extend({
                    code: M.ERR_CONNECTION,
                    msg: msg
                });
                that.errorCallback(obj, err);
            }
        );
    },

    errorCallback: function(obj, error) {
        M.Logger.log('Error: ' + error.msg, M.ERROR);
        if(obj && obj.onError) {
            if(obj.onError.target && obj.onError.action) {
                obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action]);
                obj.onError(error);
            } else if(typeof(obj.onError) === 'function') {
                obj.onError(error);
            }

        }
    },

    /* CRUD OPERATIONS */
    createDatabase: function(obj) {
        console.log('createDatabase called...');
        /*if(!this.isInitialized) {
            this.internalCallback = this.createDatabase;
            this.check(obj);
        }*/
        var that = this;
        this.performRequest('PUT', this.buildUrl('/' + this.config.dbName), YES, null,
            function(xhr) { /* beforeSend */
                xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
            },
            function(data) { /* onSuccess: request successful */
                if(data.ok) {
                    console.log('CouchDB database: "' + that.config.dbName + '" created.');
                    that.isInitialized = YES;
                    that.internalCallback(obj);    
                } else if (data.error) {
                    var err = that.buildErrorObject(data);
                    that.errorCallback(obj, err);
                }
            },
            function(xhr, msg) { /* onError */
                var err = M.Error.extend({
                    code: M.ERR_CONNECTION,
                    msg: msg
                });
                that.errorCallback(obj, err);
            }
        );

    },

    save: function(obj) {
        console.log('save called...');
        if(!this.isInitialized) {
            this.internalCallback = this.save;
            this.init(obj);
            return;
        }

        var that = this;

        if(obj.model.state === M.STATE_NEW) { /* make create request */
            /* create unique id as key */
            var uuid = M.UniqueId.uuid(32);
            /* note: uniqued id is first assigned to model record on successful request */

            var dataValue =  JSON.stringify(obj.model.record);
            console.log(dataValue);
            var url = this.buildUrl('/' + this.config.dbName + '/' + uuid);
            console.log('save URL: ' + url);

            var that = this;

            this.performRequest('PUT', url, YES, dataValue,

                function(xhr) {    /* beforeSend set HTTP header to PUT */
                    xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
                },
                    
                function(data) { /* onSuccess */
                    /*if(obj && obj.onSuccess) {
                        if(obj.onSuccess.target && obj.onSuccess.action) {
                            obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
                            obj.onSuccess(data);
                        } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                            obj.onSuccess(data);
                        }
                    }*/
                    console.log(data);
                    /* assign returned uuid to model record */
                    if(data.ok) {
                        console.log('set record ID from response');
                        obj.model.set('ID', data.id);
                        obj.model.set('rev', data.rev);
                    } else {// success callback is called when request finished successful, but this doesn't guarantee that CouchDB saved the model correctly

                        if(data.error) {
                            var err = that.buildErrorObject(data);
                            that.errorCallback(obj, err);
                        }

                    }
                },

                function(xhr, msg) { /* onError */
                    console.log('Error: ' + msg);
                    
                    var err = M.Error.extend({
                        code: M.ERR_CONNECTION,
                        msg: msg
                    });
                    that.errorCallback(obj, err);
                }
            )
        } else { /* update request */
                
        }
    },

    find: function(obj) {
        if(!this.isInitialized) {
            this.internalCallback = this.find;
            this.init(obj);
            return;
        }

        if(!obj.ID) {   // 
            this.findAllDocuments(obj);
            return;
        }
    },

    findAllDocuments: function(obj, second) {
        if(!this.isInitialized) {
            this.internalCallback = this.findAllDocuments;
            this.init(obj);
            return;
        }

        if(!second) {
            var url = this.buildUrl('/' + this.config.dbName + '/_all_docs');
            var that = this;
            this.performRequest('GET', url, YES, null, null,
                function() {  // onSuccess callback
                    that.findAllDocuments(obj)
                },
                function(xhr, msg) { // onError callback
                    var err = M.Error.extend({
                        code: M.ERR_CONNECTION,
                        msg: msg
                    });
                    that.errorCallback(obj, err);
                }
            );
            return;
        }


    },

    findByView: function(obj) {

    },

    del: function(obj) {
        if(!this.isInitialized) {
            this.internalCallback = this.del;
            this.init(obj);
            return;
        }

        var url = this.buildUrl('/' + this.config.dbName + '/' + obj.model.get('ID') + '?rev=' + obj.model.get('rev'));

        var that = this;
        this.performRequest('DELETE', url, YES, null,
            function(xhr) { /* beforeSend */
                xhr.setRequestHeader("X-Http-Method-Override", 'DELETED');
            },
            function(data) { /* onSuccess */
                if(data.ok) {
                    console.log('Document with ID: "' + obj.model.get('ID') + '" deleted.');
                    that.internalCallback(obj);/* onSuccess */
                    /*if(obj && obj.onSuccess) {
                        if(obj.onSuccess.target && obj.onSuccess.action) {
                            obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
                            obj.onSuccess(data);
                        } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                            obj.onSuccess(data);
                        }
                    }*/
                    console.log(data);
                } else if (data.error) {
                    var err = that.buildErrorObject(data);
                    that.errorCallback(obj, err);
                }

            },
            function(xhr, msg) { /* onError */
                var err = M.Error.extend({
                    code: M.ERR_CONNECTION,
                    msg: msg
                });
                that.errorCallback(obj, err);
            }
        );
    },

    performRequest: function(method, url, isJson, data, beforeSend, onSuccess, onError) {
        var req = M.Request.init({
            method: method,
            url: url,
            isJSON: isJson,
            onSuccess: onSuccess,
            data: data,
            beforeSend: beforeSend,
            onError: onError
        });
        req.send();
    },

    buildErrorObject: function(resp) {
        var err = M.Error.extend({
            msg: data.reason
        });

        switch(resp.error) {    // switch through possible errors returned by CouchDB and add related error to error obj
            case 'conflict':
                err.code = M.ERR_COUCHDB_CONFLICT
                break;
            case 'not_found':
                err.code = M.ERR_COUCHDB_DBNOTFOUND
                break;
            case 'file_exists':
                err.code = M.ERR_COUCHDB_DBEXISTS
            default:
                err.code = M.ERR_UNDEFINED
                break;
        }
        return err;
    },

    buildUrl: function(url2) {
        return this.config.url + url2; // should return sth. like http://themproject.couchone.com/contactsdb
    },
    
    sanitizeUrl: function(url) {
        var origUrl = url;
        url = url.replace(/\/$/, "");
        /* Log a warning to inform user about the renaming */
        if(origUrl !== url) {
            M.Logger.log('CouchDB URL renamed to: ' + url, M.WARN);
        }
        return url;
    },

    /**
     * Makes given DB name CouchDB compatible. Rules of CouchDB DB name:
     * "Only lowercase characters (a-z), digits (0-9), and any of the characters _, $, (, ), +, -, and / are allowed. Must begin with a letter."
     * @param name
     */
    sanitizeDbName: function(name) {
        var origName = name;
        /* only lowercase letters allowed */
        name = name.toLowerCase();
        /* dot not allowed in name, replace with _ , whitelist below doesn't match dot  */
        name = name.replace(/\./g, "_");
        /* replace all other illegal characters (all others thant the one mentioned below) with _ */
        name = name.replace(/[^a-z0-9_$()+-/]/g, "_");
        /* must begin with a letter: delete all prefixes that are not letters */
        name = name.replace(/^[^a-z]+/, "");
        /* what if only numbers are given? */

        /* Log a warning to inform user about the renaming */
        if(origName !== name) {
            M.Logger.log('The given db name: ' + origName + ' is not a valid CouchDB name. It has been sanitized to: ' + name, M.WARN);
        }
        return name;
    }
});
