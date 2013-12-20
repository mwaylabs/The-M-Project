// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * Defines the general namespace
 *
 * @type {Object}
 */
var M = null;
if( typeof exports !== 'undefined' ) {
    M = exports;
} else {
    M = global.M = {};
}

/**
 * Version number of current release
 * @type {String}
 */
M.Version = M.version = '/* @echo VERSION */';

/**
 * Empty function to be used when
 * no functionality is needed
 *
 * @type {Function}
 */
M.f = function() {
};

M.create = function( args ) {
    return new this(args);
};

M.design = function( obj ) {
    var O = this.extend(obj || {});
    return new O();
};

M.extend = Backbone.Model.extend;

M.isCollection = function( collection ) {
    return Backbone.Collection.prototype.isPrototypeOf(collection);
};

M.isModel = function( model ) {
    return Backbone.Model.prototype.isPrototypeOf(model);
};

M.isEntity = function( entity ) {
    return M.Entity.prototype.isPrototypeOf(entity);
};

M.isI18NItem = function( entity ) {
    return (entity && entity._type && entity._type === 'M.I18NItem') ? true : false;
};

M.isController = function( entity ) {
    return M.Controller.prototype.isPrototypeOf(entity);
};

/**
 *
 * Check if the given object is a M.View
 * @param {Object} Check this property if it inherits from M.View
 * @returns {boolean}
 */
M.isView = function( view ) {
    return M.View.prototype.isPrototypeOf(view);
};

/**
 * Extend a function with the given interfaces
 * @param interfaces
 * @returns {M}
 */
M.implements = function( interfaces ) {
    this.prototype._implementedInterfaces = interfaces;
    return this;
};


/**
 * Readable alias for true
 *
 * @type {Boolean}
 */
YES = true;

/**
 * Readable alias for false
 *
 * @type {Boolean}
 */
NO = false;
