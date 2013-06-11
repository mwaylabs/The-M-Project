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
        name: 'https://mway.firebaseIO.com/the-m-project',
        version: '1.0',
        entities: []
    },

    initialize: function( obj ) {
        M.DataConnector.prototype.initialize.apply(this, arguments);

        this._socket  = M.SocketIO.create({

            host: 'http://localhost:8100',

            path: 'live_data',

            events: {

                connected: {
                    action: function() { }
                }
            }
        });

        var entities = this.getEntities();
        for (var name in entities) {
            this._bindEntity(entities[name], this._socket);
        }
    },

    _bindEntity: function(entity, ref) {

        var that = this;
        var store = this.getCollection(entity);
        entity.ref = ref;

        entity.ref.on( 'entity_' + entity.name, { target: entity, action: 'onMessage' });

        entity.onMessage = function(msg) {
            if (msg.data && msg.method) {
                var model = entity.toRecord(msg.data);
                model.setId(id);
                that.sync(msg.method, model, { entity: entity.name });
            }
        }
    },

    create: function(model, options) {
        var entity = this.getEntity(_.extend({ model: model }, options));
        if (entity) {
            var msg = {
                method: 'create',
                id:     '',
                data:   model.attributes
            }
            entity.db.emit('create', JSON.stringify(msg));
        }
//      M.DataConnector.prototype.create.apply(this, arguments);
    }


});
