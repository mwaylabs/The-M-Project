// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

DividedList.ContactList = M.ListItemView.design({

    childViews: 'firstName lastName',

    firstName : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= firstName %>',
            operation: function(v, label) {
                return v + '&#160;';
            }
        },
        isInline: YES,
        cssClass: 'firstName'
    }),

    lastName : M.LabelView.design({
        valuePattern: '<%= lastName %>',
        isInline: YES,
        cssClass: 'lastName'
    })

});