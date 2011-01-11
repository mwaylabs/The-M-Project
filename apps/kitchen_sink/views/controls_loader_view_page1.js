m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_loader_view_page.js');

KitchenSink.ControlsLoaderViewPage1 = M.PageView.design({
    
    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsLoaderViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Default loader',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'grid markupTitle markup',

        grid: M.GridView.design({

            childViews: 'buttonOn buttonOff',

            layout: M.TWO_COLUMNS,

            buttonOn: M.ButtonView.design({

                value: 'Show',

                target: KitchenSink.ControlsLoaderViewController,

                action: 'showLoader'

            }),

            buttonOff: M.ButtonView.design({

                value: 'Hide',

                target: KitchenSink.ControlsLoaderViewController,

                action: 'hideLoader'

            })

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource afterControlGroup'

        }),

        markup: M.LabelView.design({

            value: 'M.LoaderView.show();\n\nM.LoaderView.hide();',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});