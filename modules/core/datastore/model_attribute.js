// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
 * M.ModelAttribute encapsulates all meta information about a model record's property:
 * * is it required?
 * * what data type is it of? (important for mapping to relational database schemas)
 * * what validators shall be applied
 * All M.ModelAttributes for a model record are saved under {@link M.Model#__meta} property of a model.
 * Each ModelAttribute is saved with the record properties name as key.
 * That means:
 *
 * model.record[propA] is the value of the property.
 * model.__meta[propA] is the {@link M.ModelAttribute} object for the record property.
 *
 * @extends M.Object
 */
M.ModelAttribute = M.Object.extend(
/** @scope M.ModelAttribute.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
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
     * Indicates whether an update has been performed on this property with the set method or not.
     * @type Boolean
     */
    isUpdated: NO,

    /**
     * Array containing all validators for this model record property.
     * E.g. [@link M.PresenceValidator, @link M.NumberValidator]
     * @type Object
     */
    validators: null,

    /**
     * Record properties that define references have their referenced entity saved here.
     * @type Object
     */
    refEntity: null,

    /**
     * Iterates over validators array and calls validate on each validator with the param object passed to the validator.
     * @param {Object} obj The parameter object containing the model id, the record as M.ModelAttribute object and the value of the property.
     * @returns {Boolean} Indicates wheter the property is valid (YES|true) or invalid (NO|false).
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
 * @returns {Object} {@link M.ModelAttribute} object
 */
M.ModelAttribute.attr = function(dataType, opts) {
    //console.log('attr in model_attribute');
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