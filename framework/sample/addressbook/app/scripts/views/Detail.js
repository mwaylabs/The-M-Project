Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict'
    Addressbook.Views.DetailView = M.View.extend({

    }, {
        headline: M.View.extend({
            tagName: 'h2',
            value: 'Edit',
            test: 'headline'
        }),

        firstname: M.TextfieldView.extend({
            scopeKey: 'editModel.firstname',
            label: 'Firstname'
        }),

        lastname: M.TextfieldView.extend({
            scopeKey: 'editModel.lastname',
            label: 'Lastname'
        }),

        options: M.View.extend({
            cssClass: 'options'
        }, {
            updateButton: M.ButtonView.extend({
                cssClass: 'btn-info',
                value: 'Update',
                useElement: YES,
                events: {
                    tap: 'updateEntry'
                }
            }),

            deleteButton: M.ButtonView.extend({
                cssClass: 'btn-danger',
                value: 'Delete',
                useElement: YES,
                events: {
                    tap: 'removeEntry'
                }
            }),

            addButton: M.ButtonView.extend({
                cssClass: 'btn-success',
                value: 'Add',
                useElement: YES,
                extendTemplate: '<span><%= _value_ %></span>',
                events: {
                    tap: 'addEntry'
                }
            }),
            hide: M.ButtonView.extend({
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