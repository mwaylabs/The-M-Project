Teaser.Routers = Teaser.Routers || {};
Teaser.Controllers = Teaser.Controllers || {};

(function() {

    Teaser.Routers.MainRouter = M.Router.extend({
        routes: {
            '': 'indexCtrl',
            'whatsnew': 'indexCtrl'
        },

        initialize: function() {
            M.Router.prototype.initialize.apply(this, arguments);
            Teaser.MainController = this.indexCtrl;

        },

        indexCtrl: Teaser.Controllers.MainController.create()

    });

})();