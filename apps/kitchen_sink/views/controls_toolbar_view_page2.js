m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage2 = M.PageView.design({
    
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

            value: 'Toolbar with back button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            childViews: 'backButton label',

            backButton: M.ButtonView.design({

                anchorLocation: M.LEFT,

                value: 'Back',

                icon: 'arrow-l'

            }),

            label: M.LabelView.design({

                anchorLocation: M.CENTER,

                value: 'Toolbar'                

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tchildViews: \'backButton label\',\n\n\tbackButton: M.ButtonView.design({\n\n\t\tanchorLocation: M.LEFT,\n\n\t\tvalue: \'Back\',\n\n\t\ticon: \'arrow-l\'\n\n\t}),\n\n\tlabel: M.LabelView.design({\n\n\t\tanchorLocation: M.CENTER,\n\n\t\tvalue: \'Toolbar\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});