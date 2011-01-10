m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage2 = M.PageView.design({

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

            value: 'Label with computed value',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label markupTitle markup',

        label: M.LabelView.design({

            computedValue: {

                value: 'label',

                operation: function(v) {

                    return v.toUpperCase()

                }
            }

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tcomputedValue: {\n\n\t\tvalue: \'label\',\n\n\t\toperation: function(v) {\n\n\t\t\treturn v.toUpperCase()\n\n\t\t}\n\n\t}\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});