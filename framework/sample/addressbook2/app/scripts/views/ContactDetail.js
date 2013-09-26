/*global define*/

define(['themproject', 'templates', 'controllers/index'], function( M, JST, IndexController ) {
    //    'use strict';
    var ContactdetailView = M.View.extend({
        template: JST['app/scripts/templates/ContactDetail.ejs'],


        childViews: {

            '[data-child-view="content"]': [ M.View.extend({
                template: JST['app/scripts/templates/PersonDetail.ejs'],

//                bindings: {
//                    '[data-binding="firstname"]': {
//                        observe: 'firstname'
//                    },
//                    '[data-binding="lastname"]': {
//                        observe: 'lastname'
//                    }
//                },

                value: function() {
                    var IndexController = require('controllers/index');
                    return IndexController.CurrentContact;
                },

                contentBinding: {
                    target: IndexController,
                    property: 'CurrentContact'
                }
            })
            ],
            '[data-child-view="footer"]': M.Button.extend({
                value:'edit',
                events: {
                    click: {
                        target: IndexController,
                        action: 'editContact'
                    }
                }
            })
        }
    });

    //    exports.ContactdetailView = ContactdetailView;

    return ContactdetailView;
});