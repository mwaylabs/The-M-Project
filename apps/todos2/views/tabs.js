Todos.tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2',

    anchorLocation: M.BOTTOM,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({

        value: 'tab1',
        page: 'Tabbar.app.page1',
        href: 'm_10',
        icon: 'bird',
        isActive: YES

    }),

    tabItem2: M.TabBarItemView.design({

        value: 'tab2',
        page: 'Tabbar.app.page2',
        href: 'm_14',
        icon: 'eye'

    })

})