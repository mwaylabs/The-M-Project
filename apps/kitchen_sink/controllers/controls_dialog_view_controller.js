// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsDialogViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Alert dialog",
                    page: "controlsDialogView1"

                },

                {

                    name: "Confirm dialog",
                    page: "controlsDialogView2"

                },

                {

                    name: "Actionsheet dialog (default)",
                    page: "controlsDialogView3"

                },

                {

                    name: "Actionsheet dialog",
                    page: "controlsDialogView4"

                },

                {

                    name: "Working with callbacks",
                    page: "controlsDialogView5"

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

        this.switchToPage('controlsDialogView', M.TRANSITION.SLIDE, YES);

    },

    openAlert: function() {

        M.DialogView.alert({

            title: 'Alert dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openConfirm: function() {

        M.DialogView.confirm({

            title: 'Confirm dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openActionsheet: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openActionsheet2: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

            buttons: {

                button1: {
                    title: 'Button 1'
                },

                button2: {
                    title: 'Button 2'
                },

                button3: {
                    title: 'Button 3'
                }
                
            }

        })

    },

    openActionsheet3: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

            onCancel: {

                target: this,

                action: 'callbackCancel'

            },

            buttons: {

                button1: {

                    title: 'Button 1',

                    target: this,

                    action: 'callbackButton1'

                },

                button2: {

                    title: 'Button 2',

                    target: this,

                    action: 'callbackButton2'

                },

                button3: {

                    title: 'Button 3',

                    target: this,

                    action: 'callbackButton3'

                }
                
            }

        })

    },

    callbackCancel: function() {

        this.set('callback', 'Cancel button');

    },

    callbackButton1: function() {

        this.set('callback', 'Button 1');

    },

    callbackButton2: function() {

        this.set('callback', 'Button 2');

    },

    callbackButton3: function() {

        this.set('callback', 'Button 3');

    }

});