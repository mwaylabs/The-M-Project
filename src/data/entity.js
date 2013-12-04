// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Entity
 *
 */

/**
 * Holds description about fields and other entity properties.
 * Also helper functions for field and transform operations
 * @module M.Entity
 *
 * @param options
 * @constructor
 */
M.Entity = function (options) {
    var fields = this.fields;
    this.fields = {};
    this._mergeFields(fields);
    options = options || {};
    if (options.fields) {
        this._mergeFields(options.fields);
    }
    this.typeMapping = options.typeMapping || this.typeMapping;
    var collection = options.collection;
    var model = options.model || (collection ? collection.prototype.model : null);
    this.idAttribute = options.idAttribute || this.idAttribute || (model ? model.prototype.idAttribute : '');
    this._updateFields(this.typeMapping);
    this.initialize.apply(this, arguments);
};

/**
 * create a new entity from an other entity or given properties
 *
 * @param entity
 * @param options
 * @returns {*}
 */
M.Entity.from = function (entity, options) {
    // is not an instance of M.Entity
    if (!M.Entity.prototype.isPrototypeOf(entity)) {
        // if this is a prototype of an entity, create an instance
        if (_.isFunction(entity) &&
            M.Entity.prototype.isPrototypeOf(entity.prototype)) {
            var Entity = entity;
            entity = new Entity(options);
        } else {
            if (typeof entity === 'string') {
                entity = {
                    name: entity
                };
            }
            // if this is just a config create a new Entity
            var E = M.Entity.extend(entity);
            entity = new E(options);
        }
    } else if (options && options.typeMapping) {
        entity._updateFields(options.typeMapping);
    }
    return entity;
};

M.Entity.extend = M.extend;
M.Entity.create = M.create;
M.Entity.design = M.design;

_.extend(M.Entity.prototype, M.Object, {

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Entity',

    /**
     * Entity name, used for tables or collections
     *
     * @type String
     */
    name: '',

    /**
     * idAttribute, should be the same as in the corresponding model
     *
     * @type String
     */
    idAttribute: '',

    /**
     *
     *
     * @type Object
     */
    fields: {},

    /**
     * initialize function will be called after creating an entity
     */
    initialize: function () {
    },

    /**
     * get the field list of this entity
     *
     * @returns {Object}
     */
    getFields: function () {
        return this.fields;
    },

    /**
     * get a specified field from this entity
     *
     * @param fieldKey
     * @returns M.Field instance
     */
    getField: function (fieldKey) {
        return this.fields[fieldKey];
    },

    /**
     * get the translated name of a field
     *
     * @param fieldKey
     * @returns String
     */
    getFieldName: function (fieldKey) {
        var field = this.getField(fieldKey);
        return field && field.name ? field.name : fieldKey;
    },

    /**
     * get the primary key of this entity
     *
     * @returns String
     */
    getKey: function () {
        return this.idAttribute || M.Model.idAttribute;
    },

    /**
     * get a list of keys for this entity
     *
     * @returns {Array}
     */
    getKeys: function () {
        return this.splitKey(this.getKey());
    },

    /**
     * Splits a comma separated list of keys to a key array
     *
     * @returns {Array} array of keys
     */
    splitKey: function (key) {
        var keys = [];
        if (_.isString(key)) {
            _.each(key.split(','), function (key) {
                var k = key.trim();
                if (k) {
                    keys.push(k);
                }
            });
        }
        return keys;
    },

    /**
     * merge a new list of fields into the exiting fields
     *
     * @param newFields
     * @private
     */
    _mergeFields: function (newFields) {
        if (!_.isObject(this.fields)) {
            this.fields = {};
        }
        var that = this;
        if (_.isObject(newFields)) {
            _.each(newFields, function (value, key) {
                if (!that.fields[key]) {
                    that.fields[key] = new M.Field(value);
                } else {
                    that.fields[key].merge(value);
                }
            });
        }
    },

    /**
     * check and update missing properties of fields
     *
     * @param typeMapping
     * @private
     */
    _updateFields: function (typeMapping) {
        var that = this;
        _.each(this.fields, function (value, key) {
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

    /**
     * transform the given data to attributes
     * considering the field specifications
     *
     * @param data
     * @param id
     * @param fields
     * @returns {*}
     */
    toAttributes: function (data, id, fields) {
        fields = fields || this.fields;
        if (data && !_.isEmpty(fields)) {
            // map field names
            var value, attributes = {};
            _.each(fields, function (field, key) {
                value = _.isFunction(data.get) ? data.get(field.name) : data[field.name];
                attributes[key] = value;
            });
            return attributes;
        }
        return data;
    },

    /**
     * transform the given attributes to the destination data format
     * considering the field specifications
     *
     * @param attrs
     * @param fields
     * @returns {*}
     */
    fromAttributes: function (attrs, fields) {
        fields = fields || this.fields;
        if (attrs && !_.isEmpty(fields)) {
            var data = {};
            _.each(fields, function (field, key) {
                var value = _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
                value = field.transform(value);
                if (!_.isUndefined(value)) {
                    data[field.name] = value;
                }
            });
            return data;
        }
        return attrs;
    },

    /**
     * set the id of the given model or attributes
     *
     * @param attrs
     * @param id
     * @returns {*}
     */
    setId: function (attrs, id) {
        if (attrs && id) {
            var key = this.getKey() || attrs.idAttribute;
            if (key) {
                if (_.isFunction(attrs.set)) {
                    attrs.set(key, id);
                } else {
                    attrs[key] = id;
                }
            }
        }
        return attrs;
    },

    /**
     * get the id of the given model or attributes
     *
     * @param attrs
     * @returns {*|Object|key|*}
     */
    getId: function (attrs) {
        if (attrs) {
            var key = this.getKey() || attrs.idAttribute;
            if (key) {
                return _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
            }
        }
    }
});
