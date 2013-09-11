define([
    "themproject",
    "text!templates/add.html",
    "data/contact_model",
    "app"

],
    function( M, template, ContactModel, app ) {

        var View = M.View.extend({
            first: true,

            template: _.tpl(template),

            events: {
                "click .back": "back",
                "click .save": "saveEntry"
            },

            bindings: {
                '[data-binding="input-firstname"]': {
                    observe: 'firstname'
                },
                '[data-binding="input-lastname"]': {
                    observe: 'lastname'
                }
            },

            back: function() {
                app.layoutManager.navigate({
                    route: '/'
                });
            },

            initialize: function() {
                M.View.prototype.initialize.apply(this, arguments);
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
            },

            afterRender: function() {
                return this;
            }
        });

        return View;
    });