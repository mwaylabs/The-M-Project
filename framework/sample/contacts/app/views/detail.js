define([
    'themproject',
    "text!templates/detail.html",
    "app"
],
    function( M, template, app ) {

        debugger;

        var View = M.View.extend({
            first: true,

            template: _.tpl(template),

            events: {
                "click .back": "back",
                "click .delete": "deleteEntry",
                "click .edit": "editEntry"
            },

            bindings: {
                '.firstname': {
                    observe: 'firstname'
                },
                '.lastname': {
                    observe: 'lastname'
                }
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.change);
            },

            // provide data to the template
            serialize: function() {
                return this.model.attributes
            },

            back: function() {
                app.layoutManager.navigate({
                    route: '/'
                });
            },

            deleteEntry: function() {
                var that = this;
                this.unstickit();
                this.model.destroy({
                    success: function() {
                        that.back();
                    }
                });
            },

            editEntry: function() {
                debugger;
                this.model.save();
                this.back();
            },

            afterRender: function() {
                this.stickit();
                return this;
            }
        });

        return View;
    });