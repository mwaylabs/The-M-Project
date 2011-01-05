m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_dialog_view_page_list_item_template.js');

KitchenSink.ControlsDialogViewPage = M.PageView.design({

    onLoad : {

        target: KitchenSink.ControlsDialogViewController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsDialogViewController,

            action: 'back'

        }),

        title: M.LabelView.design({

            value: 'M.DialogView',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'controlsList',

        controlsList: M.ListView.design({

            listItemTemplateView: KitchenSink.ControlsDialogViewPageListItemTemplate,

            contentBinding: 'KitchenSink.ControlsDialogViewController.controlsList'

        })

    }),

    tabBar: KitchenSink.TabBar

});