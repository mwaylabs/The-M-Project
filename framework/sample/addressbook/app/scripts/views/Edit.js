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
