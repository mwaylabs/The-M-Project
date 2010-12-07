// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      25.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for FormViews.
 *
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
     * Determines whether to automatically show an alert view if the validation fails.
     *
     * @type Boolean
     */
    showAlertOnError: YES,

    /**
     * The title of the alert view that comes up automatically if the validation fails, depending
     * one the 'showAlertOnError' property.
     *
     * @type String
     */
     alertTitle: 'Validation Error(s)',

    /**
     * This method triggers the validate() on all child views, respectively
     * on their validators.
     */
    validate: function() {
        M.Validator.clearErrorBuffer();
        var isValid = YES;
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                var childView = this[childViews[i]];
                if(childView && childView.validators) {
                    _.each(childView.validators, function(validator) {
                        if(!validator.validate(childView, childViews[i])) {
                            isValid = NO;
                        }
                    });
                }
                if(childView && childView.cssClassOnError) {
                    childView.removeCssClass(childView.cssClassOnError);
                }
            }
        }
        return isValid;
    },

    showErrors: function() {
        var errors = '';
        _.each(M.Validator.validationErrors, function(error) {
            var view = M.ViewManager.getViewById(error.viewId);
            if(view && view.cssClassOnError) {
                view.addCssClass(view.cssClassOnError);
            }
            errors += '<li>' + error.msg + '</li>';
        });

        if(this.showAlertOnError) {
            M.DialogView.alert({
                title: this.alertTitle,
                message: errors
            });
        }
    }

});