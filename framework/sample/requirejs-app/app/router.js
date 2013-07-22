define([
    // Application.
    "app",
    // Modules.
    "modules/contacts",
    "text!templates/detail-layout.html",
    "text!templates/index-layout.html"
],

    function( app, Contact, detailTemplate, indexLayout ) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({

            routes: {
                '': 'index',
                'detail/:id': 'detail',
                'add': 'add'
            },

            initialize: function() {
                var collections = {
                    contacts: new Contact.Collection()
                };

                app.layout = new (Backbone.Layout.extend());

                A = collections;

                _.extend(this, collections);

                V = collections;
                // USE THIS WHEN USING HAMMER
                // $('body').hammer();
            },

            index: function() {

                this.contacts.fetch();

                var listOptions = { contacts: this.contacts };

                var list = new Contact.Views.List(listOptions);

                app.layout.useLayout(indexLayout);
                app.layout.setViews({
                    ".content": list
                })

                app.layout.switchToPage();

            },

            detail: function( id ) {
                var model = this.contacts.get(id);

                var that   = this;
                var detail = null;

                if(!model) {
                    model = new Contact.Model({_id: id });
                    model.collection = this.contacts;
                    model.fetch({ success: function(model) {
                        that.contacts.add(model);
                    }});
                }
                var view = new Contact.Views.Detail({model: model});

                app.layout.useLayout(detailTemplate);
                app.layout.setViews({
                    ".content": view
                });

                app.layout.switchToPage();


            },

            add: function( id ) {

                view = new Contact.Views.Add({collection: this.contacts});

//                app.layout.useLayout(indexTemplate);
                app.layout.setViews({
                    ".content": view
                })

                app.layout.render();
                $('body').html(app.layout.el);
            }
        });

        return Router;

    });
