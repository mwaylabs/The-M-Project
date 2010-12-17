// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      16.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Contacts.Address = M.Model.create({

    __name__: 'Address',

    street: M.Model.attr('String', {
        isRequired: YES
    }),

    number: M.Model.attr('String', {
        isRequired: YES
    }),
    
    zip: M.Model.attr('Integer', {
        isRequired:NO,
        validators: [M.NumberValidator]
    }),

    city: M.Model.attr('String', {
        isRequired: YES
    })

}, M.WebSqlProvider.configure({
    dbName: 'contacts_db'
}));