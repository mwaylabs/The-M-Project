// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsSearchBarViewController = M.Controller.extend({

    controlsList: null,

    output1: null,

    output2: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default searchbar",
                    page: "controlsSearchBarView1"

                },

                {

                    name: "Searchbar with initial text",
                    page: "controlsSearchBarView2"

                },

                {

                    name: "Get searchstring",
                    page: "controlsSearchBarView3"

                },

                {

                    name: "Link searchbar to label",
                    page: "controlsSearchBarView4"

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

        this.switchToPage('controlsSearchBarView', M.TRANSITION.SLIDE, YES);

    },

    getValue: function() {

        var value = M.ViewManager.getView('controlsSearchBarView3', 'searchbar').value;

        this.set('output1', value ? value : '-');

    }

});