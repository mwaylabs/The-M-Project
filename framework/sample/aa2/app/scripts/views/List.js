/*global Addressbook, Backbone, JST*/

Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict';

    Addressbook.Views.ListView = Backbone.View.extend({

        template: JST['app/scripts/templates/List.ejs'],

        render: function () {

            this.$el.html(this.template());

            if(this.model) {
                this.model.each(function(model, index) {
                    var item = new Addressbook.Views.ListItemView({model:model});
                    this.$('ul').append(item.render().el);
                }, this);
            }

            return this;
        }
    });

})();
