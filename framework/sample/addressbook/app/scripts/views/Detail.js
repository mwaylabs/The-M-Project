Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.DetailView = M.View.extend({

        template: '<div><div data-childviews="edit"></div><div data-childviews="content"></div><div data-childviews="footer"></div></div>'

    }, {
        edit: M.View.extend({
            postRender: function() {
                this.$el.hide();
            }
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
                    value: 'Hide',
                    useElement: YES,
                    events: {
                        tap: function() {
                            Addressbook.MainController.detailView.childViews.edit.$el.slideUp();
                        }
                    }
                })
            })
        }),

        content: M.View.extend({

        }, {
            headline: M.View.extend({
                tagName: 'h2',
                value: 'Contacts'
            }),
            contactList: M.ListView.extend({

                scopeKey: 'contactCollection',

                listItemView: M.ListItemView.extend({

                    extendTemplate: '<span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span>',

                    useElement: YES,

                    events: {

                        tap: function(event, element) {

                            element.scope.editModel.set('firstname', element.model.get('firstname'));
                            element.scope.editModel.set('lastname', element.model.get('lastname'));
                            element.scope.set('currentModel', element.model);
                            Addressbook.MainController.detailView.childViews.edit.$el.slideDown();

                        }
                    }
                })
            })
        })
    });

})();