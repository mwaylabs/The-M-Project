/*global Addressbook, Backbone, JST*/

Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict';

    Addressbook.Views.EditView = Backbone.View.extend({

        template: JST['app/scripts/templates/Edit.ejs'],

        bindings: {
            '.firstname': 'firstname',
            '.lastname': 'lastname'
        },

        events: {
            'click .btn-danger': 'removeHandler',
            'click .btn-success': 'addHandler'
        },

        removeHandler: function() {
            if(this.model) {
                this.model.destroy({
                    success: function() {
                        Addressbook.detailView.model = null;
                        Addressbook.detailView.render();
                        Addressbook.listView.render();
                    }
                });
            }
        },

        addHandler: function() {
            var model = new Addressbook.Models.ContactsModel({
                firstname: this.$('.firstname').val(),
                lastname: this.$('.lastname').val()
            });
            Addressbook.detailView.model = null;
            Addressbook.detailView.render();
            Addressbook.contactCollection.unshift(model);
            Addressbook.listView.render();
        },

        render: function () {
            var data = null;
            if(this.model) {
                data = this.model.attributes;
            }
            this.$el.html(this.template(data));
            if(data) {
                this.stickit();
            }
            return this;
        }
    });

})();
