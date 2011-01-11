KitchenSink.ControlsListViewPage4Template = M.ListItemView.design({

    childViews: 'name counter',

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    }),

    counter: M.LabelView.design({

        valuePattern: '<%= number %>',

        cssClass: 'ui-li-count'

    })

});