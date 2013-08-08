define([
    "themproject",
    "text!templates/add.html",
    "data/contact_model"

],
    function( M, tpl, ContactModel ) {

        var View = M.View.extend({
            first: true,

            template: _.template(tpl),

            events: {
                "click .back": "back",
                "click .save": "saveEntry"
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