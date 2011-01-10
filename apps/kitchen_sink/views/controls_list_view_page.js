m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page_list_item_template.js');

KitchenSink.ControlsListViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ListView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsListViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});