// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Twitter.TwitterUserView = M.ListItemView.design({

    childViews: 'date label1',

    items: 'results',
    
    date : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= created_at %>',
            operation: function(v) {
                var date = M.Date.create(v);
                return date.format('mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'date'
    }),

    label1 : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'text'
    })

});