// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Request
 *
 * @extends M.Object
 */
M.Request = M.Object.design(/** @scope M.Request.prototype */{

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
        return this.design(obj);
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
    },

    /*
     url = "http://example.com:3000/pathname/?search=test#hash";

     location.protocol; // => "http:"
     location.host;     // => "example.com:3000"
     location.hostname; // => "example.com"
     location.port;     // => "3000"
     location.pathname; // => "/pathname/"
     location.hash;     // => "#hash"
     location.search;   // => "?search=test"
     */
    getLocation: function( url ) {
        var location = document.createElement('a');
        location.href = url || this.url;
        // IE doesn't populate all link properties when setting .href with a relative URL,
        // however .href will return an absolute URL which then can be used on itself
        // to populate these additional fields.
        if( location.host === '' ) {
            location.href = location.href;
        }
        return location;
    }

});