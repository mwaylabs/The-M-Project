m_require('app/views/tabs.js');
m_require('app/views/controls_page_list_item_template.js');

KitchenSink.PageControls = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsController,

        action: 'init'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Controls',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsPageListItemTemplate,
            
            contentBinding: 'KitchenSink.ControlsController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});