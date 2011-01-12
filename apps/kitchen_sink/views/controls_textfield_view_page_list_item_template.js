KitchenSink.ControlsTextFieldViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsTextFieldViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});