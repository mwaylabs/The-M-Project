// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * The M.BikiniStore is used to connect a model collection to an
 * bikini server.
 *
 * This will give you an online and offline store with live data updates.
 *
 * @module M.BikiniStore
 *
 * @type {*}
 * @extends M.Store
 *
 * @example
 *
 * The default configuration will save the complete model data as a json,
 * and the offline change log to a local WebSql database, synchronize it
 * trough REST calls with the server and receive live updates via a socket.io connection.
 *
 * var MyCollection = M.Collection.extend({
 *      model: MyModel,
 *      url: 'http://myBikiniServer.com:8200/bikini/myCollection',
 *      store: new M.BikiniStore( {
 *          useLocalStore:   true, // (default) store the data for offline use
 *          useSocketNotify: true, // (default) register at the server for live updates
 *          useOfflineChanges: true // (default) allow changes to the offline data
 *      })
 * });
 *
 */
M.BikiniStore = M.Store.extend({

    _type: 'M.BikiniStore',

    _transactionFailed: false,

    _selector: null,

    endpoints: {},

    options: null,

    localStore: M.WebSqlStore,

    useLocalStore: true,

    useSocketNotify: true,

    useOfflineChanges: true,

    typeMapping: {
        'binary': 'text',
        'date': 'string'
    },

    initialize: function( options ) {
        M.Store.prototype.initialize.apply(this, arguments);
        this.options = this.options || {};
        this.options.useLocalStore = this.useLocalStore;
        this.options.useSocketNotify = this.useSocketNotify;
        this.options.useOfflineChanges = this.useOfflineChanges;
        this.options.socketPath = this.socketPath;
        this.options.localStore = this.localStore;
        this.options.typeMapping = this.typeMapping;
        _.extend(this.options, options || {});
    },

    initModel: function( model ) {
    },

    initCollection: function( collection ) {
        var url = collection.getUrlRoot();
        var entity = this.getEntity(collection.entity);
        if( url && entity ) {
            var name = entity.name;
            var idAttribute = entity.idAttribute;
            var hash = this._hashCode(url);
            var credentials = entity.credentials || collection.credentials;
            var user = credentials && credentials.username ? credentials.username : '';
            var channel = name + user + hash;
            collection.channel = channel;
            // get or create endpoint for this url
            var that = this;
            var endpoint = this.endpoints[hash];
            if( !endpoint ) {
                var href = M.Request.getLocation(url);
                endpoint = {};
                endpoint.baseUrl = url;
                endpoint.readUrl = collection.getUrl();
                endpoint.host = href.protocol + '//' + href.host;
                endpoint.path = href.pathname;
                endpoint.entity = entity;
                endpoint.channel = channel;
                endpoint.credentials = credentials;
                endpoint.socketPath = this.options.socketPath;
                endpoint.localStore = this.createLocalStore(endpoint);
                endpoint.messages = this.createMsgCollection(endpoint);
                endpoint.socket = this.createSocket(endpoint, collection);
                endpoint.info = this.fetchServerInfo(endpoint, collection);
                that.endpoints[hash] = endpoint;
            }
            collection.endpoint = endpoint;
            collection.listenTo(this, endpoint.channel, this.onMessage, collection);
            if( endpoint.messages && !endpoint.socket ) {
                that.sendMessages(endpoint, collection);
            }
        }
    },

    getEndpoint: function( url ) {
        if( url ) {
            var hash = this._hashCode(url);
            return this.endpoints[hash];
        }
    },

    createLocalStore: function( endpoint, idAttribute ) {
        if( this.options.useLocalStore && endpoint ) {
            var entities = {};
            entities[endpoint.entity.name] = {
                name: endpoint.channel,
                idAttribute: idAttribute
            };
            return new this.options.localStore({
                entities: entities
            });
        }
    },

    createMsgCollection: function( endpoint ) {
        if( this.options.useOfflineChange && endpoint ) {
            var name = 'msg-' + endpoint.channel;
            var MsgCollection = M.Collection.extend({
                model: M.Model.extend({ idAttribute: '_id' })
            });
            var messages = new MsgCollection({
                entity: name,
                store: new this.options.localStore()
            });
            messages.fetch();
            return messages;
        }
    },

    createSocket: function( endpoint, collection, name ) {
        if( this.options.useSocketNotify && endpoint.socketPath && endpoint ) {
            var path = endpoint.path;
            path = endpoint.socketPath || (path + (path.charAt(path.length - 1) === '/' ? '' : '/' ) + 'live');
            // remove leading /
            var resource = (path && path.indexOf('/') === 0) ? path.substr(1) : path;
            var that = this;
            var socket = M.SocketIO.create({
                host: endpoint.host,
                resource: resource,
                connected: function() {
                    that._bindChannel(socket, endpoint, name);
                    that.sendMessages(endpoint, collection);
                }
            });
            return socket;
        }
    },

    _bindChannel: function( socket, endpoint, name ) {
        var that = this;
        var channel = endpoint.channel;
        var time = this.getLastMessageTime(channel);
        name = name || endpoint.entity.name;
        socket.on(channel, function( msg ) {
            if( msg ) {
                that.setLastMessageTime(channel, msg.time);
                that.trigger(channel, msg);
            }
        });
        socket.emit('bind', {
            entity: name,
            channel: channel,
            time: time
        });
    },

    getLastMessageTime: function( channel ) {
        return localStorage.getItem('__' + channel + 'last_msg_time') || 0;
    },

    setLastMessageTime: function( channel, time ) {
        if( time ) {
            localStorage.setItem('__' + channel + 'last_msg_time', time);
        }
    },

    _hashCode: function( str ) {
        var hash = 0, char;
        if( str.length === 0 ) {
            return hash;
        }
        for( var i = 0, l = str.length; i < l; i++ ) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    },

    onMessage: function( msg ) {
        if( msg && msg.method ) {
            var localStore = this.endpoint ? this.endpoint.localStore : null;
            var options = { store: localStore, merge: true, fromMessage: true, entity: this.entity, parse: true };
            var attrs = msg.data;

            switch( msg.method ) {
                case 'patch':
                case 'update':
                case 'create':
                    options.patch = msg.method === 'patch';
                    var model = msg.id ? this.get(msg.id) : null;
                    if( model ) {
                        model.save(attrs, options);
                    } else {
                        this.create(attrs, options);
                    }
                    break;
                case 'delete':
                    if( msg.id ) {
                        if( msg.id === 'all' ) {
                            while((model = this.first())) {
                                if( localStore ) {
                                    localStore.sync.apply(this, ['delete', model, { store: localStore, fromMessage: true } ]);
                                }
                                this.remove(model);
                            }
                            this.store.setLastMessageTime(this.endpoint.channel, '');
                        } else {
                            var msgModel = this.get(msg.id);
                            if( msgModel ) {
                                msgModel.destroy(options);
                            }
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    },

    sync: function( method, model, options ) {
        var that = options.store || this.store;
        if( options.fromMessage ) {
            return that.handleCallback(options.success);
        }
        var endpoint = that.getEndpoint(this.getUrlRoot());
        if( that && endpoint ) {
            var channel = this.channel;

            if( M.isModel(model) && !model.id ) {
                model.set(model.idAttribute, new M.ObjectID().toHexString());
            }

            var time = that.getLastMessageTime(channel);
            // only send read messages if no other store can do this
            // or for initial load
            if( method !== 'read' || !endpoint.localStore || !time ) {
                // do backbone rest
                that.addMessage(method, model, // we don't need to call callbacks if an other store handle this
                    endpoint.localStore ? {} : options, endpoint);
            } else if( method === 'read' && time ) {
                that.fetchChanges(endpoint, time);
            }
            if( endpoint.localStore ) {
                options.store = endpoint.localStore;
                endpoint.localStore.sync.apply(this, arguments);
            }
        }
    },

    addMessage: function( method, model, options, endpoint ) {
        var that = this;
        if( method && model ) {
            var changes = model.changedSinceSync;
            var data = null;
            var storeMsg = false;
            switch( method ) {
                case 'update':
                case 'create':
                    data = options.attrs || model.toJSON();
                    storeMsg = true;
                    break;
                case 'patch':
                    if( _.isEmpty(changes) ) {
                        return;
                    }
                    data = model.toJSON({ attrs: changes });
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
            var emit = function( endpoint, msg ) {
                that.emitMessage(endpoint, msg, options, model);
            };
            if( storeMsg ) {
                this.storeMessage(endpoint, msg, emit);
            } else {
                emit(endpoint, msg);
            }
        }
    },

    emitMessage: function( endpoint, msg, options, model ) {
        var channel = endpoint.channel;
        var that = this;
        var url = M.isModel(model) || msg.method !== 'read' ? endpoint.baseUrl : endpoint.readUrl;
        if( msg.id && msg.method !== 'create' ) {
            url += '/' + msg.id;
        }
        model.sync.apply(model, [msg.method, model, {
            url: url,
            error: function( xhr, status ) {
                if( !xhr.responseText && that.options.useOfflineChange ) {
                    // this seams to be only a connection problem, so we keep the message an call success
                    that.handleCallback(options.success, msg.data);
                } else {
                    that.removeMessage(endpoint, msg, function( endpoint, msg ) {
                        // Todo: revert changed data
                        that.handleCallback(options.error, status);
                    });
                }
            },
            success: function( data ) {
                that.removeMessage(endpoint, msg, function( endpoint, msg ) {
                    if( options.success ) {
                        var resp = data;
                        that.handleCallback(options.success, resp);
                    } else {
                        // that.setLastMessageTime(channel, msg.time);
                        if( msg.method === 'read' ) {
                            var array = _.isArray(data) ? data : [ data ];
                            for( var i = 0; i < array.length; i++ ) {
                                data = array[i];
                                if( data ) {
                                    that.trigger(channel, {
                                        id: data._id,
                                        method: 'update',
                                        data: data
                                    });
                                }
                            }
                        } else {
                            that.trigger(channel, msg);
                        }
                    }
                });
            },
            store: {}
        }]);
    },

    fetchChanges: function( endpoint, time ) {
        var that = this;
        if( endpoint && endpoint.baseUrl && time ) {
            var changes = new M.Collection({});
            changes.fetch({
                url: endpoint.baseUrl + '/changes/' + time,
                success: function() {
                    changes.each(function( msg ) {
                        if( msg.time && msg.method ) {
                            that.setLastMessageTime(endpoint.channel, msg.time);
                            that.trigger(endpoint.channel, msg);
                        }
                    });
                },
                credentials: endpoint.credentials
            });
        }
    },

    fetchServerInfo: function( endpoint, collection ) {
        var that = this;
        if( endpoint && endpoint.baseUrl ) {
            var info = new M.Model();
            var time = that.getLastMessageTime(endpoint.channel);
            info.fetch({
                url: endpoint.baseUrl + '/info',
                success: function() {
                    if( !time && info.get('time') ) {
                        that.setLastMessageTime(endpoint.channel, info.get('time'));
                    }
                    if( !endpoint.socketPath && info.get('socketPath') ) {
                        endpoint.socketPath = info.get('socketPath');
                        var name = info.get('entity') || endpoint.entity.name;
                        if( that.options.useSocketNotify ) {
                            that.createSocket(endpoint, collection, name);
                        }
                    }
                },
                credentials: endpoint.credentials
            });
        }
    },

    sendMessages: function( endpoint, collection ) {
        if( endpoint && endpoint.messages && collection ) {
            var that = this;
            endpoint.messages.each(function( message ) {
                var msg;
                try {
                    msg = JSON.parse(message.get('msg'));
                } catch( e ) {
                }
                var channel = message.get('channel');
                if( msg && channel ) {
                    var model = that.createModel({ collection: collection }, msg.data);
                    that.emitMessage(endpoint, msg, {}, model);
                } else {
                    message.destroy();
                }
            });
        }
    },

    mergeMessages: function( data, id ) {
        return data;
    },

    storeMessage: function( endpoint, msg, callback ) {
        if( endpoint && endpoint.messages && msg ) {
            var channel = endpoint.channel;
            var message = endpoint.messages.get(msg._id);
            if( message ) {
                var oldMsg = JSON.parse(message.get('msg'));
                message.save({
                    msg: JSON.stringify(_.extend(oldMsg, msg))
                });
            } else {
                endpoint.messages.create({
                    _id: msg._id,
                    id: msg.id,
                    msg: JSON.stringify(msg),
                    channel: channel
                });
            }
        }
        callback(endpoint, msg);
    },

    removeMessage: function( endpoint, msg, callback ) {
        if( endpoint && endpoint.messages ) {
            var message = endpoint.messages.get(msg._id);
            if( message ) {
                message.destroy();
            }
        }
        callback(endpoint, msg);
    },

    clear: function( collection ) {
        if( collection ) {
            var endpoint = this.getEndpoint(collection.getUrlRoot());
            if( endpoint ) {
                if( endpoint.localStore ) {
                    endpoint.localStore.destroy();
                }
                if( endpoint.messages ) {
                    endpoint.messages.destroy();
                }
                collection.reset();
                this.setLastMessageTime(endpoint.channel, '');
            }
        }
    }

});
