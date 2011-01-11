m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page4_template.js');

KitchenSink.ControlsListViewPage4 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage4'

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

            value: 'Counted list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage4Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page4',

            isCountedList: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode (list item template)',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'MyApp.MyListTemplate = M.ListItemView.design({\n\n\tchildViews: \'name counter\',\n\n\tname: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= name %>\'\n\n\t}),\n\n\tcounter: M.LabelView.design({\n\n\t\tvaluePattern: \'<%= number %>\',\n\n\t\tcssClass: \'ui-li-count\'\n\n\t})\n\n});',            

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});