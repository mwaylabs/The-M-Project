m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage3 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Selection list (multiple selection)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList markupTitle markup',

        selectionList: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4',

            selectionMode: M.SINGLE_SELECTION_DIALOG,

            item1: M.SelectionListItemView.design({

                value: 'item1',

                label: 'Item 1',
                
                isSelected: YES
                
            }),

            item2: M.SelectionListItemView.design({

                value: 'item2',

                label: 'Item 2'

            }),

            item3: M.SelectionListItemView.design({

                value: 'item3',

                label: 'Item 3'

            }),

            item4: M.SelectionListItemView.design({

                value: 'item4',

                label: 'Item 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.SelectionListView.design({\n\n\tchildViews: \'item1 item2 item3 item4\',\n\n\tselectionMode: M.SINGLE_SELECTION_DIALOG,\n\n\titem1: M.SelectionListItemView.design({\n\n\t\tvalue: \'item1\',\n\n\t\tlabel: \'Item 1\',\n\n\t\tisSelected: YES\n\n\t}),\n\n\titem2: M.SelectionListItemView.design({\n\n\t\tvalue: \'item2\',\n\n\t\tlabel: \'Item 2\'\n\n\t}),\n\n\titem3: M.SelectionListItemView.design({\n\n\t\tvalue: \'item3\',\n\n\t\tlabel: \'Item 3\'\n\n\t}),\n\n\titem4: M.SelectionListItemView.design({\n\n\t\tvalue: \'item4\',\n\n\t\tlabel: \'Item 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});