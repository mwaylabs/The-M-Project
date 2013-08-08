define([
    // Application.
    'themproject',
    'app',
    "text!templates/menu.html"
],

    function( M, app, menuTemplate ) {

        var Menu = M.View.extend({

            template: _.template(menuTemplate),

            events: {
                "click .toggleRightPanel": "toggleRightPanel",
                "click .toggleLeftPanel": "toggleLeftPanel",
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