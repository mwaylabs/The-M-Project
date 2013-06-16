define([
    // Application.
    "app",

    // Modules.
    "modules/contacts"
],

    function( app, Contact ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({

            initialize: function() {

                var collections = {
                    contacts: new Contact.Collection()
                };

                window.collections = collections;
                window.Contact = Contact;

                setTimeout(function() {
                    collections.contacts.at(0).set('firstname', 'Mr. Frank')
                }, 1000)
                setTimeout(function() {
                    collections.contacts.add(new Contact.Model({firstname:'Dejan',lastname:' Dujmović'}));
                }, 3000)

                // Ensure the router has references to the collections.
                _.extend(this, collections);

                // Use main layout and set Views.
                app.useLayout("main-layout").setViews({
                    ".list": new Contact.Views.List(collections)
                }).render();
            },

            routes: {
                "": "index"
            },

            index: function() {
                console.log('Router index');
            }
        });

        return Router;

    });
