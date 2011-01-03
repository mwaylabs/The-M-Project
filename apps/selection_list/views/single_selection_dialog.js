SelectionList.SingleSelectionDialog = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Single (Dialog)',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'selectionList textField buttonGroup',

        selectionList: M.SelectionListView.design({

            //applyTheme: NO,

            childViews: 'optionGermany optionItaly optionUS optionSpain',

            selectionMode: M.SINGLE_SELECTION_DIALOG,

            label: 'Language',

            cssClass: 'singleSelectionDialog',

            initialText: 'Please choose...',

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

            initialText: 'e.g.: germany'

        }),

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'setButton getButton',

            isSelectable: NO,

            setButton: M.ButtonView.design({

                value: 'set selection',

                target: SelectionList.SingleSelectionDialogController,

                action: 'setSelection'

            }),

            getButton: M.ButtonView.design({

                value: 'get selection',

                target: SelectionList.SingleSelectionDialogController,

                action: 'getSelection'

            })

        })

    }),

    tabBar: SelectionList.TabBar

})