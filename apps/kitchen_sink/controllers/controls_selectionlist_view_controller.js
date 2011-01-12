// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsSelectionListViewController = M.Controller.extend({

    controlsList: null,

    selection: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Selection list (single selection)",
                    page: "controlsSelectionListView1"

                },

                {

                    name: "Selection list (multiple selection)",
                    page: "controlsSelectionListView2"

                },

                {

                    name: "Selection list (single selection dialog)",
                    page: "controlsSelectionListView3"

                },

                {

                    name: "getSelection()",
                    page: "controlsSelectionListView4"

                },

                {

                    name: "setSelection()",
                    page: "controlsSelectionListView5"

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

        this.switchToPage('controlsSelectionListView', M.TRANSITION.SLIDE, YES);

    },

    getSelection: function() {

        var selection = M.ViewManager.getView('controlsSelectionListView4', 'selectionList').getSelection();

        this.set('selection', selection.length > 0 ? selection : '-');

    },

    setSelection: function() {

        M.ViewManager.getView('controlsSelectionListView5', 'selectionList').setSelection('item2');

    }

});