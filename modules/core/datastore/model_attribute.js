// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');


/**
 * @class
 *
 * Defines an attribute for a model
 */
M.ModelAttribute = M.Object.extend(
/** @scope M.ModelAttribute.prototype */ {

    type: 'M.ModelAttribute',

    /**
     * The data type for the model record property.
     * Extremely important e.g. to map model to relational database table.
     *
     * @type String
     */
    dataType: null,

    /**
     * Indicates whether this property is required to be set before persisting.
     * If YES, then automatically @link M.PresenceValidator is added to the property, to check the presence.
     * 
     * @type Boolean
     */
    isRequired: NO,

    /**
     * Array containing all validators for this model record property.
     * E.g. [@link M.PresenceValidator, @link M.NumberValidator]
     * @type Object
     */
    validators: null,

    /**
     * Iterates over validators array and calls validate on each validator with the param object passed to the validator.
     * @param {Object} obj The parameter object containing the model id, the record as M.ModelAttribute object and the value of the property.
     * @return {Boolean} Indicates wheter the property is valid (YES|true) or invalid (NO|false). 
     */
    validate: function(obj) {
        var isValid = YES;
        for (var i in this.validators) {
            if(!this.validators[i].validate(obj)) {
               isValid = NO; 
            }
        }
        return isValid;
    }
});

//
// CLASS METHODS
//

/**
 * Returns a model attribute.
 *
 * @param dataType The data type of the attribute: e.g. String 
 * @param opts options for the attribute, such as defaultValue, isRequired flag, etc. ...
 * @return {Object} Model attribute
 */
M.ModelAttribute.attr = function(dataType, opts) {
    if (!opts) {
        opts = {};
    }
    if (!opts.dataType) {
        opts.dataType = dataType || 'String';
    }

    /* if validators array is not set and attribute is required, define validators as an empty array, (this is for adding M.PresenceValidator automatically */
    if (!opts.validators && opts.isRequired) {
        opts.validators = [];
    }

    /* if model attribute is required, presence validator is automatically inserted */
    if (opts.isRequired) {
        /* check if custom presence validator has been added to validators array, if not add the presence validator*/
        if( _.select(opts.validators, function(v){return v.type === 'M.PresenceValidator'}).length === 0) {
            opts.validators.push(M.PresenceValidator);
        }
    }
    return this.extend(opts);
};