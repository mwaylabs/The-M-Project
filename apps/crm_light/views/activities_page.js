CRMLight.ActivitiesPage = M.PageView.design({

    childViews: 'header content footer',

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

    content: M.ScrollView.design({

        childViews: 'activityList',

        activityList: M.ListView.design({

            contentBinding: 'CRMLight.ActivitiesPageController.activities',

            isDividedList: YES,

            listItemTemplateView: CRMLight.ActivitiesListTemplateView

        })

    }),

    footer: M.ToolbarView.design({

        childViews: 'grid',

        anchorLocation: M.BOTTOM,

        cssClass: 'footer',

        grid: M.GridView.design({

            childViews: 'search newActivity',

            layout: M.TWO_COLUMNS,

            search: M.ButtonView.design({

                value: M.I18N.l('search'),

                target: CRMLight.ActivitiesPageController,

                action: 'openSearchPage'

            }),

            newActivity: M.ButtonView.design({

                value: M.I18N.l('new_activity'),

                target: CRMLight.ActivitiesPageController,

                action: 'openNewSelectPage'

            }),

            anchorLocation: M.CENTER

        })

    })
    
});