/*global Addressbook, Backbone*/

Addressbook.Collections = Addressbook.Collections || {};

(function () {
    'use strict';

    Addressbook.Collections.ContactsCollection = Backbone.Collection.extend({
        model: Addressbook.Models.ContactsModel
        //url: 'http://nerds.mway.io:8200/bikini/employees'
    });


})();
