//M.Controller = function() {
//    _.extend(this, arguments[0]);
//    this.initialize(arguments[0]);
//};

M.Controller = Backbone.View.extend(M.Object);

M.Controller.create = M.create;

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