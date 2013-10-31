Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict'
    Addressbook.Views.DetailView = M.View.extend({

        scopeKey: 'currentModel'

    }, {

        firstname: M.View.extend({
            extendTemplate: '<div><%= firstname %></div>',
            label: 'Firstname'
        }),

        lastname: M.View.extend({
            extendTemplate: '<div><%= lastname %></div>',
            label: 'Lastname'
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