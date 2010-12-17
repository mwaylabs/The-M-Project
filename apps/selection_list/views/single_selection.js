SelectionList.SingleSelection = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Single',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList textField buttonGroup',

        selectionList: M.SelectionListView.design({

            childViews: 'optionGermany optionItaly optionUS optionSpain',

            selectionMode: M.SINGLE_SELECTION,

            label: 'Language',

            optionGermany: M.SelectionListItemView.design({
                value: 'germany',
                label: 'Germany (germany)',
                isSelected: YES
            }),

            optionItaly: M.SelectionListItemView.design({
                value: 'italy',
                label: 'Italy (italy)'
            }),

            optionUS: M.SelectionListItemView.design({
                value: 'us',
                label: 'United States (us)'
            }),

            optionSpain: M.SelectionListItemView.design({
                value: 'spain',
                label: 'Spain (spain)'
            })

        }),

        textField: M.TextFieldView.design({

            isGrouped: NO,

            cssClass: 'textField',

            cssClassOnInit: 'textFieldInit',

            initialText: 'e.g.: us'

        }),

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'setButton getButton',

            isSelectable: NO,

            setButton: M.ButtonView.design({

                value: 'set selection',

                target: SelectionList.SingleSelectionController,

                action: 'setSelection'
    
            }),

            getButton: M.ButtonView.design({

                value: 'get selection',

                target: SelectionList.SingleSelectionController,

                action: 'getSelection'

            })

        })

    }),

    tabBar: SelectionList.TabBar

})