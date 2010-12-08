// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * Encapsulates access to a remote storage, a json based webservice.
 *
 * @extends M.DataProvider
 */
M.RemoteStorageProvider = M.DataProvider.extend(
/** @scope M.RemoteStorageProvider.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.RemoteStorageProvider',

    /**
     * The type of this object.
     * @type Object
     */
    config: null,

    /* CRUD methods */

    save: function(obj) {

        var config = this.config[obj.model.name];
        var result = null;
        var dataPattern = null;
        var dataResult = null;

        if(obj.model.state === M.STATE_NEW) {   /* if the model is new we need to make a create request, if not new then we make an update request */

            /* the given dataPattern must be a valid JSON string that is then transformed into an object structure*/ 
            dataPattern = JSON.parse(config.create.dataPattern);
            dataResult = this.deepObjectReplacement(dataPattern, obj.model.record, result);

            M.Request.init({
                url: config.location + config.create.url,
                type: config.create.httpMethod,                
                isJSON: YES,
                contentType: 'application/JSON',
                data: dataResult,
                onSuccess: function(data) {
                    obj.onSuccess(data);
                },
                onError: function() {
                    obj.onError();
                }
            }).send();
            
        } else { // make an update request
            dataPattern = JSON.parse(config.create.dataPattern);
            dataResult = this.deepObjectReplacement(dataPattern, obj.model.record, result);


            /* make generic */
            var updateURL = config.update.url.replace(/<%=\s+([.|_|-|$|¤|a-zA-Z]+[0-9]*[.|_|-|$|¤|a-zA-Z]*)\s*%>/, object.model.record.ID);
            
            M.Request.init({
                url: config.location + updateUrl,
                type: config.update.httpMethod,
                isJSON: YES,
                contentType: 'application/JSON',
                data: dataResult,
                onSuccess: function(data) {
                    obj.onSuccess(data);
                },
                onError: function() {
                    obj.onError();
                },
                beforeSend: function(xhr) {
                  xhr.setRequestHeader("X-Http-Method-Override", config.update.httpMethod);
                }
            }).send();

        }
        
    },

    del: function(obj) {

    },

    find: function(obj) {
        var config = this.config[obj.model.name];
        var readUrl = obj.ID ? config.read.url.one.replace(/<%=\s+([.|_|-|$|¤|a-zA-Z]+[0-9]*[.|_|-|$|¤|a-zA-Z]*)\s*%>/,obj.ID) : config.read.url.all;

        console.log(config.location + readUrl+ '.json');

        M.Request.init({
            url: config.location + readUrl + '.json',
            type: config.read.httpMethod,
            isJSON: YES,
            contentType: 'application/JSON',
            onSuccess: function(data) {
                obj.onSuccess(data);
            },
            onError: function() {
                obj.onError();
            }
        }).send();
    },

    remoteQuery: function(onSuccess, onError) {
        
    },

    /**
     * creates a new data provider instance with the passed configuration parameters
     * @param obj
     */
    configure: function(obj) {
        console.log('configure() called.');
        // maybe some value checking
        return this.extend({
            config:obj
        });
    },


    /**
     * Creates result as an object passed to the request containing the request data.
     *
     * @param dataPattern
     * @param record
     * @param result
     */
    deepObjectReplacement: function(dataPattern, record, result) {
        for(var i in dataPattern) {
            if(typeof(dataPattern[i]) === 'object') {
                this.deepObjectReplacement(dataPattern[i], record, result);
            }
            var valueRegEx = /<%=\s+([.|_|-|$|¤|a-zA-Z]+[0-9]*[.|_|-|$|¤|a-zA-Z]*)\s*%>/;

            if(typeof(dataPattern[i]) != 'object') {
                var regExResult = valueRegEx.exec(dataPattern[i]);
                dataPattern[i] = record[i];
                console.log(dataPattern[i]);
            }
        }
        return dataPattern;
    }

}); 