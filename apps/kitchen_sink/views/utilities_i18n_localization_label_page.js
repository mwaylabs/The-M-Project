m_require('app/views/tabs.js');
m_require('app/views/utilities_page.js');
m_require('app/views/utilities_i18n_page.js');

KitchenSink.UtilitiesI18nLocalizationLabelPage = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({
        childViews: 'backButton title',

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.UtilitiesI18nController,
            action: 'here'
        }),

        title: M.LabelView.design({
            value: 'Localizing label',
            anchorLocation: M.CENTER
        }),

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({
        childViews: 'buttonGroup markupTitle markup',

        buttonGroup: M.ButtonGroupView.design({
            childViews: 'button1 button2',
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
            value: 'M.ButtonGroupView.design({\n\n\tchildViews: \'button1 button2\',\n\n\tbutton1: M.ButtonView.design({\n\n\t\tvalue: \'Button 1\'\n\n\t}),\n\n\tbutton2: M.ButtonView.design({\n\n\t\tvalue: \'Button 2\'\n\n\t})\n\n})',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});