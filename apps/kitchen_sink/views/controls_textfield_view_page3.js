m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page.js');

KitchenSink.ControlsTextFieldViewPage3 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTextFieldViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Two linked textfields',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'textfield1 textfield2 markupTitle markup',

        textfield1: M.TextFieldView.design({

            isGrouped: NO,

            contentBinding: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue',

            contentBindingReverse: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue'

        }),

        textfield2: M.TextFieldView.design({

            isGrouped: NO,

            contentBinding: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue',

            contentBindingReverse: 'KitchenSink.ControlsTextFieldViewController.textfieldvalue'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.TextFieldView.design({\n\n\tisGrouped: NO,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\tcontentBindingReverse: \'MyApp.MyController.property\'\n\n})\n\nM.TextFieldView.design({\n\n\tisGrouped: NO,\n\n\tcontentBinding: \'MyApp.MyController.property\',\n\n\tcontentBindingReverse: \'MyApp.MyController.property\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});