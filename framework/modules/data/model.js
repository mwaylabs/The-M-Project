
M.Model = Backbone.Model.extend(M.Object);


_.extend(M.Model.prototype, {

    _type: 'M.Model',

    isModel: YES,

    changedSinceSync: {},

    initialize: function() {
        if (this.connector && this.connector.initCollection) {
            this.connector.initCollection(this);
        }
        this.on('change', this.onChange, this);
        this.on('sync', this.onSync, this);
    },

    sync: function(method, model, options) {
        var connector = (options ? options.connector : null) || this.connector;
        if (connector && connector.syncModel) {
            return connector.syncModel.apply(this, arguments);
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
