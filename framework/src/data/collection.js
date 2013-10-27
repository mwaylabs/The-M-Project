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

    initialize: function(options) {
        options = options || {};
        this.store  = options.store  || this.store  || (this.model ? this.model.prototype.store : null);
        this.entity = options.entity || this.entity || (this.model ? this.model.prototype.entity : null);

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

    sync: function(method, model, options) {
        var store = (options ? options.store : null) || this.store;
        if (store && _.isFunction(store.sync)) {
            return store.sync.apply(this, arguments);
        } else {
            var that = this;
            var args = arguments;
            var options = options || {};
            options.credentials = options.credentials || this.credentials;
            M.Security.logon(options, function(result) {
                return Backbone.sync.apply(that, args);
            });
            return Backbone.sync.apply(this, arguments);
        }
    },

    _updateUrl: function() {
        var params = this.getUrlParams();
        this.url = this.getUrlRoot();
        if (this.query) {
            params["query"] = encodeURIComponent(JSON.stringify(this.query));
        }
        if (this.fields) {
            params["fields"] = encodeURIComponent(JSON.stringify(this.fields));
        }
        if (this.sort) {
            params["sort"] = encodeURIComponent(JSON.stringify(this.sort));
        }
        if (!_.isEmpty(params)) {
            this.url += "?";
            var a = [];
            for (var k in params) {
                a.push(k + (params[k] ? '=' + params[k] : ''));
            }
            this.url += a.join('&');
        }
    },

    getUrlParams: function(url) {
        var url = url || this.getUrl();
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
