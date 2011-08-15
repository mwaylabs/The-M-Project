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
 * Validates if it represents a minus number. Works with numbers and strings containing just a number.
 *
 * @extends M.Validator
 */
M.NotMinusValidator = M.Validator.extend(
/** @scope M.NotMinusValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.NotMinusValidator',

    /**
     * Validation method. Distinguishes between type of value: number or string. Both possible. If number value is checked if less than zero,
     * if string value is checked if ^prefixed with a minus sign ( - ).
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {

       if(typeof(obj.value) === 'number') {
           if(obj.value < 0) {
               var err = M.Error.extend({
                    msg: this.msg ? this.msg : obj.value + ' is a minus value. This is not allowed.',
                    code: M.ERR_VALIDATION_NOTMINUS,
                    errObj: {
                        msg: obj.value + ' is a minus value. This is not allowed.',
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
           return YES;
       }

       if(typeof(obj.value) === 'string') {
           var pattern = /-/;
           if(this.pattern.exec(obj.value)) {
                var err = M.Error.extend({
                    msg: this.msg ? this.msg : obj.value + ' is a minus value. This is not allowed.',
                    code: M.ERR_VALIDATION_NOTMINUS,
                    errObj: {
                        msg: obj.value + ' is a minus value. This is not allowed.',
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
           return YES;
       }
    }
});