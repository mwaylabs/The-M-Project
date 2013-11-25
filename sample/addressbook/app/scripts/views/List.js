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

                    extendTemplate: '<div><div class="name"><span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span></div><div><span class="street"><%= street %></span><span class="houseno"><%= houseno %></span></div><div><span class="zip"><%= zip %></span><span class="city"><%= city %></span></div><div class="company-logo <%= company %>"></div></div>',

                    useElement: YES,

                    events: {

                        tap: function( event, element ) {
                            var userModel = element.model;
                            var id = element.model.get('_id');
                            Addressbook.navigate({
                                route: 'detail/' + id,
                                transition: M.PageTransitions.MOVE_TO_LEFT_FROM_RIGHT
                            });

                        },

                        hold: function(event, element){
                            M.Toast.show({
                                text: element.model.get('firstname') + ' ' + element.model.get('lastname')
                            })
                        },

                        dragleft: function(event, element){
                            M.Toast.show({
                                text: element.model.get('firstname') + ' ' + element.model.get('lastname')
                            })
                        }
                    }
                })
            })
        })
    });

})();