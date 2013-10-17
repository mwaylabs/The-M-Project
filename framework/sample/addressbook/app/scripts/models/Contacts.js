/*global Addressbook, Backbone*/

Addressbook.Models = Addressbook.Models || {};

(function () {
    'use strict';

    Addressbook.Models.ContactsModel = Backbone.Model.extend({
         idAttribute: '_id'
    });

})();
