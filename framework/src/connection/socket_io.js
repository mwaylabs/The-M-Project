// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      21.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.SocketIO = M.Object.extend(/** @scope M.SocketIO.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.SocketIO',

    /**
     * The host name of the socket.io server.
     *
     * @type String
     */
    host: '',

    /**
     * The path to the socket.io instance on the server.
     *
     * @type String
     */
    path: '',

    /**
     * The resource to the socket.io instance on the server.
     *
     * @type String
     */
    resource: '',

    /**
     * The path to the socket.io.js client script on the server.
     *
     * @type String
     */
    script: 'libs/socket.io.js',

    /**
     * This property is used to specifiy all events for a socket within an application.
     *
     * @type {Object}
     */
    events: null,

    /**
     * This property contains the socket connection.
     *
     * @type {Object}
     */
    _socket: null,

    /**
     * This property contains a socket's event handlers for all events.
     *
     * @type {Object}
     */
    _events: null,

    /**
     * This method is based on M.Object's extend() but adds some request specific features.
     * It creates a new instance of M.Request based on the given configuration properties.
     *
     * @param obj
     * @returns {M.Request}
     */
    create: function( obj ) {
        return this.extend(obj);
    },

    emit: function(event, data, callback) {
        this._socket.emit(event, data, callback);
    },

    on: function(eventType, handler) {
        var that = this;
        this._socket.on(eventType, function(data) {
            that.handleCallback(handler, data);
        });
    },

    disconnect: function() {
        var that = this;
        if (this._socket) {
            this._socket.removeAllListeners();
            this._socket.on('connect', function(data) {
                that.connected(data);
            });
            this._socket.on('disconnect', function(data) {
                that.disconnected(data);
            });
        }
        this._socket.disconnect();
    },

    connect: function(param) {
        var that = this;
        var url  = this.host; //  + '/'  + this.path;
        if (param) {
            url += "?" + (_.isString(param) ? param : $.param(param));
        }
        var options  = this.resource ? { resource: this.resource } : {};
        this._socket = io.connect(url, options);
        this._socket.on('connect', function(data) {
            that.connected(data);
        });
        that._registerEvents();
    },

    ready: function() {
        this.connect();
    },

    error: function(message) {
        console.log(message);
    },

    /**
     * This method returns the event handler of a certain event type of a socket.
     *
     * @param eventType
     * @returns {*}
     */
    getEventHandler: function( eventType ) {
        return this._events[eventType];
    },

    /**
     * M.SocketIO's _init method.
     *
     * @private
     */
    _init: function() {
        if ( Object.getPrototypeOf(this) === M.SocketIO ) {
            this._initEvents();
            var x = x || {};
            if (typeof io === 'object') {
                this.ready();
            } else {
                console.log("Socket.IO not present !!");
            }
        }
    },

    /**
     * This method is used to init a socket's event lists.
     *
     * @private
     */
    _initEvents: function() {
        this.events = this.events || {};
        this._events = {};

        _.each(this.events, function( handler, eventName ) {
            this._addEvent(name, handler)
        }, this);
    },

    _addEvent: function(eventName, handler) {
        if( _.isFunction(handler)) {
            handler = { action: handler };
        }
        if (!handler.target ) {
            handler.target = this;
        }
        this._events[eventName] = handler;
    },

    /**
     * This method registers all socket's events.
     *
     * @private
     */
    _registerEvents: function() {
        var that = this;
        this._socket.on('disconnect', function(data) {
            that.disconnect(data)
        } );
        _.each(this._events, function( handler, eventType ) {
            this._socket.on(eventType, function(data) {
                that.handleCallback(handler, data);
            });
        }, this);
    },

    connected: function(data) {
    },

    disconnected: function(data) {
    }

});