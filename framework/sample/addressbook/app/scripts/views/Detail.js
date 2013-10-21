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

        firstname: TMP.TextfieldView.extend({
            scopeKey: 'firstname',
            label: 'Firstname'
        }),

        lastname: TMP.TextfieldView.extend({
            scopeKey: 'lastname',
            label: 'Lastname'
        }),

//        lastname: TMP.View.extend({
//            scopeKey: 'lastname',
//            templateExtend: '<h3 contenteditable="true"><%= lastname %></h3>',
//            test: 'lastname'
//        }),

        value: TMP.View.extend({
            value: 'test test test test',
            template: {
                defaultTemplate: '<div>VALUE<div style="color: #800080"><%= _value_ %></div></div>',
                bootstrap: '<div>VALUE<div style="color: blue"><%= _value_ %></div></div>',
                topcoat: '<div>VALUE<div style="color: red"><%= _value_ %></div></div>',
                jqm: '<div>VALUE<div style="color: green"><%= _value_ %></div></div>'
            }
        }),

        overview: TMP.View.extend({
            template: '<div><span><%= lastname %></span>, <span><%= firstname %></span><div data-childviews="_firstname_"></div></div>',
            type: 'Overview'
        }),

        bootstrap: TMP.ButtonView.extend({
            value: 'Bootstrap',
            extendTemplate: '<div><%= value %></div>',
            events: {
                click: function(){
                    TMP.TemplateManager._currentUI = 'bootstrap';
                    Addressbook.detailView.updateTemplate();
                    Addressbook.detailView.render();
                }
            },
            test: 'addButton'
        }),

        jQmTheme: TMP.ButtonView.extend({
            value: 'jQuery mobile',
            events: {
                click: 'removeHandler'
            },
            removeHandler: function(){
                TMP.TemplateManager._currentUI = 'jqm';
                Addressbook.detailView.updateTemplate();
                Addressbook.detailView.render();
            }
        }),

        topcoatTheme: TMP.ButtonView.extend({
            value: 'Topcoat',
            events: {
                click: 'topcoatTheme'
            }
        })
    });

})();