m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page.js');

KitchenSink.ControlsGridViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsGridViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Three columns grid',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid markupTitle markup',

        grid: M.GridView.design({

            childViews: 'label1 label2 label3',

            layout: M.THREE_COLUMNS,

            label1: M.LabelView.design({

                value: 'Column 1'

            }),

            label2: M.LabelView.design({

                value: 'Column 2'

            }),

            label3: M.LabelView.design({

                value: 'Column 3'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.GridView.design({\n\n\tchildViews: \'label1 label2 label3\',\n\n\tlayout: M.THREE_COLUMNS,\n\n\tlabel1: M.LabelView.design({\n\n\t\tvalue: \'Column 1\'\n\n\t}),\n\n\tlabel2: M.LabelView.design({\n\n\t\tvalue: \'Column 2\'\n\n\t}),\n\n\tlabel3: M.LabelView.design({\n\n\t\tvalue: \'Column 3\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});