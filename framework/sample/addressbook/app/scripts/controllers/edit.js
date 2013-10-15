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

            var settings = TMP.LabelView.design({
                model: TMP.View.design({
                    contentBinding: {
                        target: Addressbook.IndexController,
                        property: 'CurrentContact'
                    },
                    template: _.tmpl('<div><div contenteditable="true"><%= lastname %></div><div contenteditable="true"><%= firstname%></div></div>')
                }),
                editBtn: TMP.ButtonView.design({
                    value: 'back',
                    events: {
                        click: function() {
                            Addressbook.navigate({
                                route: '/'
                            });
                        }
                    }
                })
            });

            Addressbook.layout = TMP.Layout.design({
                template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div><div class="footer" data-childviews="footer"></div>'
            }, {
                all: TMP.View.design({
                    footer: settings
                })
            }).create();


            Addressbook.layout.render();


        }
    });


    exports.DetailController = function(){
        return DetailController;
    }

    return DetailController;
});