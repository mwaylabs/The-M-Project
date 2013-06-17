define([
    // Application.
    'app',
    'backbone.stickit',
    "text!templates/detail.html",
    "text!templates/item.html"
],

    function( app, stickit, detailTemplate, itemTemplate ) {

        var Contact = app.module();

        Contact.Model = Backbone.Model.extend({});

        Contact.Collection = Backbone.Collection.extend({
            model: Contact.Model,
            url: 'http://stefanbuck.com/contact.json'
        });

        Contact.Views.Item = Backbone.View.extend({

            template: _.template(itemTemplate),
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

            initialize: function(){
                this.model.on('destroy', this.love, this);
            },

            afterRender: function() {
                this.stickit();
                return this;
            },

            love: function() {
                this.unstickit();
                this.remove();
            },

            serialize: function() {
                return this.model.toJSON();
            }
        });

        Contact.Views.List = Backbone.View.extend({
            template: 'list',

            initialize: function() {
                this.listenTo(this.options.contacts, 'add', this.addOne);
                this.listenTo(this.options.contacts, 'remove', this.destroy);
                this.listenTo(this.options.contacts, 'fetch', function() {
                    console.log("fetch")
                    this.addAll();
                });
            },

            destroy: function(models, options) {
                console.log(models);
                console.log(options);
                debugger;
            },

            beforeRender: function() {
                console.log('Contact.Views.List beforeRender');
                this.addAll();
            },

            addOne: function( model, render ) {
                console.log('Contact.Views.List addOne', model.attributes);
                var view = this.insertView(new Contact.Views.Item({ model: model }));

                // Only trigger render if it not inserted inside `beforeRender`.
                if( render !== false ) {
                    view.render();
                }
            },

            addAll: function() {
                console.log('Contact.Views.List addAll');
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