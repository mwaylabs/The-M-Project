// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

C2G.RideItemView = M.ListItemView.design({

    childViews: 'startLabel destinationLabel',

    startLabel: M.LabelView.design({
        value: '<%= start %>'
    }),

    destinationLabel: M.LabelView.design({
        value: '<%= destination %>'
    })

});