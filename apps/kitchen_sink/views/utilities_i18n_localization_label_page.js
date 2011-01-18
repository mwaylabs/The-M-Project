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
        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            value: M.I18N.l('welcome')

        }),

        markupTitle: M.LabelView.design({
            value: 'Sourcecode',
            cssClass: 'titleSource'
        }),

        markup: M.LabelView.design({
            value: 'M.LabelView.design({\n\n\tvalue: M.I18N.l(\'welcome\')\n\n})',
            cssClass: 'source'
        })

    }),

    tabBar: KitchenSink.TabBar
});