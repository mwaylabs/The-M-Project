// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      25.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Contacts.ContactItemView = M.ListItemView.design({
    childViews: 'label1 label2',

    cssClass: 'contactItem',

    target: Contacts.ContactController,
    action: 'showDetails',

    label1 : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= firstName %>',
            operation: function(v, label) {
                return v + '&#160;';
            }
        },
        isInline: YES,
        cssClass: 'firstName'
    }),

    label2 : M.LabelView.design({
        valuePattern: '<%= lastName %>',
        isInline:YES,
        cssClass: 'lastName'
    })

});


