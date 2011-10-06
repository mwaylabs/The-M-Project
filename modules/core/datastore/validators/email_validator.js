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
 * Validates a String if it represents a valid e-mail adress.
 *
 * @extends M.Validator
 */
M.EmailValidator = M.Validator.extend(
/** @scope M.EmailValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.EmailValidator',

    /**
     * @type {RegExp} The regular expression for a valid e-mail address
     */
    pattern: /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)\@((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/,

    /**
     * Validation method. Executes e-mail regex pattern to string.
     *
     * @param obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {
        if (typeof(obj.value) !== 'string') {
            return NO;
        }

        if (this.pattern.test(obj.value)) {
            return YES;
        }

        var err = M.Error.extend({
            msg: this.msg ? this.msg : obj.value + ' is not a valid email adress.',
            code: M.ERR_VALIDATION_EMAIL,
            errObj: {
                msg: obj.value + ' is not a valid email adress.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'EMAIL',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            }
        });
        this.validationErrors.push(err);

        return NO;
    }
    
});