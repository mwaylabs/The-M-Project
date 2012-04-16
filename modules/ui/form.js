// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      25.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.FormViews is the prototype of a form view, a container like view for grouping
 * input views, e.g. M.TextFieldView. It covers a lot of the jobs concerning the
 * validation of input views. There is no visible representation of an M.FormView,
 * it is only used to ease the validation process and its accessing out of a
 * controller.
 * 
 * @extends M.View
 */
M.FormView = M.View.extend(
/** @scope M.FormView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.FormView',

    /**
     * Determines whether to automatically show an alert dialog view out of the showError method
     * if the validation failed or not. So if set to YES, all error messages are shown in an alert
     * dialog view once the showError method is called.
     *
     * @type Boolean
     */
    showAlertDialogOnError: YES,

    /**
     * The title of the alert view that comes up automatically if the validation fails, depending
     * one the 'showAlertOnError' property.
     *
     * @type String
     */
     alertTitle: 'Validation Error(s)',

    /**
     * This method triggers the validate() on all child views, respectively on their validators. If
     * a validation error occurs, the showErrors() will be called.
     *
     * @returns {Boolean} The result of the validation process: valid or not.
     */
    validate: function() {
        var ids = this.getIds();
        for(var name in ids) {
            if(!!!(M.ViewManager.getViewById(ids[name]).validators)) {
                delete ids[name];
            }
        }

        var isValid = YES;
        M.Validator.clearErrorBuffer();

        for(var name in ids) {
            var view = M.ViewManager.getViewById(ids[name]);
            if(view && view.validators) {
                if(view.cssClassOnError) {
                    view.removeCssClass(view.cssClassOnError);
                }

                _.each(view.validators, function(validator) {
                    if(!validator.validate(view, name)) {
                        isValid = NO;
                    }
                });
            }
        }

        if(!isValid) {
            this.showErrors();
        }

        return isValid;
    },

    /**
     * This method adds a css class specified by the cssClassOnError property to any
     * view that caused a validation error and has this property specified.
     *
     * If the showAlertDialogOnError property is set to YES, a alert dialog view
     * is display additionally, presenting the error messages of all invalid views.
     */
    showErrors: function() {
        var errors = '';
        _.each(M.Validator.validationErrors, function(error) {
            if(error && error.errObj) {
                var view = M.ViewManager.getViewById(error.errObj.viewId);
                if(view && view.cssClassOnError) {
                    view.addCssClass(view.cssClassOnError);
                }
                errors += '<li>' + error.msg + '</li>';
            }
        });

        if(this.showAlertDialogOnError) {
            M.DialogView.alert({
                title: this.alertTitle,
                message: errors
            });
        }
    },

    /**
     * This method is a wrapper of M.View's clearValues() method.
     */
    clearForm: function() {
        this.clearValues();
    },

    /**
     * This method is a wrapper of M.View's getValues() method.
     */
    getFormValues: function() {
        return this.getValues();
    }

});