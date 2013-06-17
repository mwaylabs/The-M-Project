define([
    // Application.
    'app',
    'backbone.stickit',
    "text!templates/detail.html"
],

    function( app, stickit, detailTemplate ) {

        var Contact = app.module();

        Contact.Model = Backbone.Model.extend({});

        Contact.Collection = Backbone.Collection.extend({
            model: Contact.Model,
            url: 'http://stefanbuck.com/contact.json',

            initialize: function() {
                this.on('remove', this.removeItem)
            },

            removeItem: function( model ) {
                model.trigger('removeItem')
            }
        });

        Contact.Views.Item = Backbone.View.extend({

            template: 'item',
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

            initialize: function() {
                this.model.on('removeItem', this.remove, this)
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
            template: 'list',

            initialize: function() {
                this.listenTo(this.options.contacts, 'add', this.addOne);
                this.listenTo(this.options.contacts, 'fetch', this.addAll);
            },

            beforeRender: function() {
                this.addAll();
            },

            addOne: function( model, render ) {
                var view = this.insertView(new Contact.Views.Item({ model: model }));

                // Only trigger render if it not inserted inside `beforeRender`.
                if( render !== false ) {
                    view.render();
                }
            },

            addAll: function() {
                this.options.contacts.each(function( model ) {
                    this.addOne(model, false);
                }, this);
            }
        });

        Contact.Views.Detail = Backbone.View.extend({
            template: _.template(detailTemplate),
            events: {
                "click .back": "back"
            },
            initialize: function() {
                //console.log('detailvew', this);
            },
            // provide data to the template
            serialize: function() {
                return this.model.toJSON();
            },
            back: function() {
                this.$el.remove();
                Backbone.history.navigate("/", true);
            }
        })


        // Required, return the module for AMD compliance.
        return Contact;

    });