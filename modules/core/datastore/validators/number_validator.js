// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates if passed value is a number. Works with Strings and Numbers. Strings are parsed into numbers and then checked.
 *
 * @extends M.Validator
 */
M.NumberValidator = M.Validator.extend(
/** @scope M.NumberValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.NumberValidator',

    /**
     * Validation method. If value's type is not "number" but a string, the value is parsed into an integer or float and checked versus the string value with '=='.
     * The '==' operator makes an implicit conversion of the value. '===' would return false.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {
        if(typeof(obj.value) === 'number') {
            return YES;
        }

        /* == makes implicit conversion */ 
        if(typeof(obj.value) === 'string' && (parseInt(obj.value) == obj.value || parseFloat(obj.value) == obj.value)) {
            return YES;        
        }

        var err = M.Error.extend({
            msg: this.msg ? this.msg : obj.value + ' is not a number.',
            code: M.ERR_VALIDATION_NUMBER,
            errObj: {
                msg: obj.value + ' is not a number.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'NUMBER',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            }
        });

        this.validationErrors.push(err);

        return NO;
    }
});
