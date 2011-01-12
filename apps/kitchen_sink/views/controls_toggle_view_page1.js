m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page.js');

KitchenSink.ControlsToggleViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToggleViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toggle buttons automatically',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toggle markupTitle markup',

        toggle: M.ToggleView.design({

            childViews: 'button1 button2',

            toggleOnClick: YES,

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

            value: 'M.ToggleView.design({\n\n\tchildViews: \'button1 button2\',\n\n\ttoggleOnClick: YES,\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});