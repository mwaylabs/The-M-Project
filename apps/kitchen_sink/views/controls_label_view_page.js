m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page_list_item_template.js');

KitchenSink.ControlsLabelViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsLabelViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.LabelView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsLabelViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsLabelViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});