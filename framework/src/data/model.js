
M.Model = Backbone.Model.extend(M.Object);

M.Model.create = M.create;

_.extend(M.Model.prototype, {

    _type: 'M.Model',

    isModel: YES,

    entity: null,

    changedSinceSync: {},

    initialize: function(attributes, options) {
         options = options || {};

        this.idAttribute = options.idAttribute || this.idAttribute;
        this.store = this.store || (this.collection ? this.collection.store : null) || options.store;
        if (this.store && _.isFunction(this.store.initModel)) {
            this.store.initModel(this, options);
        }
        this.entity = this.entity || (this.collection ? this.collection.entity : null) || options.entity;
        if (this.entity) {
            this.entity = M.Entity.from(this.entity, { typeMapping: options.typeMapping });
            this.idAttribute = this.entity.idAttribute || this.idAttribute;
        }
        this.credentials = this.credentials || (this.collection ? this.collection.credentials : null) || options.credentials;
        this.on('change', this.onChange, this);
        this.on('sync',   this.onSync, this);
    },

    sync: function(method, model, options) {
         var store = (options ? options.store : null) || this.store;
         if (store && _.isFunction(store.sync)) {
             return store.sync.apply(this, arguments);
         } else {
             var that = this;
             var args = arguments;
             options = options || {};
             options.credentials = options.credentials || this.credentials;
             M.Security.logon(options, function(result) {
                 return Backbone.sync.apply(that, args);
             });
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
    },

    getUrlRoot: function() {
        if (this.urlRoot) {
            return _.isFunction(this.urlRoot) ? this.urlRoot() : this.urlRoot;
        } else if (this.collection) {
            return this.collection.getUrlRoot();
        } else if (this.url) {
            var url = _.isFunction(this.url) ? this.url() : this.url;
            if (url && this.id && url.indexOf(this.id) > 0) {
                return url.substr(0, url.indexOf(this.id));
            }
            return url;
        }
    }

});
