(function(){

    Addressbook.Routers.KitchensinkRouter = M.Router.extend({
        routes: {
            '': 'overviewController'
        },


        initialize: function() {

            M.Router.prototype.initialize.apply(this, arguments);
            OverviewController = this.overviewController;
        },

        overviewController: Addressbook.Controllers.OverviewController.create()

    });

})(this);