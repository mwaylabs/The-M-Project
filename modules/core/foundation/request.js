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
            isAsync: obj['isAsync'] ? obj['isAsync'] : this.isAsync,
            isJSON: obj['isJSON'] ? obj['isJSON'] : this.isJSON,
            timeout: obj['timeout'] ? obj['timeout'] : this.timeout,
            data: obj['data'] ? obj['data'] : this.data,
            beforeSend: obj['beforeSend'] ? obj['beforeSend'] : this.beforeSend,
            onError: obj['onError'] ? obj['onError'] : this.onError,
            onSuccess: obj['onSuccess'] ? obj['onSuccess'] : this.onSuccess
        });
    },

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
     * You should almost always make requests asynchronous. �You can change this
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
     * A pre-callback that is called right before the request is sent.
     *
     * @param {Object} request The XMLHttpRequest object.
     */
    beforeSend: function(request){},

    /**
     * The callback to be called if the request failed.
     *
     * @param {Object} request The XMLHttpRequest object.
     * @param {String} msg The error message.
     */
    onError: function(request, msg){},

    /**
     * The callback to be called if the request succeeded.
     * @param {String|Object} data The data returned from the server.
     * @param {String} msg A String describing the status.
     * @param {Object} request The XMLHttpRequest object.
     */
    onSuccess: function(data, msg, request){},

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
            contentType: this.JSON ? 'application/JSON' : 'application/x-www-form-urlencoded',
            timeout: this.timeout,
            data: this.data ? this.data : '',
            context: this,
            beforeSend: this.beforeSend,
            success: this.onSuccess,
            error: this.onError
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