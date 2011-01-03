SelectionList.MultipleSelectionController = M.Controller.extend({

    setSelection: function() {

        var selectionList = M.ViewManager.getView('multipleSelection', 'selectionList');
        var textField = M.ViewManager.getView('multipleSelection', 'textField');

        if(!textField.value || textField.value === '') {

            M.DialogView.alert({

                title: 'Error',

                message: 'You have to enter a value in the text field in order to set the selection list\'s selection.'

            });

        } else {

            var textFieldValue = $.trim(textField.value.replace(/\s/gi, ''));

            selectionList.setSelection(textFieldValue.split(','));

            textField.setValue('');

            textField.lostFocus();

        }

    },

    getSelection: function() {

        var selectionList = M.ViewManager.getView('multipleSelection', 'selectionList');
        var selection = selectionList.getSelection(YES);

        var message = '';
        for(var i in selection) {
            message += selection[i].label + '<br />';
        }

        /*M.DialogView.alert({

            title: 'Selected Item(s)',

            message: message

        });*/
        
        M.Logger.log(message, M.INFO);

    }

})