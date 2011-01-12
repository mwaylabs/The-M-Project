m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage5 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToolbarViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toolbar with two buttons',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            childViews: 'image grid',

            cssClass: 'myToolbar',

            image: M.ImageView.design({

                anchorLocation: M.LEFT,

                value: 'images/square_cyan.png'

            }),

            grid: M.GridView.design({

                anchorLocation: M.CENTER,

                layout: M.TWO_COLUMNS,

                childViews: 'button label',

                button: M.ButtonView.design({

                    value: 'Button'

                }),

                label: M.LabelView.design({

                    value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',

                    cssClass: 'toolbarText'

                })

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tchildViews: \'image grid\',\n\n\tcssClass: \'myToolbar\',\n\n\timage: M.ImageView.design({\n\n\t\tanchorLocation: M.LEFT,\n\n\t\tvalue: \'images/square_cyan.png\'\n\n\t}),\n\n\tgrid: M.GridView.design({\n\n\t\tanchorLocation: M.CENTER,\n\n\t\tlayout: M.TWO_COLUMNS,\n\n\t\tchildViews: \'button label\',\n\n\t\tbutton: M.ButtonView.design({\n\n\t\t\tvalue: \'Button\'\n\n\t\t}),\n\n\t\tlabel: M.LabelView.design({\n\n\t\t\tvalue: \'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...\',\n\n\t\t\tcssClass: \'toolbarText\'\n\n\t\t})\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});