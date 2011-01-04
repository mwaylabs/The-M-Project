m_require('app/views/tabs.js');

KitchenSink.PageUtilities = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Utilities',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        // ...

    }),

    tabBar: KitchenSink.TabBar

});