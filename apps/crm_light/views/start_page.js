CRMLight.StartPage = M.PageView.design({

    childViews: 'header content footer',

    cssClass: 'bg startPage',

    header: M.ContainerView.design({

        cssClass: 'red'

    }),

    content: M.ScrollView.design({

        childViews: 'logo activities information',

        logo: M.ImageView.design({

            value: 'resources/logo.png',

            cssClass: 'logo'

        }),

        activities: M.ButtonView.design({

            value: M.I18N.l('activities'),

            cssClass: 'activities',

            target: CRMLight.StartPageController,

            action: 'openActivitiesPage'

        }),

        information: M.ButtonView.design({

            value: M.I18N.l('information'),

            cssClass: 'info',

            target: CRMLight.StartPageController,

            action: 'openInformationPage'

        })

    }),

    footer: M.ContainerView.design({

        cssClass: 'footer red'

    })

});