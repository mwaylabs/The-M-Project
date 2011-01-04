m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_button_view_page.js');

KitchenSink.ControlsButtonViewPage3 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsButtonViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: '"Icon only" button',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Button',

            icon: 'grid',

            isIconOnly: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ButtonView.design({\n\n\tvalue: \'Button\'\n\n\ticon: \'grid\'\n\n\tisIconOnly: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});