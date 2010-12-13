CRMLight.ActivitiesNewSelectPage = M.PageView.design({

    childViews: 'header content',

    cssClass: 'activitiesNewPage',

    onLoad: {
        target: CRMLight.ActivitiesNewSelectPageController,
        action: 'init'
    },

    header: M.ToolbarView.design({

        childViews: 'back title',

        back: M.ButtonView.design({

            value: M.I18N.l('back'),

            anchorLocation: M.LEFT,

            cssClass: 'back',

            target: CRMLight.ActivitiesNewSelectPageController,

            action: 'openActivitiesPage'

        }),

        title: M.LabelView.design({

            value: M.I18N.l('new_activity'),

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP,

        cssClass: 'header'

    }),

    content: M.ScrollView.design({

        childViews: 'activityList',

        activityList: M.ListView.design({

            contentBinding: 'CRMLight.ActivitiesNewSelectPageController.activity_selection',

            listItemTemplateView: CRMLight.ActivitiesSelectionListTemplateView

        })

    })

});