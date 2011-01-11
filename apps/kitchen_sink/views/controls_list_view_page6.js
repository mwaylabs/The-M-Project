m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_list_view_page.js');
m_require('app/views/controls_list_view_page6_template.js');

KitchenSink.ControlsListViewPage6 = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsListViewController,

        action: 'initPage6'

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

            value: 'Custom searchbar list',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'list markupTitle markup',

        list: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsListViewPage6Template,

            contentBinding: 'KitchenSink.ControlsListViewController.page6',

            hasSearchBar: YES,

            usesDefaultSearchBehaviour: NO,

            searchBar: {

                target: KitchenSink.ControlsListViewController,

                action: 'searchStringDidChange',

                triggerActionOnChange: YES,

                triggerActionOnKeyUp: YES

            }

        }),

        markupTitle: M.LabelView.design({

            value: 'Searchstring',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsListViewController.searchString',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});