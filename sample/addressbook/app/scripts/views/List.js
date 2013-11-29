Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.ListView = M.View.extend({

        template: '<div><div data-childviews="content"></div><div data-childviews="tutorial"></div></div>'

    }, {

        content: M.View.extend({

            cssClass: 'content-wrapper-no'

        }, {

            contactList: M.ListView.extend({

                scopeKey: 'contactCollection',

                listItemView: M.ListItemView.extend({

                    cssClass: '',

                    extendTemplate: '<div class="row"><div class="col-xs-7 col-xs-offset-1"><div class="name ellipsis"><span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span></div><div class="ellipsis"><span class="street"><%= street %></span><span class="houseno"><%= houseno %></span></div><div class="ellipsis"><span class="zip"><%= zip %></span><span class="city"><%= city %></span></div></div><div class="col-xs-3"><div class="company-logo <%= company %>"></div></div></div>',

                    useElement: YES,

                    events: {

                        tap: function( event, element ) {
                            var userModel = element.model;
                            var id = element.model.get('_id');
                            Addressbook.navigate({
                                route: 'detail/' + id,
                                transition: M.PageTransitions.CONST.MOVE_TO_LEFT_FROM_RIGHT
                            });

                        },

                        hold: function( event, element ) {
                            M.Toast.show({
                                text: element.model.get('firstname') + ' ' + element.model.get('lastname')
                            })
                        },

                        dragleft: function( event, element ) {
                            M.Toast.show({
                                text: element.model.get('firstname') + ' ' + element.model.get('lastname')
                            })
                        }
                    }
                })
            })
        })

//        ,
//
//        tutorial: M.View.extend({
//
//            cssClass: 'tutorial',
//
//            events: {
//                tap: 'hideTutorial'
//            }
//        }, {
//
//            welcome: M.View.extend({
//                tagName: 'h2',
//                value: M.I18N.get('global.welcome')
//            }),
//
//            intro: M.View.extend({
//                tagName: 'h3',
//                value: M.I18N.get('global.intro')
//            }),
//
//            link: M.View.extend({
//                value: '',
//                extendTemplate: '<a target="_blank" href="' + location.href + '">Open</a>'
//            }),
//
//            qr: M.ImageView.extend({
//                value: 'ressources/qr.png'
//            }),
//
//            first_step: M.View.extend({
//                tagName: 'h4',
//                value: M.I18N.get('global.first_step')
//            }),
//
//            second_step: M.View.extend({
//                tagName: 'h4',
//                value: M.I18N.get('global.second_step')
//            }),
//
//            third_step: M.View.extend({
//                tagName: 'h4',
//                value: M.I18N.get('global.third_step')
//            }),
//
//            thanks: M.ButtonView.extend({
//                value: M.I18N.get('global.dont_show_again'),
//                events:{
//                    tap: function(){
//                        localStorage.setItem('tutorial', NO);
//                    }
//                }
//            })
//
//        })
    });

})();