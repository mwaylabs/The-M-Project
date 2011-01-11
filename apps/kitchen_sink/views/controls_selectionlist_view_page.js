m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page_list_item_template.js');

KitchenSink.ControlsSelectionListViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsSelectionListViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.SelectionListView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsSelectionListViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsSelectionListViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});