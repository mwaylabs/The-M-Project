/**
 * Defines the general namespace
 *
 * @type {Object}
 */
var M;
if (typeof exports !== 'undefined') {
    M = exports;
} else {
    M = global.M = {};
}

/**
 * Version number of current release
 * @type {String}
 */
M.Version = M.version = '2.0';

/**
 * Empty function to be used when
 * no functionality is needed
 *
 * @type {Function}
 */
M.f = function () {
};

M.create = function (arguments) {
    return new this(arguments);
};

M.design = function (obj) {
    var o = this.extend(obj || {});
    return new o();
};

M.isCollection = function (collection) {
    return Backbone.Collection.prototype.isPrototypeOf(collection);
};

M.isModel = function (model) {
    return Backbone.Model.prototype.isPrototypeOf(model);
};

M.isEntity = function (entity) {
    return M.Entity.prototype.isPrototypeOf(entity);
};

M.isI18NItem = function (entity) {
    return (entity && entity._type && entity._type === 'M.I18NItem');
};

//    M.create = function() {
//        return this.apply(this, arguments);
//    };

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
