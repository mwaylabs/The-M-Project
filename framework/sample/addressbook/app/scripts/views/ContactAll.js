/*global define*/

define([
    'themproject', 'templates', 'exports', 'data/contacts'
], function( M, ST, exports, contacts ) {
    'use strict';

    var content = TMP.View.design({
        searchBar: TMP.SearchfieldView.design({
            value: M.Model.create({
                value: ''
            }),
            placeholder: "TMP.I18N.get('HALLO STEFAN!!!!!')",
            events: {
                keyup: function() {
                    var that = this;
                    Addressbook.ContactCollection.applyFilter(function( model ) {
                        if( model.get('firstname').toLowerCase().indexOf(that.model.attributes.value.toLowerCase()) === 0 ) {
                            return model.get('firstname')
                        }
                    });
                }
            }
        }),
        contactList: TMP.ListView.design({
            contentBinding:{
                target: Addressbook,
                property: 'ContactCollection'
            },
            itemView: TMP.ListItemView.extend({
                templateExtend: '<div><div><%= lastname %></div><div><%= firstname%></div></div>',
                events: {
                    click: function() {
                        Addressbook.IndexController.set('CurrentContact', this.model);
                    }
                }
            }),


            listItemDivider: TMP.View.design({

            })
        })
    });

    return content;
});