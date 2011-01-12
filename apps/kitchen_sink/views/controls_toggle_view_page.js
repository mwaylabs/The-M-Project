m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page_list_item_template.js');

KitchenSink.ControlsToggleViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsToggleViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToggleViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.ToggleView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsToggleViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsToggleViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});