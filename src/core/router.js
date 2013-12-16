// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Router
 *
 * @type {*}
 * @extends Backbone.Router
 */
M.Router = Backbone.Router.extend();
M.Router.create = M.create;
M.Router.design = M.design;

_.extend(M.Router.prototype, M.Object, {

    _type: 'M.Router'

});