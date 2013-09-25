/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', /*'views/ContactAll',*/ /*'views/ContactDetail',*/ 'data/contact_model', 'data/contact_collection', 'exports', 'require'
], function( _, Backbone, M, AppLayout, /*ContactAll,*/ /*ContactDetail,*/ ContactModel, ContactCollection, exports, require ) {
    //    'use strict';
    var IndexController = M.Controller.create({

        CurrentContact: null,

        applicationStart: function( params ) {
            console.timeEnd('asdf');

            if( !params.id ) {
                Addressbook.Contact = ContactModel.extend();

                var contacts = [
                    {lastname: 'Marco', firstname: 'Hanowski'},
                    {lastname: 'stierle', firstname: 'Frank'}
                ];

                Addressbook.ContactCollection = ContactCollection.create(contacts);

                IndexController.set('CurrentContact', Addressbook.ContactCollection.models[0]);
            }

            Addressbook.layoutManager.setLayout(new AppLayout());

            Addressbook.layoutManager.applyViews({
                left: "views/ContactAll",
                right: "views/ContactDetail"
            }, function(){
                Addressbook.layoutManager.initialRenderProcess();
            });

        },

        show: function(){
            debugger;
        }
    });


    exports.IndexController = IndexController;

    return IndexController;
});