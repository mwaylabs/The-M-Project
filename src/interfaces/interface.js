// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.Interface
 *
 * @type {*}
 * @extends M.Object
 */
M.Interface = M.Object.design(/** @scope M.Interface.prototype */{

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
        return void null;
    }

});


