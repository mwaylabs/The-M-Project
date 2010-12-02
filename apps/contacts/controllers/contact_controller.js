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

    contactManager: M.ModelManager.extend({
        model: Contacts.Contact
    }),

    contacts: null,

    currentContact: null,

    init: function(isFirstLoad) {        
        if(isFirstLoad) {
            Contacts.Contact.find({
            columns: ['firstName', 'lastName', 'zip'],
            /*constraint: {
                statement: ' WHERE zip = ? ',
                parameters: ['70182'] // length must match number of ? in statements
            },*/

            onSuccess: {
                target: this,
                action: 'setContacts'
            },
            onError: function() { M.Logger.log('Nothing found.', M.INFO); }
            });    
        }
    },


    /* this is a callback for find, callbacks for success in find always have one parameter: the result set */
    setContacts: function(result) {
        if(result){
            console.log(result);
            this.contactManager.addMany(result);
            this.set('contacts', this.contactManager.modelList);
        }
    },

    addContact: function() {
        var c = Contacts.Contact.createRecord({
            firstName: M.ViewManager.getView('page2', 'firstNameField').value,
            lastName: M.ViewManager.getView('page2', 'lastNameField').value,
            /*company: M.ViewManager.getView('page2', 'companyField').value,
            street: M.ViewManager.getView('page2', 'streetField').value,*/
            zip: M.ViewManager.getView('page2', 'zipField').value   
            /*city: M.ViewManager.getView('page2', 'cityField').value,
            mobile: M.ViewManager.getView('page2', 'mobileField').value,
            email: M.ViewManager.getView('page2', 'emailField').value,
            homepage: M.ViewManager.getView('page2', 'homepageField').value,
            birthday: M.ViewManager.getView('page2', 'birthdayField').value,
            notes: M.ViewManager.getView('page2', 'notesField').value*/
        });
        console.log(c);
        c.save();
        this.contactManager.add(c);
        this.set('contacts', this.contactManager.modelList);
        this.switchToPage(M.ViewManager.getPage('page'));
    },

    newContact: function() {
        this.switchToPage(M.ViewManager.getPage('page2'));
    },


    /* show details of a contact */ 
    showDetails: function(viewId, modelId) {
        //console.log('viewId: ' + viewId + ' modelId: ' + modelId);
        var myModel = _.detect(this.contacts, function(model) {
            return model.id === modelId;
        })
        //console.log(myModel);
        this.currentContact = myModel;

        var firstNameField = M.ViewManager.getView('detailPage', 'firstNameField');
        firstNameField.setValue(this.currentContact.get('firstName'));

        var lastNameField = M.ViewManager.getView('detailPage', 'lastNameField');
        lastNameField.setValue(this.currentContact.get('lastName'));

        var zipField = M.ViewManager.getView('detailPage', 'zipField');
        zipField.setValue(this.currentContact.get('zip'));

        this.switchToPage(M.ViewManager.getPage('detailPage'));
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
        this.currentContact.del(); // delete in storage
        this.contactManager.remove(this.currentContact.id);
        this.set('contacts', this.contactManager.modelList);
        this.currentContact = null;
        this.switchToPage(M.ViewManager.getPage('page'));
    },

    doNotDelete: function() {
        console.log('no delete...');
    }

});