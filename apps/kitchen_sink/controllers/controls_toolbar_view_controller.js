// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsToolbarViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default toolbar",
                    page: "controlsToolbarView1"

                },

                {

                    name: "Toolbar with back button",
                    page: "controlsToolbarView2"

                },

                {

                    name: "Toolbar with two buttons",
                    page: "controlsToolbarView3"

                },

                {

                    name: "Toolbar with button group",
                    page: "controlsToolbarView4"

                },

                {

                    name: "Custom toolbar",
                    page: "controlsToolbarView5"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsToolbarView', M.TRANSITION.SLIDE, YES);

    }

});