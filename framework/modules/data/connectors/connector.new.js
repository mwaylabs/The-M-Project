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
_.extend(M.DataConnector.prototype, Backbone.Events, M.Object, {

    _type: 'M.DataConnector',

    entities: null,

    typeMap: {
        'object':  'text',
        'array':   'text',
        'binary':  'text',
        'date':    'string'
    },

    initialize: function(config) {
        config = config || {};
        this.entities  = {};
        this.name      = config.name || '';
        this.url       = config.url  || '';
        var entities   = config.entities || {};
        for (var name in entities) {
            this.setEntity(name, entities[name]);
        }
    },

    setEntity: function(name, entity) {
        entity.name        = entity.name || name;
        entity.collection  = entity.collection || M.Collection.extend({ model: M.Model.extend({}) });
        entity.model       = entity.model || entity.collection.prototype.model || M.Model.extend({});
        entity.idAttribute = entity.idAttribute || entity.model.prototype.idAttribute;
        entity.url         = entity.url || entity.collection.prototype.url;

        _.extend(entity.model.prototype, {
            entity: entity.name,
            idAttribute: entity.idAttribute,
            connector: this
        });

        _.extend(entity.collection.prototype, {
            entity: entity.name,
            model:  entity.model,
            url:    entity.url,
            connector: this
        });

        this.entities[name] = entity;
        this.initEntity(entity);
    },

    getCollection: function(entity_name) {
        if (this.entities[entity_name]) {
            return this.entities[entity_name].collection;
        }
    },

    getModel: function(entity_name) {
        if (this.entities[entity_name]) {
            return this.entities[entity_name].model;
        }
    },

    initModel: function(model) {
    },

    initCollection: function(collection) {
    },

    initEntity: function(entity) {
    },

    /**
     *
     * @param collection usally a collection, but can also be a model
     * @param options
     */
    fetch: function (collection, options) {
        if (collection && !collection.models && !collection.attributes && !options) {
            options = collection;
        }
        if ((!collection || (!collection.models && !collection.attributes)) && options && options.entity) {
            var c = this.getCollection(options.entity);
            collection = c ? new c() : null;
        }
        if (collection && collection.fetch) {
            var opts = _.extend({} , options || {}, { connector: this });
            collection.fetch(opts);
        }
    },

    create: function(collection, model, options) {
        if (collection && !collection.models && !options) {
            model   = collection;
            options = model;
        }
        if ((!collection || !collection.models) && options && options.entity) {
            var c = this.getCollection(options.entity);
            collection = c ? new c() : null;
        }
        if (collection && collection.create) {
            var opts = _.extend({} , options || {}, { connector: this });
            collection.create(model, opts);
        }
    },

    save: function(model, attr, options) {
        if (model && !model.attributes && !options) {
            attr = model;
            options = attr;
        }
        if ((!model || !model.attributes) && options && options.entity) {
            var m = this.getModel(options.entity);
            model = m ? new m() : null;
        }
        if (model && model.save) {
            var opts = _.extend({} , options || {}, { connector: this });
            model.save(attr, opts);
        }
    },

    destroy: function (model, options) {
        if (model && model.destroy) {
            var opts = _.extend({} , options || {}, { connector: this });
            model.destroy(opts);
        }
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

    syncCollection: function(method, model, options) {
        if (options) {
            this.handleCallback(options.success);
        }
    },

    syncModel: function(method, model, options) {
        if (options) {
            this.handleCallback(options.success);
        }
    }

});
