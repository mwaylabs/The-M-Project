m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page_list_item_template.js');

KitchenSink.ControlsGridViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsGridViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsGridViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.GridView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsGridViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsGridViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});