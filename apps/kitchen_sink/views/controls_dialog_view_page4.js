m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page.js');

KitchenSink.ControlsDialogViewPage4 = M.PageView.design({

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

            value: 'Actionsheet dialog',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Open actionsheet dialog',

            target: KitchenSink.ControlsDialogViewController,

            action: 'openActionsheet2'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.DialogView.actionSheet({\n\n\ttitle: \'Actionsheet dialog 2\',\n\n\tmessage: \'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\',\n\n\tbuttons: {\n\n\t\tbutton1: {\n\n\t\t\ttitle: \'Button 1\'\n\n\t\t},\n\n\t\tbutton2: {\n\n\t\t\ttitle: \'Button 2\'\n\n\t\t},\n\n\t\tbutton3: {\n\n\t\t\ttitle: \'Button 2\'\n\n\t\t}\n\n\t}\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});