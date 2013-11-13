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

M.Collection = Backbone.Collection.extend({

    constructor: function(options) {
        this.init(options);
        Backbone.Collection.apply(this, arguments);
    }
});

M.Collection.create = M.create;
M.Collection.design = M.design;

_.extend(M.Collection.prototype, M.Object, {

    _type: 'M.Collection',

    isCollection: YES,

    model: M.Model,

    entity: null,

    options: null,

    init: function(options) {
        options = options || {};
        this.store   = options.store   || this.store  || (this.model ? this.model.prototype.store : null);
        this.entity  = options.entity  || this.entity || (this.model ? this.model.prototype.entity : null);
        this.options = options.options || this.options;

        var entity = this.entity || this.entityFromUrl(this.url);
        if (entity) {
            this.entity = M.Entity.from(entity, { model: this.model, typeMapping: options.typeMapping });
        }
        this._updateUrl();

        if (this.store && _.isFunction(this.store.initCollection)) {
            this.store.initCollection(this, options);
        }
    },

    entityFromUrl: function (url) {
        if (url) {
            // extract last path part as entity name
            var parts = M.Request.getLocation(this.url).pathname.match(/([^\/]+)\/?$/);
            if (parts && parts.length > 1) {
                return parts[1];
            }
        }
    },

    sort: function(options) {
        if ( _.isObject(options && options.sort)) {
            this.comparator = M.DataSelector.compileSort(options.sort);
        }
        Backbone.Collection.prototype.sort.apply(this, arguments);
    },

    select: function(options) {
        var selector   = options && options.query ? M.DataSelector.create(options.query) : null;
        var collection = M.Collection.create(null, { model: this.model });

        if (options && options.sort) {
            collection.comparator = M.DataSelector.compileSort(options.sort);
        }

        this.each(function(model) {
            if (!selector || selector.matches(model.attributes)) {
                collection.add(model);
            }
        });
        return collection;
    },

    destroy: function(options) {
        var model;
        var success = options.success;
        if (this.length > 0) {
            options.success = function () {
                if (this.length == 0 && success) {
                    success();
                }
            };
            while (model = this.first()) {
                this.sync("delete", model, options );
                this.remove(model);
            }
        } else if (success) {
            success();
        }
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

    _updateUrl: function() {
        var params = this.getUrlParams();
        if (this.options) {
            this.url = this.getUrlRoot();
            if (this.options.query) {
                params["query"] = encodeURIComponent(JSON.stringify(this.options.query));
            }
            if (this.options.fields) {
                params["fields"] = encodeURIComponent(JSON.stringify(this.options.fields));
            }
            if (this.options.sort) {
                params["sort"] = encodeURIComponent(JSON.stringify(this.options.sort));
            }
            if (!_.isEmpty(params)) {
                this.url += "?";
                var a = [];
                for (var k in params) {
                    a.push(k + (params[k] ? '=' + params[k] : ''));
                }
                this.url += a.join('&');
            }
        }
    },

    getUrlParams: function(url) {
        url = url || this.getUrl();
        var m = url.match(/\?([^#]*)/);
        var params = {};
        if (m && m.length > 1) {
            _.each(m[1].split('&'), function (p) {
                var a = p.split('=');
                params[a[0]] = a[1];
            });
        }
        return params;
    },

    getUrl: function(collection) {
        return (_.isFunction(this.url) ? this.url() : this.url) || '';
    },

    getUrlRoot: function() {
        var url = this.getUrl();
        return url ? ( url.indexOf('?') >=0 ? url.substr(0, url.indexOf('?')) : url) : '';
    },

    applyFilter: function(callback){
        this.trigger('filter', this.filter(callback));
    }

});
