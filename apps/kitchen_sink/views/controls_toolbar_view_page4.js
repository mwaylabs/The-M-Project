m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toolbar_view_page.js');

KitchenSink.ControlsToolbarViewPage4 = M.PageView.design({
    
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

            value: 'Toolbar with button group',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toolbar markupTitle markup',

        toolbar: M.ToolbarView.design({

            childViews: 'buttonGroup',

            cssClass: 'myToolbar2',

            buttonGroup: M.ButtonGroupView.design({

                anchorLocation: M.CENTER,

                childViews: 'button1 button2 button3',

                button1: M.ButtonView.design({

                    value: 'Button 1'

                }),

                button2: M.ButtonView.design({

                    value: 'Button 2'

                }),

                button3: M.ButtonView.design({

                    value: 'Button 3'

                })

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ToolbarView.design({\n\n\tchildViews: \'buttonGroup\',\n\n\tcssClass: \'myToolbar2\',\n\n\tbuttonGroup: M.ButtonGroupView.design({\n\n\t\tanchorLocation: M.CENTER,\n\n\t\tchildViews: \'button1 button2 button3\',\n\n\t\tbutton1: M.ButtonView.design({\n\n\t\t\tvalue: \'Button 1\'\n\n\t\t}),\n\n\t\tbutton2: M.ButtonView.design({\n\n\t\t\tvalue: \'Button 2\'\n\n\t\t}),\n\n\t\tbutton3: M.ButtonView.design({\n\n\t\t\tvalue: \'Button 3\'\n\n\t\t})\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});