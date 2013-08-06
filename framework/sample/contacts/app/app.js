define([

  'backbone',
  'themproject'

], function( Backbone, M) {

    Backbone.Layout.configure({
        manage: true
    });

    var App = new M.Application();



    return App;
});