define([
    "themproject",
    "text!templates/add.html",
    "data/contacts"
],
    function( M, template, app ) {

        var View = M.View.extend({
            first: true,

            template: _.template(template),

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

                var attrs = {
                    firstname: this.$('.firstname').val(),
                    lastname: this.$('.lastname').val()
                };

                this.collection.create(attrs, {
                    success: function() {
                        that.back();
                    },
                    error: function(error) {
                        alert(error)
                    }
                });
            },

            afterRender: function() {
                return this;
            }
        });

        return View;
    });