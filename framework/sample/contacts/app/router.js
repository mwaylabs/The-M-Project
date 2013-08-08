define([
    'app',
    'themproject'

], function( app, M ) {
  debugger;

  var Router = Backbone.Router.extend({

    routes: {
      '' : 'index',
      'detail' : 'detail'
    },

    index: function() {
        console.log('Router index');
    },

    detail: function() {
        console.log('Router detail');
    }

  });

  return new Router();

});
