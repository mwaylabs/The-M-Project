// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
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
 * The root class for every validator.
 *
 */
M.Validator = M.Object.extend(
/** @scope M.Validator.prototype */ {

    type: 'M.Validator',

    /**
     * Array containing error objects
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
     * @property
     */
    validationErrors: [],

    msg: null,

    /**
     * extends this.
     *
     * Can be used to provide a custom error msg to a validator
     * E.g.
     * M.EmailValidator.customize({msg: 'Please provide a valid e-mail adress.'});
     *
     * @param obj
     */
    customize: function(obj) {
        return this.extend(obj);
    },

    /**
     * empties the error buffer, is done before each new validation process
     * @param ad
     */
    clearErrorBuffer: function() {
        this.validationErrors.length = 0;
    }



});