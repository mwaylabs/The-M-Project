m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_toggle_view_page.js');

KitchenSink.ControlsToggleViewPage3 = M.PageView.design({
    
    childViews: 'header toggle content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsToggleViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Toggle complex view',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    toggle: M.ToggleView.design({

        childViews: 'content1 content2',

        content1: M.ScrollView.design({

            childViews: 'label textfield grid',

            label: M.LabelView.design({

               value: 'I am the label of the first view.'

            }),

            textfield: M.TextFieldView.design({

                isGrouped: NO,

                value: 'I am the textfield of the first view.'

            }),

            grid: M.GridView.design({

                layout: M.TWO_COLUMNS,

                childViews: 'button1 button2',

                button1: M.ButtonView.design({

                    value: 'Button 1' 

                }),

                button2: M.ButtonView.design({

                    value: 'Button 2'

                })

            })

        }),

        content2: M.ScrollView.design({

            childViews: 'label',

            label: M.LabelView.design({

               value: 'Now it\s all gone. I am all alone on the second view.'

            }) 

        })

    }),

    content: M.ScrollView.design({

        childViews: 'button markupTitle markup',

        button: M.ButtonView.design({

            value: 'Toggle views',

            target: KitchenSink.ControlsToggleViewController,

            action: 'toggleViews'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ViewManager.getView(\'MyPage\', \'toggleControl\').toggleView();',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});