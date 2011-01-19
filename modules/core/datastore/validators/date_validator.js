// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      25.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates a given date. Validates whether it is possible to create a {@link M.Date} (then valid) or not (then invalid).
 *
 * @extends M.Validator
 */
M.DateValidator = M.Validator.extend(
/** @scope M.DateValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DateValidator',

    /**
     * Validation method. First checks if value is not null, undefined or an empty string and then tries to create a {@link M.Date} with it.
     * Pushes different validation errors depending on where the validator is used: in the view or in the model.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj, key) {
        /* validate the date to be a valid german or us date: dd.mm.yyyy or mm/dd/yyyy */
        var patternDateUS =  /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})(\s+([0-9]{2})\:([0-9]{2})(\:([0-9]{2}))?)?$/;
        var patternDateDE =  /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})(\s+([0-9]{2})\:([0-9]{2})(\:([0-9]{2}))?)?$/;

        if(obj.isView) {
            if(obj.value === null || obj.value === undefined || obj.value === '' || !(patternDateUS.test(obj.value) || patternDateDE.test(obj.value)) || !M.Date.create(obj.value)) {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : key + ' is not a valid date.',
                    viewId: obj.id,
                    validator: 'DATE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
            }
            return YES;
        } else {
            if(obj.value.type && obj.value.type !== 'M.Date' && (obj.value === null || obj.value === undefined || obj.value === '' || !M.Date.create(obj.value))) {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : obj.property + ' is not a valid date.',
                    modelId: obj.modelId,
                    property: obj.property,
                    validator: 'DATE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
            }
            return YES;
        }
    }

});