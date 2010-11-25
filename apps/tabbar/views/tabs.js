Tabbar.tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2 tabItem3 tabItem4 tabItem5',

    anchorLocation: M.BOTTOM,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({

        value: 'tab1',
        page: 'page1',
        href: 'm_10',
        icon: 'bird',
        isActive: YES

    }),

    tabItem2: M.TabBarItemView.design({

        value: 'tab2',
        page: 'page2',
        href: 'm_14',
        icon: 'eye'

    }),

    tabItem3: M.TabBarItemView.design({

        value: 'tab3',
        page: 'page3',
        icon: 'beer'

    }),

    tabItem4: M.TabBarItemView.design({

        value: 'tab4',
        page: 'page4',
        icon: 'gift'

    }),

    tabItem5: M.TabBarItemView.design({

        value: 'tab5',
        page: 'page5',
        icon: 'heart'

    })

})