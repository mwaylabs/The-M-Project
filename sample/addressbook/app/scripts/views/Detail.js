Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.DetailView = M.View.extend({
        cssClass: 'detail-page'

    }, {

        organisation: M.View.extend({
            scopeKey: 'currentModel',
            template: '<div class="company-logo <%= organisation %>"></div>'
        }),

        address: M.View.extend({
            tagName: 'h2',
            value: M.I18N.get('global.address')
        }),

        street: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<div><%= street %></div>'
        }),

        houseno: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<div><%= houseno %></div>'
        }),

        zip: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<div><%= zip %></div>'
        }),

        city: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<div><%= city %></div>'
        }),

        contactData: M.View.extend({
            tagName: 'h2',
            value: M.I18N.get('global.contact_data')
        }),

        mail: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<a href="mailto:<%= mail %>"><%= mail %></a></div>'
        }),

        tel: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<div><a href="tel:<%= tel %>"><%= tel %></a></div>'
        }),

        fax: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<div><%= fax %></div>'
        }),

        web: M.View.extend({
            scopeKey: 'currentModel',
            extendTemplate: '<div><a target="_blank" href="<%= web %>"><%= web %></a></div>'
        }),

        options: M.View.extend({
            cssClass: 'options'
        }, {
            back: M.ButtonView.extend({
                cssClass: 'btn-default',
                value: M.I18N.get('global.back'),
                useElement: YES,
                events: {
                    tap: function() {
                        Addressbook.navigate({
                            route: '/',
                            transition: M.PageTransitions.MOVE_TO_RIGHT_FROM_LEFT
                        })
                    }
                }
            })
        })
    })

})();