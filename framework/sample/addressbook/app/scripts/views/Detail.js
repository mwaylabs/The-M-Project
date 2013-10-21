Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict';

    Addressbook.Views.DetailView = TMP.View.extend({

        template: '<form role="form"></form>'

    }, {

        headline: TMP.View.extend({
            value: 'Edit'
        }),

        firstname: TMP.View.extend({
            scopeKey: 'firstname'
        }),

        value: TMP.View.extend({
            scopeKey: 'value'
        }),

        lastname: TMP.View.extend({
            scopeKey: 'lastname',
            templateExtend: '<h3 contenteditable="true"><%= lastname %></h3>'
        }),

        overview: TMP.View.extend({
            template: '<div><span><%= lastname %></span>, <span><%= firstname %></span></div>'
        }),

        addButton: TMP.ButtonView.extend({
            value: 'add',
            extendTemplate: '<div><%= value %></div>',
            events: {
                click: 'addHandler'
            }
        }),

        deleteButton: TMP.ButtonView.extend({
            value: 'delete',
            events: {
                click: 'removeHandler'
            }
        })
    });

})();