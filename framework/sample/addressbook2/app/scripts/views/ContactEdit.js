/*global define*/

define(['themproject', 'templates', 'controllers/index'], function( M, JST, IndexController ) {
    //    'use strict';

    var ContactEditView = M.View.extend({
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
            }), M.View.extend({

                template: JST['app/scripts/templates/PersonDetailAndroid.ejs'],

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
                value:'back',
                events: {
                    click: {
                        action: function(){
                            history.back();
                        }
                    }
                }
            })
        }
    });

    //    exports.ContactdetailView = ContactdetailView;

    return ContactEditView;
});


a = function( obj ) {
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    debugger;
    with( obj || {} ) {
        __p+='<div>'+
            ((__t=( firstname ))==null?'':__t)+
            '</div>';
    }
    return __p;
}














































