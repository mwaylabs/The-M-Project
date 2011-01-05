m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage5 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Working with callbacks',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open actionsheet dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openActionsheet3'

        }),

        markupTitle: M.LabelView.design({

            value: 'Button clicked',
            
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: '-',

            contentBinding: 'KitchenSink.ControlsDialogViewController.callback',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});