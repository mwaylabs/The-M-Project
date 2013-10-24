/*global Addressbook, Backbone*/
Addressbook.Routers = Addressbook.Routers || {};
Addressbook.Controllers = Addressbook.Controllers || {};

(function() {

    Addressbook.Routers.MainRouter = M.Router.extend({
        routes: {
            '': 'indexCtrl'
        },

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
            Addressbook.MainController = this.indexCtrl;
        },

        indexCtrl: Addressbook.Controllers.MainController.create()
    });

})();