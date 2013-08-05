define([
    "app/app",
    "text!templates/item.html"
],
    function( app, tpl) {

        var View = Backbone.View.extend({

            template: _.template(tpl),
            tagName: 'tr',
            className: 'contact-container',

            bindings: {
                '.firstname': {
                    observe: 'firstname'
                },
                '.lastname': {
                    observe: 'lastname'
                },
                '.id': {
                    observe: '_id'
                },
                'h1': {
                    observe: ['firstname', 'lastname'],
                    onGet: function( values ) {
                        return values[0] + ' - ' + values[1]
                    }
                }
            },

            events: {
                'tap': 'userSelected'
            },

            //USE THIS WITH STANDARD BACKBONE OR HAMMER JS
            //            events: {
            //                "tap": "userSelected",
            //                "click": "clickuserSelected"
            //            },

            clickuserSelected: function( a, b, c ) {

                //Backbone.history.navigate('detail/' + this.model.id, true);
                //  console.log('click auf elem');
                $('#log').append('click auf elem <br>');
                a.preventDefault();
                a.stopPropagation();
            },

            userSelected: function( a, b, c ) {
                app.layoutManager.navigate({
                    route: 'detail',
                    params: this.model.id
                });
            },

            initialize: function() {
                this.MID = M.ViewManager.getNewId();
                this.model.on('destroy', this.destroy, this);
            },

            getEventHandler: function( a ) {
                var that = this;
                return function() {
                    that.userSelected();
                }
            },

            getId: function() {
                return this.MID;
            },

            beforeRender: function() {
                return this;
            },

            afterRender: function() {
                this.$el.attr('id', this.getId());
                this.stickit();
                return this;
            },

            destroy: function() {
                this.unstickit();
                this.remove();
            },

            serialize: function() {
                return this.model.attributes;
            }
        });

        return View;
    });