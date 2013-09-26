/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', /*'views/ContactAll',*/ /*'views/ContactDetail',*/ 'data/contact_model', 'data/contact_collection', 'exports', 'require'
], function( _, Backbone, M, AppLayout, /*ContactAll,*/ /*ContactDetail,*/ ContactModel, ContactCollection, exports, require ) {
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
                Addressbook.Contact = ContactModel.extend();

                var contacts = [
                    {lastname: 'Marco', firstname: 'Hanowski', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e'},
                    {lastname: 'Frank', firstname: 'Stierle', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e'}
                ];

                Addressbook.ContactCollection = ContactCollection.create(contacts);

                IndexController.set('CurrentContact', Addressbook.ContactCollection.models[0]);
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