// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsToggleViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Toggle buttons automatically",
                    page: "controlsToggleView1"

                },

                {

                    name: "Toggle buttons manually",
                    page: "controlsToggleView2"

                },

                {

                    name: "Toggle complex view",
                    page: "controlsToggleView3"

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

        this.switchToPage('controlsToggleView', M.TRANSITION.SLIDE, YES);

    },

    toggleButtons: function() {

        M.ViewManager.getView('controlsToggleView2', 'toggle').toggleView();

    },

    toggleViews: function() {

        M.ViewManager.getView('controlsToggleView3', 'toggle').toggleView();

    }

});