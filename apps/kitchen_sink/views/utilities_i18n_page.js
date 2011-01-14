// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      14.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/utilites_page.js');
m_require('app/views/utilities_i18n_list_item_template.js');

KitchenSink.UtilitiesI18nPage = M.PageView.design({

    onLoad : {
        target: KitchenSink.UtilitiesI18nController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,

            target: KitchenSink.UtilitiesController,
            action: 'here'  
        }),

        title: M.LabelView.design({
            value: 'M.I18n',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'i18nList',

        i18nList: M.ListView.design({
            listItemTemplateView: KitchenSink.UtilitiesI18nListItemTemplate,
            contentBinding: 'KitchenSink.UtilitiesI18nController.i18nList'
        })
    }),

    tabBar: KitchenSink.TabBar

});