KitchenSink.ControlsListViewPage3Template = M.ListItemView.design({

    childViews: 'image name subtitle',

    image: M.ImageView.design({

        computedValue: {

            valuePattern: '<%= image %>',

            operation: function(v) {

                return 'resources/images/' + v;

            }
            
        },

        cssClass: 'listPage3Image'

    }),

    name: M.LabelView.design({

        valuePattern: '<%= name %>'

    }),

    subtitle: M.LabelView.design({

        valuePattern: '<%= subtitle %>',

        cssClass: 'listPage3Subtitle'

    })

});