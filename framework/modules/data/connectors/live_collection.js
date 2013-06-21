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

    socket_url: '',

    path: '',

    store: null,

    msg_methods: ['create', 'update', 'patch', 'delete'],

    initialize: function() {

        this.model = this.model.extend({
            sync: this.sync_model
        });

        var path, socket_url;
        if (this.url) {
            var index   = this.url.lastIndexOf('/');
            path        = this.url.substr(index+1);
            socket_url  = this.url.substr(0, index);
        }
        this.socket_url = socket_url || this.socket_url;
        this.path       = path || this.path || this.entity;
        this.entity     = this.entity || this.path;

        if (this.socket_url) {
            this._initialize(socket_url);
        }

        this.store = this._createStore('_live_'+this.entity);
        this.store.select({
            entity: 'documents',
            fields: ['_id'],
            order: '_id DESC',
            limit: 1,
            success: { target: this, action: 'syncDocuments' }
        });
    },

    _createStore: function(name) {
        return M.DataConnectorWebSql.create({
            version: '1.0',
            name: name,
            entities: {
                // name of the entity
                documents: {
                    key:    '_id',
                    fields:  {
                        _id:         { type: M.CONST.TYPE.STRING, required: YES },
                        _changed:    { type: M.CONST.TYPE.INTEGER },
                        document:    { type: M.CONST.TYPE.TEXT   }
                    }
                },
                messages: {
                    key:    '_id',
                    fields:  {
                        _id:         { type: M.CONST.TYPE.STRING, required: YES },
                        message:     { type: M.CONST.TYPE.TEXT   }
                    }
                }
            }
        });
    },

    _initialize: function(socket_url) {
        var that = this;
        this._socket = M.SocketIO.create({
            host: socket_url,
            path: 'live_data',
            connected: function() {
                that._connected();
                that._initialized = true;
            }
        });
    },

    save: function(obj, options) {
        // if this is a model
        if ( _.isArray(obj) || Backbone.Collection.prototype.isPrototypeOf(obj) && obj !== this) {
            var models = _.isArray(obj) ? obj : obj.models;
            this.set(models);
            obj = null;

        } else if (!obj || obj === this) {

        } else {
            var model;
            if (Backbone.Model.prototype.isPrototypeOf(obj)) {
                if (obj.collection === this) {
                    model = attr;
                } else {
                    obj = model.attributes;
                }
            }
            if (!model) {
                model = new this.model(obj);
            }
            model.save(obj, options);
        }
    },

    _connected: function() {
        this._bindEntity();
    },

    _bindEntity: function() {

        var that = this;

        this.channel = 'entity_' + this.path;
        this._socket.emit('bind', this.path);
        this._socket.on(this.channel, {
                target: this,
                action: 'onMessage'
            }
        );
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

    syncDocuments: function(result) {

    },

    sync_model: function(method, model, options) {
        var that = model.collection;
        if (that && _.contains(that.msg_methods, method)) {
            that.addMessage(method, model, options);
        } else {
            Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    },

    sync: function(method, model, options) {
        if ( _.contains(this.msg_methods, method)) {
            this.addMessage(method, model, options);
        } else {
            Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    },

    addMessage: function(method, model, options) {
        var that = this;
        if (method && model) {
            var data = null;
            switch (method) {
                case 'update':
                case 'create':
                    data = model.attributes;
                    break;
                case 'patch':
                    data = model.changedAttributes();
                    break;
            }
            if (data !== false) {
                var msg = { method: method, id: model.id, data: data };
                this.storeMessage(msg);
                if (this._socket && this.channel) {
                    this._socket.emit(this.channel, msg, function(error) {
                        that.removeMessage(msg);
                        if (error) {
                            that.handleCallback(options.error, error);
                        } else {
                            that.syncToStore(msg, options);
//                            that.handleCallback(options.success, model);
                        }
                    });
//                    model.trigger('request', model, {}, options);
                }
            }
        }
    },

    storeMessage: function(msg) {
//        this.store.save({
//            "_id": msg.id,
//            "message": JSON.stringify(msg)
//        }, { entity: 'messages' } );
    },

    removeMessage: function(msg) {
//        this.store.delete({
//            "_id": msg.id
//        }, { entity: 'messages' } );
    },

    syncToStore: function(msg, options) {
        var that = this;
        var data = {
            _id: msg.id,
            document: JSON.stringify(msg.data)
        };
        var onSuccess = function() {
            that.handleCallback(options.success, msg.data);
        };
        switch(msg.method) {
            case 'create':
            case 'update':
                this.store.save( data, {
                    entity: 'documents',
                    success: onSuccess
                });
                break;
            case 'patch' :
                this.store.fetch( data, {
                    entity: 'documents',
                    success: function(result) {
                        if (result.length > 0) {
                            // TODO: Merge Data
                            result.at(0).save(data, {
                                success: onSuccess
                            });
                        } else {
                            that.store.create(data, {
                                entity: 'documents',
                                success: onSuccess
                            });
                        }
                    }
                });
                break;
            case 'delete':
                this.store.delete( data, {
                    entity: 'documents',
                    success: onSuccess
                });
                break;
        }
    }

});
