Addressbook.Views = Addressbook.Views || {};

(function () {
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
            contactList: M.ListView.extend({

                scopeKey: 'contactCollection',

                listItemView: M.ListItemView.extend({

                    extendTemplate: '<span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span>',

                    useElement: YES,

                    events: {

                        tap: function (event, element) {
                            var id = element.model.get('_id');
                            Addressbook.navigate({
                                route: 'detail/' + id
                            });

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