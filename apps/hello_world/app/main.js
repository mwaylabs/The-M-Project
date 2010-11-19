// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      19.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

HelloWorld.app = M.Application.extend({

    page1: M.PageView.design({

        childViews: 'header content footer',

        header: M.ToolbarView.design({

            value: 'HEADER',

            anchorLocation: M.TOP

        }),

        content: M.ScrollView.design({

            childViews: 'label',

            label: M.LabelView.design({

                value: 'Welcome to The M-Project'

            })

        }),

        footer: M.ToolbarView.design({

            value: 'FOOTER',

            anchorLocation: M.BOTTOM

        })        

    })

});