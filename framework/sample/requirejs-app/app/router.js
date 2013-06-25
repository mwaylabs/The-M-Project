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

                A = collections;

                _.extend(this, collections);

                V = collections;
                // USE THIS WHEN USING HAMMER
                // $('body').hammer();
            },

            routes: {
                '': 'index',
                'detail/:id': 'detail',
                'add': 'add'
            },

            index: function() {

                this.contacts.fetch();

                var listOptions = { contacts: this.contacts };

                var list = new Contact.Views.List(listOptions);

                app._useLayout(mainTemplate);
                app.layout.setViews({
                    ".content": list
                })

                app.layout.render();

                $('body').html(app.layout.el);

            },

            detail: function( id ) {
                var model = this.contacts.get(id);

                var detail = null;

                if(!model){
                    model = new Contact.Model({_id: id});
                    model.fetch({url: model.urlRoot + '/' + id});
                }
                view = new Contact.Views.Detail({model: model});

                app._useLayout(mainTemplate);
                app.layout.setViews({
                    ".content": view
                })

                app.layout.render();
                $('body').html(app.layout.el);
            },

            add: function( id ) {

                view = new Contact.Views.Add({collection: this.contacts});

                app._useLayout(mainTemplate);
                app.layout.setViews({
                    ".content": view
                })

                app.layout.render();
                $('body').html(app.layout.el);
            }
        });

        return Router;

    });
