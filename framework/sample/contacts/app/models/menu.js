define([
    // Application.
    'app/app', "text!templates/menu.html"
],

    function( app, menuTemplate ) {
        var Menu = app.module();

        Menu.Navigation = Backbone.View.extend({

            template: _.template(menuTemplate),

            events: {
                "tap .toggleRightPanel": "toggleRightPanel",
                "tap .toggleLeftPanel": "toggleLeftPanel",
                "touchstart .moveLeftPanel": "startMoveLeftPanel",
                "touchend .moveLeftPanel": "stopMoveLeftPanel",
                "touchmove .moveLeftPanel": "moveLeftPanel"
            },

            initialize: function() {
            },

            beforeRender: function() {

            },

            toggleRightPanel: function() {
                app.layoutManager.getLayout().toggleRightPanel();
            },

            toggleLeftPanel: function() {
                app.layoutManager.getLayout().toggleLeftPanel();
            },

            startMoveLeftPanel: function(evt) {
                app.layoutManager.getLayout().startMoveLeftPanel(evt);
            },

            stopMoveLeftPanel: function(evt) {
                app.layoutManager.getLayout().stopMoveLeftPanel(evt);
            },

            moveLeftPanel: function(evt) {
                console.log('moveLeftPanel');
                app.layoutManager.getLayout().moveLeftPanel(evt);
            }


        });

        return Menu;
    });