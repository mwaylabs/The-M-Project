// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      19.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * The prototype for every validator. All validation logic is implemented in the specific validators.
 *
 * @extends M.Object
 */
M.Validator = M.Object.extend(
/** @scope M.Validator.prototype */ {

    /**
     * The type of this object.
     * @type String
     */
    type: 'M.Validator',

    /**
     * "Class-wide" array containing error objects.
     * Specific validators do NOT have an own validationErrors array, but use this one to write errors to.
     * 
     * Error object represent errors that occured during validation.
     * E.g. error object:
     *
     * {
     *   msg: 'E-Mail adress not valid.',
     *   modelId: 'Task_123',
     *   property: 'email',
     *   viewId: 'm_123',
     *   validator: 'EMAIL',
     *   onSuccess: function(){proceed();}
     *   onError: function(markTextFieldError(); console.log('email not valid')}; 
     * }
     * 
     *
     * @type Array|Object
     */
    validationErrors: [],

    /**
     * extends this.
     *
     * Can be used to provide a custom error msg to a validator
     * E.g.
     * M.EmailValidator.customize({msg: 'Please provide a valid e-mail adress.'});
     *
     * @param obj
     * @returns {Object} The customized validator.
     */
    customize: function(obj) {
        return this.extend(obj);
    },

    /**
     * Empties the error buffer, is done before each new validation process
     */
    clearErrorBuffer: function() {
        this.validationErrors.length = 0;
    }



});