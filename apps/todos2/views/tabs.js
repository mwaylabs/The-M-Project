Todos.tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2 tabItem3',

    anchorLocation: M.BOTTOM,

    transition: M.TRANSITION.NONE,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({

        value: 'ToDo List',
        page: 'page1',
        icon: 'notepad',
        isActive: YES

    }),

    tabItem2: M.TabBarItemView.design({

        value: 'New Item',
        page: 'page2',
        icon: 'todo'

    }),

    tabItem3: M.TabBarItemView.design({

        value: 'Settings',
        page: 'page3',
        icon: 'settings'

    })

})