// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      20.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/data_provider.js');

/**
 * @class
 *
 * To be used when no data provider needed for model.
 * Prints warning messages when calling CRUD functions.
 *
 * @extends M.DataProvider
 */
M.DataProviderDummy = M.DataProvider.extend(
/** @scope M.DummyProvider.prototype */ {

    find: function() {
        M.Logger.log('DummyProvider does not support find().', M.WARN);
    },

    save: function() {
        M.Logger.log('DummyProvider does not support save().', M.WARN);
    },

    del: function() {
        M.Logger.log('DummyProvider does not support del().', M.WARN);
    }

});