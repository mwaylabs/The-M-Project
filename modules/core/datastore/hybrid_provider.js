// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      25.02.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.TARGET_REMOTE = 'remote';
M.TARGET_LOCAL = 'local';
M.TARGET_BOTH = 'both';

M.PRIO_REMOTE = 'prio_remote';
M.PRIO_LOCAL = 'prio_local';
M.PRIO_BOTH = 'prio_both';


m_require('core/utility/logger.js');

/**
 * @class
 *
 * 
 *
 * @extends M.Object
 */
M.DataProviderHybrid = M.Object.extend(
/** @scope M.DataProviderHybrid.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DataProviderHybrid',

    /**
     * Indicates whether data provider operates asynchronously or not.
     *
     * @type Boolean
     */
    isAsync: YES,

    /**
     *
     * @type Object
     */
    localProvider: null,

    /**
     *
     * @type Object
     */
    remoteProvider: null,

    /**
     * Defines the operation type: 1 for 'remote' or 'local', 2 for 'both'
     * @type Number
     */
    usedProviders: 0,

    callbackCounter: 0,

    onSuccess: null,

    onError: null,

    callbacks: {
        success: {
            local: null,
            remote: null
        },
        error: {
            local: null,
            remote: null
        }
    },

    /**
     * 
     * @type Object
     */
    config: null,

    configure: function(obj) {
        var dp = this.extend({
            config:obj
        });
        if(!dp.config.local) {
            throw M.Error.extend({
                code: M.ERR_MODEL_PROVIDER_NOT_SET,
                msg: 'No local data provider passed'
            });
        }
        if(!dp.config.remote) {
            throw M.Error.extend({
                code: M.ERR_MODEL_PROVIDER_NOT_SET,
                msg: 'No remote data provider passed'
            });
        }
        dp.localProvider = dp.config.local;
        dp.remoteProvider = dp.config.remote;

        // maybe some value checking before
        return dp;
    },

    /**
     *
     */
    find: function(obj) {
        this.crud(obj, 'find');
    },

    /**
     * 
     */
    save: function(obj) {
        this.crud(obj, 'save');
    },

    /**
     *
     */
    del: function(obj) {
        this.crud(obj, 'del');
    },


    /**
     *
     * @param {Obj} obj The param obj
     * @param {String} op The operation to be performed on the actual data provider
     */
    crud: function(obj, op) {

        obj.target = obj.target || M.TARGET_BOTH;

        if(!obj.prio) {
            if(obj.target === M.TARGET_BOTH) {
                obj.prio = M.PRIO_BOTH;
            } else {
                if(obj.target === M.TARGET_LOCAL) {
                    obj.prio = M.PRIO_LOCAL;
                } else if(obj.target === M.PRIO_REMOTE) {
                    obj.prio = M.PRIO_REMOTE;
                }
            }
        }

        this.callbackCounter = 0;
        this.setOriginCallbacks(obj);
        /* set intermediate callbacks for data provider call */
        this.setIntermediateCallbacks(obj);

        switch(obj.target) {

            case M.TARGET_LOCAL:
                this.usedProviders = 1;
                this.localProvider[op](obj);
                break;

            case M.TARGET_REMOTE:
                this.usedProviders = 1;
                this.remoteProvider[op](obj);
                break;

            case M.TARGET_BOTH:
                this.usedProviders = 2;
                this.localProvider[op](obj);
                this.remoteProvider[op](obj);
                break;
        }
    },
    
    setOriginCallbacks: function(obj) {
        if (obj.onSuccess && obj.onSuccess.target && obj.onSuccess.action) {
            obj.onSuccess = this.bindToCaller(obj.onSuccess.target, obj.onSuccess.target[obj.onSuccess.action]);
            this.onSuccess = obj.onSuccess;
        } else if(obj.onSuccess === 'function') {
            this.onSuccess = obj.onSuccess;
        }

        if (obj.onError && obj.onError.target && obj.onError.action) {
            obj.onError = this.bindToCaller(obj.onError.target, obj.onError.target[obj.onSuccess.action]);
            this.onError = obj.onError;
        } else if(obj.onError === 'function') {
            this.onError = obj.onError;
        }
    },

    setIntermediateCallbacks: function(obj) {
        obj.onSuccess = {
            target: this,
            action: 'handleSuccessCallback'
        };
        obj.onError = {
            target: this,
            action: 'handleErrorCallback'
        };
    },

    handleSuccessCallback: function(res, obj, dp) {

        if(dp.type === this.localProvider.type) {
            this.callbacks.success.local = {result: res, param: obj, dataProvider:dp};
        } else if(dp.type === this.remoteProvider.type) {
            this.callbacks.success.remote = {result: res, param: obj, dataProvider:dp};
        }

        this.callbackCounter = this.callbackCounter + 1;

        if(this.callbackCounter === this.usedProviders) {
            this.calculateOperationState();
        }
    },

    handleErrorCallback: function(err, obj, dp) {
 
        if(dp.type === this.localProvider.type) {
            this.callbacks.error.local = {err: err, param: obj, dataProvider:dp};
        } else if(dp.type === this.remoteProvider.type) {
            this.callbacks.error.remote = {err: err, param: obj, dataProvider:dp};

            // TODO: put into remote data providers
            obj.model.state_remote = M.STATE_FAIL;
        }

        this.callbackCounter = this.callbackCounter + 1;

        /* if this is the last callback */
        if(this.callbackCounter === this.usedProviders) {
            this.calculateOperationState();
        }
    },
    
    calculateOperationState: function(obj) {
        switch(obj.prio) {
            case M.PRIO_LOCAL:
                if(!this.callbacks.success.local) {
                    this.onError(this.error.local.err, obj);
                } else {
                    this.onSuccess(this.success.local.result, obj);
                }
            case M.PRIO_REMOTE:
                if(!this.callbacks.error.local) {
                    this.onError(this.error.remote.err, obj);
                } else {
                    this.onSuccess(this.success.remote.result, obj);
                }
            case M.PRIO_BOTH:
                /* if one of the callback failed */
                if(!this.callbacks.success.local || !this.callbacks.success.remote) {
                    /* return remote error */
                    this.onError(this.error.remote.err, obj);
                } else {  /* if both callbacks have been success callbacks */
                    this.onSuccess(this.success.remote.result, obj);
                }
            break;
        }
    }
});