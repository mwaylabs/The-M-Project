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
        var url = this.config.url;

        this.performRequest('GET', url, null, null,
            function(dbs) { /* onSuccess */
                /* check if db already exists by looking if dbname is part of returned array of DB names */
                if( _.include(dbs, dbName) ) {
                    this.isInitialized = YES;
                    this.internalCallback(obj);
                } else {
                    this.isInitialized = NO;
                    this.createDatabase(obj);
                }
            },
            function(xhr, msg) { /* onFailure */
                this.errorCallback(xhr, msg, obj);
            }
        );
    },

    errorCallback: function(xhr, msg, obj) {
        M.Logger.log('Error: ' + msg, M.ERROR);
        if(obj && obj.onError) {
            obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action]);
            obj.onError(xhr, msg);
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
        this.performRequest('PUT', this.buildUrl('/' + this.config.dbName), null,
            function() { /* beforeSend */
                xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
            },
            function(data) { /* onSuccess */
                console.log('CouchDB database: "' + that.config.dbName + '" created.');
                this.isInitialized = YES;
                this.internalCallback(obj);
            },
            function(xhr, msg) { /* onError */
                this.errorCallback(xhr, msg, obj);
            }
        );

    },

    save: function(obj) {
        console.log('save called...');
        if(!this.isInitialized) {
            this.internalCallback = this.save;
            this.init(obj);
        }

        var that = this;

        if(obj.model.state === M.STATE_NEW) { /* make create request */
            var uuid = M.UniqueId.uuid(32);
            var dataValue =  JSON.stringify(obj.model.record);
            console.log('dataValue: ' + dataValue);
            this.performRequest('PUT', this.buildUrl('/' + this.config.dbName + '/' + uuid),
                dataValue,

                function() {    /* beforeSend set HTTP header to PUT */
                    xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
                },

                function(data) { /* onSuccess */
                    /*if(obj && obj.onSuccess) {
                        if(obj.onSuccess.target && obj.onSuccess.action) {
                            obj.onSuccess = this.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
                            obj.onSuccess(data);
                        } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                            obj.onSuccess(data);
                        }
                    }*/
                    console.log(data);
                },

                function(xhr, msg) { /* onError */
                    console.log(msg);
                    //this.errorCallback(xhr, msg, obj);
                }
            )
        } else { /* update request */

        }
    },

    find: function(obj) {
        if(!this.isInitialized) {
            this.internalCallback = this.find;
            this.init(obj);
        }
    },

    findAllDocuments: function(obj) {
        if(!this.isInitialized) {
            this.internalCallback = this.findAllDocumentss;
            this.init(obj);
        }
    },

    findByView: function(obj) {

    },

    del: function() {
        if(!this.isInitialized) {
            this.internalCallback = this.del;
            this.init(obj);
        }
    },

    performRequest: function(method, url, data, beforeSend, onSuccess, onError) {
        var req = M.Request.init({
            url: url,
            method: method,
            beforeSend: beforeSend,
            onSuccess: onSuccess,
            onError: onError
        });
        req.send();
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
