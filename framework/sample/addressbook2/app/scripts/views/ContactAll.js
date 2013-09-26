/*global define*/

define([
    'themproject',
    'templates',
    'exports'
], function (M, ST, exports) {
    'use strict';

    var exp = exports;

    var ListItemView = M.View.extend({

        template: _.template('<div><div data-binding="firstname"><%= firstname %></div><div data-binding="lastname"><%= lastname %></div></div>'),

//        bindings: {
//            '[data-binding="firstname"]': {
//                observe: 'firstname'
//            },
//            '[data-binding="lastname"]': {
//                observe: 'lastname'
//            }
//        },

        events: {
           click: function() {
               var IndexController = require('controllers/index');
               IndexController.set('CurrentContact', this.model);
            }
        }
    });

    var AllView = M.ListView.extend({

        value: function(){
            return Addressbook.ContactCollection
        },
        listItemView: ListItemView
    });

    return AllView;
});