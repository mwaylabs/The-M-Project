Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.DetailView = M.View.extend({

        template: '<div><div data-childviews="edit"></div><div data-childviews="content"></div><div data-childviews="footer"></div></div>'

    }, {
        edit: M.View.extend({
            postRender: function(){
                this.$el.hide();
            }
        },{
            headline: M.View.extend({
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

            overview2: M.View.extend({
                template: '<div><span><%= lastname %></span>, <span><%= firstname %></span></div>',
                type: 'Overview',
                scopeKey: 'currentModel'
            }),

            updateButton: M.ButtonView.extend({
                value: 'Update',
                events: {
                    click: 'updateEntry'
                }
            }),

            deleteButton: M.ButtonView.extend({
                value: 'Delete',
                events: {
                    click: 'removeEntry'
                }
            }),

            addButton: M.ButtonView.extend({
                value: 'Add',
                extendTemplate: '<span><%= _value_ %></span>',
                events: {
                    click: 'addEntry'
                }
            })
        }),

        content: M.ListView.extend({
            scopeKey: 'contactCollection',
            listItemView: M.ListItemView.extend({
                extendTemplate: '<span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span>',
                events: {
                    click: function(){
                        this.scope.editModel.set('firstname', this.model.get('firstname'));
                        this.scope.editModel.set('lastname', this.model.get('lastname'));
                        this.scope.set('currentModel', this.model);
                        mainctrl.detailView.childViews.edit.$el.slideDown();
                    }
                }
            })
        }),

        footer: M.ButtonView.extend({
            value: 'clear local storage',
            events: {
                click: function(){
                    localStorage.clear();
                }
            }
        })

    });

})();