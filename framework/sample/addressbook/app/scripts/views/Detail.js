Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict';

    Addressbook.Views.DetailView = TMP.View.extend({

        template: '<form role="form"></form>'

    }, {

        headline: TMP.View.extend({
            value: 'Edit',
            test: 'headline'
        }),

        firstname: TMP.View.extend({
            scopeKey: 'firstname',
            test: 'firstname'
        }),

        value: TMP.View.extend({
            scopeKey: 'value',
            test: 'value'
        }),

        lastname: TMP.View.extend({
            scopeKey: 'lastname',
            templateExtend: '<h3 contenteditable="true"><%= lastname %></h3>',
            test: 'lastname'
        }),

        overview: TMP.View.extend({
            template: '<div><span><%= lastname %></span>, <span><%= firstname %></span><div data-childviews="_firstname_"></div></div>',
            test: 'overview'
        }),

        addButton: TMP.ButtonView.extend({
            value: 'add',
            extendTemplate: '<div><%= value %></div>',
            events: {
                click: 'addHandler'
            },
            test: 'addButton'
        }),

        deleteButton: TMP.ButtonView.extend({
            value: 'delete',
            events: {
                click: 'removeHandler'
            },
            test: 'deleteButton'
        })
    });

})();