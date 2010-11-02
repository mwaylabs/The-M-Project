// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('logger.js');

/**
 * available data source types
 */
M.FIXTURE = 'fixture';
M.WEBSTORAGE = 'webstorage';
M.REMOTE = 'remote';

/**
 * @class
 *
 * Wraps access to any defined data source and is the only interface for a model to
 * access this data.
 *
 */
M.DataProvider = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.DataProvider',

    /**
     * defines the data source type
     *
     * @property {String}
     */
    useSource: '',

    /**
     * defines the parameters for data source: fixture
     *
     * @property {Object}
     */
    configureFixture: null,

    /**
     * defines the parameters for data source: web storage
     *
     * @property {Object}
     */
    configureWebStorage: null,

    /**
     * defines the parameters for data source: web service
     *
     * @property {Object}
     */
    configureRemote: null,

    /**
     * Delegates the query to the source, defined in the concrete implementation of DataProvider.
     *
     * @param {String} query The query string.
     */
    find: function(query) {
        var data = null;
        switch (this.useSource) {
            case M.FIXTURE:
                data = this.getDataFromFixture(query);
                break;
            case M.REMOTE:
                this.getDataFromRemote(query);
                break;
        }
        return data;
    },

    /**
     * Fetches the data from a specified fixture, based on the passed query.
     *
     * @param {String} query The query string.
     */
    getDataFromFixture: function(query) {
        /* 'source' identifies the model's fixture */
        return this.configureFixture.source;
    },

    /**
     * Fetches the data from a remote server (e.g. webservice), based on the passed query.
     *
     * @param {String} query The query string.
     */
    getDataFromRemote: function(query) {
        var that = this;
        M.Request.init({
            url: this.configureRemote.get.url,
            type: this.configureRemote.get.type,
            isJSON: this.configureRemote.get.isJSON,
            onSuccess: function(data, msg, request) {
                that.bindToCaller(scope, callback)(data);
            }
        }).send();
    }

});