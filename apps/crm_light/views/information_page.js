CRMLight.InformationPage = M.PageView.design({

    childViews: 'header red red2 footer',

    cssClass: 'bg informationPage',

    header: M.ToolbarView.design({

        childViews: 'back title',

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

    red: M.ContainerView.design({

        cssClass: 'redSmall'

    }),

    red2: M.ContainerView.design({

        cssClass: 'redSmall bottom'

    }),

    footer: M.ToolbarView.design({

        childViews: 'grid',

        anchorLocation: M.BOTTOM,

        cssClass: 'footer',

        grid: M.GridView.design({

            childViews: 'search newActivity',

            layout: M.TWO_COLUMNS,

            search: M.ButtonView.design({

                value: M.I18N.l('search')

            }),

            newActivity: M.ButtonView.design({

                value: M.I18N.l('new_activity')

            }),

            anchorLocation: M.CENTER

        })

    })
    
});