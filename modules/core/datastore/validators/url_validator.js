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
 * Validates if value represents a valid URL.
 *
 * @extends M.Validator
 */
M.UrlValidator = M.Validator.extend(
/** @scope M.UrlValidator.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.UrlValidator',

    /**
     * @type {RegExp} The regular expression for a valid web URL
     */
    pattern: /^(http[s]\:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/,

    /**
     * Validation method. Executes url regex pattern to string.
     *
     * @param {Object} obj Parameter object. Contains the value to be validated, the {@link M.ModelAttribute} object of the property and the model record's id.
     * @returns {Boolean} Indicating whether validation passed (YES|true) or not (NO|false).
     */
    validate: function(obj) {
        if (typeof(obj.value !== 'string')) {
            return NO;
        }

        if (this.pattern.exec(obj.value)) {
            return YES;
        }
        
        var err = M.Error.extend({
            msg: this.msg ? this.msg : obj.value + ' is not a valid url.',
            code: M.ERR_VALIDATION_URL,
            errObj: {
                msg: obj.value + ' is not a valid url.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'PHONE',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            }
        });
        this.validationErrors.push(err);
        return NO;
    }
    
});