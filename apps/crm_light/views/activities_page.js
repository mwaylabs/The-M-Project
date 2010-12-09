CRMLight.ActivitiesPage = M.PageView.design({

    childViews: 'header',

    cssClass: 'bg activitiesPage',

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

    })
    
});