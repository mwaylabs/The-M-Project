Todos.tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2 tabItem3',

    anchorLocation: M.BOTTOM,

    transition: M.TRANSITION.NONE,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({

        value: M.I18N.l('tab_list'),
        page: 'page1',
        icon: 'notepad',
        isActive: YES

    }),

    tabItem2: M.TabBarItemView.design({

        value: M.I18N.l('tab_new'),
        page: 'page2',
        icon: 'todo'

    }),

    tabItem3: M.TabBarItemView.design({

        value:  M.I18N.l('tab_settings'),
        page: 'page3',
        icon: 'settings'

    })

})