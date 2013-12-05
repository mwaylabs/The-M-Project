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