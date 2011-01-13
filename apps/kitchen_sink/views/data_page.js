m_require('app/views/tabs.js');
m_require('app/views/data_page_list_item_template.js');

KitchenSink.PageData = M.PageView.design({

    onLoad : {
        target: KitchenSink.DataController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Data',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'dataList',

        dataList: M.ListView.design({
            listItemTemplateView: KitchenSink.DataPageListItemTemplate,
            contentBinding: 'KitchenSink.DataController.dataList'
        })
    }),

    tabBar: KitchenSink.TabBar

});