define([
    "text!templates/add.html",
    "app/data/contact_model"

],
    function( tpl, ContactModel ) {

        var View = Backbone.View.extend({
            first: true,

            template: _.tpl(tpl),

            events: {
                "tap .back": "back",
                "tap .save": "saveEntry"
            },

            back: function() {
                this.$el.remove();
                Backbone.history.navigate("/", true);
            },

            saveEntry: function() {
                var that = this;

                var model = ContactModel.create({
                    firstname: this.$('.firstname').val(),
                    lastname: this.$('.lastname').val()
                })

                if( !model.isValid() ) {
                    alert(model.validationError)
                } else {
                    this.collection.create(model, {
                        success: function() {
                            that.back();
                        }
                    })
                }
            }
        });

        return View;
    });