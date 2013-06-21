
M.Model = Backbone.Model.extend(M.Object);


_.extend(M.Model.prototype, {

    _type: 'M.Model',

    isModel: YES,

    entity: null,

    changedSinceSync: {},

    constructor: function(attributes, options) {
        options = options || {};

        this.idAttribute = options.idAttribute || this.idAttribute;
        if (this.store && _.isFunction(this.store.initModel)) {
            this.store.initModel(this, options);
        }
        if (this.entity) {
            this.entity = M.Entity.from(this.entity, { typeMapping: options.typeMapping });
            this.idAttribute = entity.idAttribute || this.idAttribute;
        }
        this.on('change', this.onChange, this);
        this.on('sync',   this.onSync, this);

        // call base constructor
        Backbone.Model.apply(this, arguments);
    },

    initialize: function(attributes, options) {
    },

    sync: function(method, model, options) {
        var store = (options ? options.store : null) || this.store;
        if (store && _.isFunction(store.sync)) {
            return store.sync.apply(this, arguments);
        } else {
            return Backbone.sync.apply(this, arguments);
        }
    },

    onChange: function(model, options) {
    // For each `set` attribute, update or delete the current value.
        var attrs = model.changedAttributes();
        if ( _.isObject(attrs)) {
            for (attr in attrs) {
                val = attrs[attr];
                this.changedSinceSync[attr] = val;
            }
        }
    },

    onSync: function(model, options) {
        this.changedSinceSync = {};
    }

});

M.Model.create = M.create;
