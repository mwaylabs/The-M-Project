m_require('app/views/tabs.js');
m_require('app/views/controls_page.js');
m_require('app/views/controls_image_view_page.js');

KitchenSink.ControlsImageViewPage2 = M.PageView.design({

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton title',

        backButton: M.ButtonView.design({

            value: 'Back',

            icon: 'arrow-l',

            anchorLocation: M.LEFT,

            target: KitchenSink.ControlsImageViewController,

            action: 'here'

        }),

        title: M.LabelView.design({

            value: 'Image with CSS styling',

            anchorLocation: M.CENTER
            
        }),
        
        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'image markupTitle markup',

        image: M.ImageView.design({

            value: 'images/mway_logo_sm.png',

            cssClass: 'myImage'

        }),

        markupTitle: M.LabelView.design({

            value: 'Sourcecode',
            cssClass: 'titleSource'

        }),

        markup: M.LabelView.design({

            value: 'M.ImageView.design({\n\n\tvalue: \'images/mway_logo_sm.png\',\n\n\tcssClass: \'myImage\'\n\n})',

            cssClass: 'source'

        })

    }),

    tabBar: KitchenSink.TabBar

});