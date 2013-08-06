// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      20.02.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.Exception = M.Object.extend(/** @scope M.Exception.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Exception',

    /**
     * The message of the exception (defined by the concrete instance).
     *
     * @type String
     */
    message: '',

    /**
     * The name of the exception (defined by the concrete instance).
     *
     * @type String
     */
    name: '',

    /**
     * Return the exception object to be thrown by the application.
     */
    getException: function() {
        var that = this;
        return {
            message: this.message,
            name: this.name,
            toString: function() {
                return that.getObjectType() + '.' + that.name;
            }
        }
    }
});

M.Exception.INVALID_INPUT_PARAMETER = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'At least one input parameter doesn\'t match the expected criteria.',
    name: 'INVALID_INPUT_PARAMETER'
});

M.Exception.RESERVED_WORD = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'Usage of a reserved word.',
    name: 'RESERVED_WORD'
});

M.Exception.CORRUPT_VIEW_OBJECT_PASSED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'A corrupt view object was passed. Necessary methods and functionality is not available.',
    name: 'CORRUPT_VIEW_OBJECT_PASSED'
});

M.Exception.APPLICATION_START_NOT_DEFINED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The application does not specify a valid start method.',
    name: 'APPLICATION_START_NOT_DEFINED'
});

M.Exception.NO_REQUEST_URL_SPECIFIED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The request needs an URL to connect to.',
    name: 'NO_REQUEST_URL_SPECIFIED'
});

M.Exception.NO_REQUEST_MANAGER_BASE_URL_SPECIFIED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The request manager needs a base URL to connect to.',
    name: 'NO_REQUEST_MANAGER_BASE_URL_SPECIFIED'
});

M.Exception.GET_INTERFACE_NOT_IMPLEMENTED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The interface does not provide a valid implementation of getInterface().',
    name: 'GET_INTERFACE_NOT_IMPLEMENTED'
});

M.Exception.CONTENT_DID_CHANGE_NOT_IMPLEMENTED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The object implements M.ContentBinding but does not provide a valid implementation of contentDidChange().',
    name: 'CONTENT_DID_CHANGE_NOT_IMPLEMENTED'
});

M.Exception.ENABLE_NOT_IMPLEMENTED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The object implements M.Interaction but does not provide a valid implementation of enable().',
    name: 'ENABLE_NOT_IMPLEMENTED'
});

M.Exception.DISABLE_NOT_IMPLEMENTED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The object implements M.Interaction but does not provide a valid implementation of disable().',
    name: 'DISABLE_NOT_IMPLEMENTED'
});

M.Exception.FOCUS_NOT_IMPLEMENTED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The object implements M.Interaction but does not provide a valid implementation of focus().',
    name: 'FOCUS_NOT_IMPLEMENTED'
});

M.Exception.BLUR_NOT_IMPLEMENTED = M.Exception.extend(/** @scope M.Exception.prototype */{
    message: 'The object implements M.Interaction but does not provide a valid implementation of blur().',
    name: 'BLUR_NOT_IMPLEMENTED'
});