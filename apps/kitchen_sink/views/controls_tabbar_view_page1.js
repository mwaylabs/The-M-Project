m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_tabbar_view_page.js');

KitchenSink.ControlsTabBarViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTabBarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default tab bar',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'tabs markupTitle markup',

        tabs: M.TabBarView.design({

            childViews: 'tab1 tab2 tab3',

            name: 'tabBar1',

            tab1: M.TabBarItemView.design({

                value: 'Tab 1'

            }),

            tab2: M.TabBarItemView.design({

                value: 'Tab 2'

            }),

            tab3: M.TabBarItemView.design({

                value: 'Tab 3'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TabBarView.design({\n\n\tchildViews: \'tab1 tab2 tab3\',\n\n\tname: \'tabBar1\',\n\n\ttab1: M.TabBarItemView.design({\n\n\t\tvalue: \'Tab 1\'\n\n\t}),\n\n\ttab2: M.TabBarItemView.design({\n\n\t\tvalue: \'Tab 2\'\n\n\t}),\n\n\ttab2: M.TabBarItemView.design({\n\n\t\tvalue: \'Tab 3\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});