CRMLight.InformationPage = M.PageView.design({

    childViews: 'header footer',

    cssClass: 'bg informationPage',

    header: M.ToolbarView.design({

        childViews: 'back title',

        isFixed: NO,

        back: M.ButtonView.design({

            value: M.I18N.l('back'),

            anchorLocation: M.LEFT,

            cssClass: 'back',

            target: CRMLight.InformationPageController,

            action: 'openStartPage'

        }),

        title: M.LabelView.design({

            value: M.I18N.l('customer_information'),

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP,

        cssClass: 'header'

    }),

    footer: M.ToolbarView.design({

        childViews: 'grid',

        anchorLocation: M.BOTTOM,

        cssClass: 'footer',

        isFixed: NO,

        grid: M.GridView.design({

            childViews: 'initDB newActivity',

            layout: M.TWO_COLUMNS,

            initDB: M.ButtonView.design({

                value: 'Init DB',

                target: CRMLight.ActivitiesPageController,

                action: 'loadInitData'

            }),

            newActivity: M.ButtonView.design({

                value: M.I18N.l('new_activity')

            }),

            anchorLocation: M.CENTER

        })

    })
    
});