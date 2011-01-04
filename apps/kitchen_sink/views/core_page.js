m_require('app/views/tabs.js');

KitchenSink.PageCore = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Core',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        // ...

    }),

    tabBar: KitchenSink.TabBar

});