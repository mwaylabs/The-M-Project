KitchenSink.ControlsTabBarViewPageListItemTemplate = M.ListItemView.design({

    childViews: 'name',

    target: KitchenSink.ControlsTabBarViewController,

    action: 'controlSelected',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    })

});