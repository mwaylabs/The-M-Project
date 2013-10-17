/*global Addressbook, $*/

window.Addressbook = {
    Models: {},
    Collections: {},
    Views: {},
    Controllers: {},
    Routers: {},
    init: function () {
        'use strict';

        new Addressbook.Routers.MainRouter();
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    Addressbook.init();
});
