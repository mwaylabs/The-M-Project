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
    var o = this.extend(obj);
    return new o();
};

M.isCollection = function (collection) {
    return Backbone.Collection.prototype.isPrototypeOf(collection);
};

M.isModel = function (model) {
    return Backbone.Model.prototype.isPrototypeOf(model);
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