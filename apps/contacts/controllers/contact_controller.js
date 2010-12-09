// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      25.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Contacts.ContactController = M.Controller.extend({

    contacts: null,

    currentContact: null,

    currentContactName: '',

    init: function(isFirstLoad) {
        console.log('init in ContactController...');
        Contacts.Contact.find({
            columns: ['firstName', 'lastName', 'zip'],
            /*constraint: {
                statement: ' WHERE zip = ? ',
                parameters: ['70182'] // length must match number of ? in statements
            },*/

            order: 'lastName ASC',
            //limit: 3,

            onSuccess: {
                target: this,
                action: 'setContacts'
            },

            onError: function() { M.Logger.log('Nothing found.', M.INFO); }
        });    
    },


    /* this is a callback for find, callbacks for success in find always have one parameter: the result set */
    setContacts: function(result) {
        if(result){
            this.set('contacts', result); // alternatively: this.set('contacts', Contacts.Contact.records);
        }
    },

    addContact: function() {
        var c = Contacts.Contact.createRecord({
            firstName: M.ViewManager.getView('page2', 'firstNameField').value,
            lastName: M.ViewManager.getView('page2', 'lastNameField').value,
            zip: M.ViewManager.getView('page2', 'zipField').value
        });
        c.save({
            onSuccess:{
                target: this,
                action: 'refreshList'
            }
        });
    },

    refreshList: function() {
        console.log('refreshList called...');
        this.set('contacts', Contacts.Contact.records);
        this.switchToPage(M.ViewManager.getPage('page'), null, YES);
    },

    newContact: function() {
        this.switchToPage(M.ViewManager.getPage('page2'), null, YES);
    },

    /* show details of a contact */ 
    showDetails: function(viewId, modelId) {
        console.log('show details called...');

        //Contacts.Contact.recordManager.dumpRecords();

        /*this.currentContact = _.detect(this.contacts, function(model) {
            console.log(model.id + ' === ' + modelId);
            return model.id === modelId;
        });*/

        this.currentContact = Contacts.Contact.recordManager.getRecordForId(modelId);

        this.set('currentContactName', this.currentContact.get('firstName') + ' ' + this.currentContact.get('lastName'));

        var firstNameField = M.ViewManager.getView('detailPage', 'firstNameField');
        firstNameField.setValue(this.currentContact.get('firstName'));

        var lastNameField = M.ViewManager.getView('detailPage', 'lastNameField');
        lastNameField.setValue(this.currentContact.get('lastName'));

        var zipField = M.ViewManager.getView('detailPage', 'zipField');
        zipField.setValue(this.currentContact.get('zip'));

        this.switchToPage(M.ViewManager.getPage('page2'));
    },

    updateContact: function() {
        var firstName = M.ViewManager.getView('detailPage', 'firstNameField').value;
        var lastName = M.ViewManager.getView('detailPage', 'lastNameField').value;
        var zip = M.ViewManager.getView('detailPage', 'zipField').value;


        if(firstName) {
            this.currentContact.set('firstName', firstName);
        }
        if(lastName) {
            this.currentContact.set('lastName', lastName);
        }
        if(zip) {
            this.currentContact.set('zip', zip);
        }

        this.currentContact.save({
            onSuccess: {
                target: this,
                action: 'refreshList'
            }
        });
    },

    deleteContact: function(viewId, modelId){

        M.DialogView.confirm({
            title: 'Delete?',
            message: 'Do you really want to delete this contact?',
            onOk: {
                target: this,
                action: 'doDelete'
            },

            onCancel: {
                target:this,
                action: 'doNotDelete'
            }
        });
    },

    doDelete: function() {
        this.currentContact.del({
            onSuccess:{
                target: this,
                action: 'refreshList'
            }
        }); // delete in storage
        this.currentContact = null;
    },

    doNotDelete: function() {
        console.log('no delete...');
    }

});