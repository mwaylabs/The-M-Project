// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsButtonViewController
// ==========================================================================

KitchenSink.ControlsButtonGroupViewController = M.Controller.extend({

    controlsList: null,

    activeButton: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default button group",
                    page: "controlsButtonGroupView1"

                },

                {

                    name: "Vertical button group",
                    page: "controlsButtonGroupView2"

                },

                {

                    name: "Multi button group",
                    page: "controlsButtonGroupView3"

                },

                {

                    name: "Multi button gr. (not inset)",
                    page: "controlsButtonGroupView4"

                },

                {

                    name: "Multi button gr. (not compact)",
                    page: "controlsButtonGroupView5"

                },

                {

                    name: "getActiveButton()",
                    page: "controlsButtonGroupView6"

                },

                {

                    name: "setActiveButton()",
                    page: "controlsButtonGroupView7"

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

        this.switchToPage('controlsButtonGroupView', M.TRANSITION.SLIDE, YES);

    },

    getActiveButton: function() {

        var buttonGroup = M.ViewManager.getView('controlsButtonGroupView6', 'buttonGroup');
        this.set('activeButton', buttonGroup.getActiveButton() ? buttonGroup.getActiveButton().value : '-');

    },

    setActiveButton: function() {

        var buttonGroup = M.ViewManager.getView('controlsButtonGroupView7', 'buttonGroup');
        var childViews = $.trim(buttonGroup.childViews).split(' ');
        for(var i in childViews) {
            var button = M.ViewManager.getView(buttonGroup, childViews[i]);
            if(button && button.value === 'Button 1') {
                buttonGroup.setActiveButton(button);
            }
        }

    }

});