/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', 'views/ContactAll', 'views/ContactDetail', 'data/contact_model', 'data/contact_collection', 'exports'
], function( _, Backbone, M, AppLayout, ContactAll, ContactDetail, ContactModel, ContactCollection, exports ) {
    //    'use strict';

    var IndexController = M.Controller.create({

        CurrentContact: null,

        applicationStart: function( params ) {

            if( !params.id ) {
                Addressbook.Contact = ContactModel.extend();

                var contacts = [
                    {lastname: 'Marco', firstname: 'Hanowski'},
                    {lastname: 'stierle', firstname: 'Frank'}
                ];

                Addressbook.ContactCollection = ContactCollection.create(contacts);

                IndexController.setModel('CurrentContact', Addressbook.ContactCollection.model.create(Addressbook.ContactCollection.models[0].attributes));
            }


            //            Addressbook.CurrentContact = new Addressbook.Contact({firstname: "Max", lastname: "Mustermann", _id: 1});

            Addressbook.layoutManager.setLayout(new AppLayout());

            Addressbook.layoutManager.applyViews({
                left: ContactAll,
                right: ContactDetail
            });
        },

        show: function( params ) {

        }
    });


    exports.IndexController = function(){
        return IndexController;
    }

    return IndexController;
});