CRMLight.ActivitiesPage = M.PageView.design({

    childViews: 'header red content red2 footer',

    cssClass: 'bg activitiesPage',

    onLoad: {
        target: CRMLight.ActivitiesPageController,
        action: 'init'
    },

    header: M.ToolbarView.design({

        childViews: 'back title',

        back: M.ButtonView.design({

            value: M.I18N.l('back'),

            anchorLocation: M.LEFT,

            cssClass: 'back',

            target: CRMLight.ActivitiesPageController,

            action: 'openStartPage'

        }),

        title: M.LabelView.design({

            value: M.I18N.l('activities'),

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP,

        cssClass: 'header'

    }),

    red: M.ContainerView.design({

        cssClass: 'redSmall'

    }),

    content: M.ScrollView.design({

        childViews: 'activityList',

        activityList: M.ListView.design({

            contentBinding: 'CRMLight.ActivitiesPageController.activities',

            isDividedList: YES,

            listItemTemplateView: CRMLight.ActivitiesListTemplateView

        })

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