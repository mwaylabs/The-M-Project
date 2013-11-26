Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.EditView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        firstname: M.TextfieldView.extend({
            icon: 'fa-user',
            scopeKey: 'editModel.firstname',
            label: M.I18N.get('global.firstname')
        }),

        lastname: M.TextfieldView.extend({
            icon: 'fa-user',
            scopeKey: 'editModel.lastname',
            label: M.I18N.get('global.lastname')
        }),

        street: M.TextfieldView.extend({
            icon: 'fa-road',
            scopeKey: 'editModel.street',
            label: M.I18N.get('global.street')
        }),

        houseno: M.TextfieldView.extend({
            icon: 'fa-building-o',
            scopeKey: 'editModel.houseno',
            label: M.I18N.get('global.houseno')
        }),

        zip: M.TextfieldView.extend({
            icon: 'fa-home',
            scopeKey: 'editModel.zip',
            label: M.I18N.get('global.zip')
        }),

        city: M.TextfieldView.extend({
            icon: 'fa-map-marker',
            scopeKey: 'editModel.city',
            label: M.I18N.get('global.city')
        }),

        mail: M.TextfieldView.extend({
            icon: 'fa-envelope',
            scopeKey: 'editModel.mail',
            label: M.I18N.get('global.mail')
        }),

        tel: M.TextfieldView.extend({
            icon: 'fa-phone',
            scopeKey: 'editModel.tel',
            label: M.I18N.get('global.tel')
        }),

        fax: M.TextfieldView.extend({
            icon: 'fa-print',
            scopeKey: 'editModel.fax',
            label: M.I18N.get('global.fax')
        }),

        web: M.TextfieldView.extend({
            icon: 'fa-cloud',
            scopeKey: 'editModel.web',
            label: M.I18N.get('global.web')
        }),

        options: M.View.extend({
            cssClass: 'options'
        }, {
//            back: M.ButtonView.extend({
//                cssClass: 'btn-default',
//                value: M.I18N.get('global.back'),
//                useElement: YES,
//                events: {
//                    tap: 'back'
//                }
//            })
        })
    })

})();