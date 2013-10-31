Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.ListView = M.View.extend({

        template: '<div><div data-childviews="content"></div><div data-childviews="footer"></div></div>'

    }, {

        content: M.View.extend({

        }, {
            contactList: M.ListView.extend({

                scopeKey: 'contactCollection',

                listItemView: M.ListItemView.extend({

                    extendTemplate: '<span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span>',

                    useElement: YES,

                    events: {

                        tap: function( event, element ) {
                            var userModel = element.model;

                            var id = element.model.get('_id');
                            Addressbook.navigate({
                                route: 'detail/' + id
                            });

                        }
                    }
                })
            })
        })
    });

})();