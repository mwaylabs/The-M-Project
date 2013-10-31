Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict'
    Addressbook.Views.EditView = M.View.extend({

    }, {

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
            back: M.ButtonView.extend({
                cssClass: 'btn-default',
                value: 'Back',
                useElement: YES,
                events: {
                    tap: 'back'
                }
            })
        })
    })

})();