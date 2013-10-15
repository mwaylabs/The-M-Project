/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'data/contacts', 'views/ContactAll'
], function( _, Backbone, M, contacts, ContactAll ) {
    //    'use strict';

    window.ContactCollection = contacts.create();
    window.ContactCollection.on('sort', function( a ) {

    });
    window.ContactCollection.fetch({
        success: function( collection ) {
            console.log('success');
        }
    });

//    var header = TMP.ToolbarView.design({
//
//        headline: TMP.View.design({
//            value: 'Addressbook',
//            template: '<div><%= value %></div>'
//        })
//    });
//
//    var settings = TMP.LabelView.design({
//        contentBinding: {
//            target: KitchenSink,
//            property: 'CurrentContact'
//        },
//        template: _.tmpl('<div><div contenteditable="true"><%= lastname %></div><div contenteditable="true"><%= firstname%></div></div>')
//    });

//    var content = TMP.View.design2({
//        searchBar: TMP.SearchfieldView.design2({
//            value: M.Model.create({
//                value: ''
//            }),
//            placeholder: "TMP.I18N.get('HALLO STEFAN!!!!!')",
//            events: {
//                keyup: function() {
//                    var that = this;
//                    ContactCollection.applyFilter(function( model ) {
//                        if( model.get('firstname').toLowerCase().indexOf(that.model.attributes.value.toLowerCase()) === 0 ) {
//                            return model.get('firstname')
//                        }
//                    });
//                }
//            }
//        }),
//        contactList: TMP.ListView.design2({
//            value: 'a',
//
//            itemView: TMP.ListItemView.extend({
//                templateExtend: '<div><div><%= lastname %></div><div><%= firstname%></div></div>',
//                events: {
//                    click: function() {
//                        KitchenSink.set('CurrentContact', this.model);
//                        console.log('clicked model cid', this.model.cid);
//                        console.log('clicked model cid', this.model.attributes.firstname);
//                    }
//                }
//            }),
//
//
//            listItemDivider: TMP.View.design2({
//
//            })
//        })
//    });

    var content = ContactAll.create();
//
    content.childViews.contactList.model = window.ContactCollection;
    content.childViews.contactList._applyListener();



//    var footer = TMP.View.design({
//        buttonGroup: [
//            TMP.ButtonView.design({
//                value: 'use bootstrap template',
//                //IF THIS PROPERTY IS SET AND THERE IS AN UPDATE TEMPLATE CALL, ALL EVENTS ARE DELETED
//                //                        tagName: 'span',
//                events: {
//                    click: function() {
//                        TMP.TemplateManager._currentUI = 'bootstrap';
//                        kitchensinkLayout.updateTemplate().render();
//                    }
//                }
//            }), TMP.ButtonView.design({
//                value: 'use topcoat template',
//                events: {
//                    click: function() {
//                        TMP.TemplateManager._currentUI = 'topcoat';
//                        kitchensinkLayout.updateTemplate().render();
//                    }
//                }
//            }), TMP.ButtonView.design({
//                value: 'use jqm template',
//                events: {
//                    click: function() {
//                        TMP.TemplateManager._currentUI = 'jqm';
//                        kitchensinkLayout.updateTemplate().render();
//                    }
//                }
//            })
//        ],
//        right: [
//            TMP.ButtonView.design({
//                value: 'use default template',
//                events: {
//                    click: function() {
//                        console.log('click button');
//                        TMP.TemplateManager._currentUI = "defaultTemplate";
//                        kitchensinkLayout.updateTemplate().render();
//                    }
//                }
//            })
//        ]
//    });

    var kitchensinkLayout = TMP.Layout.design({
        template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div><div class="footer" data-childviews="footer"></div>'
    }, {
        all: TMP.View.design({
            content: content
        })
    }).create();


    var KitchenSink = M.Controller.create({

        CurrentContact: null,

        applicationStart: function( params ) {
            kitchensinkLayout.render();
            console.timeEnd('Systemstart');
        },

        show: function() {

        }
    });

    return KitchenSink;
});