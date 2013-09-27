/*global define*/

define([
    'themproject',
    'templates',
    'exports'
], function (M, ST, exports) {
    'use strict';

    var exp = exports;


    var AllView = M.ListView.extend({

        value: function(){
            return Addressbook.ContactCollection;
        },

        listItemView: M.View.extend({

            template: _.tmpl('<div><div><%= firstname %></div><div><%= lastname %></div></div>'),

            events: {
                click: function() {
                    var IndexController = require('controllers/index');
                    IndexController.set('CurrentContact', this.model);
                }
            }
        })
    });

    return AllView;
});