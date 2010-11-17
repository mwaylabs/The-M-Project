// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

M.Request = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.Request',
    
    init: function(obj){
        this.type = obj['type'] ? obj['type'] : this.type;
        this.url = obj['url'] ? obj['url'] : this.url;
        this.isAsync = obj['isAsync'] ? obj['isAsync'] : this.isAsync;
        this.isJSON = obj['isJSON'] ? obj['isJSON'] : this.isJSON;
        this.timeout = obj['timeout'] ? obj['timeout'] : this.timeout;
        this.data = obj['data'] ? obj['data'] : this.data;
        this.beforeSend = obj['beforeSend'] ? obj['beforeSend'] : this.beforeSend;
        this.onError = obj['onError'] ? obj['onError'] : this.onError;
        this.onSuccess = obj['onSuccess'] ? obj['onSuccess'] : this.onSuccess;
        return this;
    },

    /**
     * The HTTP method to use.
     *
     * Defaults to GET.
     *
     * @property {String}
     */
    type: 'GET',

    /**
     * The URL this request is sent to.
     *
     * @property {String}
     */
    url: null,

    /**
     * Sends the request asynchronously instead of blocking the browser.
     * You should almost always make requests asynchronous. ÊYou can change this
     * options with the async() helper option (or simply set it directly).
     *
     * Defaults to YES.
     *
     * @property {Boolean}
     */
    isAsync: YES,


    /**
     * Processes the request and response as JSON if possible.
     *
     * Defaults to NO.
     *
     * @property {Boolean}
     */
    isJSON: NO,

    /**
     * Optional timeout value of the request in milliseconds.
     *
     * @property {Number}
     */
    timeout: null,

    /**
     * The data body of the request.
     *
     * @property {String, Object} 
     */
    data: null,

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
     * @param {String, Object} data The data returned from the server.
     * @param {String} msg A String describing the status.
     * @param {Object} request The XMLHttpRequest object.
     */
    onSuccess: function(data, msg, request){},


    /**
     * Sends an Ajax request by using jQuery's $.ajax().
     */
    send: function(){
        $.ajax({
            type: this.type,
            url: this.url,
            async: this.isAsync,
            dataType: this.isJSON ? 'json' : 'text',
            timeout: this.timeout,
            data: this.data ? this.data : '',
            context: this,
            beforeSend: this.beforeSend,
            success: this.onSuccess,
            error: this.onError
        });
    }

});

