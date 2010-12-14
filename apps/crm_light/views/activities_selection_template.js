CRMLight.ActivitiesSelectionListTemplateView = M.ListItemView.design({

    childViews: 'activityName',

    activityName: M.LabelView.design({

        cssClass: 'activityName',

        target: CRMLight.ActivitiesNewSelectPageController,

        action: 'openActivitiesNewPage',
        
        valuePattern: '<%= name %>'

    })

});