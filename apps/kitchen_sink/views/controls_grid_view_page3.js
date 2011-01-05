m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_grid_view_page.js');

KitchenSink.ControlsGridViewPage3 = M.PageView.design({

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

            value: 'Custom grid',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid markupTitle markup',

        grid: M.GridView.design({

            childViews: 'label1 label2 label3',

            layout: {
                cssClass: 'container',
                columns: {
                    0: 'column1',
                    1: 'column2',
                    2: 'column3'
                }
            },

            label1: M.LabelView.design({

                value: 'Red'

            }),

            label2: M.LabelView.design({

                value: 'Green'

            }),

            label3: M.LabelView.design({

                value: 'Blue'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.GridView.design({\n\n\tchildViews: \'label1 label2 label3\',\n\n\tlayout: {\n\n\t\tcssClass: \'container\',\n\n\t\tcolumns: {\n\n\t\t\t0: \'column1\',\n\n\t\t\t1: \'column2\',\n\n\t\t\t2: \'column3\'\n\n\t\t}\n\n\t},\n\n\tlabel1: M.LabelView.design({\n\n\t\tvalue: \'Red\'\n\n\t}),\n\n\tlabel2: M.LabelView.design({\n\n\t\tvalue: \'Green\'\n\n\t}),\n\n\tlabel3: M.LabelView.design({\n\n\t\tvalue: \'Blue\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});