// Creator:   Pablo Betancor (pbetancor@avantic.net)
// Date:      13.04.2012
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/remote_storage.js');

/**
 * @class
 *
 * Extended version of DataProviderRemoteStorage with new features:
 *   - Paginated find(). Perform a paginated search if 'obj.firstResult' and 'obj.maxNumberResults' are defined in the object argument.
 *   - The paginated search url must be provided in function config.read.url.paginated(firstResult, maxNumberResults).
 *   - Optionally 'obj.filter' could be provided in function config.read.url.paginated(firstResult, maxNumberResults, filter).
 *   - Remote query beforeSend configuration. It can be provided in function config.beforeSend().
 *   - Count function.
 *   - Optionally the filter count url must be provided in function config.count.url.filter(filter).
 *
 * @extends DataProviderRemoteStorage
 */
M.DataProviderRemoteStoragePaginated = M.DataProviderRemoteStorage.extend(
/** @scope M.RemoteStorageProvider.prototype */ {

    type: 'M.DataProviderRemoteStoragePaginated',
    
    find: function(obj) {
        var config = this.config[obj.model.name];

        var readUrl = null;
        
        if (obj.ID)
        	readUrl = config.read.url.one(obj.ID);
        else if (obj.firstResult != null && obj.maxNumberResults != null)
        	readUrl = config.read.url.paginated(obj.firstResult, obj.maxNumberResults, obj.filter);
        else
        	readUrl = config.read.url.all();
        
        readUrl = config.url + readUrl;

        this.remoteQuery('read', readUrl, config.read.httpMethod, null, obj);

    },
    
    count: function(obj) {
    	var config = this.config[obj.model.name];

        var countUrl = null;
        
        if (obj.filter != null)
        	countUrl = config.count.url.filter(obj.filter);
        else
        	countUrl = config.count.url.all();
        
        countUrl = config.url + countUrl;

        this.remoteQuery('count', countUrl, config.count.httpMethod, null, obj);
	},

    remoteQuery: function(opType, url, type, data, obj, beforeSend) {
        var that = this;
        var config = this.config[obj.model.name];
        
        var internalBeforeSend = null;
        if (beforeSend && config.beforeSend) {
        	internalBeforeSend = function() {
				beforeSend();
				config.beforeSend();
			}
        } else if (beforeSend)
        	internalBeforeSend = beforeSend;
        else if (config.beforeSend)
        	internalBeforeSend = config.beforeSend;

        M.Request.init({
            url: url,
            method: type,
            isJSON: YES,
            contentType: 'application/JSON',
            data: data ? data : null,
            onSuccess: function(data, msg, xhr) {

                /*
                * delete from record manager if delete request was made.
                */
                if(opType === 'delete') {
                    obj.model.recordManager.remove(obj.model.m_id);
                }

                /*
                * call the receiveIdentifier method if provided, that sets the ID for the newly created model
                */
                if(opType === 'create') {
                    if(config.create.receiveIdentifier) {
                        config.create.receiveIdentifier(data, obj.model);
                    } else {
                        M.Logger.log('No ID receiving operation defined.');
                    }
                }
                
                if (opType === 'count') {
                	obj.count = data;
                }

                /*
                * call callback
                */
                if(obj.onSuccess) {
                    if(obj.onSuccess.target && obj.onSuccess.action) {
                        obj.onSuccess = that.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action], [data]);
                        if(opType === 'read') {
                            that.createModelsFromResult(data, obj.onSuccess, obj);
                        } else {
                            obj.onSuccess();
                        }
                    } else if(typeof(obj.onSuccess) === 'function') {
                    	if (opType === 'count')
                    		obj.onSuccess(data);
                    	else
                    		that.createModelsFromResult(data, obj.onSuccess, obj);
                    }

                }else {
                    M.Logger.log('No success callback given.', M.WARN);
                }
            },
            onError: function(xhr, msg) {

                var err = M.Error.extend({
                    code: M.ERR_CONNECTION,
                    msg: msg,
                    xhr: xhr
                });

                if(obj.onError && typeof(obj.onError) === 'function') {
                    obj.onError(err);
                }
                if(obj.onError && obj.onError.target && obj.onError.action) {
                    obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onError.action], err);
                    obj.onError();
                } else if (typeof(obj.onError) !== 'function') {
                    M.Logger.log('No error callback given.', M.WARN);
                }
            },
            beforeSend: internalBeforeSend ? internalBeforeSend : null
        }).send();
    }

}); 