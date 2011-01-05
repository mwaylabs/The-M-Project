m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage1 = M.PageView.design({

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

            value: 'Alert dialog',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open alert dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openAlert'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.DialogView.alert({\n\n\ttitle: \'Alert dialog\',\n\n\tmessage: \'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});