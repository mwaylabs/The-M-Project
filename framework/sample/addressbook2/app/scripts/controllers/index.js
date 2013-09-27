/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', 'data/contacts', 'data/contacts', 'exports', 'require'
], function( _, Backbone, M, AppLayout, ContactCollection, exports, require ) {
    //    'use strict';
    var IndexController = M.Controller.create({

        CurrentContact: null,

        applicationStart: function( params ) {
            console.timeEnd('asdf');

            IndexController.init(params);

            Addressbook.layoutManager.setLayout(new AppLayout());

            Addressbook.layoutManager.applyViews({
                left: "views/ContactAll",
                right: "views/ContactDetail"
            }, function() {
                Addressbook.layoutManager.initialRenderProcess();
            });

        },

        init: function( params ) {
            if( IndexController.CurrentContact ) {
                return;
            }
            if( !params.id ) {

                Addressbook.ContactCollection = ContactCollection.create();
                Addressbook.ContactCollection.fetch({
                    success: function() {
                        IndexController.set('CurrentContact', Addressbook.ContactCollection.models[0]);
                    }
                });

            }
        },

        show: function() {

            Addressbook.layoutManager.applyViews({
                left: "views/ContactAll",
                right: "views/ContactDetail"
            }, function() {

            });
        },

        editContact: function() {
            Addressbook.layoutManager.navigate({
                route: 'edit'
            });
        }
    });


    exports.IndexController = IndexController;

    return IndexController;
});