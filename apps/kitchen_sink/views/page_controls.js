KitchenSink.PageControls = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Controls',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        // ...

    }),

    tabBar: KitchenSink.TabBar

})