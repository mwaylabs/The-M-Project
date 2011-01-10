m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage4 = M.PageView.design({

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

            value: 'Hyperlink label (external)',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            value: 'Click to open google.com.',

            hyperlinkType: M.HYPERLINK_WEBSITE,

            hyperlinkTarget: 'http://www.google.com'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'Click to open google.com.\',\n\n\thyperlinkType: M.HYPERLINK_WEBSITE,\n\n\thyperlinkTarget: \'http://www.google.com\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});