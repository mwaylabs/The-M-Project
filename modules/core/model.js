// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   basti
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('data_provider.js');

/**
 * @class
 *
 * The root class for every model.
 *
 */
M.Model = M.Object.extend({

    /**
     * globally unique identifier
     *
     * @property {String}
     */
    primaryKey: 'guid',

    /**
     * The model's data provider.
     *
     * @property {Object}
     */
    dataProvider: null,

    /**
     * Calls the corresponding data provider to fetch data based on the passed query.
     *
     * @param {String} query The query string.
     */
    find: function(query){
        return this.dataProvider.find(query);
    }    

});