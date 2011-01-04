m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage2 = M.PageView.design({

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

            value: 'Vertical button group',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2',

            direction: M.VERTICAL,

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2\',\n\n\tdirection: M.VERTICAL,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});