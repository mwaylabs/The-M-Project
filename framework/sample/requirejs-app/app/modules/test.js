define([
    // Application.
    "app"
],

    function( app ) {

        var Contact = app.module();

        Contact.Model = Backbone.Model.extend({});

        Contact.Collection = Backbone.Collection.extend({
            model: Contact.Model,
            url: "http://stefanbuck.com/contact.json"
        });

        Contact.Views.Item = Backbone.View.extend({

            template: "item",
            tagName: 'li',

            serialize: function() {
                return { model: this.model };
            }
        });

        Contact.Views.List = Backbone.View.extend({
            template: "list",

            initialize: function() {
                var that = this;
                this.options.contacts.fetch({
                    success: function( collection, response, options ) {
                        collection.each(function( contact ) {
                            var view = new Contact.Views.Item({
                                model: contact
                            });
                            that.insertView("ul", view).render();
                        }, this);
                    }
                });
            }
        });


        // Required, return the module for AMD compliance.
        return Contact;

    });