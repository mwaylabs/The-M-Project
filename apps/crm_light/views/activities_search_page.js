CRMLight.ActivitiesSearchPage = M.PageView.design({

    childViews: 'header content',

    cssClass: 'bg activitiesPage',

    onLoad: {
        target: CRMLight.ActivitiesSearchPageController,
        action: 'init'
    },

    header: M.ToolbarView.design({

        childViews: 'back title',

        back: M.ButtonView.design({

            value: M.I18N.l('back'),

            anchorLocation: M.LEFT,

            cssClass: 'back',

            target: CRMLight.ActivitiesSearchPageController,

            action: 'openActivitiesPage'

        }),

        title: M.LabelView.design({

            value: M.I18N.l('activities_search'),

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP,

        cssClass: 'header'

    }),

    content: M.ScrollView.design({

        childViews: 'grid activityList',

        grid: M.GridView.design({

            childViews: 'searchbar searchbutton',

            layout: {
                cssClass: 'searchgrid',
                columns: {
                    0: 'grid70',
                    1: 'grid30'
                }
            },

            cssClass: 'searchgrid',

            searchbar: M.TextFieldView.design({

                cssClass: 'searchbar',

                cssClassOnInit: 'searchbarInit',

                initialText: M.I18N.l('searchString')

            }),

            searchbutton: M.ButtonView.design({

                value: M.I18N.l('search'),

                cssClass: 'searchbutton',

                target: CRMLight.ActivitiesSearchPageController,

                action: 'search'

            })

        }),

        activityList: M.ListView.design({

            contentBinding: 'CRMLight.ActivitiesSearchPageController.activitiesSearch',

            isDividedList: YES,

            listItemTemplateView: CRMLight.ActivitiesListTemplateView

        })

    })
    
});