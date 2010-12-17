SelectionList.TabBar = M.TabBarView.design({

    childViews: 'TabSingleSelection TabMultipleSelection TabSingleSelectionDialog',

    anchorLocation: M.BOTTOM,

    TabSingleSelection: M.TabBarItemView.design({

        value: 'Single',
        page: 'singleSelection',
        isActive: YES

    }),

    TabMultipleSelection: M.TabBarItemView.design({

        value: 'Multiple',
        page: 'multipleSelection'

    }),

    TabSingleSelectionDialog: M.TabBarItemView.design({

        value: 'Single (Dialog)',
        page: 'singleSelectionDialog'
    })

})