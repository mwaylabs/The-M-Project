Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.ListView = M.View.extend({

        template: '<div><div data-childviews="content"></div><div data-childviews="footer"></div></div>'

    }, {

        content: M.View.extend({

        }, {
            headline: M.View.extend({
                tagName: 'h2',
                value: 'Contacts'
            }),
            firstname: M.TextfieldView.extend({
                scopeKey: 'editModel.firstname',
                label: 'Firstname'
            }),

            lastname: M.TextfieldView.extend({
                scopeKey: 'editModel.lastname',
                label: 'Lastname'
            }),
            contactList: M.ListView.extend({

                scopeKey: 'contactCollection',

                listItemView: M.ListItemView.extend({

                    extendTemplate: '<span class="lastname"><%= lastname %></span><span class="firstname"><%= firstname %></span>',

                    useElement: YES,

                    events: {

                        tap: function( event, element ) {
                            var userModel = element.model;
                            element.scope.currentModel = userModel;
                            element.scope.editModel.set('firstname', userModel.get('firstname'));
                            element.scope.editModel.set('lastname', userModel.get('lastname'));

                            xxx.detailCtrl.editModel.set('firstname', userModel.get('firstname'));
                            xxx.detailCtrl.editModel.set('lastname', userModel.get('lastname'));

//                            var id = element.model.get('_id');
//                            Addressbook.navigate({
//                                route: 'detail/' + id
//                            });

                            //                            element.scope.editModel.set('firstname', element.model.get('firstname'));
                            //                            element.scope.editModel.set('lastname', element.model.get('lastname'));
                            //                            element.scope.set('currentModel', element.model);
                            //                            Addressbook.ListController.listView.childViews.edit.$el.slideDown();

                        }
                    }
                })
            })
        })
    });

})();