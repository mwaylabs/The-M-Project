m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_group_view_page.js');

KitchenSink.ControlsButtonGroupViewPage6 = M.PageView.design({

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

            value: 'getActiveButton()',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'buttonGroup getButton activeButtonLabel activeButtonName',

        buttonGroup: M.ButtonGroupView.design({

            childViews: 'button1 button2',

            button1: M.ButtonView.design({

                value: 'Button 1'

            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        getButton: M.ButtonView.design({

            value: 'get active button',

            target: KitchenSink.ControlsButtonGroupViewController,

            action: 'getActiveButton'
            
        }),

        activeButtonLabel: M.LabelView.design({

            value: 'Active Button: ',

            cssClass: 'titleSource'
            
        }),

        activeButtonName: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsButtonGroupViewController.activeButton',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});