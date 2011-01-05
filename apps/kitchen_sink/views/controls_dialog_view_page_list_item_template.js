KitchenSink.ControlsDialogViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsDialogViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});