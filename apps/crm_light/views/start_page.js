CRMLight.StartPage = M.PageView.design({

    childViews: 'content',

    cssClass: 'startPage',

    content: M.ScrollView.design({

        childViews: 'logo',

        logo: M.ImageView.design({

            value: 'resources/logo.png'

        })

    })

});