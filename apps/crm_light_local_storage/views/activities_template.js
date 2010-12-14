CRMLight.ActivitiesListTemplateView = M.ListItemView.design({

    childViews: 'icon date activityName companyName',

    cssClass: 'activity_list',

    icon : M.ImageView.design({
        computedValue: {
            valuePattern: '<%= icon %>',
            operation: function(v, label) {
                if(!v) { v = 'default';}
                return 'resources/icon_activity_' + v + '.png';
            }
        },
        cssClass: 'list_icon'
    }),

    date : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= date %>',
            operation: function(v, label) {
                var date = M.Date.create(v);
                return date.format('HH:MM');
            }
        },
        cssClass: 'list_text list_date'
    }),

    activityName : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= activityName %>',
            operation: function(v, label) {
                return v;
            }
        },
        cssClass: 'list_text list_activity_name'
    }),

    companyName : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= companyName %>',
            operation: function(v, label) {
                return v;
            }
        },
        isInline: YES,
        cssClass: 'list_text list_company_name'
    })

    /*companyCity : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= companyCity %>',
            operation: function(v, label) {
                return v;
            }
        },
        isInline: YES,
        cssClass: 'list_company_city'
    })*/

});