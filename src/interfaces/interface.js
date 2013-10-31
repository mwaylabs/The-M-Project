// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.Interface = M.Object.extend(/** @scope M.Interface.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Interface',

    /**
     * This property is used to identify M.Interface and all of its derived object as
     * valid interfaces.
     *
     * @type Boolean
     */
    isMInterface: YES,

    /**
     * This method returns the object to implement the interface of
     * some component within the framework. This basic implementation
     * of M.Interface has to be overwritten in any concrete sub-object
     * of M.Interface.
     *
     * @returns {Object}
     */
    getInterface: function() {
        throw M.Exception.GET_INTERFACE_NOT_IMPLEMENTED.getException();
    }

});