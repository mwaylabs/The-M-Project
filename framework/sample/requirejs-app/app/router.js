define([
    // Application.
    "app",

    // Modules.
    "modules/contacts",
    "text!templates/main-layout.html"
],

    function( app, Contact, mainTemplate ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({

            initialize: function() {

                var collections = {
                    contacts: new Contact.Collection()
                };


                //this.contacts = this.collections.contacts
                _.extend(this, collections);

                this.contacts.fetch()

            },

            routes: {
                '': 'index',
                'detail/:id': 'detail'
            },

            index: function() {
                var listOptions = { contacts: this.contacts };
                //                app.useLayout("main-layout").setViews({
                //                    ".list": new Contact.Views.List(options)
                //                }).render();

                var list = new Contact.Views.List(listOptions);


                app._useLayout(mainTemplate);
                app.layout.setViews({
                    ".list": list
                })

                app.layout.render();

                $('body').html(app.layout.el);

            },

            detail: function( id ) {
                var model = this.contacts.get(id);
                if(!model){
                    location.href = 'file://localhost/Users/hano/Documents/Development/Projects/bikini/framework/sample/requirejs-app/index.html'
                }
                var detail = new Contact.Views.Detail({model: model});
//
//                app.useLayout("main-layout").setViews({
//                    ".list": detail
//                }).render();
                var listOptions = { contacts: this.contacts };
                var list = new Contact.Views.List(listOptions);

                app._useLayout(mainTemplate);
                app.layout.setViews({
                    ".list": detail
                })

                app.layout.render();
                $('body').html(app.layout.el);
            }
        });

        return Router;

    });
