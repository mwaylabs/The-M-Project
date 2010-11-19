// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * Encapsulates access to WebSQL (in-browser sqlite storage)
 */
M.WebSqlProvider = M.DataProvider.extend({

    type: 'M.WebSqlProvider',

    typeMapping: {
        'string': 'varchar(255)',
        'text': 'text',
        'float': 'float',
        'integer': 'integer',
        'date': 'date',
        'boolean': 'boolean'
    },

    dbHandler: null,

    init: function(model) {
        
    },

    /*
    * CRUD methods
    */
            
    save: function(model) {

    },

    del: function(model) {
        
    }, 

    find: function(query) {
            
    },


    /**
     * private methods
     */
    openDb: function() {
        this.dbHandler = openDatabase('', '2.0', '');
    },


    /**
     * creates the table corresponding to the model.
     */
    createTable: function(model) {
             
    }

});