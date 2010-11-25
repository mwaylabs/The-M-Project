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
M.FormView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.FormView',

    /**
     * The object containing the validation's meta information.
     *
     * @property {Object}
     */
    validation: null,

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
                    childView.removeClass(childView.cssClassOnError);
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
                view.addClass(view.cssClassOnError);
            }
            errors += '<li>' + error.msg + '</li>';
        });
        M.DialogView.alert({
            title: this.validation ? (this.validation.title ? this.validation.title : 'Validation Error(s)') : 'Validation Error(s)',
            message: errors
        });
    }

});