define([
    // Application.
    "app", "backbone.stickit"
],

    function( app, stickit ) {

        var Contact = app.module();

        Contact.Model = Backbone.Model.extend({});

        Contact.Collection = Backbone.Collection.extend({
            model: Contact.Model,
            url: "http://stefanbuck.com/contact.json"
        });

        Contact.Views.Item = Backbone.View.extend({

            template: "item",
            tagName: 'li',

            bindings: {
                '.firstname': {
                    observe: 'firstname'
                },
                '.lastname': {
                    observe: 'lastname'
                },
                'h1': {
                    observe: ['firstname', 'lastname'],
                    onGet: function( values ) {
                        return values[0] + ' - ' + values[1]
                    }
                }
            },

            afterRender: function() {
                this.stickit();
                return this;
            },

            serialize: function() {
                return this.model.toJSON();
            }
        });

        Contact.Views.List = Backbone.View.extend({
            template: "list",

            initialize: function() {
                this.options.contacts.fetch();
                this.listenTo(this.options.contacts, {
                    "add": this.render
                });
            },

            beforeRender: function() {
                this.options.contacts.each(function( contact ) {
                    this.insertView(new Contact.Views.Item({
                        model: contact
                    }));
                }, this);
            }
        });


        // Required, return the module for AMD compliance.
        return Contact;

    });