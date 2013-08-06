define([
    "app/app",
    "text!templates/list.html",
    "app/views/list_item"
],
    function( app, tpl, ListItemView ) {

        var View = Backbone.View.extend({

            template: _.template(tpl),

            events: {
                "tap .add": "addEntry"
            },

            initialize: function() {
                this.listenTo(this.options.contacts, 'add', this.addOne);
                this.listenTo(this.options.contacts, 'fetch', function() {
                    this.addAll();
                });

                this.listenToOnce(this.options.contacts, 'sync', function() {
                    this.render();
                });
            },

            serialize: function() {
                return this.options
            },

            addEntry: function() {
                app.layoutManager.navigate({
                    route: 'add'
                });
            },

            beforeRender: function() {
                this.addAll();
            },

            addOne: function( model, render ) {
                var view = this.insertView('tbody', new ListItemView({ model: model }));

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

        return View;
    });