m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_selectionlist_view_page.js');

KitchenSink.ControlsSelectionListViewPage4 = M.PageView.design({
    
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

            value: 'getSelection()',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList button markupTitle markup',

        selectionList: M.SelectionListView.design({

            childViews: 'item1 item2 item3 item4',

            selectionMode: M.MULTIPLE_SELECTION,

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

        button: M.ButtonView.design({

            value: 'get selection',

            target: KitchenSink.ControlsSelectionListViewController,

            action: 'getSelection'
            
        }),

        markupTitle: M.LabelView.design({

            value: 'Selected item (value)',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsSelectionListViewController.selection',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});