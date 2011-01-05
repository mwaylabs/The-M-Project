KitchenSink.ControlsImageViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsImageViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});