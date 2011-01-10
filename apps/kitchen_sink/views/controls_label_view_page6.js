m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_label_view_page.js');

KitchenSink.ControlsLabelViewPage6 = M.PageView.design({

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

            value: 'Inline labels & comp. values',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label1 label2 markupTitle markup',

        label1: M.LabelView.design({

            value: 'The current time is ',

            isInline: YES

        }),

        label2: M.LabelView.design({

            computedValue: {

                operation: function() {

                    var d = M.Date.now();
                    return d.format('HH:MM') + '.';

                }

            },

            isInline: YES

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.LabelView.design({\n\n\tvalue: \'The current time is \',\n\n\tisInline: YES\n\n})\n\nM.LabelView.design({\n\n\tcomputedValue: {\n\n\t\toperation: function() {\n\n\t\t\tvar d = M.Date.now();\n\n\t\t\treturn d.format(\'HH:MM\');\n\n\t\t}\n\n\t},\n\n\tisInline: YES\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});