// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('data_provider.js');

/**
 * @class
 *
 * Encapsulates access to WebSQL (in-browser sqlite storage)
 */
M.WebSqlProvider = M.DataProvider.extend({

    type: 'M.WebSqlProvider',

    /**
     * Configuration object
     * @property {Object}
     */
    config: {},

    /**
     *
     * @property {Boolean}
     */
    isInitialized: NO,

    typeMapping: {
        'String': 'varchar(255)',
        'Text': 'text',
        'Float': 'float',
        'Integer': 'integer',
        'Date': 'date',
        'Boolean': 'boolean'
    },

    dbHandler: null,

    init: function(model) {
        this.openDb();
        this.createTable(model);
    },

    /*
    * CRUD methods
    */

    /**
     * TODO: make it ansync!
     * @param model
     */
    save: function(model) {
        if(model.state === M.STATE_NEW) {
            // perform an INSERT
        } else {
            // perform an UPDATE with id of model
        }
    },

    /**
     * Deletes the passed model from the database
     * TODO: make it ansync!
     * @param model
     */
    del: function(model) {
        this.dbHandler.transaction(function(t) {
            t.executeSql('DELETE FROM ' + model.name + ' WHERE ID=' + model.id + ';');
        });
    },


    /**
     * TODO: make it invulnerable against SQL injection with ?
     * TODO: make it async!
     * @param model
     * @param query
     */
    find: function(model, query) {
        var result = [];
        this.dbHandler.readTransaction(function(t) {
            t.executeSql('SELECT * FROM' + model.name, [], function (tx, res) {
                var len = res.rows.length, i;
                for (i = 0; i < len; i++) {
                    /* $.extend merges param1 object with param2 object*/
                    result.push(model.createRecord($.extend(res.rows.item(i), {state: M.STATE_VALID}), this));
                }
            })
        });
        return result;
    },


    /**
     * private methods
     */
    openDb: function() {
        /* openDatabase(db_name, version, description, estimated_size, callback) */
        this.dbHandler = openDatabase(this.config.dbName, '2.0', 'Database for M app', this.config.size);
    },


    /**
     * TODO: route callbacks to central instance
     * creates the table corresponding to the model.
     */
    createTable: function(model) {

        var sql = 'CREATE TABLE IF NOT EXISTS '  + model.name
                    + ' (ID INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE';

        for(var r in model.__meta) {
           sql += ', ' + this.buildDbAttrFromProp(model, r);
        }

        sql += ');';

        console.log(sql);
        
        if(this.dbHandler) {
            try {
                this.dbHandler.transaction(function(t) {
                    t.executeSql(sql);
                });
            } catch(e) {
                M.Logger.log('Error code: ' + e.code + ' msg: ' + e.message, M.ERROR);
                return;
            }
        } else {
            M.Logger.log('dbHandler does not exist.', M.ERROR);
        }
    },

    /**
     * creates a new data provider instance with the passed configuration parameters
     * @param obj
     */
    configure: function(obj) {
        // maybe some value checking
        return this.extend({
            config:obj
        });
    },

    /* Helper methods */

    /**
     * @param {Object} 
     * @return {String} The string used for db create to represent this property.
     */
    buildDbAttrFromProp: function(model, prop) {
        var type = this.typeMapping[model.__meta[prop].type].toUpperCase();

        var isReqStr = model.__meta[prop].isRequired ? ' NOT NULL' : '';

        return prop + ' ' + type + isReqStr;
    },
    
    queryDbForId: function(model) {
        this.dbHandler.readTransaction(function(t) {
            var r = t.executeSql('SELECT MAX(ID) as ID FROM' + model.name, [], function (tx, res) {
                console.log(res.rows.item(0).ID);
            });
        });
    }

});