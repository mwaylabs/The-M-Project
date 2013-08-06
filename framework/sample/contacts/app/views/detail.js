define([
    "text!templates/detail.html"
],
    function( tpl ) {

        var View = Backbone.View.extend({
            first: true,

            template: _.tpl(tpl),

            events: {
                "tap .back": "back",
                "tap .delete": "deleteEntry",
                "tap .edit": "editEntry"
            },

            bindings: {
                '[data-binding="input-firstname"]': {
                    observe: 'firstname'
                },
                '[data-binding="input-lastname"]': {
                    observe: 'lastname'
                }
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.change);
            },

            // provide data to the template
            serialize: function() {
                return this.model.attributes
            },

            back: function() {
                this.$el.remove();
                Backbone.history.navigate("/", true);
            },

            deleteEntry: function() {
                var that = this;
                this.unstickit();
                this.model.destroy({
                    success: function() {
                        that.back();
                    }
                });
            },

            editEntry: function() {
                this.model.save();
                this.back();
            },

            afterRender: function() {
                this.stickit();
                return this;
            }
        })

        return View;
    });