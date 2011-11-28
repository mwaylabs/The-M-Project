// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * A constant value for being offline.
 *
 * @type String
 */
M.OFFLINE = 'offline';

/**
 * A constant value for being online.
 *
 * @type String
 */
M.ONLINE = 'online';

/**
 * A constant value for portrait orientation mode.
 *
 * @type String
 */
M.PORTRAIT_TOP = 0;

/**
 * A constant value for inverse portrait orientation mode.
 *
 * @type String
 */
M.PORTRAIT_BOTTOM = 180;

/**
 * A constant value for landscape right orientation mode.
 *
 * @type String
 */
M.LANDSCAPE_RIGHT = -90;

/**
 * A constant value for landscape left orientation mode.
 *
 * @type String
 */
M.LANDSCAPE_LEFT = 90;

/**
 * @class
 *
 * M.Environment encapsulates methods to retrieve information about the
 * environment, like browser used, platform, user agent (based on navigator
 * object) or whether or not the device is online (determined via an ajax
 * request).
 *
 * @extends M.Object
 */
M.Environment = M.Object.extend(
/** @scope M.Environment.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Environment',

    /**
     * This property contains a custom configuration of the awesome modernizr
     * library We currently only use this for detecting supported input types
     * of the browser.
     *
     * @private
     * @type Object
     */
    modernizr: function(a,b,c){function y(){e.inputtypes=function(a){for(var d=0,e,g,h,i=a.length;d<i;d++)k.setAttribute("type",g=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(g)&&k.style.WebkitAppearance!==c?(f.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,f.removeChild(k)):/^(search|tel)$/.test(g)||(/^(url|email)$/.test(g)?e=k.checkValidity&&k.checkValidity()===!1:/^color$/.test(g)?(f.appendChild(k),f.offsetWidth,e=k.value!=l,f.removeChild(k)):e=k.value!=l)),o[a[d]]=!!e;return o}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function x(a,b){return!!~(""+a).indexOf(b)}function w(a,b){return typeof a===b}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function u(a){j.cssText=a}var d="2.0.6",e={},f=b.documentElement,g=b.head||b.getElementsByTagName("head")[0],h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m=Object.prototype.toString,n={},o={},p={},q=[],r,s={}.hasOwnProperty,t;!w(s,c)&&!w(s.call,c)?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],c)};for(var z in n)t(n,z)&&(r=z.toLowerCase(),e[r]=n[z](),q.push((e[r]?"":"no-")+r));e.input||y(),u(""),i=k=null,e._version=d;return e}(this,this.document),

    /**
     * Checks the connection status by sending an ajax request
     * and waiting for the response to decide whether online or offline.
     *
     * The callback is called when the request returns successful or times out. The parameter to callback is a
     * string saying either offline or online.
     *
     * @param {Object} callback The object, consisting of target and action, defining the callback.
     * @param {String} url Optional. The request url. When not given, a request is made to http://www.google.de/images/logos/ps_logo2.png.
     */
    getConnectionStatus: function(callback, url){
        url = url ? url : 'http://www.google.de/images/logos/ps_logo2.png';
        var that = this;
        var image = M.ImageView.design({
            value: url,
            events: {
                load: {
                    action: function(id) {
                        var image = M.ViewManager.getViewById(id);
                        image.destroy();
                        if(callback && M.EventDispatcher.checkHandler(callback, 'online')){
                            that.bindToCaller(callback.target, callback.action, M.ONLINE)();
                        }
                    }
                },
                error: {
                    action: function(id) {
                        var image = M.ViewManager.getViewById(id);
                        image.destroy();
                        if(callback && M.EventDispatcher.checkHandler(callback, 'offline')){
                            that.bindToCaller(callback.target, callback.action, M.OFFLINE)();
                        }
                    }
                }
            }
        });
        $('body').append(image.render());
        image.registerEvents();
    },

    /**
     * Returns the userAgent as received from navigator object.
     * E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7"
     *
     * @returns {String} The user agent.
     */
    getUserAgent: function() {
        return navigator.userAgent;
    },

    /**
     * Returns the platform as received from navigator object.
     * E.g. "MacIntel"
     *
     * @returns {String} The user's platform.
     */
    getPlatform: function() {
        return navigator.platform;
    },

    /**
     * Returns the currently available width and height of the browser window
     * as an array:
     *
     * 0 -> width
     * 1 -> height
     *
     * @returns {Array} The width and height of the user's browser window.
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
     *
     * @returns {Number} The width of the user's browser window.
     */
    getWidth: function() {
        return this.getSize()[0];
    },

    /**
     * Returns the currently available height of the browser window.
     *
     * @returns {Number} The height of the user's browser window.
     */
    getHeight: function() {
        return this.getSize()[1];
    },

    /**
     * Returns the total size of the page/document, means not only the area of the browser window.
     *
     * 0 -> width
     * 1 -> height
     *
     * @returns {Array} The width and height of the document.
     */
    getTotalSize: function() {
        return [this.getTotalWidth(), this.getTotalHeight()];
    },

    /**
     * Returns the total width of the page/document, means not only the area of the browser window.
     * Uses jQuery.
     *
     * @returns {Number} The total width of the document.
     */
    getTotalWidth: function() {
        return $(document).width();
    },

    /**
     * Returns the total height of the page/document, means not only the area of the browser window.
     * Uses jQuery.
     *
     * @returns {Number} The total height of the document.
     */
    getTotalHeight: function() {
        return $(document).height();
    },

    /**
     * This method returns the device's current orientation, depending on whether
     * or not the device is capable of detecting the current orientation. If the
     * device is unable to detect the current orientation, this method will return
     * NO.
     *
     * Possible return values are:
     *
     *   - M.PORTRAIT
     *   - M.LANDSCAPE_LEFT
     *   - M.LANDSCAPE_RIGHT
     *
     * @return {Number|Boolean} The orientation type as a constant value. (If the orientation can not be detected: NO.)
     */
    getOrientation: function() {
        switch(window.orientation) {
            case 0:
                return M.PORTRAIT_TOP;
            case false:
                return M.PORTRAIT_BOTTOM;
            case 90:
                return M.LANDSCAPE_LEFT;
            case -90:
                return M.LANDSCAPE_RIGHT;
            default:
                M.Logger.log('This device does not support orientation detection.', M.WARN);
                return NO;
        }
    },

    /**
     * This method checks if the browser supports a certain input type specified with
     * HTML5. This check is based on Modernizr. For further information abbout the
     * input types, take a look at the W3C spec:
     * http://dev.w3.org/html5/spec/Overview.html#states-of-the-type-attribute
     *
     * @param {String} inputTye The HTML5 input type to be checked.
     * @return {Boolean} A flag telling you if the input type is supported or not.
     */
    supportsInputType: function(inputType) {
        if(this.modernizr.inputtypes && this.modernizr.inputtypes[inputType] === YES) {
            return YES;
        }
        return NO;
    }

});