// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Twitter.TwitterResultsView = M.ListItemView.design({

    childViews: 'image1 label1 label2 text',

    target: Twitter.TwitterController,

    action: 'showUser',

    image1: M.ImageView.design({
        valuePattern: '<%= profile_image_url %>',
        cssClass: 'listThumb'
    }),

    label1 : M.LabelView.design({
        valuePattern: '<%= from_user %>',
        cssClass: 'username'
    }),

    label2 : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= created_at %>',
            operation: function(v) {
                var date = M.Date.create(v);
                return date.format('mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'date'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'text'
    })

});