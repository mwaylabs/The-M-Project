/*global define*/

define(['themproject', 'templates', 'controllers/index'], function( M, JST, IndexController) {
    //    'use strict';

    var ContactdetailView = M.View.extend({
        template: JST['app/scripts/templates/ContactDetail.ejs'],



        childViews: {

            '[data-child-view="content"]': [ M.View.extend({
                template: JST['app/scripts/templates/PersonDetail.ejs'],

                bindings: {
                    '[data-binding="firstname"]': {
                        observe: 'firstname'
                    },
                    '[data-binding="lastname"]': {
                        observe: 'lastname'
                    }
                },

                value: function() {
                    var IndexController = require('controllers/index');
                    return IndexController.CurrentContact;
                },

                contentBinding: {
                    target: IndexController,
                    property: 'CurrentContact'
                }
            })
                ,
                M.View.extend({

                    template: JST['app/scripts/templates/PersonDetailAndroid.ejs'],

                    bindings: {
                        '[data-binding="firstname"]': {
                            observe: 'firstname'
                        },
                        '[data-binding="lastname"]': {
                            observe: 'lastname'
                        }
                    },

                    value: function(){
                        var IndexController = require('controllers/index');
                        return IndexController.CurrentContact;
                    },

                    contentBinding: {
                        target: IndexController,
                        property: 'CurrentContact'
                    }

                })
            ]
        }
    });

//    exports.ContactdetailView = ContactdetailView;

    return ContactdetailView;
});