// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Object
 *
 * @type {{_type: string, _implementedInterfaces: null, _create: Function, include: Function, design: Function, implement: Function, hasInterfaceImplementation: Function, bindToCaller: Function, _init: Function, _normalize: Function, handleCallback: Function, getObjectType: Function, _addInterfaces: Function}}
 */
M.Object = {
    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Object',

    /**
     * This property contains an array of interfaces the object implements. This
     * is used internally for initializing the object properly.
     *
     * @type {Array}
     */
    _implementedInterfaces: null,

    /**
     * Creates an object based on a passed prototype.
     *
     * @param {Object} proto The prototype of the new object.
     */
    _create: function( proto ) {
        var F = function() {
        };
        F.prototype = proto;
        return new F();
    },

    /**
     * Includes passed properties into a given object.
     *
     * @param {Object} properties The properties to be included into the given object.
     */
    include: function( properties ) {
        for( var prop in properties ) {
            if( this.hasOwnProperty(prop) ) {
                throw M.Exception.RESERVED_WORD.getException();
            }
            this[prop] = properties[prop];
        }

        return this;
    },

    /**
     * Creates a new class and extends it with all functions of the defined super class
     * The function takes multiple input arguments. Each argument serves as additional
     * super classes - see mixins.
     *
     * @param {Object} properties The properties to be included into the given object.
     */
    design: function( properties ) {
        /* create the new object */
        // var obj = M.Object._create(this);
        var obj = this._create(this);

        /* assign the properties passed with the arguments array */
        obj.include(this._normalize(properties));

        /* call the new object's _init method to initialize it */
        obj._init();

        /* check if the object implements an interface and init it properly */
        _.each(obj._implementedInterfaces, function( i ) {
            obj.bindToCaller(obj, i._init)();
        }, obj);

        /* return the new object */
        return obj;
    },

    /**
     * This method is used for adding a certain interface to an existing object. It
     * therefore calls the getInterface() method of the given object and attaches the
     * returned interface to the object. If there already is an implementation of a
     * certain property or method, that one is skipped. So it is possible to overwrite
     * interface suff within the object itself.
     *
     * @param {M.Interface} obj The interface to be implemented.
     * @returns {Object}
     */
    implement: function( obj ) {
        if( obj && obj.isMInterface ) {
            var i = obj.getInterface(this);

            _.each(i, function( value, key ) {
                if( this[key] ) {
                    i[key] = null;
                    delete i[key];
                }
            }, this);

            this.include(i);

            this._implementedInterfaces = this._implementedInterfaces || [];
        }

        return this;
    },

    /**
     * This method checks whether an object implements a certain interface or not.
     *
     * @param {Object} obj The interface to check for.
     * @returns {Boolean}
     */
    hasInterfaceImplementation: function( obj ) {
        var hasInterfaceImplementation = NO;
        _.each(this._implementedInterfaces, function( i ) {
            if( obj === i ) {
                hasInterfaceImplementation = YES;
            }
        }, this);

        return hasInterfaceImplementation;
    },

    /**
     * Binds a method to its caller, so it is always executed within the right scope.
     *
     * @param {Object} caller The scope of the method that should be bound.
     * @param {Function} method The method to be bound.
     * @param {Object} arg One or more arguments. If more, then apply is used instead of call.
     */
    bindToCaller: function( caller, method, arg ) {
        return function() {
            if( typeof method !== 'function' || typeof caller !== 'object' ) {
                throw M.Exception.INVALID_INPUT_PARAMETER.getException();
            }
            if( Array.isArray(arg) ) {
                return method.apply(caller, arg);
            }
            return method.call(caller, arg);
        };
    },

    /**
     * This method is called right after the creation of a new object and can be used to
     * initialize some internal properties.
     *
     * This implementation in M.Object only serves as some kind of 'interface' declaration.
     */
    _init: function() {

    },

    /**
     * This method is used internally to normalize the properties object that is used
     * for extending a given object.
     *
     * @param obj
     * @returns {Object}
     * @private
     */
    _normalize: function( obj ) {
        obj = obj && typeof obj === 'object' ? obj : {};

        return obj;
    },

    /**
     * Calls a method defined by a handler
     *
     * @param {Object} handler A function, or an object including target and action to use with bindToCaller.
     */
    handleCallback: function( handler ) {
        var args = Array.prototype.slice.call(arguments, 1);
        if( handler ) {
            var target = typeof handler.target === 'object' ? handler.target : this;
            var action = handler;
            if( typeof handler.action === 'function' ) {
                action = handler.action;
            } else if( typeof handler.action === 'string' ) {
                action = target[handler.action];
            }
            if( typeof action === 'function' ) {
                return this.bindToCaller(target, action, args)();
            }
        }
    },

    /**
     * Returns the type of the object.
     *
     * @return {String}
     */
    getObjectType: function() {
        return this._type;
    },

    /**
     * Loops over the registered interfaces and bind them to itself
     * @private
     */

    _addInterfaces: function() {
        _.each(this._implementedInterfaces, function( value ) {
            this.implement(value);
        }, this);
    },

    deepCopy: function( value ) {
        return JSON.parse(JSON.stringify(value));
    }

};