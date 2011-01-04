// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsButtonViewController
// ==========================================================================

KitchenSink.ControlsButtonViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default button",
                    page: "controlsButtonView1"

                },

                {

                    name: "Button with icon",
                    page: "controlsButtonView2"

                },

                {

                    name: "\"Icon only\" button",
                    page: "controlsButtonView3"

                },

                {

                    name: "Inline button",
                    page: "controlsButtonView4"

                },

                {

                    name: "Inline button with icon",
                    page: "controlsButtonView5"

                },

                {

                    name: "Custom styled button",
                    page: "controlsButtonView6"

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

        this.switchToPage('controlsButtonView', M.TRANSITION.SLIDE, YES);

    }

});