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

M.DataConnector = function() {
  this.initialize.apply(this, arguments);
};

M.DataConnector.extend = Backbone.Model.extend;

M.DataConnector.create = M.create;

// Attach all inheritable methods to the Connector prototype.
_.extend(M.DataConnector.prototype, M.Object, {

    _type: 'M.DataConnector',

    _initialized: false,

    _callback: null,

    _entities: null,

    config: null,

    typeMap: {
        'object':  'text',
        'array':   'text',
        'binary':  'text',
        'date':    'string'
    },

    initialize: function(config) {
        if (config) {
            this.config = config;
            this.configure(config);
        }
    },

    // initialize from configuration
    configure: function (config) {
        this._entities = {};
        var that = this;
        if (config) {
            this._name = config.name;
            // merge entity fields
            if (config.entities) {
                _.each(config.entities, function(entity, name) {
                    if( _.isObject(entity)) {
                        that.addEntity({
                            name:    name,
                            model:   entity.model,
                            fields:  entity.fields,
                            key:     entity.key,
                            typeMap: that.typeMap
                        });
                    }
                });
            }
        }
    },

    addEntity: function(obj) {
        var that = this;
        obj.model = obj.model || M.Model.extend({});

        _.extend(obj.model.prototype, {

            idAttribute: obj.key,

            sync: function(method, model, options) {
                that.sync(method, model,
                    _.extend({ entity: obj.name }, options));
            }
        });

        var entity = M.DataEntity.create(obj);
        if (entity) {
            this._entities[entity.name] = entity;
        }
        return entity;
    },

    getEntities: function() {
        return this._entities || {};
    },

    getEntityNames: function() {
        return _.keys(this._entities);
    },

    getEntity: function(obj) {
        var entity = obj;
        if (obj.entity) {
            entity = this._entities[obj.entity];
        } else {
            var model =  obj.model || (_.isArray(obj.data) ? obj.data[0] : obj.data);
            if (model) {
                entity = _.find(this._entities, function(t) {
                    return t.model === model || t.model && t.model.isPrototypeOf(model);
                });
//                if ( _.isUndefined(entity)) {
//                    return this.addEntity({ model: model });
//                }
            }
        }
        return entity;
    },

    getData: function(obj) {
        if (obj && obj.data) {
            return _.isFunction(obj.data.getData) ? obj.data.getData() : obj.data;
        } else if (obj && _.isFunction(obj.getData)) {
            return obj.getData();
        }
    },

    getRecords: function(obj) {
        var records = [];
        var data    = obj && obj.data ? obj.data : null;
        var entity  = this.getEntity(obj);
        var model   = entity ? entity.getModel() : null;
        if ( _.isObject(data)) {
            data = _.isArray(data) ? data : [ data ];
            _.each(data, function(rec) {
                if (M.Model.isPrototypeOf(rec)) {
                    records.push(rec);
                } else if (model && _.isObject(data)) {
                    records.push(model.createRecord(rec));
                }
            });
        }
        return records;
    },

    getCollection: function(obj) {
        var entity = this.getEntity(obj);
        var model = entity ? entity.getModel() : null;
        if (model) {
            // we cache the data on entity
            if (!entity.collection) {
                entity.collection = M.Collection.create(null, { model : model });
            }
            return entity.collection;
        }
    },

    clear: function(entity) {
        if (entity) {
            delete entity.collection;
        } else {
            _.each(this.getEntities(), function(entity) {
                delete entity.collection;
            });
        }
    },

    select: function(options) {
        var collection = this.getCollection(options);
        this.handleSuccess(options, collection);
        return collection.select(options);
    },

//    find: function(obj) {
//
//        // get entity
//        var entity = this.getEntity(obj);
//
//        if (this._checkEntity(obj, entity)) {
//            // map internal collection to records
//            var collection = this.getCollection(entity);
//            var records    = collection.find(obj);
//            this.handleSuccess(obj, records);
//        }
//    },

    /***
     *
     * @param obj { data: array of model, success: success callback, error: error callback, finish:   }
     * @return {*}
     */
//    save: function(obj) {
//
//        // get array
//        var array  = _.isArray(obj.data) ? obj.data : (_.isObject(obj.data) ? [ obj.data ] : null);
//
//        // get entity
//        var entity = this.getEntity(obj);
//
//        if (this._checkEntity(obj, entity) && this._checkData(obj, array)) {
//            var collection = this.getCollection(entity);
//            _.each(array, function(item) {
//                record = M.Model.isPrototypeOf(item) ? item : entity.toRecord(item);
//                collection.set(record);
//            });
//            this.handleSuccess(obj);
//        }
//    },

    save: function(model, options) {
        var sync = model.sync;
        model.sync = this.sync;
        model.save(null, options);
        model.sync = sync;
    },

    handleSuccess: function(obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (obj.success) {
            this.handleCallback.apply(this, [ obj.success ].concat(args));
        }
        if (obj.finish) {
            this.handleCallback.apply(this, [ obj.finish ]. concat(args));
        }
    },

    handleError: function(obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (obj.error) {
            this.handleCallback.apply(this, [ obj.error ]. concat(args));
        }
        if (obj.finish) {
            this.handleCallback.apply(this, [ obj.finish ].concat(args));
        }
    },

    _checkEntity: function(obj, entity) {
        if( !entity ) {
            var error = M.Error.create(M.CONST.ERROR.VALIDATION_PRESENCE, "No valid entity passed.");
            this.handleCallback(obj.error, error);
            this.handleCallback(obj.finish, error);
            return false;
        }
        return true;
    },

    _checkData: function(obj, data) {
        if( (!_.isArray(data) || data.length == 0) && !_.isObject(data) ) {
            var error = M.Error.create(M.CONST.ERROR.VALIDATION_PRESENCE, "No data passed.");
            this.handleCallback(obj.error, error);
            this.handleCallback(obj.finish, error);
            return false;
        }
        return true;
    },

    sync: function(method, model, options) {
        if( !this._initialized ) {
            var that = this;
            this._initialize({ method: method, model: model, options: options },
                function(obj) {
                    that.sync(obj.method, obj.model, obj.options);
                }
            );
        } else {
            switch(method) {
                case 'create':
                    return this.create(model, options );
                case 'update':
                    return this.update(model, options );
                case 'patch':
                    return this.patch (model, options );
                case 'delete':
                    return this.delete(model, options );
                case 'read':
                    return this.read  (model, options);
            }
        }
    },

    _initialize: function(obj, callback) {
        this._initialized = true;
        if (callback) {
            callback(obj);
        }
    },

    create: function(model, options) {
        var collection = this.getCollection({ model: model, entity: options ? options.entity : '' });
        if (collection && model) {
            var attrs = model.attributes || model;
            var resp  = collection.add(attrs);
            this.handleSuccess(options, attrs);
        }
    },

    update: function(model, options) {
        var collection = this.getCollection({ model: model, entity: options ? options.entity : '' });
        if (collection && model) {
            var attrs = model.attributes || model;
            var existing = collection.get(model.id);
            if (existing) {
                existing.set(attrs);
            } else {
                collection.set(attrs, {add: true, remove: true, merge: true});
            }
            this.handleSuccess(options, attrs);
        }
    },

    patch: function(model, options) {
        this.update(model, options);
    },

    delete: function(model, options) {
        var collection = this.getCollection({ model: model, entity: options ? options.entity : '' });
        if (collection && model) {
            var resp = collection.remove(model);
            this.handleSuccess(options);
        }
    },

    read: function(model, options) {
        var collection = this.getCollection({ model: model, entity: options ? options.entity : '' });
        if (collection) {
            if (model && model.id) {
                var resp  = collection.get(model.id);
                var attrs = resp ? resp.attributes : null;
                this.handleSuccess(options, attrs);
            } else {
                var resp = collection.select(options);
                this.handleSuccess(options, resp);
            }
        }
    },

    findOne: function(model, options) {

        this.find(_.extend({}, options, {

            data: model,

            success: function(result) {
                if (result && result.length > 0) {
                    if (options.success) {
                        return options.success(result.at(0).attributes);
                    }
                }
            }
        }));
    }

});
