/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'data/contacts'
], function( _, Backbone, M, contacts, ContactAll ) {
    //    'use strict';


    Addressbook.ContactCollection = contacts.create();
    Addressbook.ContactCollection.on('sort', function( a ) {

    });

    var header = TMP.ToolbarView.design({

        headline: TMP.View.design({
            value: 'Addressbook',
            template: '<div><%= value %></div>'
        })
    });

    var footer = TMP.View.design({
        buttonGroup: [
            TMP.ButtonView.design({
                value: 'use bootstrap template',
                //IF THIS PROPERTY IS SET AND THERE IS AN UPDATE TEMPLATE CALL, ALL EVENTS ARE DELETED
                //                        tagName: 'span',
                events: {
                    click: function() {
                        TMP.TemplateManager._currentUI = 'bootstrap';
                        Addressbook.layout.updateTemplate();
                    }
                }
            }), TMP.ButtonView.design({
                value: 'use topcoat template',
                events: {
                    click: function() {
                        TMP.TemplateManager._currentUI = 'topcoat';
                        Addressbook.layout.updateTemplate();
                    }
                }
            }), TMP.ButtonView.design({
                value: 'use jqm template',
                events: {
                    click: function() {
                        TMP.TemplateManager._currentUI = 'jqm';
                        Addressbook.layout.updateTemplate();
                    }
                }
            })
        ],
        right: [
            TMP.ButtonView.design({
                value: 'use default template',
                events: {
                    click: function() {
                        console.log('click button');
                        TMP.TemplateManager._currentUI = "defaultTemplate";
                        Addressbook.layout.updateTemplate();
                    }
                }
            })
        ]
    });

    var KitchenSink = M.Controller.create({

        CurrentContact: null,

        content: null,

        applicationStart: function( params ) {

            var that = this;
            require(['views/ContactAll'], function( ContactAll ) {

                that.content = ContactAll;

                var settings = TMP.LabelView.design({
                    model: TMP.View.design({
                        contentBinding: {
                            target: Addressbook.IndexController,
                            property: 'CurrentContact'
                        },
                        template: _.tmpl('<div><div contenteditable="true"><%= lastname %></div><div contenteditable="true"><%= firstname%></div></div>')
                    }),
                    editBtn: TMP.ButtonView.design({
                        value: 'edit',
                        events: {
                            click: function() {
                                Addressbook.navigate({
                                    route: 'edit'
                                });
                            }
                        }
                    })
                });

                Addressbook.layout = TMP.Layout.design({
                    template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div><div class="footer" data-childviews="footer"></div>'
                }, {
                    all: TMP.View.design({
                        header: footer, content: that.content, footer: settings
                    })
                }).create();

                window.content = that.content;
                Addressbook.layout.render();

                Addressbook.ContactCollection.fetch({
                    success: function( collection ) {
                        Addressbook.set('ContactCollection', collection);
                    }
                });

                console.timeEnd('Systemstart');

            });

        },

        show: function() {

            var settings = TMP.LabelView.design({
                model: TMP.View.design({
                    contentBinding: {
                        target: Addressbook.IndexController,
                        property: 'CurrentContact'
                    },
                    template: _.tmpl('<div><div contenteditable="true"><%= lastname %></div><div contenteditable="true"><%= firstname%></div></div>')
                })
            });

            Addressbook.layout = TMP.Layout.design({
                template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div><div class="footer" data-childviews="footer"></div>'
            }, {
                all: TMP.View.design({
                    header: header, content: this.content, footer: settings
                })
            }).create();


            Addressbook.layout.render();

        }
    });

    return KitchenSink;
});