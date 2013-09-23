/*global define*/

define([
    'themproject', 'templates'
], function( M, JST ) {
    //    'use strict';

    var ContactdetailView = M.View.extend({
        template: JST['app/scripts/templates/ContactDetail.ejs'],

        childViews: {

            '[data-child-view="content"]': [ M.View.extend({
                template: _.template('<div><div data-binding="firstname" contenteditable="true"><%= firstname %></div><div data-binding="lastname" contenteditable="true"><%= lastname %></div></div>'),
                __name__: '[data-child-view="content"]',
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
                }
            }),
                M.View.extend({
                    template: _.template('<div><div data-binding="firstname" contenteditable="true"><%= firstname %></div><div data-binding="lastname" contenteditable="true"><%= lastname %></div></div>'),
                    __name__: '[data-child-view="content"]',
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
                    }

                })]
//            ,
//
//            '[data-child-view="footer"]': M.Toolbar.extend({
//                //                value: 'test',
//                template: {
//                    topcoat: '<h1 data-child-view="left"></h1>'
//                },
//                childViews: {
//                    '[data-child-view="left"]': [
//                        M.Button.extend({
//                            value: 'Edit 1',
//                            events: {
//                                click: function() {
//
//                                    var newModel = Addressbook.Contact.create({firstname: "Max" + N++, lastname: "Mustermann" + N++});
//                                    console.log(newModel.firstname);
//
//
//                                    Addressbook.CurrentContact = newModel;
//                                    //                                        _.each(Addressbook.layoutManager.children['.right'].children['[data-child-view="content"]'], function(view){
//                                    //                                            view.setValue(newModel);
//                                    //                                            console.log(view.model.cid);
//                                    //                                        })
//                                }
//                            }
//                        }), M.Button.extend({
//                            value: 'Share 1',
//                            events: {
//                                click: function() {
//                                    var newModel = Addressbook.Contact.create({firstname: "Max1", lastname: "Mustermann1"}).toJSON();
//                                    _.each(Addressbook.layoutManager.children['.right'].children['[data-child-view="content"]'], function( view ) {
//                                        view.setValue(newModel);
//                                        console.log(view.model.cid);
//                                    });
//
//                                }
//                            }
//                        })
//                    ]
//                    //                    ,
//                    //                    '[data-child-view="right"]': [
//                    //                        M.Button.extend({
//                    //                            value: 'Edit 2'
//                    //                        }), M.Button.extend({
//                    //                            value: 'Share 3'
//                    //                        })
//                    //                    ]
//                }
//
//            })
        }
    });

//    exports.ContactdetailView = function(){
//        return ContactdetailView;
//    }

    return ContactdetailView;
});