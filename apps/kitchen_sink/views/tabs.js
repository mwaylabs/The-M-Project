KitchenSink.TabBar = M.TabBarView.design({

    childViews: 'TabUI TabUtil TabData',

    anchorLocation: M.BOTTOM,

    TabUI: M.TabBarItemView.design({

        value: 'Controls',
        page: 'controls',
        icon: 'controls',
        isActive: YES

    }),

    TabUtil: M.TabBarItemView.design({

        value: 'Utilities',
        page: 'utilities',
        icon: 'utilities'
    }),

    TabData: M.TabBarItemView.design({

        value: 'Data',
        page: 'data',
        icon: 'storage'

    })
});