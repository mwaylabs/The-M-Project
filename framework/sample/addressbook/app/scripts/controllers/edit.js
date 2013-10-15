/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', 'controllers/index', 'data/contacts', 'exports', 'views/ContactAll'
], function( _, Backbone, M, AppLayout, IndexController, ContactModel, exports, all ) {
    //    'use strict';

    console.log('EDIT_CONTROLLER');

    var DetailController = M.Controller.create({

        content: null,

        applicationStart: function( params ) {

            Addressbook.navigate({
                route: '/'
            });
        },

        show: function(params){

            var that = this;

//            require(['views/ContactEdit'], function( ContactEdit ) {
//
//                that.content = ContactEdit;
//
//                Addressbook.layout = TMP.Layout.design({
//                    template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div><div class="footer" data-childviews="footer"></div>'
//                }, {
//                    all: TMP.View.design({
//                        content: that.content
//                    })
//                }).create();
//
//                Addressbook.layout.render();
//
//            });

            var edit = TMP.View.design2({
                value: Addressbook.IndexController.CurrentContact,
                template: '<div><h1 contenteditable="true"><%= lastname %></h1><h1 contenteditable="true"><%= firstname %></h1></div>'
            });



            Addressbook.layout.childViews.all.setView({
                content: edit
            })

            Addressbook.layout.render();

        }
    });


    exports.DetailController = function(){
        return DetailController;
    }

    return DetailController;
});