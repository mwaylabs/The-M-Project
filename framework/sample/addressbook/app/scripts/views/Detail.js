Addressbook.Views = Addressbook.Views || {};

(function() {
    //    'use strict';

    Addressbook.Views.DetailView = TMP.View.extend({

        template: '<form role="form"></form>'

    }, {

        headline: TMP.View.extend({
            value: 'Edit',
            test: 'headline'
        }),

        firstname: TMP.TextfieldView.extend({
            scopeKey: 'editModel.firstname',
            label: 'Firstname'
        }),

        lastname: TMP.TextfieldView.extend({
            scopeKey: 'editModel.lastname',
            label: 'Lastname'
        }),

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
            extendTemplate: '<span><%= _value_ %></span>',
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
        }),

        clearLocalStorage: TMP.ButtonView.extend({
            value: 'clear local storage',
            events: {
                click: function(){
                    localStorage.clear();
                }
            }
        })

    });

})();