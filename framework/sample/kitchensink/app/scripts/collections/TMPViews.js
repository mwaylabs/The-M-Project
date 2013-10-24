/*global Addressbook, Backbone*/

Addressbook.Collections = Addressbook.Collections || {};

(function () {
    'use strict';

    Addressbook.Collections.TMPViewCollection = M.Collection.extend({
        model: Addressbook.Models.TMPView
    });


})();
