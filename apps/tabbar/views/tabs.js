Tabbar.tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2 tabItem3 tabItem4 tabItem5',

    anchorLocation: M.BOTTOM,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({

        value: 'bird',
        page: 'page1',
        href: 'm_10',
        icon: 'bird',
        isActive: YES

    }),

    tabItem2: M.TabBarItemView.design({

        value: 'eye',
        page: 'page2',
        href: 'm_14',
        icon: 'eye'

    }),

    tabItem3: M.TabBarItemView.design({

        value: 'beer',
        page: 'page3',
        icon: 'beer'

    }),

    tabItem4: M.TabBarItemView.design({

        value: 'gift',
        page: 'page4',
        icon: 'gift'

    }),

    tabItem5: M.TabBarItemView.design({

        value: 'love',
        page: 'page5',
        icon: 'heart'

    })

})