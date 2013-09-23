/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'themproject',
    'templates'
], function ($, _, Backbone, JM, ST) {
    'use strict';

    var ListItemView = M.View.extend({
        template: _.template('<div><div data-binding="firstname"><%= firstname %></div><div data-binding="lastname"><%= lastname %></div></div>'),
        bindings: {
            '[data-binding="firstname"]': {
                observe: 'firstname'
            },
            '[data-binding="lastname"]': {
                observe: 'lastname'
            }
        },
        __name__: 'ListItemView',
        events: {
           click: function(a,b) {
               var IndexController = require('controllers/index');
               IndexController.setModel('CurrentContact', this.model);
//               console.log(Addressbook.layoutManager.children['.right'].children['[data-child-view="content"]'].model.cid);
//               Addressbook.layoutManager.children['.right'].render();
            }
        }
    });

    var AllView = M.ListView.extend({
        __name__: 'AllView',
        value: function(){
            return Addressbook.ContactCollection
        },
        listItemView: ListItemView
    });

    return AllView;
});