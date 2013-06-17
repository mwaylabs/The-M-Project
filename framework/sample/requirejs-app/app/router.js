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

                _.extend(this, collections);

                V = collections;
            },

            routes: {
                '': 'index',
                'detail/:id': 'detail'
            },

            index: function() {

                this.contacts.fetch();

                var listOptions = { contacts: this.contacts };

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

                var detail = null;

                if(!model){
                    model = new Contact.Model({_id: id});
                    model.fetch({url: model.urlRoot + '/' + id});
                }
                detail = new Contact.Views.Detail({model: model});

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
