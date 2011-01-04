KitchenSink.ControlsButtonGroupViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsButtonGroupViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});