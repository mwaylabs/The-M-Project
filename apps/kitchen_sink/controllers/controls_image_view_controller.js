// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsImageViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default image",
                    page: "controlsImageView1"

                },

                {

                    name: "Image with CSS styling",
                    page: "controlsImageView2"

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

        this.switchToPage('controlsImageView', M.TRANSITION.SLIDE, YES);

    }

});