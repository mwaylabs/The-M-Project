m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage7 = M.PageView.design({

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

            value: 'setActiveButton()',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup setButton',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2',

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        setButton: M.ButtonView.design({

            value: 'set active button (Button 1)',

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'setActiveButton'
            
        })

    }),

    tabBar: KitchenSink.TabBar

});