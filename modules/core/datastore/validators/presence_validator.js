// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

/**
 * @class
 *
 * Validates if value is existing. Used, e.g. for every property in a model record that is marked as  'required' ({@link M.Model#isRequired}.
 *
 * @extends M.Validator
 */
M.PresenceValidator = M.Validator.extend(
/** @scope M.PresenceValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.PresenceValidator',
    
    /**
     * Validation method. First checks if value is not null, undefined or an empty string and then tries to create a {@link M.Date} with it.
     * Pushes different validation errors depending on where the validator is used: in the view or in the model.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @param {String} key
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj, key) {
        if(obj.value === null || obj.value === undefined || obj.value === '') {
            if(obj.isView) {

                var err = M.Error.extend({
                    msg: this.msg ? this.msg : key + ' is required and is not set.',
                    code: M.ERR_VALIDATION_PRESENCE,
                    errObj: {
                        msg: this.msg ? this.msg : key + ' is required and is not set.',
                        viewId: obj.id,
                        validator: 'PRESENCE',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
                });
                this.validationErrors.push(err);
                
            } else {
                var err = M.Error.extend({
                    msg: this.msg ? this.msg : obj.property + 'is required and is not set.',
                    code: M.ERR_VALIDATION_PRESENCE,
                    errObj: {
                        msg: this.msg ? this.msg : obj.property + ' is required and is not set.',
                        modelId: obj.modelId,
                        property: obj.property,
                        validator: 'PRESENCE',
                        onSuccess: obj.onSuccess,
                        onError: obj.onError
                    }
                });
                this.validationErrors.push(err);
            }
            return NO;
        }
        return YES;
    }

});