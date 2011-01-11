m_require('app/views/tabs.js');
m_require('app/views/storage_page_list_item_template.js');

KitchenSink.PageStorage = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Storage',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'storageList',

        storageList: M.ListView.design({
            listItemTemplateView: KitchenSink.StoragePageListItemTemplate,
            contentBinding: 'KitchenSink.StorageController.storageList'
        })
    }),

    tabBar: KitchenSink.TabBar

});