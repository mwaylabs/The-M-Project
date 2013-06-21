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

M.Collection = Backbone.Collection.extend(M.Object);

M.Collection.create = M.create;

_.extend(M.Collection.prototype, {

    _type: 'M.Collection',

    isCollection: YES,

    model: M.Model,

    entity: null,

    constructor: function(options) {
        options = options || {};
        this.connector = options.connector || this.connector || (this.model ? this.model.prototype.connector : null);
        this.entity    = options.entity || this.entity || (this.model ? this.model.prototype.entity : null);

        if (this.connector && _.isFunction(this.connector.initCollection)) {
            this.connector.initCollection(this, options);
        }
        if (this.entity) {
            this.entity = M.Entity.from(this.entity, { typeMapping: options.typeMapping });
        }
        // call base constructor
        Backbone.Collection.apply(this, arguments);
    },

    initialize: function(options) {
    },

    select: function(options) {
        var selector   = options.where ? M.DataSelector.create(options.where) : null;
        var collection = M.Collection.create(null, { model: this.model });

        _.each(this, function(model) {
            if (!selector || selector.matches(model.attributes)) {
                collection.add(model);
            }
        });

        if (options.sort) {
            collection.sortBy(M.DataSelector.compileSort(options.sort));
        }
        return collection;
    },

    sync: function(method, model, options) {
        var store = (options ? options.store : null) || this.store;
        if (store && _.isFunction(store.sync)) {
            return store.sync.apply(this, arguments);
        } else {
            return Backbone.sync.apply(this, arguments);
        }
    }

});
