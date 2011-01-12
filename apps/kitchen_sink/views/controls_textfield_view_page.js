m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_textfield_view_page_list_item_template.js');

KitchenSink.ControlsTextFieldViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsTextFieldViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsTextFieldViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.TextFieldView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsTextFieldViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsTextFieldViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});