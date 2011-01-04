m_require('app/views/tabs.js');

KitchenSink.PageStorage = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Storage',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        // ...

    }),

    tabBar: KitchenSink.TabBar

});