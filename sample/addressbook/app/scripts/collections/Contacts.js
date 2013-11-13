/*global Addressbook, Backbone*/

Addressbook.Collections = Addressbook.Collections || {};

(function () {
    'use strict';

    Addressbook.Collections.ContactsCollection = M.Collection.extend({
        model: Addressbook.Models.ContactsModel,
        store: new M.BikiniStore(),
        url: 'http://nerds.mway.io:8200/bikini/employees'
    });


})();
