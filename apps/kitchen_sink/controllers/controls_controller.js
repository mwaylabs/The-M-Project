// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsController
// ==========================================================================

KitchenSink.ControlsController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "M.ButtonView",
                    page: "controlsButtonView"

                },

                {

                    name: "M.ButtonGroupView",
                    page: "controlsButtonGroupView"

                },

                {

                    name: "M.ContainerView",
                    page: "ControlsContainerViewPage"

                },

                {

                    name: "M.DialogView",
                    page: "ControlsDialogViewPage"

                },

                {

                    name: "M.FormView",
                    page: "ControlsFormViewPage"

                },

                {

                    name: "M.GridView",
                    page: "ControlsGridViewPage"

                },

                {

                    name: "M.ImageView",
                    page: "ControlsImageViewPage"

                },

                {

                    name: "M.LabelView",
                    page: "ControlsLabelViewPage"

                },

                {

                    name: "M.ListView",
                    page: "ControlsListViewPage"

                },

                {

                    name: "M.LoaderView",
                    page: "ControlsLoaderViewPage"

                },

                {

                    name: "M.PageView",
                    page: "ControlsPageViewPage"

                },

                {

                    name: "M.ScrollView",
                    page: "ControlsScrollViewPage"

                },

                {

                    name: "M.SearchBarView",
                    page: "ControlsSearchBarViewPage"

                },

                {

                    name: "M.SelectionListView",
                    page: "ControlsSelectionListViewPage"

                },

                {

                    name: "M.TabBarView",
                    page: "ControlsTabBarViewPage"

                },

                {

                    name: "M.TextFieldView",
                    page: "ControlsTextFieldViewPage"

                },

                {

                    name: "M.ToggleView",
                    page: "ControlsToggleViewPage"

                },

                {

                    name: "M.ToolbarView",
                    page: "ControlsToolbarView"

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

    }

});