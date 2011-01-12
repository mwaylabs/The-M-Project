m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_tabbar_view_page_list_item_template.js');

KitchenSink.ControlsTabBarViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsTabBarViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTabBarViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.TabBarView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsTabBarViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsTabBarViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});