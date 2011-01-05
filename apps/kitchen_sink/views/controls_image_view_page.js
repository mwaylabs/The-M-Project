m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page_list_item_template.js');

KitchenSink.ControlsImageViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsImageViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsImageViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ImageView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsImageViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsImageViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});