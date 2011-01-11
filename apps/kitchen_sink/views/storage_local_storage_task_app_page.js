// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/storage_page.js');
m_require('app/views/storage_local_storage_task_app_template.js');

KitchenSink.StorageLocalStorageTaskAppPage = M.PageView.design({
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'LocalStorage',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'taskList',

        taskList: M.ListView.design({
            listItemTemplateView: KitchenSink.StorageLocalStorageTaskAppTemplate,
            contentBinding: 'KitchenSink.StorageController.storageList'
        })
    }),

    tabBar: KitchenSink.TabBar
});
