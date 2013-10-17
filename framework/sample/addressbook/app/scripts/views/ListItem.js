/*global Addressbook, Backbone, JST*/

Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict';

    Addressbook.Views.ListItemView = Backbone.View.extend({

        tagName: 'li',
        className: 'list-group-item',

        template: JST['app/scripts/templates/ListItem.ejs'],

        events: {
            'click': 'clickHandler'
        },

        bindings: {
            '.firstname': 'firstname',
            '.lastname': 'lastname'
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            this.stickit();
            return this;
        },

        clickHandler: function () {
            Addressbook.detailView.model = this.model;
            Addressbook.detailView.render();
        }
    });

})();
