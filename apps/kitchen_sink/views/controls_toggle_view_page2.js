m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page.js');

KitchenSink.ControlsToggleViewPage2 = M.PageView.design({
    
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

            value: 'Toggle buttons manually',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'toggle button markupTitle markup',

        toggle: M.ToggleView.design({

            childViews: 'button1 button2',

            button1: M.ButtonView.design({

                value: 'Button 1'
                
            }),

            button2: M.ButtonView.design({

                value: 'Button 2'

            })

        }),

        button: M.ButtonView.design({

            value: 'Toggle buttons',

            target: KitchenSink.ControlsToggleViewController,

            action: 'toggleButtons'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ViewManager.getView(\'MyPage\', \'toggleControl\').toggleView();',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});