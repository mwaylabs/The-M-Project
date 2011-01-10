m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage5 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLabelViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Inline labels',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label1 label2 markupTitle markup',

        label1: M.LabelView.design({

            value: 'We are both ',

            isInline: YES

        }),

        label2: M.LabelView.design({

            value: 'inline labels.',

            isInline: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'We are both \',\n\n\tisInline: YES\n\n})\n\nM.LabelView.design({\n\n\tvalue: \'inline labels.\',\n\n\tisInline: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});