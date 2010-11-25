Todos.tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2',

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

    })

})