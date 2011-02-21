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
        //console.log('configure called...');
        var dp = this.extend({
            config:obj
        });

        dp.config.dbName = this.sanitizeDbName(dp.config.dbName);
        dp.config.url = this.sanitizeUrl(dp.config.url);

        // maybe some value checking before
        return dp;
    },

    init: function(obj, callback) {
        //console.log('init called...');
        if(!this.internalCallback) {
            this.internalCallback = callback;
        }
        this.check(obj);
    },

    check: function(obj) {
        //console.log('check called...');
        var dbName = this.config.dbName;
        var url = this.buildUrl('/_all_dbs');  // http://mycouchdb.com/_all_bs returns all databases of myCouchDB

        var that = this;

        if(obj.showLoader) {
            M.LoaderView.show();
        }

        this.performRequest('GET', url, YES, null, null,
            function(dbs) { /* onSuccess */

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }

                /* check if db already exists by looking if dbName is part of returned array of DB names */
                if(_.include(dbs, dbName)) {
                    M.Logger.log('DB: ' + dbName + ' exists', M.INFO);
                    that.isInitialized = YES;
                    that.internalCallback(obj);
                } else {
                    M.Logger.log('DB not existant, must be created first...', M.INFO);
                    that.isInitialized = NO;
                    that.createDatabase(obj);
                }
            },
            function(xhr, msg) { /* onFailure */

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }

                M.Logger.log('Connection error...', M.ERROR)
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
                obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], obj, error);
                obj.onError();
            } else if(typeof(obj.onError) === 'function') {
                obj.onError(error);
            }

        }
    },

    /* CRUD OPERATIONS */
    createDatabase: function(obj) {
        M.Logger.log('createDatabase called...', M.INFO);
        /*if(!this.isInitialized) {
            this.internalCallback = this.createDatabase;
            this.check(obj);
        }*/

        if(obj.showLoader){
            M.LoaderView.show();
        }

        var that = this;
        this.performRequest('PUT', this.buildUrl('/' + this.config.dbName), YES, null,
            function(xhr) { /* beforeSend */
                xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
            },
            function(data) { /* onSuccess: request successful */

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }
                
                if(data.ok) {
                    //console.log('CouchDB database: "' + that.config.dbName + '" created.');
                    that.isInitialized = YES;
                    that.internalCallback(obj);
                }
            },
            function(xhr, msg) { /* onError */

                var data = JSON.parse(xhr.responseText);

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }
                var err = {};
                if (data.error) {
                    err = that.buildErrorObject(data);
                } else {
                    err = M.Error.extend({
                        code: M.ERR_CONNECTION,
                        msg: msg
                    });
                }
                that.errorCallback(obj, err);
            }
        );

    },

    save: function(obj) {
        //console.log('save called...');
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
            //M.Logger.log(dataValue, M.INFO);
            var url = this.buildUrl('/' + this.config.dbName + '/' + uuid);
            //console.log('save URL: ' + url);

            if(obj.showLoader) {
                    M.LoaderView.hide();
            }

            this.performRequest('PUT', url, YES, dataValue,

                function(xhr) {    /* beforeSend set HTTP header to PUT */
                    xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
                },

                function(data) { /* onSuccess */

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    /* assign returned uuid to model record */
                    if(data.ok) {
                        //console.log('set record ID from response');
                        obj.model.set('ID', data.id);
                        obj.model.set('rev', data.rev);
                        if(obj.onSuccess.target && obj.onSuccess.action) {
                            // returns obj.model
                            obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], obj.model);
                            obj.onSuccess();
                        } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                            obj.onSuccess(obj.model);
                        }
                    }
                },

                function(xhr, msg) { /* onError */

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    var data = JSON.parse(xhr.responseText);

                    var err = {};

                    if(data.error) {
                        err = that.buildErrorObject(data);
                    } else {
                        err = M.Error.extend({
                            code: M.ERR_CONNECTION,
                            msg: msg
                        });
                    }
                    that.errorCallback(obj, err);
                }
            )
        } else { /* update request */

            var dataValue =  JSON.stringify(obj.model.record);
            //M.Logger.log(dataValue, M.INFO);
            var url = this.buildUrl('/' + this.config.dbName + '/' + obj.model.get('ID') + '?rev=' + obj.model.get('rev'));
            //console.log('save URL: ' + url);

            if(obj.showLoader) {
                M.LoaderView.show();
            }

            this.performRequest('PUT', url, YES, dataValue,
                function() {    /* beforeSend */
                    xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
                },
                function(data) {    /* onSuccess */

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    if(data.ok) {
                         obj.model.set('rev', data.rev);
                        if(obj.onSuccess.target && obj.onSuccess.action) {
                            /* returns saved model. */
                            obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], obj.model);
                            obj.onSuccess();
                        } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                            obj.onSuccess(obj.model);
                        }
                    }
                },
                function(xhr, msg) {    /* onError */

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    var data = JSON.parse(xhr.responseText);

                    var err = {};

                    if(data.error) {
                        err = that.buildErrorObject(data);
                    } else {
                        err = M.Error.extend({
                            code: M.ERR_CONNECTION,
                            msg: msg
                        });
                    }
                    that.errorCallback(obj, err);
                }
            );

        }
    },

    find: function(obj) {
        M.Logger.log('find called...', M.INFO);
        if(!this.isInitialized) {
            this.internalCallback = this.find;
            this.init(obj);
            return;
        }

        var that = this;

        if(obj.view) {
            this.findByView(obj);
        }

        /* if no ID is provided, it's propably meant to be a findAll call */
        if(!obj.ID) {
            //console.log('!obj.ID => CALL FINDALL...');
            this.findAllDocuments(obj, YES);
            return;
        } else {
            var url = this.buildUrl('/' + this.config.dbName + '/' + obj.ID);

            if(obj.showLoader) {
                M.LoaderView.show();
            }

            this.performRequest('GET', url, YES, null, null,    /* method, url, isJSON, data, beforeSend */
                function(data) { /* onSuccess */

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    if(!data.error) {
                        var result = that.createRecOfDoc(obj, data);
                        if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                            obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], result);
                            obj.onSuccess();
                        } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                            obj.onSuccess(result);
                        }
                        return YES;
                    } else {

                    }
                },
                function(xhr, msg) { /* onError */

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    var data = JSON.parse(xhr.responseText);

                    var err = {};

                    if(data.error) {
                        err = that.buildErrorObject(data);
                    } else {
                        err = M.Error.extend({
                            code: M.ERR_CONNECTION,
                            msg: msg
                        });
                    }
                    that.errorCallback(obj, err);
                }
            );
        }
    },

    /**
     *
     * @param {Object} obj
     * @param {Boolean} first
     * @param {Array} docList
     * @param {Array} result
     * @param {Number} callsLeft
     */
    findAllDocuments: function(obj, isFirst, docList, result, callsLeft) {
        //M.Logger.log('findAllDocuments called...', M.INFO);
        /*if(!this.isInitialized) {
            console.log('not initialized in findAllDocuments...');
            this.internalCallback = this.findAllDocuments;
            this.init(obj);
            return;
        }*/

        var that = this;

        if(isFirst) {
            //console.log('findAllDocuments: isFirst');
            var url = this.buildUrl('/' + this.config.dbName + '/_all_docs');

            if(obj.showLoader) {
                M.LoaderView.show();
            }

            this.performRequest('GET', url, YES, null, null,
                function(data) {  // onSuccess callback

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    /*
                    * result:
                    * {"total_rows":10,"offset":0,"rows":[
                        {"id":"123456","key":"123456","value":{"rev":"1-014e3877e6395dea9415867442d41d4d"}},
                        ...
                        ]
                      }
                    **/
                    that.findAllDocuments(obj, NO, data.rows, [], data.total_rows);
                },
                function(xhr, msg) { // onError callback

                    if(obj.showLoader) {
                        M.LoaderView.hide();
                    }

                    var err = M.Error.extend({
                        code: M.ERR_CONNECTION,
                        msg: msg
                    });
                    that.errorCallback(obj, err);
                }
            );
            return;
        } else { /* if second, get all documents one by one and return them */
            // if request fails for one, it fails completely and therefor reset records array in recordmanager completely
            // TODO: is this the desired behaviour?
            if(callsLeft > 0) {
                var url = this.buildUrl('/' + this.config.dbName + '/' + docList[callsLeft - 1].id); // -1 because we use length as index, which is one bigger than index

                if(obj.showLoader) {
                    M.LoaderView.show();
                }

                this.performRequest('GET', url, YES, null, null,
                    function(data) { /* onSuccess */

                        if(obj.showLoader) {
                            M.LoaderView.hide();
                        }

                        if(!data.error) {
                            result.push(that.createRecOfDoc(obj, data));
                            callsLeft = callsLeft - 1;
                            that.findAllDocuments(obj, NO, docList, result, callsLeft);
                        }
                    },
                    function(xhr, msg) { /* onError */

                        if(obj.showLoader) {
                            M.LoaderView.hide();
                        }

                        var data = JSON.parse(xhr.responseText);
                        var err = {};
                        if(data.error) {
                            err = that.buildErrorObject(data);
                        } else {
                            err = M.Error.extend({
                                code: M.ERR_CONNECTION,
                                msg: msg
                            });
                        }
                        obj.model.recordManager.removeAll();
                        that.errorCallback(obj, err);
                        return;
                    }
                );

            } else {
                if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                    /* [result] is a workaround for bindToCaller: bindToCaller uses call() instead of apply() if an array is given.
                     * result is an array, but what call is doing with it is wrong in this case. call maps each array element to one method
                     * parameter of the function called. Our callback only has one parameter so it would just pass the first value of our result set to the
                     * callback. therefor we now put result into an array (so we have an array inside an array) and result as a whole is now passed as the first
                     * value to the callback.
                     *  */
                    obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [result]);
                    obj.onSuccess();
                } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                    obj.onSuccess(result);
                }
                // make onSuccessCallback
                return result;
            }
        }
    },

    findByView: function(obj) {

    },

    createRecOfDoc: function(obj, data) {
        //var rec = JSON.parse(data);
        var rec = data;
        rec['ID'] = rec['_id'];
        rec['rev'] = rec['_rev'];

        var myRec = obj.model.createRecord($.extend(rec, {state: M.STATE_VALID}));

        /* create M.Date objects for all date properties */
        for(var j in myRec.__meta) {
            /* here we can work with setter and getter because myRec already is a model record */
            if(myRec.__meta[j].dataType === 'Date' && typeof(myRec.get(j)) === 'string') {
                myRec.set(j, M.Date.create(myRec.get(j)));
            }
        }
        return myRec;
    },

    getAllIdentifiers: function(obj) {
        var url = this.buildUrl('/' + this.config.dbName + '/_all_docs');

        var that = this;

        if(obj.showLoader) {
            M.LoaderView.show();
        }

        this.performRequest('GET', url, YES, null, null,
            function(data) {  // onSuccess callback

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }

                if(!data.error) {
                    var rows = data.rows;
                    var result = [];
                    _.each(rows, function(r){
                        result.push(r.id);
                    });

                    if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                        obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [result]);
                        obj.onSuccess();
                    } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                        obj.onSuccess(result);
                    }
                }
            },
            function(xhr, msg) { // onError callback

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }

                var data = JSON.parse(xhr.responsText);
                var err = {};

                if (data.error) {
                    err = that.buildErrorObject(data);
                } else {
                    err = M.Error.extend({
                        code: M.ERR_CONNECTION,
                        msg: msg
                    });
                }
                that.errorCallback(obj, err);
            }
        );
    },

    /* If you want to update or delete a document, CouchDB expects you to include the _rev field of the revision you wish to change. */
    /* whoever saves a change to a document first, wins */
    del: function(obj) {
        if(!this.isInitialized) {
            this.internalCallback = this.del;
            this.init(obj);
            return;
        }

        var url = this.buildUrl('/' + this.config.dbName + '/' + obj.model.get('ID') + '?rev=' + obj.model.get('rev'));

        var that = this;

        if(obj.showLoader) {
            M.LoaderView.show();
        }

        this.performRequest('DELETE', url, YES, null,
            function(xhr) { /* beforeSend */
                xhr.setRequestHeader("X-Http-Method-Override", 'DELETED');
            },
            function(data) { /* onSuccess */

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }

                if(data.ok) {
                    if(obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
                        obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
                        obj.onSuccess();
                    } else if(obj.onSuccess && typeof(obj.onSuccess) === 'function') {
                        obj.onSuccess();
                    }
                    return YES;
                }

            },
            function(xhr, msg) { /* onError */

                if(obj.showLoader) {
                    M.LoaderView.hide();
                }

                var data = JSON.parse(xhr.responseText);
                var err = {};

                if (data.error) {
                    err = that.buildErrorObject(data);
                } else {
                    err = M.Error.extend({
                        code: M.ERR_CONNECTION,
                        msg: msg
                    });
                }
                that.errorCallback(obj, err);
            }
        );
    },

    performRequest: function(method, url, isJson, data, beforeSend, onSuccess, onError) {
        //console.log('performRequest.... to: ' + url);
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
            msg: resp.reason
        });

        switch(resp.error) {    // switch through possible errors returned by CouchDB and add related error to error obj
            case 'conflict':
                err.code = M.ERR_COUCHDB_CONFLICT;
                break;
            case 'not_found':
                if(resp.reason === 'missing') {
                    err.code = M.ERR_COUCHDB_DOCNOTFOUND;
                } else if (resp.reason === 'no_db_file') {
                    err.code = M.ERR_COUCHDB_DBNOTFOUND;
                }
                break;
            case 'file_exists':
                err.code = M.ERR_COUCHDB_DBEXISTS;
                break;
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
