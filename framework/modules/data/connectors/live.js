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

M.DataConnectorLive = M.DataConnector.extend({

    _type: 'M.DataConnectorLive',

    _initialized: false,

    msg_methods: ['create', 'update', 'patch', 'delete'],

    initialize: function(options) {
        M.DataConnector.prototype.initialize.apply(this, arguments);
    },

    bindCollection: function(collection) {
        if (collection && collection.entity) {
            var channel = 'entity_' + collection.entity;
            collection.listenTo(this, channel, this.onMessage, collection);
        }
    },

    onMessage: function(msg) {
        if (msg && msg.method) {
            var options = {};
            switch(msg.method) {

                case 'create':
                    if (msg.data) {
                        var model = this._prepareModel(msg.data, options);
                        this.add(model, options);
                    }
                    break;

                case 'update':
                case 'patch':
                    if (msg.data && msg.id) {
                        var model = this.get(msg.id);
                        model.set(msg.data);
                    }
                    break;

                case 'delete':
                    if (msg.id) {
                        var model = this.get(msg.id);
                        this.remove(model, options);
                    }
                    break;

                default:
                    break;
            }
        }
    },

    syncCollection: function(method, model, options) {
        var ctxt = this;
        var that = this.connector;
        var args = arguments;
        if (that) {
            that._getEntity(this.entity, function(entity) {
                that.bindCollection(this);
                if ( _.contains(that.msg_methods, method)) {
                    return that.sendMessage(entity, method, model, options);
                } else {
                    return Backbone.sync.apply(ctxt, args);
                }
            }, this);
        } else {
            return Backbone.sync.apply(ctxt, args);
        }
    },

    syncModel: function(method, model, options) {
        var ctxt = this;
        var that = this.connector;
        var args = arguments;
        if (that) {
            that._getEntity(this.entity, function(entity) {
                if ( _.contains(that.msg_methods, method)) {
                    return that.sendMessage(entity, method, model, options);
                } else {
                    return Backbone.sync.apply(ctxt, args);
                }
            }, this);
        } else {
            return Backbone.sync.apply(ctxt, args);
        }
    },

    sendMessage: function(entity, method, model, options) {
        if (entity && method && model) {
            if (entity._socket && entity.channel) {
                var msg = {
                    method: method,
                    id:     model.id,
                    data:   model.attributes
                }
                entity._socket.emit(entity.channel, msg);
                this.handleCallback(options.success);
            }
        }
    },

    _getEntity: function(name, callback, context) {
        var that = this;
        var entity = name ? this.entities[name] : null;
        if (entity && !entity._socket) {
            if (!entity.trigger) {
                _.extend(entity, Backbone.Events);
            }
            if (!entity.socketUrl && entity.url) {
                var index   = entity.url.lastIndexOf('/');
                entity.path = entity.url.substr(index+1);
                entity.socketUrl  = entity.url.substr(0, index);
            }
            entity.path = entity.path || name;
            if (entity.socketUrl) {
                entity._socket = M.SocketIO.create({
                    host: entity.socketUrl,
                    path: 'live_data',
                    events: {
                        connect: {
                            action: function() {
                                entity.channel = 'entity_' + entity.path;
                                entity._socket.emit('bind', entity.path);
                                entity._socket.on(entity.channel, function (msg) {
                                    entity.trigger(entity.channel, msg);
                                });
                                that.handleCallback({
                                    target: context || that, action: callback
                                }, entity);
                            }
                        }
                    }
                });
                return;
            }
        }
        that.handleCallback({ target: context || that, action: callback }, entity);
    }

});
