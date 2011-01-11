m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_loader_view_page_list_item_template.js');

KitchenSink.ControlsLoaderViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsLoaderViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLoaderViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.LoaderView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsLoaderViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsLoaderViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});