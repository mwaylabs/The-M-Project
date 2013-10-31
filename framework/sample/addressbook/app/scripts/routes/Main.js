/*global Addressbook, Backbone*/
Addressbook.Routers = Addressbook.Routers || {};
Addressbook.Controllers = Addressbook.Controllers || {};

(function() {

    Addressbook.Routers.MainRouter = M.Router.extend({
        routes: {
            '': 'indexCtrl',
            'detail/:id': 'detailCtrl',
            'edit/:id': 'editCtrl'

        },

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
            Addressbook.ListController = this.indexCtrl;
        },

        indexCtrl: Addressbook.Controllers.ListController.create(),
        detailCtrl: Addressbook.Controllers.DetailController.create(),
        editCtrl: Addressbook.Controllers.EditController.create()
    });

})();