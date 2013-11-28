Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.DetailView = M.View.extend({
        cssClass: 'detail-page'
    }, {

        organisation: M.View.extend({
            useElement: YES,
            scopeKey: 'currentModel',
            template: '<div class="company-logo <%= organisation %>"></div>'
        }),

        content: M.View.extend({
            grid: 'col-xs-12'
        },{
            address: M.View.extend({
                tagName: 'h2',
                value: M.I18N.get('global.address')
            }),

            street: M.TextView.extend({
                label: M.I18N.get('global.street'),
                scopeKey: 'currentModel',
                icon: 'fa-road',
                extendTemplate: '<div><%= street %></div><div><%= houseno %></div>'
            }),

            zip: M.TextView.extend({
                label: M.I18N.get('global.home'),
                icon: 'fa-home',
                scopeKey: 'currentModel',
                extendTemplate: '<div><%= zip %></div><div><%= city %></div>'
            }),

            contactData: M.View.extend({
                tagName: 'h2',
                value: M.I18N.get('global.contact_data')
            }),

            mail: M.TextView.extend({
                label: M.I18N.get('global.mail'),
                icon: 'fa-envelope',
                scopeKey: 'currentModel',
                extendTemplate: '<a href="mailto:<%= mail %>"><%= mail %></a></div>'
            }),

            tel: M.TextView.extend({
                label: M.I18N.get('global.tel'),
                icon: 'fa-phone',
                scopeKey: 'currentModel',
                extendTemplate: '<div><a href="tel:<%= tel %>"><%= tel %></a></div>'
            }),

            fax: M.TextView.extend({
                label: M.I18N.get('global.fax'),
                icon: 'fa-print',
                scopeKey: 'currentModel',
                extendTemplate: '<div><%= fax %></div>'
            }),

            web: M.TextView.extend({
                label: M.I18N.get('global.web'),
                icon: 'fa-cloud',
                scopeKey: 'currentModel',
                extendTemplate: '<div><a target="_blank" href="<%= web %>"><%= web %></a></div>'
            }),
        }),

        options: M.View.extend({
            cssClass: 'options'
        }, {
//            back: M.ButtonView.extend({
//                cssClass: 'btn-default',
//                value: M.I18N.get('global.back'),
//                useElement: YES,
//                events: {
//                    tap: function() {
//                        Addressbook.navigate({
//                            route: '/',
//                            transition: M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT
//                        })
//                    }
//                }
//            })
        })
    })

})();