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

    _socket: null,

    /**
     * Default configuration
     */
    config: {
        name:       '',
        version:    '1.0',
        entities:   []
    },

    _initialize: function(obj, callback) {
        var that = this;
        this._socket = M.SocketIO.create({

            host: this.config.name,

            path: 'live_data',

            events: {
                connect: {
                    action: function() {
                        that.connected();
                        that._initialized = true;
                        if (callback) {
                            callback(obj);
                        }
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
        var entities = this.getEntities();
        if (entities) {
            for (var name in entities) {
                this._bindEntity(entities[name], this._socket);
            }
        }
    },

    _bindEntity: function(entity, ref) {

        var that = this;
        var store = this.getCollection(entity);
        entity.ref = ref;

        entity.channel = 'entity_' + entity.name;
        entity.ref.emit('bind', entity.name);
        entity.ref.on(entity.channel, {
                target: entity,
                action: 'onMessage'
            }
        );

        entity.onMessage = function(msg) {
            if (msg.data && msg.method) {
                var model = entity.toRecord(msg.data);
                if (msg.id) {
                    model.setId(msg.id);
                }
                that.sync(msg.method, model, { entity: entity.name }, true);
            }
        }
    },

    sync: function(method, model, options, fromMessage) {
        switch(method) {
            case 'create':
                this.create(model, options );
                break;
            case 'update':
                this.update(model, options );
                break;
            case 'patch':
                this.patch (model, options );
                break;
            case 'delete':
                this.delete(model, options );
                break;
            case 'read':
                this.read  (model, options);
                break;
            default:
                return;
        }

        if( !this._initialized ) {
            var that = this;
            this._initialize({ method: method, model: model, options: options },
                function(obj) {
                    if (!fromMessage) {
                        that.sendMessage(method, model, options);
                    }
                }
            );
        }
    },

    sendMessage: function(method, model, options) {
        if (method && model) {
            var entity = this.getEntity(_.extend({ model: model }, options));
            if (entity) {
                var msg = {
                    method: method,
                    id:     model.id,
                    data:   model.attributes
                }
                entity.ref.emit('entity_' + entity.name, msg);
            }
        }
    }


});
