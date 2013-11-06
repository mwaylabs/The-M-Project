//M.Controller = function() {
//    _.extend(this, arguments[0]);
//    this.initialize(arguments[0]);
//};

M.Controller = function (options) {
    this.options = options || {};
    if (_.isFunction(this.initialize)) {
        this.initialize(this.options);
    }
};

M.Controller.extend = Backbone.Model.extend;
M.Controller.create = M.create;
M.Controller.design = M.design;

_.extend(M.Controller.prototype, Backbone.Events, {

    _type: 'M.Controller',

    initialize: function( options ) {
        return this;
    },

    show: function(){

    },

    applicationStart: function(){

    },

    set: function( name, value ) {
        this[name] = value;
        this.trigger(name, value);
    },

    get: function( name ) {
        return this[name];
    }
});