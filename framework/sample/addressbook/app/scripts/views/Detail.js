Addressbook.Views = Addressbook.Views || {};

(function() {
    //    'use strict';

    Addressbook.Views.DetailView = TMP.View.extend({

        template: '<form role="form"></form>'

    }, {

        //        headline: TMP.View.extend({
        //            value: 'Edit',
        //            test: 'headline'
        //        }),

        firstname: TMP.TextfieldView.extend({
            scopeKey: 'editModel.firstname',
            label: 'Firstname'
        }),

        lastname: TMP.TextfieldView.extend({
            scopeKey: 'editModel.lastname',
            label: 'Lastname'
        }),

        //        lastname: TMP.View.extend({
        //            scopeKey: 'testModel.lastname',
        //            templateExtend: '<h3 contenteditable="true"><%= lastname %></h3>',
        //            test: 'lastname'
        //        }),

        //        value: TMP.View.extend({
        //            value: 'test test test test',
        //            template: {
        //                defaultTemplate: '<div>VALUE<div style="color: #800080"><%= _value_ %></div></div>',
        //                bootstrap: '<div>VALUE<div style="color: blue"><%= _value_ %></div></div>',
        //                topcoat: '<div>VALUE<div style="color: red"><%= _value_ %></div></div>',
        //                jqm: '<div>VALUE<div style="color: green"><%= _value_ %></div></div>'
        //            }
        //        }),

//        overview: TMP.View.extend({
//            template: '<div>Preview: <span><%= lastname %></span>, <span><%= firstname %></span><div data-childviews="_firstname_"></div></div>',
//            type: 'Overview',
//            scopeKey: 'editModel'
//        }),

        overview2: TMP.View.extend({
            template: '<span><%= lastname %></span>, <span><%= firstname %></span>',
            type: 'Overview',
            scopeKey: 'currentModel'
        }),

        update: TMP.ButtonView.extend({
            value: 'Update',
            events: {
                click: 'updateEntry'
            }
        }),

        delete: TMP.ButtonView.extend({
            value: 'Delete',
            events: {
                click: 'removeEntry'
            }
        }),

        add: TMP.ButtonView.extend({
            value: 'Add',
            extendTemplate: '<div><%= value %></div>',
            events: {
                click: 'addEntry'
            }
        }),

        contactList: TMP.ListView.extend({
            scopeKey: 'contactCollection',
            listItemView: TMP.ListItemView.extend({
                extendTemplate: '<span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span>',
                events: {
                    click: function(){
                        this.scope.editModel.set('firstname', this.model.get('firstname'));
                        this.scope.editModel.set('lastname', this.model.get('lastname'));
                        this.scope.set('currentModel', this.model);
                    }
                }
            })
        })

    });

})();