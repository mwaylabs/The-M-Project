m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage1 = M.PageView.design({

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

            value: 'Default label',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            value: 'Label'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'Label\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});