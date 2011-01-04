m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Multi button group',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2 button3 button4',

            numberOfLines: 2,

            buttonsPerLine: 2,

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            }),

            button3: M.ButtonView.design({

                value: 'Button 3'

            }),

            button4: M.ButtonView.design({

                value: 'Button 4'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2 button3 button4\',\n\n\tnumberOfLines: 2,\n\n\tbuttonsPerLine: 2,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n\tbutton3: M.ButtonView.design({\n\n\t\tvalue: \'Button 3\'\n\n\t})\n\n\tbutton4: M.ButtonView.design({\n\n\t\tvalue: \'Button 4\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});