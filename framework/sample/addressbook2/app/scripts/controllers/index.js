/*global define*/

define([
    'underscore',
    'backbone',
    'themproject',
    'layouts/app-layout',
    'views/ContactAll',
    'views/ContactDetail'
], function (_, Backbone, M, AppLayout, Left, Right) {
    'use strict';

    var IndexController = M.Controller.create({

        applicationStart: function( params ) {

            Addressbook.layoutManager.setLayout(new AppLayout());

            Addressbook.layoutManager.applyViews({
                left: Left,
                right: Right
            });
        },

        show: function( params ) {

        }
    });

    return IndexController;
});