Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict'
    Addressbook.Views.DetailView = M.View.extend({

        scopeKey: 'currentModel'

    }, {

        firstname: M.View.extend({
            tagName: 'h2',
            extendTemplate: '<div><%= firstname %></div>'
        }),

        lastname: M.View.extend({
            tagName: 'h2',
            extendTemplate: '<div><%= lastname %></div>'
        }),

        options: M.View.extend({
            cssClass: 'options'
        }, {
            back: M.ButtonView.extend({
                cssClass: 'btn-default',
                value: 'Back',
                useElement: YES,
                events: {
                    tap: function () {
                        Addressbook.navigate({
                            route: '/'
                        })
                    }
                }
            })
        })
    })

})();