define([
    // Application.
    'app/app', "text!templates/menu.html"
],

    function( app, menuTemplate ) {
        debugger;
        var Menu = app.module();

        Menu = Backbone.View.extend({

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
                app.layoutManager.getLayout().moveLeftPanel(evt);
            }


        });

        return Menu;
    });