/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', 'data/contacts', 'exports', 'require', 'views/ContactAll'
], function( _, Backbone, M, AppLayout, ContactCollection, exports, require, all ) {
    //    'use strict';
    var IndexController = M.Controller.create({

        CurrentContact: null,

        AllContacts: null,

        applicationStart: function( params ) {
            console.timeEnd('Systemstart');

            this.init(params);

            Addressbook.layoutManager.setLayout(new AppLayout());
            Addressbook.layoutManager.applyViews({
                left: IndexController.AllContacts,
                right: "views/ContactDetail"
            }, function() {
                Addressbook.layoutManager.initialRenderProcess();
                console.timeEnd('Rendering');
            });

        },

        show: function() {
            Addressbook.layoutManager.applyViews({
                left: IndexController.AllContacts,
                right: "views/ContactDetail"
            }, function() {

            });
        },

        init: function( params ) {
            if( IndexController.CurrentContact ) {
                return;
            }

            if( !params || !params.id ) {
                Addressbook.ContactCollection = ContactCollection.create();
                Addressbook.ContactCollection.fetch({
                    success: function(model, collection) {
                        IndexController.set('CurrentContact', Addressbook.ContactCollection.models[0]);
                    }
                });

            }

            this.AllContacts = this.AllContacts || all.create();
        },

        editContact: function() {
            Addressbook.layoutManager.navigate({
                route: 'edit'
            });
        },

        saveContact: function(){
            IndexController.CurrentContact.save();
            history.back();
        },

        sortContacts: function(){
            var sorted = _.sortBy(Addressbook.ContactCollection.models, function(m){
                return m.get('firstname');
            });
            Addressbook.ContactCollection.models = sorted;
            Addressbook.ContactCollection.trigger('sort');
        }

    });


    exports.IndexController = IndexController;

    return IndexController;
});