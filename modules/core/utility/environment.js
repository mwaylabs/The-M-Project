// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

M.OFFLINE = 'offline';
M.ONLINE = 'online';


/**
 * @class
 *
 * Encapsulates methods to retrieve information about the environment,
 * like browser used, platform, user agent (based on navigator object) or
 * if the device is on- or offline (determined via ajax request).
 */
M.Environment = M.Object.extend({

    /**
     * Checks the connection status by sending an ajax request
     * and waiting for the response to decide whether online or offline.
     *
     * The callback is called when the request returns successful or times out. The parameter to callback is a
     * string saying either offline or online.
     *
     * @param {function} callback The function to be called when request returns.
     * @param {String} url Optional. The request url. When not given, request is made to google.com
     * @param {Number} timeout Optional. Time in milliseconds until request is considered to be timed out. Defaults to 5 seconds.
     */
    getConnectionStatus: function(callback, url, timeout){
        M.Request.init({
                url: url ? url : '/google',
                isJSON: NO,
                timeout: timeout ? timeout : 5000,
                onSuccess: function(data){
                    callback(M.ONLINE);
                },
                onError: function(data){
                    callback(M.OFFLINE);
                }
            }).send();
    },

    /**
     * Returns the userAgent as received from navigator object.
     * E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7"
     */
    getUserAgent: function() {
        return navigator.userAgent;
    },

    /**
     * Returns the platform as received from navigator object.
     * E.g. "MacIntel"
     */
    getPlatform: function() {
        return navigator.platform;
    },

    /**
     * Returns the browser version as received from navigator object.
     * E.g. "5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7"
     */
    getBrowserName: function() {
        return navigator.appName;
    },

    /**
     * Returns the currently available width and height of the browser window
     * as an array:
     *
     * 0 -> width
     * 1 -> height
     */
    getSize: function() {
        var viewportWidth;
        var viewportHeight;

        if(typeof window.innerWidth != 'undefined') {
            viewportWidth = window.innerWidth,
            viewportHeight = window.innerHeight
        } else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            viewportWidth = document.documentElement.clientWidth,
            viewportHeight = document.documentElement.clientHeight
        } else {
            viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportHeight = document.getElementsByTagName('body')[0].clientHeight
        }

        return [viewportWidth, viewportHeight];
    },

    /**
     * Returns the currently available width of the browser window.
     */
    getWidth: function() {
        return this.getSize()[0];
    },

    /**
     * Returns the currently available height of the browser window.
     */
    getHeight: function() {
        return this.getSize()[1];
    }


});