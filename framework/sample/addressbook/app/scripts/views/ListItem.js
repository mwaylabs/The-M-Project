/*global Addressbook, Backbone, JST*/

Addressbook.Views = Addressbook.Views || {};

(function() {
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

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        clickHandler: function() {
            //this.stickit();
            Addressbook.detailView.model = this.model;
            //Addressbook.detailView.render();
            Addressbook.testModel.set('lastname', this.model.get('lastname'))
            Addressbook.testModel.set('firstname', this.model.get('firstname'))
            Addressbook.testModel.set('value', this.model.get('firstname') + ' - ' + this.model.get('lastname'))
        }
    });

})();
