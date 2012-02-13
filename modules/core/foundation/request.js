// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * The root class for every request. Makes ajax requests. Is used e.g. for querying REST web services.
 * First M.Request.init needs to be called, then send.
 *
 * @extends M.Object
 */
M.Request = M.Object.extend(
/** @scope M.Request.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Request',

    /**
     * The HTTP method to use.
     *
     * Defaults to GET.
     *
     * @type String
     */
    method: 'GET',

    /**
     * The URL this request is sent to.
     *
     * @type String
     */
    url: null,

    /**
     * Sends the request asynchronously instead of blocking the browser.
     * You should almost always make requests asynchronous. You can change this
     * options with the async() helper option (or simply set it directly).
     *
     * Defaults to YES.
     *
     * @type Boolean
     */
    isAsync: YES,


    /**
     * Processes the request and response as JSON if possible.
     *
     * Defaults to NO.
     *
     * @type Boolean
     */
    isJSON: NO,

    /**
     * Optional timeout value of the request in milliseconds.
     *
     * @type Number
     */
    timeout: null,

    /**
     * If set, contains the request's callbacks in sub objects. There are three
     * possible callbacks that can be used:
     *
     *   - beforeSend
     *   - success
     *   - error
     *
     * A callback object consists of at least an action but can also specify a
     * target object that determines the scope for that action. If a target is
     * specified, the action can either  be a string (the name if a method within
     * the specified scope) or a function. If there is no target specified, the
     * action must be a function. So a success callback could e.g. look like:
     *
     *   callbacks: {
     *     success: {
     *       target: MyApp.MyController,
     *       action: 'successCallback'
     *     }
     *   }
     *
     * Or it could look like:
     *
     *   callbacks: {
     *     success: {
     *       target: MyApp.MyController,
     *       action: function() {
     *         // do something...
     *       }
     *     }
     *   }
     *
     * Depending on the type of callback, there are different parameters, that
     * are automatically passed to the callback:
     *
     *   - beforeSend(request)
     *   - success(data, msg, request)
     *   - error(request, msg)
     *
     * For further information about that, take a look at the internal callbacks
     * of M.Request:
     *
     *   - internalBeforeSend
     *   - internalOnSuccess
     *   - internalOnError
     *
     * @type Object
     */
    callbacks: null,

    /**
     * This property can be used to specify whether or not to cache the request.
     * Setting this to YES will set the 'Cache-Control' property of the request
     * header to 'no-cache'.
     *
     * @Boolean
     */
    sendNoCacheHeader: YES,

    /**
     * This property can be used to specify whether or not to send a timestamp
     * along with the request in order to make every request unique. Since some
     * browsers (e.g. Android) automatically cache identical requests, setting
     * this property to YES will add an additional parameter to the request,
     * containing the current timestamp.
     *
     * So if you have any trouble with caching of requests, try setting this to
     * YES. But note, that it might also cause trouble on the server-side if they
     * do not expect this additional parameter.
     *
     * @Boolean
     */
    sendTimestamp: NO,

    /**
     * The data body of the request.
     *
     * @type String, Object
     */
    data: null,

    /**
     * Holds the jQuery request object
     *
     * @type Object
     */
    request: null,

    /**
     * Initializes a request. Sets the parameter of this request object with the passed values.
     *
     * @param {Object} obj The parameter object. Includes:
     * * method: the http method to use, e.g. 'POST'
     * * url: the request url, e.g. 'twitter.com/search.json' (needs a proxy to be set because of Same-Origin-Policy)
     * * isAsync: defines whether request should be made async or not. defaults to YES. Should be YES.
     * * isJSON: defines whether to process request and response as JSON
     * * timout: defines timeout in milliseconds
     * * data: the data to be transmitted
     * * beforeSend: callback that is called before request is sent
     * * onError: callback that is called when an error occured
     * * onSuccess: callback that is called when request was successful
     */
    init: function(obj){
        obj = obj ? obj : {};
        return this.extend({
            method: obj['method'] ? obj['method'] : this.method,
            url: obj['url'] ? obj['url'] : this.url,
            isAsync: (obj['isAsync'] !== undefined && obj['isAsync'] !== null) ? obj['isAsync'] : this.isAsync,
            isJSON: (obj['isJSON'] !== undefined && obj['isJSON'] !== null) ? obj['isJSON'] : this.isJSON,
            timeout: obj['timeout'] ? obj['timeout'] : this.timeout,
            data: obj['data'] ? obj['data'] : this.data,
            callbacks: obj['callbacks'],
            sendNoCacheHeader: obj['sendNoCacheHeader'],
            sendTimestamp: obj['sendTimestamp'],
            beforeSend: obj['beforeSend'] ? obj['beforeSend'] : this.beforeSend,
            onError: obj['onError'] ? obj['onError'] : this.onError,
            onSuccess: obj['onSuccess'] ? obj['onSuccess'] : this.onSuccess
        });
    },

    /**
     * A pre-callback that is called right before the request is sent.
     *
     * Note: This method will be removed with v1.0! Use the callbacks
     * property instead.
     *
     * @deprecated
     * @param {Object} request The XMLHttpRequest object.
     */
    beforeSend: function(request){},

    /**
     * The callback to be called if the request failed.
     *
     * Note: This method will be removed with v1.0! Use the callbacks
     * property instead.
     *
     * @deprecated
     * @param {Object} request The XMLHttpRequest object.
     * @param {String} msg The error message.
     */
    onError: function(request, msg){},

    /**
     * The callback to be called if the request succeeded.
     *
     * Note: This method will be removed with v1.0! Use the callbacks
     * property instead.
     *
     * @deprecated
     * @param {String|Object} data The data returned from the server.
     * @param {String} msg A String describing the status.
     * @param {Object} request The XMLHttpRequest object.
     */
    onSuccess: function(data, msg, request){},

    /**
     * This method is an internal callback that is called right before a
     * request is send.
     *
     * @param {Object} request The XMLHttpRequest object.
     */
    internalBeforeSend: function(request){
        if(this.sendNoCacheHeader) {
            request.setRequestHeader('Cache-Control', 'no-cache');
        }

        if(!this.callbacks && this.beforeSend) {
            this.beforeSend(request);
        }

        if(this.callbacks && this.callbacks['beforeSend'] && M.EventDispatcher.checkHandler(this.callbacks['beforeSend'])) {
            M.EventDispatcher.callHandler(this.callbacks['beforeSend'], null, NO, [request]);
        }
    },

    /**
     * This method is an internal callback that is called if a request
     * failed.
     *
     * @param {Object} request The XMLHttpRequest object.
     * @param {String} msg The error message.
     */
    internalOnError: function(request, msg){
        if(!this.callbacks && this.onError) {
            this.onError(request, msg);
        }

        if(this.callbacks && this.callbacks['error'] && M.EventDispatcher.checkHandler(this.callbacks['error'])) {
            M.EventDispatcher.callHandler(this.callbacks['error'], null, NO, [request, msg]);
        }
    },

    /**
     * This method is an internal callback that is called if the request
     * succeeded.
     *
     * @param {String|Object} data The data returned from the server.
     * @param {String} msg A String describing the status.
     * @param {Object} request The XMLHttpRequest object.
     */
    internalOnSuccess: function(data, msg, request){
        if(!this.callbacks && this.onSuccess) {
            this.onSuccess(data, msg, request);
        }

        if(this.callbacks && this.callbacks['success'] && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
            M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [data, msg, request]);
        }
    },

    /**
     * Sends an Ajax request by using jQuery's $.ajax().
     * Needs init first!
     */
    send: function(){
        this.request = $.ajax({
            type: this.method,
            url: this.url,
            async: this.isAsync,
            dataType: this.isJSON ? 'json' : 'text',
            contentType: this.isJSON ? 'application/json' : 'application/x-www-form-urlencoded',
            timeout: this.timeout,
            data: this.data ? this.data : '',
            context: this,
            beforeSend: this.internalBeforeSend,
            success: this.internalOnSuccess,
            error: this.internalOnError,
            cache: !this.sendTimestamp
        });
    },

    /**
     * Aborts this request. Delegate to jQuery
     *
     * @return Boolean Indicating whether request exists and is aborted or not
     */
    abort: function() {
        if(this.request) {
            this.request.abort();
            return YES;
        }
        return NO;
    }

});