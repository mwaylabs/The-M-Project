// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsLabelViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default label",
                    page: "controlsLabelView1"

                },

                {

                    name: "Label with computed value",
                    page: "controlsLabelView2"

                },

                {

                    name: "Hyperlink label (internal)",
                    page: "controlsLabelView3"

                },

                {

                    name: "Hyperlink label (external)",
                    page: "controlsLabelView4"

                },

                {

                    name: "Inline labels",
                    page: "controlsLabelView5"

                },

                {

                    name: "Inline labels & comp. values",
                    page: "controlsLabelView6"

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

        this.switchToPage('controlsLabelView', M.TRANSITION.SLIDE, YES);

    },

    hyperlink1: function() {

        M.DialogView.alert({

            title: 'Alert dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    }

});