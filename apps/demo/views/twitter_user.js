// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Demo.TwitterUserView = M.ListItemView.design({

    childViews: ['image1 label1 label2'],

    target: Demo.TwitterController,

    action: 'listItemClicked',

    image1: M.ImageView.design({
        value: '<%= profile_image_url %>' 
    }),

    label1 : M.LabelView.design({
        value: '<%= from_user %>'
    }),

    label2 : M.LabelView.design({
        value: '<%= created_at %>'
    })

});