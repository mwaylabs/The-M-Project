// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsTextFieldViewController = M.Controller.extend({

    controlsList: null,

    textfieldvalue: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default textfield",
                    page: "controlsTextFieldView1"

                },

                {

                    name: "Textfield with initial text",
                    page: "controlsTextFieldView2"

                },

                {

                    name: "Two linked textfields",
                    page: "controlsTextFieldView3"

                },

                {

                    name: "Custom textfield",
                    page: "controlsTextFieldView4"

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

        this.switchToPage('controlsTextFieldView', M.TRANSITION.SLIDE, YES);

    },

    getValue: function() {

        var value = M.ViewManager.getView('controlsSearchBarView3', 'searchbar').value;

        this.set('output1', value ? value : '-');

    }

});