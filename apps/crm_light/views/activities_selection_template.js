CRMLight.ActivitiesSelectionListTemplateView = M.ListItemView.design({

    childViews: 'activityName',

    target: CRMLight.ActivitiesNewSelectPageController,

    action: 'openActivitiesNewPage',

    activityName: M.LabelView.design({

        cssClass: 'activityName',
        
        valuePattern: '<%= name %>'

    })

});