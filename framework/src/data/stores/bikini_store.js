
M.BikiniStore = M.Store.extend({

    _type: 'M.BikiniStore',

    _transactionFailed: false,

    _selector: null,

    name: 'bikini',

    size: 1024 * 1024 * 5,

    version: '1.2',

    host:   '',

    path:   '',

    resource: 'live',

    useLocalStore: true,

    msgStore:  null,

    messages:  null,

    typeMapping: {
        'binary':  'text',
        'date':    'string'
    },

    initialize: function( options ) {
        M.Store.prototype.initialize.apply(this, arguments);

        var that  = this;
        options   = options || {};

        this.host     = options.host || this.host;
        this.path     = options.path || this.path;
        this.resource = options.resource || this.resource;

        this._initStores();

        this._socket = M.SocketIO.create({
            host: this.host,
            resource: (this.path ? this.path + "/" : "") + this.resource,
            connected: function() {
                that._initialized = true;
                if( that.entities ) {
                    for( var name in that.entities ) {
                        var entity = that.entities[name];
                        that._bindEntity(entity);
                    }
                }
                that.sendMessages();
            }
        });
    },

    _initStores: function() {
        var MsgCollection  = M.Collection.extend({
            model: M.Model.extend({ idAttribute: '_id' })
        });
        this.msgStore = new M.LocalStorageStore({
            entities: {
                messages: {
                    collection: MsgCollection
                }
            }
        });

        this.messages  = new MsgCollection();
        this.messages.fetch();
    },

    _bindEntity: function(entity) {
        var that = this;
        entity.channel = entity.channel || 'entity_' + entity.name;
        var time = this.getLastMessageTime(entity.channel);
        this._socket.on(entity.channel, function(msg) {
            if (msg) {
                that.setLastMessageTime(entity.channel, msg.time);
                that.trigger(entity.channel, msg);
            }
        });
        this._socket.emit('bind', {
             entity: entity.name,
             time:   time
        });
        // do initial sync
        // if (!this.getLastMessageTime(entity.channel)) {
        //    this.sync("read", {}, { entity: entity.name, store: this });
        //}
    },

    getEntityByChannel: function(channel) {
        if (channel && channel.indexOf('entity_') === 0 && channel.length > 7) {
            return this.getEntity( null, { entity: channel.substr(7) } )
        }
    },

    getLastMessageTime: function(channel) {
        return localStorage.getItem('__'+ channel + 'last_msg_time') || 0;
    },

    setLastMessageTime: function(channel, time) {
        if (time) {
            localStorage.setItem('__'+ channel + 'last_msg_time', time);
        }
    },

    _hashCode: function(str){
        var hash = 0, i, char;
        if (str.length == 0) return hash;
        for (i = 0, l = str.length; i < l; i++) {
            char  = str.charCodeAt(i);
            hash  = ((hash<<5)-hash)+char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    },

    createLocalStore: function(entity, collection) {
        var entities = {};
        var hash = this._hashCode(collection.url);
        var name = entity +"-"+hash;
        entities[entity] = {
            name: name
        };
        return new M.LocalStorageStore({
            entities: entities
        });
    },

    onMessage: function(msg) {
        if (msg && msg.method) {
            var options = { store: this.localStore, merge: true, fromMessage: true, entity: this.entity.name };
            var attrs   = msg.data;
            switch(msg.method) {
                case 'patch':
                    options.patch = true;
                case 'update':
                case 'create':
                    var model = msg.id ? this.get(msg.id) : null;
                    if (model) {
                        model.save(attrs, options);
                    } else {
                        this.create(attrs, options);
                    }
                    break;

                case 'delete':
                    if (msg.id) {
                        var model = this.get(msg.id);
                        if (model) {
                            model.destroy(options);
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    },

    sync: function(method, model, options) {
        var that   = options.store || this.store;
        if (options.fromMessage) {
            return that.handleCallback(options.success);
        }
        var entity = that.getEntity(model, options, this.entity);
        if (that && entity) {
            var channel = entity.channel;

            if ( M.isModel(model) && !model.id) {
                model.set(model.idAttribute, new M.ObjectID().toHexString());
            }

            // connect collection with this channel
            if ( M.isCollection(this) && channel && !this.channel) {
                this.channel = channel;
                if (that.useLocalStore && !this.localStore) {
                    this.localStore = that.createLocalStore(entity.name, this);
                }
                if (!entity.collection) {
                    entity.collection = this;
                }
                if (this.url) {
                    entity.url = this.url;
                    entity.credentials = this.credentials;
                }
                this.listenTo(that, channel, that.onMessage, this);
            }

            var time = that.getLastMessageTime(entity.channel);
            // only send read messages if no other store can do this
            // or for initial load
            if (method !== "read" || !this.localStore || !time) {
                // do backbone rest
                that.addMessage(method, model,
                    this.localStore ? {} : options, // we don't need to call callbacks if an other store handle this
                    entity);
            }
            if (this.localStore) {
                options.store  = this.localStore;
                this.localStore.sync.apply(this, arguments);
            }
        }
    },

    addMessage: function(method, model, options, entity) {
        var that = this;
        if (method && model) {
            var changes = model.changedSinceSync;
            var data = null;
            var storeMsg = false;
            switch (method) {
                case 'update':
                case 'create':
                    data  = model.attributes;
                    storeMsg = true;
                    break;
                case 'patch':
                    if ( _.isEmpty(changes)) return;
                    data = changes;
                    storeMsg = true;
                    break;
                case 'delete':
                    storeMsg = true;
                    break;
            }
            var msg = {
                _id: model.id,
                id: model.id,
                method: method,
                data: data
            };
            var emit = function(entity, msg) {
                that.emitMessage(entity, msg, options);
            };
            if (storeMsg) {
                this.storeMessage(entity, msg, emit);
            } else {
                emit(entity, msg);
            }
        }
    },

    emitMessage: function(entity, msg, options) {
        var channel = entity.channel;
        var that = this;
        console.log('emitMessage:' + msg.id);
        var model = this.createModel(channel.substr(7), msg.data);
        var url   = entity.url;
        if (msg.id && msg.method !== 'create') {
            url += "/" + msg.id;
        }
        Backbone.sync(msg.method, model, {
            url: url,
            error: function(xhr, status) {
                if (status === 'error') {
                    that.handleCallback(options.error, error);
                } else {
                    that.removeMessage(channel, msg, function(channel, msg) {
                        // Todo: revert changed data
                        that.handleCallback(options.error, error);
                    });
                }
            },
            success: function(data) {
                that.removeMessage(channel, msg, function(channel, msg) {
                    if (options.success) {
                        var resp = data;
                        that.handleCallback(options.success, resp);
                    } else {
                        // that.setLastMessageTime(channel, msg.time);
                        if (msg.method === 'read') {
                            var array = _.isArray(data) ? data : [ data ];
                            for (var i=0; i < array.length; i++) {
                                data = array[i];
                                if (data) {
                                    that.trigger(channel, {
                                        id: data._id,
                                        method: 'update',
                                        data: data
                                    });
                                    //that.setLastMessageTime(channel, msg.time);
                                }
                            }
                        } else {
                            that.trigger(channel, msg);
                        }
                    }
                });
            },
            beforeSend: function(xhr) {
                M.Request.setAuthentication(xhr, that.credentials);
            }
        });
    },

    sendMessages: function() {
        var that = this;
        this.messages.each( function(message) {
            var msg      = message.get('msg');
            var channel  = message.get('channel');
            var entity   = that.getEntityByChannel(channel);
            var callback = message.get('callback');
            if (entity) {
                if (callback) {
                    callback(entity, msg);
                } else {
                    that.emitMessage(entity, msg, {});
                }
            } else {
                that.removeMessage(channel, msg);
            }
        });
    },

    mergeMessages: function(data, id) {
        return data;
    },

    storeMessage: function(entity, msg, callback) {
        var channel = entity.channel;
        var message = this.messages.get(msg._id);
        if (message) {
            message.save({
                msg: _.extend(message.get('msg'), msg)
            });
        } else {
            this.messages.create({
                _id: msg._id,
                id:  msg.id,
                msg: msg,
                channel: channel,
                callback: callback
            });
        }
        callback(entity, msg);
    },

    removeMessage: function(channel, msg, callback) {
        var message = this.messages.get(msg._id);
        if (message) {
            message.destroy();
        }
        callback(channel, msg);
    }
});
