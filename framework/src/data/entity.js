// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      13.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.Entity = function(options) {
    var fields  = this.fields;
    this.fields = {};
    this._mergeFields(fields);
    options = options || {};
    if (options.fields) {
        this._mergeFields(options.fields);
    }
    this.typeMapping = options.typeMapping || this.typeMapping;
    this.collection  = options.collection  || this.collection;
    this.idAttribute = options.idAttribute || this.idAttribute ||
        (this.collection && this.collection.prototype.model ? this.collection.prototype.model.idAttribute : '');
    this._updateFields(this.typeMapping);
    this.initialize.apply(this, arguments);
};

M.Entity.from = function(entity, options) {
    // is not an instance of M.Entity
    if (!M.Entity.prototype.isPrototypeOf(entity)) {
        // if this is a prototype of an entity, create an instance
        if ( _.isFunction(entity) &&
             M.Entity.prototype.isPrototypeOf(entity.prototype)) {
            entity = new entity(options);
        } else {
            // if this is just a config create a new Entity
            var e  = M.Entity.extend(entity);
            entity = new e(options);
        }
    } else if (options && options.typeMapping) {
        entity._updateFields(options.typeMapping);
    }
    return entity;
};

M.Entity.extend = Backbone.Model.extend;

M.Entity.create = M.create;


_.extend(M.Entity.prototype, M.Object, {

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Entity',

    name: '',

    idAttribute: '',

    collection: null,

    model: null,

    fields: {},

    initialize: function() {
    },

    getFields: function() {
        return this.fields;
    },

    getField: function(fieldKey) {
        return this.fields[fieldKey];
    },

    getFieldName: function(fieldKey) {
        var field = this.getField(fieldKey);
        return field && field.name ? field.name : fieldKey;
    },

    getKey: function() {
        return this.idAttribute || M.Model.idAttribute;
    },

    getKeys: function() {
        return this.splitKey(this.getKey());
    },

    /**
      * Splits a comma separated list of keys to a key array
      *
      * @returns {Array} array of keys
      */
    splitKey: function(key) {
         var keys = [];
         if( _.isString(key) ) {
             _.each(key.split(","), function(key) {
                 var k = key.trim();
                 if( k ) {
                     keys.push(k);
                 }
             });
         }
         return keys;
    },

    _mergeFields: function(newFields) {
        if (!_.isObject(this.fields)) {
            this.fields = {};
        }
        var that = this;
        if (_.isObject(newFields)) {
            _.each(newFields, function(value, key) {
                if (!that.fields[key]) {
                    that.fields[key] = new M.Field(value);
                } else {
                    that.fields[key].merge(value);
                }
            });
        }
    },

    _updateFields: function(typeMapping) {
        var that = this;
        _.each(this.fields, function(value, key) {
            // remove unused properties
            if (value.persistent === NO) {
                delete that.fields[key];
            } else {
                // add missing names
                if (!value.name) {
                    value.name = key;
                }
                // apply default type conversions
                if (typeMapping && typeMapping[value.type]) {
                    value.type = typeMapping[value.type];
                }
            }
        });
    },

    toAttributes: function(data, id) {
        if (data && !_.isEmpty(this.fields)) {
            // map field names
            var value, attributes = {};
            _.each(this.fields, function(field, key) {
                value = _.isFunction(data.get) ? data.get(field.name) : data[field.name];
                attributes[key] = value;
            });
            return attributes;
        }
        return data;
    },

    fromAttributes: function(attrs) {
        if (attrs && !_.isEmpty(this.fields)) {
            var data = {};
            _.each(this.fields, function(field, key) {
                var value = _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
                value = field.transform(value);
                if( !_.isUndefined(value) ) {
                    data[field.name] = value;
                }
            });
            return data;
        }
        return attrs;
    },

    setId: function(attrs, id) {
        if (attrs && id && this.idAttribute) {
            attrs[this.idAttribute] = id;
        }
        return attrs;
    },

    getId: function(attrs) {
        if (attrs && this.idAttribute) {
            return attrs[this.idAttribute];
        }
    }
});
