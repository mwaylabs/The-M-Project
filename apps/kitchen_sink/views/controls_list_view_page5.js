m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page5_template.js');

KitchenSink.ControlsListViewPage5 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage5'

    },
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default searchbar list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage5Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page5',

            hasSearchBar: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode (list item template)',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ListView.design({\n\n\tlistItemTemplateView: MyApp.MyListTemplate,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\thasSearchBar: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});