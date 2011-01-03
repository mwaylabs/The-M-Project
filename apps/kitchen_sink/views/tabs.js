KitchenSink.TabBar = M.TabBarView.design({

    childViews: 'TabUI TabCore TabUtil TabData',

    anchorLocation: M.BOTTOM,

    TabUI: M.TabBarItemView.design({

        value: 'Controls',
        page: 'controls',
        icon: 'controls',
        isActive: YES

    }),

    TabCore: M.TabBarItemView.design({

        value: 'Core',
        page: 'core',
        icon: 'core'
    }),

    TabUtil: M.TabBarItemView.design({

        value: 'Utilities',
        page: 'utilities',
        icon: 'utilities'
    }),

    TabData: M.TabBarItemView.design({

        value: 'Storage',
        page: 'storage',
        icon: 'storage'

    })
})