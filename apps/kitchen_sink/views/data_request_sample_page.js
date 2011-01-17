// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      12.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/data_page.js');

KitchenSink.DataRequestSamplePage = M.PageView.design({
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.DataController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: "M.Request: Send GET Request",
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'keywordField requestButton markupTitle markup',

        keywordField: M.TextFieldView.design({
            name: 'keyword_field',
            initialText: 'Enter keyword for twitter search...',
            target: KitchenSink.DataRequestSampleController,
            action: 'getRequest',
            triggerActionOnEnter: YES
        }),

        requestButton: M.ButtonView.design({
            value: 'Send Request',
            target: KitchenSink.DataRequestSampleController,
            action: 'getRequest'
        }),

        markupTitle: M.LabelView.design({
            value: 'The latest tweets',
            contentBinding: 'KitchenSink.DataRequestSampleController.titleValue',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: '-',
            contentBinding: 'KitchenSink.DataRequestSampleController.markupValue',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});