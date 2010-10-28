// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Demo.UserModelDataProvider = M.DataProvider.extend({

    useSource: M.FIXTURE,

    configureFixture: {
        source: Demo.UserModelFixtures
    },

    configureWebStorage: {
        
    },

    configureRemote: {
        url: 'http://www.google.de',
        getMethod: 'POST',
        param: 'asas=asas,asas=asas',
        mapping: {
            name1: 'firstName',
            name2: 'lastName'
        }
    }

})