// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      02.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.LiveDataCollection = M.Collection.extend({

    _type: 'M.LiveDataCollection',

    _socket: null,

    _initialized: false,

    entity: '',

    channel: '',

    msg_methods: ['create', 'update', 'patch', 'delete'],

    initialize: function() {
        var that = this;
        this.model = this.model.extend({
            sync: function(method, model, options) {
                if ( _.contains(that.msg_methods, method)) {
                    if (that._initialized) {
                        that.sendMessage(method, model, options);
                    }
                } else {
                    Backbone.Collection.prototype.sync.apply(this, arguments);
                }
            }
        });

        var socket_url;
        if (this.url) {
            var index = this.url.lastIndexOf('/');
            this.entity = this.url.substr(index+1);
            socket_url  = this.url.substr(0, index);
        }
        if (socket_url && this.entity) {
            this._initialize(socket_url);
        }
    },

    _initialize: function(host) {
        var that = this;
        this._socket = M.SocketIO.create({

            host: host,

            path: 'live_data',

            events: {
                connect: {
                    action: function() {
                        that.connected();
                        that._initialized = true;
                    }
                }
            }
        });
    },

//    initialize: function( obj ) {
//        M.DataConnector.prototype.initialize.apply(this, arguments);
//
//    },

    connected: function() {
        this._bindEntity();
    },

    _bindEntity: function() {

        var that = this;

        this.channel = 'entity_' + this.entity;
        this._socket.emit('bind', this.entity);
        this._socket.on(this.channel, {
                target: this,
                action: 'onMessage'
            }
        );
    },

    onMessage: function(msg) {
        if (msg.data && msg.method) {
            var options = {};
            switch(msg.method) {

                case 'create':
                    var model = this._prepareModel(msg.data, options);
                    this.add(model, options);
                    break;

                case 'update':
                case 'patch':
                    var model = this.get(msg.id);
                    model.set(msg.data);
                    break;

                case 'delete':
                    var model = this.get(msg.id);
                    this.remove(model, options);
                    break;

                default:
                    break;
            }
        }
    },


    sync: function(method, model, options) {
        if ( _.contains(this.msg_methods, method)) {
            if (this._initialized) {
                this.sendMessage(method, model, options);
            }
        } else {
            Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    },

    sendMessage: function(method, model, options) {
        if (method && model) {
            if (this._socket && this.channel) {
                var msg = {
                    method: method,
                    id:     model.id,
                    data:   model.attributes
                }
                this._socket.emit(this.channel, msg);
            }
        }
    }


});
